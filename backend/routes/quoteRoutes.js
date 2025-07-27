import express from 'express';
import { body } from 'express-validator';

import { protect, authorize } from '../middleware/auth.js';
import { createQuote, deleteQuote, getAllQuotes, getQuoteById } from '../controllers/quoteController.js';

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
router.use(authorize('admin', 'superadmin'));

// POST /api/quotes — user submits quote
router.post('/', createQuote);

// GET /api/quotes — admin gets all quotes
router.get('/', getAllQuotes);

// GET /api/quotes/:id — get single quote
router.get('/:id', getQuoteById);

// DELETE /api/quotes/:id — delete quote
router.delete('/:id', deleteQuote);

export default router;
