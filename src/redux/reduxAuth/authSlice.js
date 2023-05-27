import { createSlice } from '@reduxjs/toolkit';
import { refreshUser, register } from './authOperations';
import { logIn } from './authOperations';
import { logOut } from './authOperations';
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshed: false,
};

const userSignInFullfield = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(register.fulfilled, userSignInFullfield)
      .addCase(logIn.fulfilled, userSignInFullfield)
      .addCase(logOut.fulfilled, state => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = { name: null, email: null };
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshed = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshed = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshed = false;
      }),
});

export const authReducer = authSlice.reducer;
