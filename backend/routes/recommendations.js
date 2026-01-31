const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Disease = require('../models/Disease');
const { verifyToken } = require('../middleware/auth');

// Return recommended doctors based on parsed symptoms or predictions
router.post('/', verifyToken, async (req, res) => {
  try {
    const { symptoms = [], predictions = [] } = req.body;
    const symptomTokens = (Array.isArray(symptoms) ? symptoms : []).map(s => String(s).toLowerCase());
    const predictedNames = (Array.isArray(predictions) ? predictions : []).map(p => (p.disease || p).toString().toLowerCase());

    const doctors = await Doctor.find({}).populate('user', 'name email');

    const scored = doctors.map(d => {
      const specs = (d.specialization || []).map(s => s.toLowerCase());
      let score = 0;
      // match specializations to predicted disease names
      for (const p of predictedNames) {
        for (const s of specs) {
          if (p.includes(s) || s.includes(p)) score += 3;
        }
      }
      // match specializations to symptom tokens
      for (const t of symptomTokens) {
        for (const s of specs) {
          if (s.includes(t) || t.includes(s)) score += 1;
        }
      }
      // experience bonus
      score += (d.experienceYears || 0) * 0.1;
      return { doctor: d, score };
    }).filter(x => x.score > 0).sort((a,b) => b.score - a.score);

    const result = scored.slice(0, 10).map(s => ({
      id: s.doctor._id,
      name: s.doctor.user?.name || 'Unknown',
      email: s.doctor.user?.email,
      specialization: s.doctor.specialization,
      experienceYears: s.doctor.experienceYears,
      score: s.score
    }));

    res.json({ recommendations: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
