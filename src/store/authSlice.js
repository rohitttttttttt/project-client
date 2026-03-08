import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// ── Thunk: restore session from localStorage on app mount ──
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken) return rejectWithValue('No token');

    try {
      const { data } = await authService.getMe();
      return { user: data.user, token: storedToken };
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return rejectWithValue('Token expired');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('accessToken') || null,
    isLoggedIn: false,
    loading: true, // true until restoreSession resolves
  },
  reducers: {
    loginSuccess(state, action) {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isLoggedIn = true;
      state.loading = false;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutDone(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.loading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
      });
  },
});

export const { loginSuccess, logoutDone } = authSlice.actions;
export default authSlice.reducer;
