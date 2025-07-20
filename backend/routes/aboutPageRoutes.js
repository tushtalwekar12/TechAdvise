import express from 'express';
import { getAboutPageContent, updateAboutPageContent } from '../controllers/aboutPageController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAboutPageContent);

// Admin route
router.put('/', protect, authorize('admin', 'superadmin'), updateAboutPageContent);

export default router; 