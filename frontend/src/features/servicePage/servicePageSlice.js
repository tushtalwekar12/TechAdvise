import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchServicePageContent = createAsyncThunk(
  'servicePage/fetchServicePageContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/service-page');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateServicePageContent = createAsyncThunk(
  'servicePage/updateServicePageContent',
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/service-page', serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const servicePageSlice = createSlice({
  name: 'servicePage',
  initialState: {
    content: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePageContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePageContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.data;
      })
      .addCase(fetchServicePageContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Service Page Content
      .addCase(updateServicePageContent.fulfilled, (state, action) => {
        state.content = action.payload.data;
      });
  },
});

export default servicePageSlice.reducer; 