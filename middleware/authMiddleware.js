const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify token and attach user to request
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
};

// Middleware to check user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} not allowed to perform this action` });
    }
    next();
  };
};
