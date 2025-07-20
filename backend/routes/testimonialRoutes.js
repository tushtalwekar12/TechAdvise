import express from 'express';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAllTestimonials);

// Admin routes
router.post('/', protect, authorize('admin', 'superadmin'), createTestimonial);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateTestimonial);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteTestimonial);

export default router; 