export type MarketplaceIcons = {
  [key: string]: string;
};

export type Marketplace = {
  name: string;
  price: number;
  link: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  child: Category[];
};

export type BaseProduct = {
  id: string;
  name: string;
  previewImg: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  inStock: boolean;
  sku: string;
  images: string[];
  marketplaces: Marketplace[];
};

export type Product = {
  id: number;
  name: string | null;
  description: string;
  short_description: string;
  price: number;
  sku: string | null;
  available_count: number;
  is_available: boolean;
  to_feed: boolean;
  category: Category;
  images: string[];
  logo: string | null;
  marketplace: Marketplace[];
};
