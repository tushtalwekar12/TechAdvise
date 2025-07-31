import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch all dashboard data in parallel
      const [visitorStatsRes, blogsRes, internshipsRes] = await Promise.all([
        api.get("/api/visitor-stats"),
        api.get("/api/blog/"),
        api.get("/api/internships/"),
      ]);

      // Process visitor stats
      const visitorStats = visitorStatsRes.data;
      const today = new Date().toISOString().slice(0, 10);
      const todayStat = visitorStats.find((stat) => stat.date === today);
      const todayCount = todayStat ? todayStat.count : 0;

      // Process blogs
      const blogs = Array.isArray(blogsRes.data)
        ? blogsRes.data
        : blogsRes.data.blogs || blogsRes.data.data || [];

      // Process internships
      const internships = Array.isArray(internshipsRes.data)
        ? internshipsRes.data
        : internshipsRes.data.internships || internshipsRes.data.data || [];

      return {
        visitorStats,
        todayCount,
        todayDate: today,
        blogCount: blogs.length,
        internshipCount: internships.length,
        blogs,
        internships,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

export const fetchVisitorStats = createAsyncThunk(
  "dashboard/fetchVisitorStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/visitor-stats");
      const visitorStats = response.data;
      const today = new Date().toISOString().slice(0, 10);
      const todayStat = visitorStats.find((stat) => stat.date === today);
      const todayCount = todayStat ? todayStat.count : 0;

      return {
        visitorStats,
        todayCount,
        todayDate: today,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch visitor stats"
      );
    }
  }
);

export const fetchBlogCount = createAsyncThunk(
  "dashboard/fetchBlogCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/blog/");
      const blogs = Array.isArray(response.data)
        ? response.data
        : response.data.blogs || response.data.data || [];

      return blogs.length;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blog count"
      );
    }
  }
);

export const fetchInternshipCount = createAsyncThunk(
  "dashboard/fetchInternshipCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/internships/");
      const internships = Array.isArray(response.data)
        ? response.data
        : response.data.internships || response.data.data || [];

      return internships.length;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch internship count"
      );
    }
  }
);

const initialState = {
  // Visitor stats
  visitorStats: [],
  todayCount: 0,
  todayDate: "",

  // Counts
  blogCount: 0,
  internshipCount: 0,

  // Raw data
  blogs: [],
  internships: [],

  // Loading states
  loading: false,
  visitorStatsLoading: false,
  blogCountLoading: false,
  internshipCountLoading: false,

  // Error states
  error: null,
  visitorStatsError: null,
  blogCountError: null,
  internshipCountError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardErrors: (state) => {
      state.error = null;
      state.visitorStatsError = null;
      state.blogCountError = null;
      state.internshipCountError = null;
    },
    resetDashboard: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // fetchDashboardStats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.visitorStats = action.payload.visitorStats;
        state.todayCount = action.payload.todayCount;
        state.todayDate = action.payload.todayDate;
        state.blogCount = action.payload.blogCount;
        state.internshipCount = action.payload.internshipCount;
        state.blogs = action.payload.blogs;
        state.internships = action.payload.internships;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchVisitorStats
    builder
      .addCase(fetchVisitorStats.pending, (state) => {
        state.visitorStatsLoading = true;
        state.visitorStatsError = null;
      })
      .addCase(fetchVisitorStats.fulfilled, (state, action) => {
        state.visitorStatsLoading = false;
        state.visitorStats = action.payload.visitorStats;
        state.todayCount = action.payload.todayCount;
        state.todayDate = action.payload.todayDate;
      })
      .addCase(fetchVisitorStats.rejected, (state, action) => {
        state.visitorStatsLoading = false;
        state.visitorStatsError = action.payload;
      });

    // fetchBlogCount
    builder
      .addCase(fetchBlogCount.pending, (state) => {
        state.blogCountLoading = true;
        state.blogCountError = null;
      })
      .addCase(fetchBlogCount.fulfilled, (state, action) => {
        state.blogCountLoading = false;
        state.blogCount = action.payload;
      })
      .addCase(fetchBlogCount.rejected, (state, action) => {
        state.blogCountLoading = false;
        state.blogCountError = action.payload;
      });

    // fetchInternshipCount
    builder
      .addCase(fetchInternshipCount.pending, (state) => {
        state.internshipCountLoading = true;
        state.internshipCountError = null;
      })
      .addCase(fetchInternshipCount.fulfilled, (state, action) => {
        state.internshipCountLoading = false;
        state.internshipCount = action.payload;
      })
      .addCase(fetchInternshipCount.rejected, (state, action) => {
        state.internshipCountLoading = false;
        state.internshipCountError = action.payload;
      });
  },
});

export const { clearDashboardErrors, resetDashboard } = dashboardSlice.actions;

// Selectors
export const selectDashboardStats = (state) => ({
  visitorStats: state.dashboard.visitorStats,
  todayCount: state.dashboard.todayCount,
  todayDate: state.dashboard.todayDate,
  blogCount: state.dashboard.blogCount,
  internshipCount: state.dashboard.internshipCount,
  blogs: state.dashboard.blogs,
  internships: state.dashboard.internships,
});

export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectVisitorStats = (state) => ({
  stats: state.dashboard.visitorStats,
  todayCount: state.dashboard.todayCount,
  todayDate: state.dashboard.todayDate,
  loading: state.dashboard.visitorStatsLoading,
  error: state.dashboard.visitorStatsError,
});

export default dashboardSlice.reducer;
