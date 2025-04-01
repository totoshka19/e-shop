import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BaseProduct } from '../../types/public/product';
import { ProductsState } from '../../types/public/state';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const storedProducts = localStorage.getItem('mockProducts');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    } else {
      throw new Error('Товары не найдены');
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<BaseProduct[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось получить товары';
      });
  },
});

export default productsSlice.reducer;
