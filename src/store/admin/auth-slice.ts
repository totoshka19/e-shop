import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/public/state';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, URL_API } from '../../consts';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const login = createAsyncThunk<
  { token: string; email: string },
  { email: string; password: string },
  { rejectValue: string }
  >('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(`${URL_API}/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue('Неверный логин или пароль');
        }
        return rejectWithValue('Произошла ошибка');
      }

      // Явно указываем тип для данных
      const data = (await response.json()) as LoginResponse;

      if (!data.access_token) {
        return rejectWithValue('Некорректный ответ от сервера.');
      }

      localStorage.setItem('token', data.access_token);

      return { token: data.access_token, email };
    } catch (error) {
      return rejectWithValue('Произошла ошибка');
    }
  });

const initialState: AuthState = {
  token: null,
  email: null,
  status: STATUS_IDLE,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: function (state) {
      state.token = null;
      state.email = null;
      state.status = STATUS_IDLE;
      state.error = null;
    },
    resetError: function (state) {
      state.error = null;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUS_LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED;
        state.token = action.payload.token;
        state.email = action.payload.email;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
