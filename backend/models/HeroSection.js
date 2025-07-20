import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String },
  ctaText: { type: String },
  ctaLink: { type: String }
});

export default mongoose.model('HeroSection', heroSectionSchema); 