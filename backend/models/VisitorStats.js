import mongoose from "mongoose";

const visitorStatsSchema = new mongoose.Schema({
  date: {
    type: String, // Store as YYYY-MM-DD
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default mongoose.model("VisitorStats", visitorStatsSchema);
