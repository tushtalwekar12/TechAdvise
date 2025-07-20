import express from 'express';
import { getContactInfo, updateContactInfo } from '../controllers/contactInfoController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
router.get('/', getContactInfo);
router.put('/', protect, authorize('admin', 'superadmin'), updateContactInfo);

export default router; 