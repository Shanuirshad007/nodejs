const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, password, role });
    res.status(201).json({ 
      id: user._id, 
      username: user.username, 
      role: user.role, 
      token: generateToken(user) 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ 
      id: user._id, 
      username: user.username, 
      role: user.role, 
      token: generateToken(user) 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
