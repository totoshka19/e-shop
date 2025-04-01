import { MarketplaceIcons } from './types/public/product';

export const URL_API = 'http://api.hirohitoshop.ru/api';

export const STATUS_IDLE = 'idle';
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCEEDED = 'succeeded';
export const STATUS_FAILED = 'failed';

export type StatusType = typeof STATUS_IDLE | typeof STATUS_LOADING | typeof STATUS_SUCCEEDED | typeof STATUS_FAILED;

export const ApiRoute = {
  Products: '/products',
} as const;

export const AppRoute = {
  Catalog: '/',
  Product: '/product/:id',
  Basket: '/basket',
  Order: '/order',
  Admin: '/admin'
} as const;

export const PRODUCTS_PER_PAGE_DESKTOP = 6;
export const PRODUCTS_PER_PAGE_MOBILE = 4;

export const marketplaceIcons: MarketplaceIcons = {
  enote: '/images/enote-icon.svg',
  yamarket: '/images/yamarket-icon.svg',
  wb: '/images/wb-icon.svg',
  avito: '/images/avito-icon.svg',
  ozon: '/images/ozon-icon.svg',
};

export const sites = [
  { id: 'e-shop', name: 'e-shop' },
  { id: 'note', name: 'note' },
];
