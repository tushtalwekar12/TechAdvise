import express from "express";
import {
  getHeroSection,
  updateHeroSection,
} from "../controllers/heroSectionController.js";
import { protect, authorize } from "../middleware/auth.js";
import { incrementVisitorCount } from "../controllers/visitorStatsController.js";

const router = express.Router();

// Public route with visitor count increment
router.get("/", incrementVisitorCount, getHeroSection);

// Admin route
router.put("/", protect, authorize("admin", "superadmin"), updateHeroSection);

export default router;
