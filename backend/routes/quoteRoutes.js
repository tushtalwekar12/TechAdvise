import express from 'express';
import { body } from 'express-validator';
import {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote
} from '../controllers/quoteController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('service').notEmpty().withMessage('Service type is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  createQuote
);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/', getQuotes);
router.get('/:id', getQuote);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

export default router;
