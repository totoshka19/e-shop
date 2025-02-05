import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog-slice';
import productsReducer from './products-slice';
import productReducer from './product-slice';
import reviewsReducer from './reviews-slice';
import cartReducer from './cart-slice';
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
