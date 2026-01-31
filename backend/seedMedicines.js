const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Medicine = require('./models/Medicine');
require('dotenv').config();

async function seedMedicines() {
  let mongoServer;
  try {
    // Use in-memory MongoDB for development
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    console.log('Connected to in-memory MongoDB');

    // Sample medicines data
    const medicines = [
      {
        name: 'Paracetamol',
        description: 'Pain reliever and fever reducer',
        category: 'painkiller',
        type: 'modern',
        price: 50,
        stock: 100,
        manufacturer: 'Generic',
        dosage: '500mg',
        sideEffects: ['Nausea', 'Skin rash'],
        indications: ['Fever', 'Headache', 'Body pain'],
        contraindications: ['Liver disease']
      },
      {
        name: 'Amoxicillin',
        description: 'Antibiotic for bacterial infections',
        category: 'antibiotic',
        type: 'modern',
        price: 120,
        stock: 50,
        manufacturer: 'Generic',
        dosage: '500mg',
        sideEffects: ['Diarrhea', 'Nausea'],
        indications: ['Ear infections', 'Urinary tract infections'],
        contraindications: ['Penicillin allergy']
      },
      {
        name: 'Ashwagandha',
        description: 'Ayurvedic herb for stress and anxiety',
        category: 'herbal',
        type: 'ayurvedic',
        price: 200,
        stock: 30,
        manufacturer: 'Ayurvedic Labs',
        dosage: '300mg',
        sideEffects: ['Mild stomach upset'],
        indications: ['Stress', 'Anxiety', 'Insomnia'],
        contraindications: ['Pregnancy']
      },
      {
        name: 'Tulsi',
        description: 'Holy basil for immunity and respiratory health',
        category: 'herbal',
        type: 'ayurvedic',
        price: 150,
        stock: 40,
        manufacturer: 'Ayurvedic Labs',
        dosage: '400mg',
        sideEffects: ['Rare allergic reactions'],
        indications: ['Cold', 'Cough', 'Immunity boost'],
        contraindications: ['None known']
      }
    ];

    // Insert medicines
    await Medicine.insertMany(medicines);
    console.log('Medicines seeded successfully');

  } catch (error) {
    console.error('Error seeding medicines:', error);
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('Database connection closed');
  }
}

seedMedicines();