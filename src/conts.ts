import { MarketplaceIcons } from './types/product';

export const AppRoute = {
  Catalog: '/',
  Product: '/product/:id',
  Basket: '/basket',
  Order: '/order'
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
