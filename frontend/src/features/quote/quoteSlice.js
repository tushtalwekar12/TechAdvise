import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to submit quote form
export const submitQuote = createAsyncThunk(
  "quote/submitQuote",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/quote", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Submission failed"
      );
    }
  }
);

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetQuoteState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuote.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitQuote.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitQuote.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuoteState } = quoteSlice.actions;

export default quoteSlice.reducer;
