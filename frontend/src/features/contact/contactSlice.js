import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'; 

export const submitContact = createAsyncThunk(
  'contact/submitContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/contact', contactData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);

// Admin: Get all contacts
export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async ({ page = 1, limit = 10, status = '', search = '' }, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/contact', {
        params: { page, limit, status, search },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch contacts');
    }
  }
);

// Admin: Update contact status
export const updateContactStatus = createAsyncThunk(
  'contact/updateContactStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/contact/${id}/status`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update status');
    }
  }
);

// ========================
// Initial State
// ========================
const initialState = {
  loading: false,
  error: null,
  message: null,
  submittedContact: null,
  contacts: [],
  pagination: null,
};

// ========================
// Slice
// ========================
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.submittedContact = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Submit Contact
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedContact = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Contact Status
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        const updated = action.payload.data;
        const index = state.contacts.findIndex((c) => c._id === updated._id);
        if (index !== -1) {
          state.contacts[index] = updated;
        }
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ========================
// Exports
// ========================
export const { clearContactState } = contactSlice.actions;

export default contactSlice.reducer;
