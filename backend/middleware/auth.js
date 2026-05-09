const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token' });
  const token = parts[1];
  if (!process.env.JWT_SECRET) return res.status(500).json({ message: 'JWT_SECRET is not configured' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const userRole = req.user.role;
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(userRole)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { verifyToken, requireRole };
