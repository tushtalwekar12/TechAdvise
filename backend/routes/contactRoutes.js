import express from 'express';
import {
  submitContact,
  getAllContacts,
  updateContactStatus
} from '../controllers/contactController.js';
import { validateContact } from '../middleware/validation.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Submit contact form (Public)
 * @access  Public
 */
router.post('/', validateContact, submitContact);

/**
 * @route   GET /api/contact
 * @desc    Get all contacts with pagination and search (Admin only)
 * @access  Private (admin, superadmin)
 */
router.get('/', protect, authorize('admin', 'superadmin'), getAllContacts);

/**
 * @route   PATCH /api/contact/:id/status
 * @desc    Update contact status (new, read, replied)
 * @access  Private (admin, superadmin)
 */
router.patch('/:id/status', protect, authorize('admin', 'superadmin'), updateContactStatus);

export default router;
