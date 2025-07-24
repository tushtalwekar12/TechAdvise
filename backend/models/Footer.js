import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  label: String,
  url: String,
}, { _id: false });

const socialSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String
}, { _id: false });

const footerSchema = new mongoose.Schema({
  copyright: { type: String, default: '' },
  links: [linkSchema],
  social: [socialSchema],
}, { timestamps: true });

export default mongoose.model('Footer', footerSchema); 