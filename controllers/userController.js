const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '7d' });
};

// exports.registerUser = async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     const userExists = await User.findOne({ username });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const user = await User.create({ username, password, role });
//     res.status(201).json({ 
//       id: user._id, 
//       username: user.username, 
//       role: user.role, 
//       token: generateToken(user) 
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Check if an admin already exists
    const adminExists = await User.findOne({ role: "Admin" });

    let assignedRole = "Subscriber"; // Default role
    if (role === "Admin" && !adminExists) {
      assignedRole = "Admin"; // Allow only if no admin exists
    } else if (role === "Editor") {
      assignedRole = "Subscriber"; // Prevent self-assigning Editor role
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role: assignedRole });

    const token = jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });

    res.status(201).json({
      id: user._id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
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
