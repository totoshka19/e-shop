import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CatalogState = {
  isDropdownOpen: boolean;
  isCatalogBtnInFooter: boolean;
}

const initialState: CatalogState = {
  isDropdownOpen: false,
  isCatalogBtnInFooter: false,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setIsDropdownOpen(state, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload;
    },
    setIsCatalogBtnInFooter(state, action: PayloadAction<boolean>) {
      state.isCatalogBtnInFooter = action.payload;
    },
  },
});

export const { setIsDropdownOpen, setIsCatalogBtnInFooter } = catalogSlice.actions;
export default catalogSlice.reducer;
