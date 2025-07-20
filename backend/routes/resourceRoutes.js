import express from 'express';
import { getAllResources, createResource, updateResource, deleteResource } from '../controllers/resourceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAllResources);

// Admin routes
router.post('/', protect, authorize('admin', 'superadmin'), createResource);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateResource);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteResource);

export default router; 