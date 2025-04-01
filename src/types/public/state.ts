import { BaseProduct } from './product';
import { Review } from './review';
import { StatusType } from '../../consts';

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

export type ReviewsState = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

export type CatalogState = {
  isDropdownOpen: boolean;
  isCatalogBtnInFooter: boolean;
}

export type CartItem = {
  product: BaseProduct;
  quantity: number;
}

export type CartState = {
  items: CartItem[];
}

export type AuthState = {
  token: string | null;
  status: StatusType;
  error: string | null;
};
