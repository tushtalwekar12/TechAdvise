import VisitorStats from "../models/VisitorStats.js";

// Increment visitor count for today
export const incrementVisitorCount = async (req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    let stats = await VisitorStats.findOne({ date: today });
    if (stats) {
      stats.count += 1;
      await stats.save();
    } else {
      stats = new VisitorStats({ date: today, count: 1 });
      await stats.save();
    }
    next && next();
  } catch (error) {
    next ? next(error) : res.status(500).json({ error: "Server error" });
  }
};

// Get all visitor stats (for admin dashboard)
export const getVisitorStats = async (req, res) => {
  try {
    const stats = await VisitorStats.find().sort({ date: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
