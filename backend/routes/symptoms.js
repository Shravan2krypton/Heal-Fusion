const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');
const { verifyToken } = require('../middleware/auth');

// Simple symptom parsing endpoint. Accepts { text: "..." } or { symptoms: [..] }
router.post('/parse', verifyToken, async (req, res) => {
  try {
    let symptoms = [];
    if (req.body.symptoms && Array.isArray(req.body.symptoms)) {
      symptoms = req.body.symptoms.map(s => String(s).toLowerCase().trim());
    } else if (req.body.text) {
      const raw = String(req.body.text).toLowerCase();
      symptoms = raw.split(/,|and|\/|\\n/).map(s => s.trim()).filter(Boolean);
    }

    // find diseases that match any symptom
    const diseases = await Disease.find({});
    console.log('Found diseases:', diseases.length);
    const scored = diseases.map(d => {
      const matchCount = (d.symptoms || []).reduce((acc, s) => acc + (symptoms.includes(s.toLowerCase()) ? 1 : 0), 0);
      const score = matchCount / Math.max(1, (d.symptoms || []).length);
      return {
        disease: d.name,
        matchCount,
        score,
        severity: d.severity,
        causes: d.causes,
        prevention: d.prevention,
        homeRemedies: d.homeRemedies,
        treatments: d.treatments
      };
    }).filter(r => r.matchCount > 0).sort((a,b) => b.score - a.score || b.matchCount - a.matchCount);

    console.log('Scored results:', scored.length);
    res.json({ parsed: symptoms, predictions: scored.slice(0,10) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Analyze symptoms endpoint (public access for symptom analysis)
router.post('/analyze', async (req, res) => {
  try {
    console.log('Symptoms analyze request:', req.body);
    let symptoms = [];
    if (req.body.symptoms && Array.isArray(req.body.symptoms)) {
      symptoms = req.body.symptoms.map(s => String(s).toLowerCase().trim());
    } else if (req.body.text) {
      const raw = String(req.body.text).toLowerCase();
      symptoms = raw.split(/,|and|\/|\\n/).map(s => s.trim()).filter(Boolean);
    }
    console.log('Parsed symptoms:', symptoms);

    // find diseases that match any symptom
    const diseases = await Disease.find({});
    console.log('Found diseases:', diseases.length);
    const scored = diseases.map(d => {
      const matchCount = (d.symptoms || []).reduce((acc, s) => acc + (symptoms.includes(s.toLowerCase()) ? 1 : 0), 0);
      const score = matchCount / Math.max(1, (d.symptoms || []).length);
      return {
        disease: d.name,
        matchCount,
        score,
        severity: d.severity,
        causes: d.causes,
        prevention: d.prevention,
        homeRemedies: d.homeRemedies,
        treatments: d.treatments
      };
    }).filter(r => r.matchCount > 0).sort((a,b) => b.score - a.score || b.matchCount - a.matchCount);

    res.json({ parsed: symptoms, predictions: scored.slice(0,10) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
