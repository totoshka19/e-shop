import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products-slice';
import productReducer from './product-slice';
import { initializeMockData } from '../mock/utils';

// !TODO заменить на данные с сервера
localStorage.clear();
initializeMockData();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
