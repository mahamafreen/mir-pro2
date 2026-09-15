export type ProductCategory = 'Necklaces' | 'Earrings' | 'Rings' | 'Bracelets' | 'Pendants';

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  category: ProductCategory;
  collection: string;
  material: string;
  finish: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  variants: ProductVariant[];
  details: string[];
  care: string[];
}

export interface Collection {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
}
