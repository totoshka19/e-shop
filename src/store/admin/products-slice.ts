import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types/admin/state-admin';
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_SUCCEEDED,
  STATUS_FAILED
} from '../../consts';
import { createProduct, fetchProducts } from './products-thunks';

const initialState: ProductsState = {
  products: [],
  status: STATUS_IDLE,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- FETCH PRODUCTS ---
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = STATUS_SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Неизвестная ошибка';
      });

    // --- CREATE PRODUCT ---
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = STATUS_SUCCEEDED;
        state.products.push(action.payload); // добавляем новый товар
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Ошибка создания товара';
      });
  },
});

export default productsSlice.reducer;
