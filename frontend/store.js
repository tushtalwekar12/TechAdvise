import { configureStore } from '@reduxjs/toolkit';
import internshipReducer from './features/internships/internshipSlice';
import blogReducer from './features/blogs/blogSlice';

const store = configureStore({
  reducer: {
    internships: internshipReducer,
    blogs: blogReducer,
  },
});

export default store; 