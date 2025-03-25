import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, StatusType, URL_API } from '../consts';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(`${URL_API}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data.access_token) {
        throw new Error('Некорректный ответ от сервера.');
      }
      return { token: response.data.access_token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  token: string | null;
  status: StatusType;
  error: string | null;
}

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
