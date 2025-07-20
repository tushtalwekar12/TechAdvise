import express from 'express';
import { getHeroSection, updateHeroSection } from '../controllers/heroSectionController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getHeroSection);

// Admin route
router.put('/', protect, authorize('admin', 'superadmin'), updateHeroSection);

export default router; 