const express = require('express');
const { registerUser, loginUser, getLoggedInUser } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /me
// @desc    Get current user
// @access  Private
router.get('/me', getLoggedInUser);

module.exports = router;