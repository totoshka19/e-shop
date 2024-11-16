import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ReviewsState } from '../types/state';
import { Review } from '../types/review';

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    const storedReviews = localStorage.getItem('mockReviews');
    if (storedReviews) {
      return JSON.parse(storedReviews);
    } else {
      throw new Error('Отзывы не найдены');
    }
  }
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось получить отзывы';
      });
  },
});

export default reviewsSlice.reducer;
