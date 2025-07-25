import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // URL or path to blog image
    required: false,
  },
  author:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Blog', blogSchema);
