import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String } // icon name or URL
}, { timestamps: true });

export default mongoose.model('Highlight', highlightSchema); 