import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API } from '../../consts';
import { Category } from '../../types/public/product';

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

export const createCategory = createAsyncThunk<Category, { name: string; parent_category_id?: number }, { rejectValue: string }>(
  'categories/createCategory',
  // eslint-disable-next-line camelcase
  async ({ name, parent_category_id }, { rejectWithValue }) => {
    try {
      if (!name || name.trim() === '') {
        return rejectWithValue('Имя категории обязательно.');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/categories/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          // eslint-disable-next-line camelcase
          parent_category_id,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Произошла ошибка, попробуйте еще раз.');
      }

      const data = (await response.json()) as { data: Category };

      return data.data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCategory = createAsyncThunk<
  number,
  { id: number; name: string; parent_category_id?: number },
  { rejectValue: string }
  >(
    'categories/updateCategory',
    // eslint-disable-next-line camelcase
    async ({ id, name, parent_category_id }, { dispatch, rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return rejectWithValue('Токен отсутствует.');
        }

        const response = await fetch(`${URL_API}/admin/categories/${id}/update`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          // eslint-disable-next-line camelcase
          body: JSON.stringify({ name, parent_category_id }),
        });

        if (!response.ok) {
          const errorData = (await response.json()) as { message?: string };
          return rejectWithValue(errorData.message || 'Произошла ошибка, попробуйте еще раз.');
        }

        await dispatch(fetchCategories());

        return id;
      } catch (error) {
        const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
        return rejectWithValue(errorMessage);
      }
    }
  );

export const deleteCategory = createAsyncThunk<number, number, { rejectValue: string }>(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/categories/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Произошла ошибка, попробуйте еще раз.');
      }

      return id;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);
