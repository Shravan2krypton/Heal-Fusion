const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Get current doctor's profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Find doctor by user ID
    const doctor = await Doctor.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
    res.json(doctor);
  } catch (err) {
    console.error('Error fetching doctor profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;