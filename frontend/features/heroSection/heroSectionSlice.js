import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchHeroSection = createAsyncThunk(
  'heroSection/fetchHeroSection',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/hero-section');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateHeroSection = createAsyncThunk(
  'heroSection/updateHeroSection',
  async (heroData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/hero-section', heroData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const heroSectionSlice = createSlice({
  name: 'heroSection',
  initialState: {
    content: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.data;
      })
      .addCase(fetchHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Hero Section
      .addCase(updateHeroSection.fulfilled, (state, action) => {
        state.content = action.payload.data;
      });
  },
});

export default heroSectionSlice.reducer; 