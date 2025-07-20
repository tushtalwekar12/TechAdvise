import { body, validationResult } from 'express-validator';

// Generic validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Contact form validation
export const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),

  handleValidationErrors
];

// Blog validation
export const validateBlog = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Description must be between 10 and 5000 characters'),

  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),

  handleValidationErrors
];

// Subscription validation
export const validateSubscription = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  handleValidationErrors
];

// Internship validation
export const validateInternship = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),

  body('domain')
    .trim()
    .notEmpty().withMessage('Domain is required')
    .isLength({ min: 2, max: 50 }).withMessage('Domain must be between 2 and 50 characters'),

  body('company')
    .trim()
    .notEmpty().withMessage('Company is required')
    .isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters'),

  body('duration')
    .isArray().withMessage('Duration must be an array of numbers')
    .notEmpty().withMessage('Duration is required'),

  body('duration.*')
    .isInt({ min: 1 }).withMessage('Duration values must be positive integers'),

  body('salary')
    .trim()
    .notEmpty().withMessage('Salary is required')
    .isLength({ min: 2, max: 100 }).withMessage('Salary must be between 2 and 100 characters'),

  body('deadline')
    .notEmpty().withMessage('Deadline is required')
    .isISO8601().withMessage('Deadline must be a valid date'),

  body('status')
    .optional()
    .isIn(['Open', 'Closed', 'Pending']).withMessage('Status must be Open, Closed, or Pending'),

  body('urgent')
    .optional()
    .isBoolean().withMessage('Urgent must be a boolean value'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),

  body('requirements')
    .isArray().withMessage('Requirements must be an array of strings')
    .notEmpty().withMessage('Requirements are required'),

  body('requirements.*')
    .trim()
    .notEmpty().withMessage('Requirement cannot be empty')
    .isLength({ min: 2, max: 200 }).withMessage('Requirement must be between 2 and 200 characters'),

  body('benefits')
    .isArray().withMessage('Benefits must be an array of strings')
    .notEmpty().withMessage('Benefits are required'),

  body('benefits.*')
    .trim()
    .notEmpty().withMessage('Benefit cannot be empty')
    .isLength({ min: 2, max: 200 }).withMessage('Benefit must be between 2 and 200 characters'),

  body('image')
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL'),

  handleValidationErrors
];

// Internship status update validation
export const validateInternshipStatusUpdate = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['Open', 'Closed', 'Pending']).withMessage('Status must be Open, Closed, or Pending'),

  handleValidationErrors
]; 