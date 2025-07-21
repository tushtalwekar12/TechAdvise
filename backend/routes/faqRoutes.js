import express from 'express';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faqController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAllFAQs);

// Admin routes
router.post('/', protect, authorize('admin', 'superadmin'), createFAQ);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateFAQ);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteFAQ);

export default router; 