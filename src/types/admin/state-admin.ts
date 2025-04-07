import { StatusType } from '../../consts';

export type Site = {
  id: string;
  name: string;
};

export type SiteState = {
  selectedSite: Site | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  child: Category[];
};

export type CategoriesState = {
  categories: Category[];
  status: StatusType;
  error: string | null;
};
