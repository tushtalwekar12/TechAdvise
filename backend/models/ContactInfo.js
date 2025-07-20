import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  address: String,
  email: String,
  phone: String,
  mapEmbedUrl: String,
  image: String // Cloudinary URL
});

export default mongoose.model('ContactInfo', contactInfoSchema); 