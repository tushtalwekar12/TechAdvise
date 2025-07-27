// models/Quote.js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      enum: ['Web Development', 'App Development', 'SEO', 'Marketing', 'Other'],
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
