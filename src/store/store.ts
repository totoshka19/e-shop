import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './public/catalog-slice';
import productsReducer from './public/products-slice';
import productReducer from './public/product-slice';
import reviewsReducer from './public/reviews-slice';
import cartReducer from './public/cart-slice';
import filterReducer from './public/filter-slice';
import authReducer from './admin/auth-slice';
import siteReducer from './admin/site-slice';
import { initializeMockData } from '../mock/utils';

// !TODO заменить на данные с сервера
localStorage.clear();
initializeMockData();

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    products: productsReducer,
    product: productReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
    filter: filterReducer,
    auth: authReducer,
    site: siteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
