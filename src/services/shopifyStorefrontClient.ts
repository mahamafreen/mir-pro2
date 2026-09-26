import type {ProductQuery, CatalogService} from './catalogService';
import {mapShopifyProduct} from './commerceAdapter';
import type {Collection, Product} from '../types/product';
import type {ShopifyImage, ShopifyProduct} from './commerceAdapter';

const PRODUCTS_QUERY = `
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      nodes {
        id
        handle
        title
        description
        productType
        vendor
        tags
        featuredImage {
          url
          altText
        }
        images(first: 50) {
          nodes {
            url
            altText
          }
        }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

interface ShopifyProductsResponse {
  products: {
    nodes: ShopifyProduct[];
  };
}

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {nodes: ShopifyProduct[]};
}

interface ShopifyCollectionsResponse {
  collections: {nodes: ShopifyCollection[]};
}

interface ShopifyCollectionResponse {
  collection: ShopifyCollection | null;
}

const COLLECTION_FIELDS = `
  id
  title
  handle
  description
  image { url altText }
  products(first: 100) {
    nodes {
      id
      handle
      title
      description
      productType
      vendor
      tags
      featuredImage { url altText }
      images(first: 50) { nodes { url altText } }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `query Collections($first: Int!) { collections(first: $first) { nodes { ${COLLECTION_FIELDS} } } }`;
const COLLECTION_QUERY = `query Collection($handle: String!) { collection(handle: $handle) { ${COLLECTION_FIELDS} } }`;

interface ShopifyGraphQLResponse<TData> {
  data?: TData;
  errors?: Array<{message: string}>;
}

interface ShopifyUserError {
  field: string[] | null;
  message: string;
}

interface ShopifyCartMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {totalAmount: ShopifyCartMoney};
  merchandise: ShopifyCartMerchandise | null;
}

interface ShopifyCartMerchandise {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {name: string; value: string}[];
  price: ShopifyCartMoney;
  product: ShopifyProduct;
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {subtotalAmount: ShopifyCartMoney; totalAmount: ShopifyCartMoney};
  lines: {nodes: ShopifyCartLine[]};
}

export interface ShopifyCartLineItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  lineTotal: number;
}

export interface ShopifyCartSnapshot {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  lines: ShopifyCartLineItem[];
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            selectedOptions { name value }
            price { amount currencyCode }
            product {
              id
              handle
              title
              description
              productType
              vendor
              tags
              featuredImage { url altText }
              images(first: 50) { nodes { url altText } }
              variants(first: 100) {
                nodes {
                  id
                  title
                  availableForSale
                  selectedOptions { name value }
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_QUERY = `query Cart($id: ID!) { cart(id: $id) { ...CartFields } } ${CART_FRAGMENT}`;
const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: {lines: $lines}) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

interface ShopifyConfig {
  endpoint: string;
  accessToken: string;
}

const getShopifyConfig = (): ShopifyConfig => {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.trim();
  const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION?.trim();

  if (!domain || !accessToken || !apiVersion) {
    throw new Error('Shopify Storefront API configuration is incomplete.');
  }

  if (!/^\d{4}-\d{2}$/.test(apiVersion)) {
    throw new Error('Shopify Storefront API version is invalid.');
  }

  const normalizedDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return {
    endpoint: `https://${normalizedDomain}/api/${apiVersion}/graphql.json`,
    accessToken,
  };
};

const getShopifyStoreUrl = (path: string): string | undefined => {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.trim();
  if (!domain) return undefined;

  try {
    let hostname = domain;
    if (hostname.startsWith('https://')) hostname = hostname.slice(8);
    else if (hostname.startsWith('http://')) hostname = hostname.slice(7);
    const storeUrl = new URL(`https://${hostname}`);
    if (storeUrl.username || storeUrl.password || storeUrl.pathname !== '/') return undefined;
    return new URL(path, storeUrl).toString();
  } catch {
    return undefined;
  }
};

export const getShopifyCustomerAccountUrl = () => getShopifyStoreUrl('/account');

const queryShopify = async <TData>(query: string, variables: Record<string, unknown>): Promise<TData> => {
  const config = getShopifyConfig();
  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.accessToken,
    },
    body: JSON.stringify({query, variables}),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API request failed with status ${response.status}.`);
  }

  const payload = await response.json() as ShopifyGraphQLResponse<TData>;
  if (payload.errors?.length) {
    throw new Error('Shopify Storefront API returned a GraphQL error.');
  }
  if (!payload.data) {
    throw new Error('Shopify Storefront API returned no data.');
  }

  return payload.data;
};

const toAmount = (money: ShopifyCartMoney) => Number.parseFloat(money.amount) || 0;

const mapShopifyCart = (cart: ShopifyCart): ShopifyCartSnapshot => ({
  id: cart.id,
  checkoutUrl: cart.checkoutUrl,
  totalQuantity: cart.totalQuantity,
  subtotal: toAmount(cart.cost.subtotalAmount),
  total: toAmount(cart.cost.totalAmount),
  lines: cart.lines.nodes.flatMap((line) => {
    if (!line.merchandise) return [];
    return [{
      id: line.id,
      productId: line.merchandise.product.id,
      variantId: line.merchandise.id,
      quantity: line.quantity,
      product: mapShopifyProduct(line.merchandise.product),
      lineTotal: toAmount(line.cost.totalAmount),
    }];
  }),
});

const assertCartResult = (cart: ShopifyCart | null | undefined, userErrors: ShopifyUserError[]) => {
  if (userErrors.length) throw new Error(userErrors.map((error) => error.message).join(' '));
  if (!cart) throw new Error('Shopify returned no cart.');
  return mapShopifyCart(cart);
};

const mapShopifyCollection = (collection: ShopifyCollection): Collection => ({
  id: collection.id,
  handle: collection.handle,
  title: collection.title,
  eyebrow: 'MIR COLLECTION',
  description: collection.description || 'A considered edit from the MIR jewellery collection.',
  image: collection.image?.url ?? '',
  products: collection.products.nodes.map(mapShopifyProduct),
});

export const getShopifyCart = async (cartId: string): Promise<ShopifyCartSnapshot | undefined> => {
  const data = await queryShopify<{cart: ShopifyCart | null}>(CART_QUERY, {id: cartId});
  return data.cart ? mapShopifyCart(data.cart) : undefined;
};

export const createShopifyCart = async (variantId: string, quantity: number) => {
  const data = await queryShopify<{cartCreate: {cart: ShopifyCart | null; userErrors: ShopifyUserError[]}}>(
    CART_CREATE_MUTATION,
    {lines: [{merchandiseId: variantId, quantity}]},
  );
  return assertCartResult(data.cartCreate.cart, data.cartCreate.userErrors);
};

export const addShopifyCartLine = async (cartId: string, variantId: string, quantity: number) => {
  const data = await queryShopify<{cartLinesAdd: {cart: ShopifyCart | null; userErrors: ShopifyUserError[]}}>(
    CART_LINES_ADD_MUTATION,
    {cartId, lines: [{merchandiseId: variantId, quantity}]},
  );
  return assertCartResult(data.cartLinesAdd.cart, data.cartLinesAdd.userErrors);
};

export const updateShopifyCartLine = async (cartId: string, lineId: string, quantity: number) => {
  const data = await queryShopify<{cartLinesUpdate: {cart: ShopifyCart | null; userErrors: ShopifyUserError[]}}>(
    CART_LINES_UPDATE_MUTATION,
    {cartId, lines: [{id: lineId, quantity}]},
  );
  return assertCartResult(data.cartLinesUpdate.cart, data.cartLinesUpdate.userErrors);
};

export const removeShopifyCartLines = async (cartId: string, lineIds: string[]) => {
  const data = await queryShopify<{cartLinesRemove: {cart: ShopifyCart | null; userErrors: ShopifyUserError[]}}>(
    CART_LINES_REMOVE_MUTATION,
    {cartId, lineIds},
  );
  return assertCartResult(data.cartLinesRemove.cart, data.cartLinesRemove.userErrors);
};

const matchesQuery = (product: Product, query?: ProductQuery) => {
  if (query?.category && query.category !== 'All' && product.category !== query.category) return false;
  if (query?.collection && product.collection.toLowerCase() !== query.collection.toLowerCase()) return false;
  if (query?.search) {
    const value = query.search.toLowerCase().trim();
    const haystack = [product.title, product.category, product.collection, product.material, product.description]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(value)) return false;
  }
  return true;
};

export const shopifyCatalogService: CatalogService = {
  async getProducts(query) {
    const data = await queryShopify<ShopifyProductsResponse>(PRODUCTS_QUERY, {first: 100});
    return data.products.nodes.map(mapShopifyProduct).filter((product) => matchesQuery(product, query));
  },
  async getProduct(handle) {
    const products = await this.getProducts();
    return products.find((product) => product.handle === handle || product.id === handle);
  },
  async getCollections(): Promise<Collection[]> {
    const data = await queryShopify<ShopifyCollectionsResponse>(COLLECTIONS_QUERY, {first: 100});
    return data.collections.nodes.map(mapShopifyCollection);
  },
  async getCollection(handle: string): Promise<Collection | undefined> {
    const data = await queryShopify<ShopifyCollectionResponse>(COLLECTION_QUERY, {handle});
    return data.collection ? mapShopifyCollection(data.collection) : undefined;
  },
};

export {getShopifyConfig};
