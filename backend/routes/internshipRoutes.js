import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { validateInternship, validateInternshipStatusUpdate } from '../middleware/validation.js';
import {
  createInternship,
  getAllInternships,
  getActiveInternships,
  getInternshipsByStatus,
  getInternshipsByDomain,
  getUrgentInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  toggleInternshipStatus,
  updateInternshipStatus,
  toggleUrgentStatus
} from '../controllers/internshipController.js';

const router = express.Router();

// Public routes
router.get('/', getAllInternships);
router.get('/active', getActiveInternships);
router.get('/status/:status', getInternshipsByStatus);
router.get('/domain/:domain', getInternshipsByDomain);
router.get('/urgent', getUrgentInternships);
router.get('/:id', getInternshipById);

// Protected routes (admin and superadmin only)
router.post('/', protect, authorize('admin', 'superadmin'), validateInternship, createInternship);
router.put('/:id', protect, authorize('admin', 'superadmin'), validateInternship, updateInternship);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteInternship);
router.patch('/:id/toggle', protect, authorize('admin', 'superadmin'), toggleInternshipStatus);
router.patch('/:id/status', protect, authorize('admin', 'superadmin'), validateInternshipStatusUpdate, updateInternshipStatus);
router.patch('/:id/urgent', protect, authorize('admin', 'superadmin'), toggleUrgentStatus);

export default router;
