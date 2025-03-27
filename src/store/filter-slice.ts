import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterParams = {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
}

const initialState: FilterParams = {
  selectedCategory: null,
  selectedSubcategory: null,
};

// !TODO доделать фильтрацию

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      state.selectedSubcategory = null;
    },
    setSubcategory(state, action: PayloadAction<string | null>) {
      state.selectedSubcategory = action.payload;
    },
    resetFilters(state) {
      state.selectedCategory = null;
      state.selectedSubcategory = null;
    },
  },
});

export const { setCategory, setSubcategory, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
