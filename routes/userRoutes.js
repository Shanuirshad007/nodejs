const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware");
const { updateUserInfo } = require('../controllers/userController');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put("/me", protect, updateUserInfo);

module.exports = router;
