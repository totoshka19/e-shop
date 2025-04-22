import { createSlice } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED} from '../../consts';
import { CategoriesState } from '../../types/admin/state-admin';
import {createCategory, deleteCategory, fetchCategories, updateCategory} from './thunks';
import {Category} from '../../types/public/product';

const initialState: CategoriesState = {
  categories: [],
  status: STATUS_IDLE,
  error: null,
};

// Вспомогательная функция для поиска категории по ID
function findCategoryById(categories: Category[], id: number): Category | undefined {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.child.length > 0) {
      const found = findCategoryById(category.child, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

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

        const newCategory = action.payload;

        if (newCategory.parent_id) {
          // Находим родительскую категорию и добавляем новую подкатегорию в её массив child
          const parentCategory = findCategoryById(state.categories, Number(newCategory.parent_id));
          if (parentCategory) {
            parentCategory.child.push(newCategory);
          }
        } else {
          // Если parent_id отсутствует, добавляем категорию в корень
          state.categories.push(newCategory);
        }
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
