import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchFooterContent = createAsyncThunk(
  'footer/fetchFooterContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/footer-content');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateFooterContent = createAsyncThunk(
  'footer/updateFooterContent',
  async (footerData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/footer-content', footerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    content: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooterContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.data;
      })
      .addCase(fetchFooterContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Footer Content
      .addCase(updateFooterContent.fulfilled, (state, action) => {
        state.content = action.payload.data;
      });
  },
});

export default footerSlice.reducer; 