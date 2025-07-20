import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema); 