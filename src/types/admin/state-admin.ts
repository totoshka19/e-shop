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

export type Attribute = {
  title: string;
  values: Record<string, string>;
}

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
  category_id?: number;
  category?: Category;
  attributes?: Attribute[];
  logo: string | ProductFile | null;
  images?: (string | ProductFile)[];
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

export type FormData = {
  name: string;
  short_description: string;
  description: string;
  price: string;
  category_id: number;
  is_available: boolean;
  sku: string;
  available_count: string;
  to_feed: boolean;
  attributes: Attribute[];
}

export type ProductData = {
  name: string;
  short_description: string;
  description: string;
  price: number;
  category_id: number;
  is_available: number;
  available_count: number;
  sku: string;
  to_feed: boolean;
  attributes: Attribute[];
  logo?: string;
  images?: string[];
}

export type FileUploadState = {
  id: string | null;
  name: string;
  loading: boolean;
  error: string | null;
};
