const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const { verifyToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get user's prescriptions
router.get('/', verifyToken, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user: req.user.id })
      .populate('doctor', 'name specialization')
      .populate('medicines.medicine', 'name type dosage')
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get prescription by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('doctor', 'name specialization')
      .populate('medicines.medicine', 'name type dosage');
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    if (prescription.user.toString() !== req.user.id && req.user.role !== 'doctor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create prescription (doctor only)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'doctor') return res.status(403).json({ message: 'Access denied' });

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const prescription = new Prescription({
      ...req.body,
      doctor: req.user.id
    });
    await prescription.save();
    await prescription.populate('doctor', 'name specialization');
    await prescription.populate('medicines.medicine', 'name type dosage');
    res.status(201).json(prescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update prescription (doctor only)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'doctor') return res.status(403).json({ message: 'Access denied' });

  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    if (prescription.doctor.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('doctor', 'name specialization')
      .populate('medicines.medicine', 'name type dosage');
    res.json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;