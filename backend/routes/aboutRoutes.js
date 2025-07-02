// routes/aboutRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'About page data' });
});

module.exports = router;
