import { BaseProduct } from './product';

export type ProductState = {
  item: BaseProduct | null;
  loading: boolean;
  error: string | null;
}

export type ProductsState = {
  items: BaseProduct[];
  loading: boolean;
  error: string | null;
}
