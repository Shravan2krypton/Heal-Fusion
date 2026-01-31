// Input validation middleware
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateRequired = (value) => {
  return value && String(value).trim().length > 0;
};

const validateAuth = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!validateRequired(name)) return res.status(400).json({ message: 'Name is required' });
  if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email format' });
  if (!validatePassword(password)) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  if (role && !['user','doctor','admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  next();
};

module.exports = { validateAuth, validateEmail, validatePassword, validateRequired };
