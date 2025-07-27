import Quote from '../models/Quote.js';

// Create a new quote
export const createQuote = async (req, res) => {
  try {
    const { name, phone, email, message, service } = req.body;

    if (!name || !phone || !email || !service) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, email, and service are required.',
      });
    }

    const quote = await Quote.create({ name, phone, email, message, service });

    res.status(201).json({
      success: true,
      data: quote,
      message: 'Quote submitted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all quotes (admin usage)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found',
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a quote
export const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
