import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/blog');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/blog', blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/blog/${id}`, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/blog/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Blog
      .addCase(createBlog.fulfilled, (state, action) => {
        state.items.unshift(action.payload.data);
      })
      // Update Blog
      .addCase(updateBlog.fulfilled, (state, action) => {
        const idx = state.items.findIndex(b => b._id === action.payload.data._id);
        if (idx !== -1) state.items[idx] = action.payload.data;
      })
      // Delete Blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter(b => b._id !== action.payload);
      });
  },
});

export default blogSlice.reducer; 