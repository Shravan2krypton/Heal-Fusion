const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Test server running' });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Test server running on port 5000');
});