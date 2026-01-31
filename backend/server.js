const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const symptomsRoutes = require('./routes/symptoms');
const recommendationsRoutes = require('./routes/recommendations');
const medicalHistoryRoutes = require('./routes/medicalHistory');
const consultationsRoutes = require('./routes/consultations');
const doctorsRoutes = require('./routes/doctors');
const adminRoutes = require('./routes/admin');
const medicinesRoutes = require('./routes/medicines');
const prescriptionsRoutes = require('./routes/prescriptions');
const medicalReportsRoutes = require('./routes/medicalReports');
const doctorRoutes = require('./routes/doctor');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/symptoms', symptomsRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/medicines', medicinesRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);
app.use('/api/medical-reports', medicalReportsRoutes);

app.get('/', (req, res) => res.json({ message: 'HealFusion backend running' }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healfusion';

// Start server first
const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);

  // Then try to connect to MongoDB
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      console.log('⚠️  Server running without database');
    });
});
