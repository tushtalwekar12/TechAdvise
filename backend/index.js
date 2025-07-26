import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import path from 'path';
import { fileURLToPath } from 'url';

import hpp from 'hpp'
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
// import testimonialRoutes from './routes/testimonialRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import rateLimit from 'express-rate-limit';
import mcache from 'memory-cache';
import servicePageRoutes from './routes/servicePageRoutes.js';
import aboutPageRoutes from './routes/aboutPageRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import highlightRoutes from './routes/highlightRoutes.js';
import heroSectionRoutes from './routes/heroSectionRoutes.js';
import contactInfoRoutes from './routes/contactInfoRoutes.js';
import footerRoutes from './routes/footerRoutes.js';
import faqRoutes from './routes/faqRoutes.js';


dotenv.config();
connectDB();

const app = express();
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https:", "wss:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://techadvise.in', 'https://www.techadvise.in'] 
    : 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Security middlewares
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Cache middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: logger.stream }));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/quotes', quoteRoutes);
// app.use('/api/testimonials', testimonialRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/service-page', servicePageRoutes);
app.use('/api/about-page', aboutPageRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/hero-section', heroSectionRoutes);
app.use('/api/footer-content', footerRoutes);
app.use('/api/faqs', faqRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'API is running successfully',
      version: '1.0.0',
      environment: process.env.NODE_ENV
    });
  });

// Serve static frontend files with caching
app.use(express.static(path.join(__dirname, 'frontend', 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Aggressive caching for static assets
    if (path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.jpg') || 
        path.endsWith('.png') || path.endsWith('.ico') || path.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // For other static files
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Handle all other routes (React Router fallback)
app.get('/*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Central Error Handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Different error responses for development and production
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } else {
    // Production: don't leak error details
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.isOperational ? err.message : 'Something went wrong!'
    });
  }
});

// Server with graceful shutdown
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful shutdown handling
const gracefulShutdown = () => {
  server.close(async () => {
    logger.info('HTTP server closed');
    try {
      // Close database connection
      await mongoose.connection.close();
      logger.info('MongoDB connection closed');
      process.exit(0);
    } catch (err) {
      logger.error('Error during graceful shutdown:', err);
      process.exit(1);
    }
  });

  // Force close if graceful shutdown fails
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message, err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});  

