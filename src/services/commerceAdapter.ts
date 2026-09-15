import type {Product} from '../types/product';

export interface CommerceProductMapper<TProviderProduct> {
  toStorefrontProduct(providerProduct: TProviderProduct): Product;
}

export const shopifyIntegrationNotes = {
  productSource: 'Replace localCatalogService with a Shopify Storefront API service.',
  cartSource: 'Replace localStorage-backed cart actions with Shopify Cart API mutations.',
  checkout: 'Use the checkoutUrl returned by the Shopify Cart API.',
};
