const express = require('express');
const router = express.Router();
const MedicalReport = require('../models/MedicalReport');
const { verifyToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get user's medical reports
router.get('/', verifyToken, async (req, res) => {
  try {
    const reports = await MedicalReport.find({ user: req.user.id })
      .populate('doctor', 'name specialization')
      .sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get report by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const report = await MedicalReport.findById(req.params.id)
      .populate('doctor', 'name specialization');
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (report.user.toString() !== req.user.id && req.user.role !== 'doctor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create medical report (doctor or admin)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const report = new MedicalReport({
      ...req.body,
      doctor: req.user.role === 'doctor' ? req.user.id : req.body.doctor
    });
    await report.save();
    await report.populate('doctor', 'name specialization');
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update report (doctor or admin)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'doctor' && req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const report = await MedicalReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    if (req.user.role === 'doctor' && report.doctor.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    const updatedReport = await MedicalReport.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('doctor', 'name specialization');
    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete report (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const report = await MedicalReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;