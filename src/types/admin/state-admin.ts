import { StatusType } from '../../consts';
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
