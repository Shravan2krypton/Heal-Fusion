const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Minimal server running' }));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Minimal server running on port ${PORT}`);
});