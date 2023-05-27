import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const fetchAll = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`/contacts`, {
      signal: thunkAPI.signal,
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post(`/contacts`, {
        name: name,
        number: number,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
});

export { fetchAll, addContact, deleteContact };
