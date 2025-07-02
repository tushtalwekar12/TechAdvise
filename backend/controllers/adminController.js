const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Create new admin (super admin only)
exports.createAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    const admin = await Admin.create({
      email,
      password,
      role,
      createdBy: req.admin._id
    });

    res.status(201).json({
      success: true,
      data: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const contactCount = await Contact.countDocuments();
    const newsletterCount = await Subscription.countDocuments();
    const blogCount = await Blog.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        contactCount,
        newsletterCount,
        blogCount
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 