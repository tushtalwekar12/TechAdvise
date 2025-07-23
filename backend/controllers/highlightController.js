import Highlight from '../models/Highlight.js';

// Get all highlights
export const getAllHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: highlights });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Create a new highlight
export const createHighlight = async (req, res) => {
  try {
    const { title,label, description, icon } = req.body;
    const highlight = new Highlight({ title,label, description, icon });
    await highlight.save();
    res.status(201).json({ success: true, message: 'Highlight created', data: highlight });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update a highlight
export const updateHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!highlight) {
      return res.status(404).json({ success: false, message: 'Highlight not found' });
    }
    res.status(200).json({ success: true, message: 'Highlight updated', data: highlight });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete a highlight
export const deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndDelete(req.params.id);
    if (!highlight) {
      return res.status(404).json({ success: false, message: 'Highlight not found' });
    }
    res.status(200).json({ success: true, message: 'Highlight deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 