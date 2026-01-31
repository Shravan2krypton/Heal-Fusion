const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// List all doctors
router.get('/', verifyToken, async (req, res) => {
  try {
    const doctors = await Doctor.find({})
      .populate('user', 'name email')
      .select('specialization experienceYears qualifications location bio');
    res.json(doctors);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Get specific doctor profile
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
