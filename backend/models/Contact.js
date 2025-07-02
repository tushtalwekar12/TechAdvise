import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new',
    index: true
  }
});

// Create indexes
contactSchema.index({ email: 1 });
contactSchema.index({ submittedAt: -1 });

// Add pre-save middleware for additional validation
contactSchema.pre('save', function(next) {
  // Trim all string fields
  this.name = this.name.trim();
  this.email = this.email.trim().toLowerCase();
  this.message = this.message.trim();
  next();
});

export default mongoose.model('Contact', contactSchema);
