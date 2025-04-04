import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, URL_API } from '../../consts';
import { Category, CategoriesState } from '../../types/admin/state-admin';

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Произошла ошибка');
      }

      const data = (await response.json()) as { data: Category[] };

      if (!Array.isArray(data.data)) {
        return rejectWithValue('Некорректный ответ от сервера.');
      }

      return data.data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

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
        state.categories = action.payload; // action.payload имеет тип Category[]
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка'; // action.payload имеет тип string | undefined
      });
  },
});

export default categoriesSlice.reducer;
