import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types/admin/state-admin';
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_SUCCEEDED,
  STATUS_FAILED
} from '../../consts';
import { createProduct, fetchProducts, deleteProduct, fetchProductById } from './products-thunks';

const initialState: ProductsState & { currentProduct?: Product | null; currentProductStatus?: string; currentProductError?: string | null } = {
  products: [],
  status: STATUS_IDLE,
  error: null,
  currentProduct: null,
  currentProductStatus: STATUS_IDLE,
  currentProductError: null,
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
      .addCase(createProduct.fulfilled, (state) => {
        state.status = STATUS_SUCCEEDED;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Ошибка создания товара';
      });

    // --- DELETE PRODUCT ---
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = STATUS_SUCCEEDED;
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Ошибка удаления товара';
      });

    // --- FETCH PRODUCT BY ID ---
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.currentProductStatus = STATUS_LOADING;
        state.currentProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.currentProductStatus = STATUS_SUCCEEDED;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentProductStatus = STATUS_FAILED;
        state.currentProductError = action.payload || 'Ошибка получения товара';
        state.currentProduct = null;
      });
  }
});

export default productsSlice.reducer;
