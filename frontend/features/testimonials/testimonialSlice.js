import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/testimonials');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTestimonial = createAsyncThunk(
  'testimonials/createTestimonial',
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/testimonials', testimonialData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  'testimonials/updateTestimonial',
  async ({ id, testimonialData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/testimonials/${id}`, testimonialData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/testimonials/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Testimonial
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      // Update Testimonial
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload.data._id);
        if (idx !== -1) state.items[idx] = action.payload.data;
      })
      // Delete Testimonial
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export default testimonialSlice.reducer; 