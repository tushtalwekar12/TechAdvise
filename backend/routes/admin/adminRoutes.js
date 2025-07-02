const express = require('express');
const { addBlog, getSubscriptionEmails } = require('../../services/adminService');

const router = express.Router();

// Route for admin to add a blog
router.post('/blog', async (req, res, next) => {
  try {
    const blog = await addBlog(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
});

// Route for admin to get subscription user email IDs
router.get('/subscriptions', async (req, res, next) => {
  try {
    const emails = await getSubscriptionEmails();
    res.status(200).json({ success: true, data: emails });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
