const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('Starting minimal server test...');

const app = express();
app.use(cors());
app.use(express.json());

console.log('Testing route imports...');

try {
  const authRoutes = require('./routes/auth');
  console.log('✅ auth routes loaded');
} catch (err) {
  console.error('❌ auth routes failed:', err.message);
}

try {
  const userRoutes = require('./routes/user');
  console.log('✅ user routes loaded');
} catch (err) {
  console.error('❌ user routes failed:', err.message);
}

try {
  const symptomsRoutes = require('./routes/symptoms');
  console.log('✅ symptoms routes loaded');
} catch (err) {
  console.error('❌ symptoms routes failed:', err.message);
}

try {
  const doctorRoutes = require('./routes/doctor');
  console.log('✅ doctor routes loaded');
} catch (err) {
  console.error('❌ doctor routes failed:', err.message);
}

try {
  const contactRoutes = require('./routes/contact');
  console.log('✅ contact routes loaded');
} catch (err) {
  console.error('❌ contact routes failed:', err.message);
}

console.log('All route imports completed');

app.get('/', (req, res) => res.json({ message: 'HealFusion backend running' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Minimal server running on port ${PORT}`);
});