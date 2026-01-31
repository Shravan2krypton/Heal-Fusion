const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function testConnection() {
  try {
    console.log('Creating MongoDB Memory Server...');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log('MongoDB URI:', mongoUri);

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    await mongoose.connection.close();
    await mongoServer.stop();
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

testConnection();