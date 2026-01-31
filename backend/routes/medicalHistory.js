const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const { verifyToken } = require('../middleware/auth');

// Get user's medical history
router.get('/', verifyToken, async (req, res) => {
  try {
    const history = await MedicalHistory.findOne({ user: req.user.id }).populate('entries.doctor', 'name email');
    if (!history) {
      const newHistory = new MedicalHistory({ user: req.user.id, entries: [] });
      await newHistory.save();
      return res.json(newHistory);
    }
    res.json(history);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Add entry to medical history
router.post('/entry', verifyToken, async (req, res) => {
  try {
    const { symptoms, diagnosis, treatments, medications, notes } = req.body;
    let history = await MedicalHistory.findOne({ user: req.user.id });
    if (!history) {
      history = new MedicalHistory({ user: req.user.id, entries: [] });
    }
    history.entries.push({
      date: new Date(),
      symptoms: symptoms || [],
      diagnosis: diagnosis || '',
      treatments: treatments || [],
      medications: medications || [],
      notes: notes || ''
    });
    await history.save();
    res.status(201).json(history);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
