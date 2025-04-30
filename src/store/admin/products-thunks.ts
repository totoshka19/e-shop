import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API } from '../../consts';
import { Product } from '../../types/admin/state-admin';

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/products`, {
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

      const data = (await response.json()) as { data: Product[] };

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
