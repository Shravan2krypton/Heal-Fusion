const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const User = require('../models/User');
const { verifyToken, requireRole } = require('../middleware/auth');

// Create consultation request
router.post('/', verifyToken, async (req, res) => {
  try {
    const { doctorId, notes } = req.body;
    if (!doctorId) return res.status(400).json({ message: 'Doctor ID required' });
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') return res.status(400).json({ message: 'Invalid doctor' });
    const consultation = new Consultation({
      patient: req.user.id,
      doctor: doctorId,
      notes: notes || '',
      status: 'pending'
    });
    await consultation.save();
    res.status(201).json(consultation);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Get consultations for logged-in user (patient or doctor)
router.get('/', verifyToken, async (req, res) => {
  try {
    let query;
    if (req.user.role === 'doctor') {
      query = { doctor: req.user.id };
    } else {
      query = { patient: req.user.id };
    }
    const consultations = await Consultation.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name email');
    res.json(consultations);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Get consultations for doctor (alias for compatibility)
router.get('/doctor', verifyToken, requireRole('doctor'), async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctor: req.user.id })
      .populate('patient', 'name email')
      .populate('doctor', 'name email');
    res.json(consultations);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Doctor accept/decline/complete consultation
router.patch('/:id', verifyToken, requireRole('doctor'), async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!valid.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const consultation = await Consultation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(consultation);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
