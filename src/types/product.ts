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
};
