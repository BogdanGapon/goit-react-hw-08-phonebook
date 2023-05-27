import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(token) {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    const respond = await axios.post(`/users/signup`, user);
    token.set(respond.data.token);
    return respond.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const logIn = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const respond = await axios.post(`/users/login`, user);
    token.set(respond.data.token);
    return respond.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const respond = await axios.post(`/users/logout`);
    token.unset(respond.data.token);
    return respond.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.users.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Token is not found');
  }

  token.set(persistedToken);
  try {
    const respond = await axios.get('users/current', {
      signal: thunkAPI.signal,
    });
    return respond.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export { register, logIn, logOut, refreshUser };
