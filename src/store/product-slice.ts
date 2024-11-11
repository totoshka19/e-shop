import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BaseProduct } from '../types/product';
import { ProductState } from '../types/state';

const initialState: ProductState = {
  item: null,
  loading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId: string) => {
    const storedProducts = localStorage.getItem('mockProducts');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const product = products.find((p: BaseProduct) => p.id === productId);
      if (product) {
        return product;
      } else {
        throw new Error('Товар не найден');
      }
    } else {
      throw new Error('Mock products not found');
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<BaseProduct>) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось получить товар';
      });
  },
});

export default productSlice.reducer;
