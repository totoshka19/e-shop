import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API } from '../../consts';
import {FileUploadResponse, Product} from '../../types/admin/state-admin';

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

export const createProduct = createAsyncThunk<Product, Product, { rejectValue: string }>(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/products/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Ошибка создания товара');
      }

      return (await response.json()) as Product;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadFile = createAsyncThunk<string, File, { rejectValue: string }>(
  'products/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const formData = new FormData();
      formData.append('file', file, file.name);

      const response = await fetch(`${URL_API}/admin/file/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Ошибка загрузки файла');
      }

      const data = (await response.json()) as FileUploadResponse;
      return data.data.id;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk<number, number, { rejectValue: string }>(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/products/${productId}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Ошибка удаления товара');
      }

      return productId;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>(
  'adminProducts/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует. Невозможно обновить товар.');
      }

      const response = await fetch(`${URL_API}/admin/products/${product.id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string; errors?: Record<string, string[]> };
        let errorMessage = 'Ошибка при обновлении товара';
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          errorMessage = Object.values(errorData.errors).flat().join(' ');
        }
        return rejectWithValue(errorMessage);
      }

      const updatedProduct = (await response.json()) as { data: Product };
      return updatedProduct.data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла непредвиденная ошибка при обновлении товара';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }
      const response = await fetch(`${URL_API}/admin/products/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Ошибка получения товара');
      }
      const data = (await response.json()) as { data: Product };
      if (!data.data) {
        return rejectWithValue('Некорректный ответ от сервера.');
      }
      return data.data;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProductImage = createAsyncThunk<string, string, { rejectValue: string }>(
  'products/deleteProductImage',
  async (fileId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Токен отсутствует.');
      }

      const response = await fetch(`${URL_API}/admin/file/${fileId}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        return rejectWithValue(errorData.message || 'Ошибка удаления файла');
      }
      return fileId;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Произошла неожиданная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);
