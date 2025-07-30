// Visitor Stats Routes: Handles incrementing and fetching daily visitor counts for analytics and admin dashboard.
// POST /api/visitor-stats/increment (public)
// GET /api/visitor-stats (admin dashboard)
import express from "express";
import {
  incrementVisitorCount,
  getVisitorStats,
} from "../controllers/visitorStatsController.js";

const router = express.Router();

// Increment visitor count (public, called on visit)
router.post("/increment", incrementVisitorCount);

// Get all visitor stats (admin dashboard)
router.get("/", getVisitorStats);

export default router;
