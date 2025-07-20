import express from 'express';
import { getFooterContent, updateFooterContent } from '../controllers/footerController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getFooterContent);

// Admin route
router.put('/', protect, authorize('admin', 'superadmin'), updateFooterContent);

export default router; 