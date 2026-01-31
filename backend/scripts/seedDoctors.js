const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

async function seed(){
  let mongoServer;
  try {
    mongoServer = await MongoMemoryServer.create();
    const MONGO_URI = mongoServer.getUri();
    await mongoose.connect(MONGO_URI);
  console.log('connected');

  // create sample doctor users
  const doctors = [
    { name: 'Dr. Alice Kumar', email: 'alice@example.com', password: 'password', specialization: ['general medicine','infectious disease'], experienceYears: 8, qualifications: 'MD' },
    { name: 'Dr. Bob Singh', email: 'bob@example.com', password: 'password', specialization: ['neurology','migraine'], experienceYears: 12, qualifications: 'MD' },
    { name: 'Dr. Carol Rao', email: 'carol@example.com', password: 'password', specialization: ['pediatrics','general medicine'], experienceYears: 5, qualifications: 'MBBS' }
  ];

  for (const d of doctors) {
    let user = await User.findOne({ email: d.email });
    if (!user) {
      const hash = await bcrypt.hash(d.password, 10);
      user = new User({ name: d.name, email: d.email, password: hash, role: 'doctor' });
      await user.save();
      console.log('created user', d.email);
    }
    let doc = await Doctor.findOne({ user: user._id });
    if (!doc) {
      doc = new Doctor({ user: user._id, specialization: d.specialization, experienceYears: d.experienceYears, qualifications: d.qualifications });
      await doc.save();
      console.log('created doctor profile for', d.email);
    }
  }
    console.log('doctor seeding complete');
  } finally {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
    process.exit(0);
  }
}

seed().catch(err=>{ console.error(err); process.exit(1); });
