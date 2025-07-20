import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchHighlights = createAsyncThunk(
  'highlights/fetchHighlights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/highlights');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createHighlight = createAsyncThunk(
  'highlights/createHighlight',
  async (highlightData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/highlights', highlightData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateHighlight = createAsyncThunk(
  'highlights/updateHighlight',
  async ({ id, highlightData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/highlights/${id}`, highlightData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteHighlight = createAsyncThunk(
  'highlights/deleteHighlight',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/highlights/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const highlightsSlice = createSlice({
  name: 'highlights',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHighlights.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Highlight
      .addCase(createHighlight.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      // Update Highlight
      .addCase(updateHighlight.fulfilled, (state, action) => {
        const idx = state.items.findIndex(h => h._id === action.payload.data._id);
        if (idx !== -1) state.items[idx] = action.payload.data;
      })
      // Delete Highlight
      .addCase(deleteHighlight.fulfilled, (state, action) => {
        state.items = state.items.filter(h => h._id !== action.payload);
      });
  },
});

export default highlightsSlice.reducer; 