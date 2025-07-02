import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { validateInternship } from '../middleware/validation.js';
import {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  toggleInternshipStatus
} from '../controllers/internshipController.js';

const router = express.Router();

// Public routes
router.get('/', getAllInternships);
router.get('/:id', getInternshipById);

// Protected routes (admin and superadmin only)
router.post('/', protect, authorize('admin', 'superadmin'), validateInternship, createInternship);
router.put('/:id', protect, authorize('admin', 'superadmin'), validateInternship, updateInternship);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteInternship);
router.patch('/:id/toggle', protect, authorize('admin', 'superadmin'), toggleInternshipStatus);

export default router;
