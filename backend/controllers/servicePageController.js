import ServicePageContent from '../models/ServicePageContent.js';

// Get the service page content (public)
export const getServicePageContent = async (req, res) => {
  try {
    let content = await ServicePageContent.findOne();
    if (!content) {
      // Optionally, create a default document if none exists
      content = await ServicePageContent.create({});
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update the service page content (admin)
export const updateServicePageContent = async (req, res) => {
  try {
    let content = await ServicePageContent.findOne();
    if (!content) {
      content = await ServicePageContent.create(req.body);
    } else {
      Object.assign(content, req.body);
      await content.save();
    }
    res.status(200).json({ success: true, message: 'Service page content updated', data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 