import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchAboutPageContent = createAsyncThunk(
  'aboutPage/fetchAboutPageContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/about-page');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAboutPageContent = createAsyncThunk(
  'aboutPage/updateAboutPageContent',
  async (aboutData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/about-page', aboutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const aboutPageSlice = createSlice({
  name: 'aboutPage',
  initialState: {
    content: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutPageContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutPageContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.data;
      })
      .addCase(fetchAboutPageContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update About Page Content
      .addCase(updateAboutPageContent.fulfilled, (state, action) => {
        state.content = action.payload.data;
      });
  },
});

export default aboutPageSlice.reducer; 