import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState } from '../../types/public/state';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, URL_API } from '../../consts';

export const login = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
  >(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post<{ access_token: string }>(
          `${URL_API}/login`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (!response.data.access_token) {
          throw new Error('Некорректный ответ от сервера.');
        }
        return { token: response.data.access_token };
      } catch (error) {
        let errorMessage = 'Произошла ошибка.';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return rejectWithValue(errorMessage);
      }
    }
  );

const initialState: AuthState = {
  token: null,
  status: STATUS_IDLE,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: function (state) {
      state.token = null;
      state.status = STATUS_IDLE;
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
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = action.payload || 'Произошла ошибка.';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
