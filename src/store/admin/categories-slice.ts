import { createSlice } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED} from '../../consts';
import { CategoriesState } from '../../types/admin/state-admin';
import {createCategory, deleteCategory, fetchCategories, updateCategory} from './caregories-thunks';
import {Category} from '../../types/public/product';

const initialState: CategoriesState = {
  categories: [],
  status: STATUS_IDLE,
  error: null,
};

// !TODO вынести в utils.ts
function findCategoryById(categories: Category[], id: number): Category | undefined {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (Array.isArray(category.child) && category.child.length > 0) {
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

        if (newCategory.parent_category_id) {
          const parentCategory = findCategoryById(state.categories, Number(newCategory.parent_category_id));
          if (parentCategory) {
            parentCategory.child.push(newCategory);
          }
        } else {
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
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = STATUS_SUCCEEDED;
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

        const removeCategory = (categories: Category[]): Category[] => categories.filter((category) => {
          if (category.id === deletedCategoryId) {
            return false;
          }
          if (Array.isArray(category.child)) {
            category.child = removeCategory(category.child);
          }
          return true;
        });

        state.categories = removeCategory(state.categories);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка при удалении категории.';
      });
  },
});

export default categoriesSlice.reducer;
