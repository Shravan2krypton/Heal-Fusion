const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Disease = require('../models/Disease');
const Consultation = require('../models/Consultation');
const { verifyToken, requireRole } = require('../middleware/auth');

// Get admin statistics
router.get('/stats', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const [totalUsers, totalDoctors, totalConsultations, totalDiseases] = await Promise.all([
      User.countDocuments({}),
      Doctor.countDocuments({}),
      Consultation.countDocuments({}),
      Disease.countDocuments({})
    ]);
    res.json({ totalUsers, totalDoctors, totalConsultations, totalDiseases });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Get all doctors (admin only)
router.get('/doctors', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const doctors = await Doctor.find({}).populate('user', 'name email');
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all diseases (admin only)
router.get('/diseases', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const diseases = await Disease.find({});
    res.json(diseases);
  } catch (err) {
    console.error('Error fetching diseases:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add disease (admin only)
router.post('/diseases', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { name, description, severity } = req.body;
    if (!name) return res.status(400).json({ message: 'Disease name is required' });

    const disease = new Disease({
      name,
      description: description || '',
      severity: severity || 'medium'
    });

    await disease.save();
    res.status(201).json(disease);
  } catch (err) {
    console.error('Error adding disease:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role (admin only)
router.patch('/:id/role', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const valid = ['user', 'doctor', 'admin'];
    if (!valid.includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
