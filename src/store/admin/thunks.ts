import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API } from '../../consts';
import {Category} from '../../types/public/product';

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
  async ({ name, parent_category_id }, { rejectWithValue }) => {
    try {
      if (!name || name.trim() === "") {
        console.error('Ошибка: Имя категории обязательно.');
        return rejectWithValue("Имя категории обязательно.");
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Ошибка: Токен отсутствует.');
        return rejectWithValue('Токен отсутствует.');
      }

      console.log('Отправляем запрос на создание категории:', {
        name: name.trim(),
        parent_category_id,
      });

      const response = await fetch(`${URL_API}/admin/categories/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(), // Убираем лишние пробелы
          parent_category_id, // Может быть undefined
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        console.error('Ошибка при создании категории:', errorData.message || 'Неизвестная ошибка');
        return rejectWithValue(errorData.message || 'Произошла ошибка при создании категории.');
      }

      const data = (await response.json()) as { data: Category };

      console.log('Категория успешно создана:', data.data);

      return data.data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      console.error('Неожиданная ошибка при создании категории:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCategory = createAsyncThunk<Category, { id: number; name: string }, { rejectValue: string }>(
  'categories/updateCategory',
  async ({ id, name }, { dispatch, rejectWithValue }) => {
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
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Произошла ошибка при обновлении категории.');
      }
      await dispatch(fetchCategories());
      return {
        id,
        name,
        slug: '',
        child: [],
      };
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
        return rejectWithValue(errorData.message || 'Произошла ошибка при удалении категории.');
      }

      return id;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);
