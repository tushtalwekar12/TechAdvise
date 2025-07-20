import Footer from '../models/Footer.js';

// Get the footer content (public)
export const getFooterContent = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    res.status(200).json({ success: true, data: footer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update the footer content (admin)
export const updateFooterContent = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create(req.body);
    } else {
      Object.assign(footer, req.body);
      await footer.save();
    }
    res.status(200).json({ success: true, message: 'Footer updated', data: footer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 