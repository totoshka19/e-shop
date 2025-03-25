import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post('http://api.hirohitoshop.ru/api/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data.access_token) {
        throw new Error('Некорректный ответ от сервера.');
      }

      console.log('Успешная авторизация:', response.data);
      return { token: response.data.access_token };
    } catch (error) {
      console.error('Ошибка авторизации:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: function (state) {
      console.log('Выполняется logout');
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(login.pending, (state) => {
        console.log('Начинается авторизация...');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Авторизация завершена успешно:', action.payload);
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Ошибка авторизации:', action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка.';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
