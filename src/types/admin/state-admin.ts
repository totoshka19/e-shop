import {STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, StatusType} from '../../consts';
import {Category} from '../public/product';

export type Site = {
  id: string;
  name: string;
};

export type SiteState = {
  selectedSite: Site | null;
};

export type CategoriesState = {
  categories: Category[];
  status: StatusType;
  error: string | null;
};

export type ProductFile = {
  id: string;
  name: string;
  file_name: string;
  mime_type: string;
  original_url: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: number;
  sku: string;
  available_count: number;
  is_available: boolean;
  to_feed: boolean;
  logo: string | ProductFile | null; // Может быть null, строкой или объектом ProductFile
};

export type ProductsState = {
  products: Product[];
  status: typeof STATUS_IDLE | typeof STATUS_LOADING | typeof STATUS_SUCCEEDED | typeof STATUS_FAILED;
  error: string | null;
};

export type FileUploadResponse = {
  data: {
    id: string;
    name: string;
    file_name: string;
    mime_type: string;
    original_url: string;
  };
};
