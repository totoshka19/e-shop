import { createSlice } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED} from '../../consts';
import { CategoriesState } from '../../types/admin/state-admin';
import {createCategory, deleteCategory, fetchCategories, updateCategory} from './thunks';

const initialState: CategoriesState = {
  categories: [],
  status: STATUS_IDLE,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(createCategory.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.categories.push(action.payload); // Добавляем новую категорию в состояние
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка при создании категории.';
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        const updatedCategory = action.payload;
        const index = state.categories.findIndex((cat) => cat.id === updatedCategory.id);
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка при обновлении категории.';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        const deletedCategoryId = action.payload;
        state.categories = state.categories.filter((cat) => cat.id !== deletedCategoryId);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка при удалении категории.';
      });
  },
});

export default categoriesSlice.reducer;
