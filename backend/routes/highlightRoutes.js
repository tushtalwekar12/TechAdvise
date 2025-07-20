import express from 'express';
import { getAllHighlights, createHighlight, updateHighlight, deleteHighlight } from '../controllers/highlightController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAllHighlights);

// Admin routes
router.post('/', protect, authorize('admin', 'superadmin'), createHighlight);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateHighlight);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteHighlight);

export default router; 