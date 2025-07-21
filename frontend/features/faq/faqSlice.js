import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchFAQs = createAsyncThunk(
  'faq/fetchFAQs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/faqs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createFAQ = createAsyncThunk(
  'faq/createFAQ',
  async (faqData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/faqs', faqData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateFAQ = createAsyncThunk(
  'faq/updateFAQ',
  async ({ id, faqData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/faqs/${id}`, faqData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFAQ = createAsyncThunk(
  'faq/deleteFAQ',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/faqs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create FAQ
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      // Update FAQ
      .addCase(updateFAQ.fulfilled, (state, action) => {
        const idx = state.items.findIndex(f => f._id === action.payload.data._id);
        if (idx !== -1) state.items[idx] = action.payload.data;
      })
      // Delete FAQ
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.items = state.items.filter(f => f._id !== action.payload);
      });
  },
});

export default faqSlice.reducer; 