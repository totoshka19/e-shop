import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/admin/state-admin';
import { STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED } from '../../consts';
import { fetchProducts } from './products-thunks';

interface ProductsState {
  products: Product[];
  status: typeof STATUS_IDLE | typeof STATUS_LOADING | typeof STATUS_SUCCEEDED | typeof STATUS_FAILED;
  error: string | null;
}

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
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = STATUS_SUCCEEDED;
        state.products = action.payload;
        console.log('Полученные продукты:', action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export default productsSlice.reducer;
