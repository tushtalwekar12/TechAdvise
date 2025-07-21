import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchContactInfo = createAsyncThunk(
  'contactInfo/fetchContactInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/contact-info');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateContactInfo = createAsyncThunk(
  'contactInfo/updateContactInfo',
  async (infoData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/contact-info', infoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState: {
    content: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.data;
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Contact Info
      .addCase(updateContactInfo.fulfilled, (state, action) => {
        state.content = action.payload.data;
      });
  },
});

export default contactInfoSlice.reducer; 