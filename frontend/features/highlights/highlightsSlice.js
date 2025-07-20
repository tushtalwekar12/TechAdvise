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
      });
  },
});

export default highlightsSlice.reducer; 