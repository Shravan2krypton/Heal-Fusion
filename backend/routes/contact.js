const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Send contact message
router.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message, category, phone, priority } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // In a real application, you would send an email here
    // For now, we'll just log the message and return success
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      category,
      phone,
      priority,
      timestamp: new Date().toISOString()
    });

    res.json({
      message: 'Message sent successfully! We will get back to you within 24 hours.',
      success: true
    });
  } catch (err) {
    console.error('Error sending contact message:', err);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;