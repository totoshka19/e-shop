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
  logo: string | null; // Может быть null или URL-адресом
};

export type ProductsState = {
  products: Product[];
  status: typeof STATUS_IDLE | typeof STATUS_LOADING | typeof STATUS_SUCCEEDED | typeof STATUS_FAILED;
  error: string | null;
};
