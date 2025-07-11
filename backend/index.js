import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import rateLimit from 'express-rate-limit';
import mcache from 'memory-cache';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cors());

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
app.use('/api/quotes', quoteRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'API is running successfully',
      version: '1.0.0',
      environment: process.env.NODE_ENV
    });
  });

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

const cache = duration => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl;
    const cachedBody = mcache.get(key);
    
    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    
    res.sendResponse = res.send;
    res.send = body => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
};

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
