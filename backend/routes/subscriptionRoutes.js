import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { validateSubscription } from '../middleware/validation.js';
import { createSubscription, getAllSubscriptions } from '../controllers/subscriptionController.js';

const router = express.Router();

// Public route to subscribe
router.post('/', validateSubscription, createSubscription);

// Admin route to get all subscriptions
router.get('/', protect, authorize('admin', 'superadmin'), getAllSubscriptions);

export default router;
