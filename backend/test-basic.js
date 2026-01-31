console.log('Testing basic dependencies...');

try {
  const express = require('express');
  console.log('✅ express loaded');
} catch (err) {
  console.error('❌ express failed:', err.message);
}

try {
  const mongoose = require('mongoose');
  console.log('✅ mongoose loaded');
} catch (err) {
  console.error('❌ mongoose failed:', err.message);
}

try {
  const cors = require('cors');
  console.log('✅ cors loaded');
} catch (err) {
  console.error('❌ cors failed:', err.message);
}

try {
  require('dotenv').config();
  console.log('✅ dotenv loaded');
} catch (err) {
  console.error('❌ dotenv failed:', err.message);
}

console.log('Basic dependencies test completed');

const express = require('express');
const app = express();
app.use(require('cors')());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Basic test server running' }));

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Basic server running on port ${PORT}`);
});