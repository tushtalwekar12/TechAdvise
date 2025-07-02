import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { validateContact } from '../middleware/validation.js';
import {
  submitContact,
  getAllContacts,
  updateContactStatus
} from '../controllers/contactController.js';

const router = express.Router();

// Public routes
router.post('/', validateContact, submitContact);

// Protected routes (admin only)
router.get('/', protect, authorize('admin', 'superadmin'), getAllContacts);
router.patch('/:id/status', protect, authorize('admin', 'superadmin'), updateContactStatus);

export default router;
