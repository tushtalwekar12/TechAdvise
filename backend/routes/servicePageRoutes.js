import express from 'express';
import { getServicePageContent, updateServicePageContent } from '../controllers/servicePageController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getServicePageContent);

// Admin route
router.put('/', protect, authorize('admin', 'superadmin'), updateServicePageContent);

export default router; 