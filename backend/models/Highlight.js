import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  label :{type: String},
  description: { type: String },
  icon: { type: String } // icon name or URL
}, { timestamps: true });

export default mongoose.model('Highlight', highlightSchema); 