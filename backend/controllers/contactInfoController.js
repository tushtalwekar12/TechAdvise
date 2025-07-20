import ContactInfo from '../models/ContactInfo.js';

export const getContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) info = await ContactInfo.create({});
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(req.body);
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.status(200).json({ success: true, message: 'Contact info updated', data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 