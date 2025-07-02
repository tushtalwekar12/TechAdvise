// server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // Enable CORS
app.use(helmet()); // Set secure HTTP headers
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(xss()); // Sanitize user input
app.use(morgan('dev')); // Log requests

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running ✅' });
});

// Server Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
