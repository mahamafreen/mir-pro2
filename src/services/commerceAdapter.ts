import type {Product} from '../types/product';

export interface CommerceProductMapper<TProviderProduct> {
  toStorefrontProduct(providerProduct: TProviderProduct): Product;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: {nodes: ShopifyImage[]};
  variants: {nodes: ShopifyVariant[]};
}

const categories = ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Pendants'] as const;
const defaultCare = [
  'Keep away from perfume, sprays and moisture',
  'Wipe gently with a soft dry cloth after wear',
  'Store separately in the supplied MIR pouch or box',
];

const toCategory = (productType: string): Product['category'] => {
  const category = categories.find((item) => productType.toLowerCase().includes(item.toLowerCase()));
  return category ?? 'Pendants';
};

const toNumber = (amount: string | undefined) => (amount ? Number.parseFloat(amount) : undefined);

export const mapShopifyProduct = (product: ShopifyProduct): Product => {
  const variants = product.variants.nodes;
  const firstVariant = variants[0];
  const images = product.images.nodes.map((image) => image.url);
  const firstImage = product.featuredImage?.url ?? images[0] ?? '';
  const tags = product.tags.filter(Boolean);
  const collection = tags[0] ?? (product.productType || 'MIR');
  const material = [product.vendor, ...tags].filter(Boolean).join(' · ') || 'Fine Jewellery';

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    shortDescription: product.description.split(/[.!?]\s/)[0] || product.title,
    description: product.description,
    price: toNumber(firstVariant?.price.amount) ?? 0,
    compareAtPrice: toNumber(firstVariant?.compareAtPrice?.amount),
    image: firstImage,
    images: images.length ? images : [firstImage],
    category: toCategory(product.productType),
    collection,
    material,
    finish: product.productType || 'Fine Jewellery',
    rating: 0,
    reviewCount: 0,
    available: variants.some((variant) => variant.availableForSale),
    variants: variants.map((variant) => ({
      id: variant.id,
      name: variant.selectedOptions[0]?.name ?? 'Style',
      value: variant.title,
      available: variant.availableForSale,
    })),
    details: tags,
    care: defaultCare,
  };
};

export const shopifyProductMapper: CommerceProductMapper<ShopifyProduct> = {
  toStorefrontProduct: mapShopifyProduct,
};

export const shopifyIntegrationNotes = {
  productSource: 'Replace localCatalogService with a Shopify Storefront API service.',
  cartSource: 'Replace localStorage-backed cart actions with Shopify Cart API mutations.',
  checkout: 'Use the checkoutUrl returned by the Shopify Cart API.',
};
