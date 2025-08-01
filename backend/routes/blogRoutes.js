import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBlog } from '../middleware/validation.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

// CRUD routes for blog

// Create blog (admin)
router.post('/', protect, authorize('admin', 'superadmin'), validateBlog, createBlog);

// Get all blogs (public)
router.get('/', getAllBlogs);

// Get single blog by id (public)
router.get('/:id', validateObjectId, getBlogById);

// Update blog (admin)
router.put('/:id', protect, authorize('admin', 'superadmin'), validateObjectId, validateBlog, updateBlog);

// Delete blog (admin)
router.delete('/:id', protect, authorize('admin', 'superadmin'), validateObjectId, deleteBlog);

export default router;
