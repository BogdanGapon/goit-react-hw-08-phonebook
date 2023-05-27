import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchAll } from './operation';
import { addContact } from './operation';
import { deleteContact } from './operation';
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        return { isLoading: false, error: null, items: action.payload };
      })
      .addCase(addContact.fulfilled, (state, action) => ({
        isLoading: false,
        error: null,
        items: [...state.items, action.payload],
      }))
      .addCase(deleteContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(isAnyOf(fetchAll.pending), state => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(fetchAll.rejected, addContact.rejected, deleteContact.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: initialState,
//   extraReducers: builder =>
//     builder
//       .addCase(fetchAll.fulfilled, (state, action) => {
//         return { isLoading: false, error: null, items: action.payload };
//       })
//       .addCase(addContact.fulfilled, (state, action) => ({
//         isLoading: false,
//         error: null,
//         items: [...state.items, action.payload],
//       }))
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           contact => contact.id === action.payload.id
//         );
//         state.items.splice(index, 1);
//       })
//       .addMatcher(isAnyOf(fetchAll.pending), state => {
//         state.isLoading = true;
//       })
//       .addMatcher(
//         isAnyOf(fetchAll.rejected, addContact.rejected, deleteContact.rejected),
//         (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       ),
// });

export const contactReducer = contactSlice.reducer;
