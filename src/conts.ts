export const AppRoute = {
  Catalog: '/',
  Product: '/product/:id',
  Basket: '/basket',
  Order: '/order'
} as const;

export const PRODUCTS_PER_PAGE_DESKTOP = 6;
export const PRODUCTS_PER_PAGE_MOBILE = 4;
