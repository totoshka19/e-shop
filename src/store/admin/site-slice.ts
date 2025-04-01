import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Site, SiteState } from '../../types/admin/state-admin';

const initialState: SiteState = {
  selectedSite: null,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    selectSite: (state, action: PayloadAction<Site>) => {
      state.selectedSite = action.payload;
    },
  },
});

export const { selectSite } = siteSlice.actions;
export default siteSlice.reducer;
