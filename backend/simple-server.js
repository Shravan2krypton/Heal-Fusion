const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
  res.end();
});

server.listen(5000, '127.0.0.1', () => {
  console.log('Simple HTTP server running on port 5000');
});