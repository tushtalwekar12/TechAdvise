import AboutPageContent from '../models/AboutPageContent.js';

// Get the about page content (public)
export const getAboutPageContent = async (req, res) => {
  try {
    let content = await AboutPageContent.findOne();
    if (!content) {
      content = await AboutPageContent.create({});
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update the about page content (admin)
export const updateAboutPageContent = async (req, res) => {
  try {
    let content = await AboutPageContent.findOne();
    if (!content) {
      content = await AboutPageContent.create(req.body);
    } else {
      Object.assign(content, req.body);
      await content.save();
    }
    res.status(200).json({ success: true, message: 'About page content updated', data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 