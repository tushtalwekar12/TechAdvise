import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import hpp from "hpp";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import rateLimit from "express-rate-limit";
import mcache from "memory-cache";
import servicePageRoutes from "./routes/servicePageRoutes.js";
import aboutPageRoutes from "./routes/aboutPageRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import highlightRoutes from "./routes/highlightRoutes.js";
import heroSectionRoutes from "./routes/heroSectionRoutes.js";
import contactInfoRoutes from "./routes/contactInfoRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import visitorStatsRoutes from "./routes/visitorStatsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://techadvise-frontend.onrender.com", // your deployed frontend
      "http://localhost:5173" // local dev
    ],
    credentials: true,
  })
);

app.use(hpp());

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: logger.stream }));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/service-page", servicePageRoutes);
app.use("/api/about-page", aboutPageRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/hero-section", heroSectionRoutes);
app.use("/api/footer-content", footerRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/visitor-stats", visitorStatsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
  });
});

// Serve static frontend files
// app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// // Handle all other routes (React Router fallback)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });
if (process.env.NODE_ENV === "production") {
  // The '..' goes up one level from /backend to the project root
  const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");

  // Serve static files from the React app
  app.use(express.static(frontendDistPath));

  // The "catchall" handler: for any request that doesn't match one above,
  // send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

const cache = (duration) => {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl;
    const cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      return;
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
};

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
