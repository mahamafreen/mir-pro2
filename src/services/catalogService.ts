import {collections, products} from '../data/products';
import type {Collection, Product} from '../types/product';

export interface ProductQuery {
  category?: string;
  collection?: string;
  search?: string;
}

export interface CatalogService {
  getProducts(query?: ProductQuery): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | undefined>;
  getCollections(): Promise<Collection[]>;
}

/**
 * UI components consume this service contract instead of a commerce provider.
 * Shopify Storefront API / Hydrogen can replace this implementation later
 * without changing the presentation components.
 */
export const localCatalogService: CatalogService = {
  async getProducts(query) {
    let result = [...products];
    if (query?.category && query.category !== 'All') {
      result = result.filter((item) => item.category === query.category);
    }
    if (query?.collection) {
      result = result.filter((item) => item.collection.toLowerCase() === query.collection?.toLowerCase());
    }
    if (query?.search) {
      const value = query.search.toLowerCase().trim();
      result = result.filter((item) =>
        [item.title, item.category, item.collection, item.material].join(' ').toLowerCase().includes(value),
      );
    }
    return result;
  },
  async getProduct(handle) {
    return products.find((item) => item.handle === handle);
  },
  async getCollections() {
    return collections;
  },
};

export {shopifyCatalogService} from './shopifyStorefrontClient';
