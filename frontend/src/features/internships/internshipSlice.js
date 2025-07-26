import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Thunk to fetch internships
export const fetchInternships = createAsyncThunk(
  'internships/fetchInternships',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/internships');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to add a new internship
export const addInternship = createAsyncThunk(
  'internships/addInternship',
  async (internshipData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/internships', internshipData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to update internship
export const updateInternship = createAsyncThunk(
  'internships/updateInternship',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/internships/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to delete internship
export const deleteInternship = createAsyncThunk(
  'internships/deleteInternship',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/internships/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to toggle isActive status
export const toggleInternshipStatus = createAsyncThunk(
  'internships/toggleInternshipStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/internships/${id}/toggle`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const internshipSlice = createSlice({
  name: 'internships',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch internships
      .addCase(fetchInternships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || action.payload || [];
      })
      .addCase(fetchInternships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add internship
      .addCase(addInternship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInternship.fulfilled, (state, action) => {
        state.loading = false;
        const newInternship = action.payload?.data || action.payload;
        if (newInternship) {
          state.items.unshift(newInternship);
        }
      })
      .addCase(addInternship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update internship
      .addCase(updateInternship.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;
        if (updated && updated._id) {
          const idx = state.items.findIndex(i => i._id === updated._id);
          if (idx !== -1) state.items[idx] = updated;
        }
      })

      // Delete internship
      .addCase(deleteInternship.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload);
      })

      // Toggle isActive status
      .addCase(toggleInternshipStatus.fulfilled, (state, action) => {
        const updated = action.payload?.data || action.payload;
        if (updated && updated._id) {
          const idx = state.items.findIndex(i => i._id === updated._id);
          if (idx !== -1) state.items[idx] = updated;
        }
      });
  },
});

export default internshipSlice.reducer;
