const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
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
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
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
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in environment. Set JWT_SECRET in .env or environment variables.');
  process.exit(1);
}

async function initDb() {
  const options = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 10000 };

  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI, options);
      console.log('✅ MongoDB connected successfully via MONGO_URI');
      return;
    } catch (err) {
      console.error('❌ MONGO_URI connect failed:', err.message);
    }
  } else {
    console.warn('⚠️  No MONGO_URI provided; falling back to in-memory MongoDB');
  }

  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), options);
  console.log('✅ In-memory MongoDB connected successfully');
}

initDb()
  .then(() => {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  });

// 404 & error support
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('🚨 Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});
