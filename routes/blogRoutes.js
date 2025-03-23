const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.post('/', protect, authorizeRoles('Editor', 'Admin'), blogController.createPost);
router.put('/:id', protect, authorizeRoles('Editor', 'Admin'), blogController.updatePost);
router.delete('/:id', protect, authorizeRoles('Admin'), blogController.deletePost);

module.exports = router;
