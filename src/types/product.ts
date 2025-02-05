export type MarketplaceIcons = {
  [key: string]: string;
};

export type Marketplace = {
  name: string;
  price: number;
  link: string;
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
