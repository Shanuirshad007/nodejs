const BlogPost = require('../models/Blog');

// Get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
};

// Get single post
exports.getPostById = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

// Create post
exports.createPost = async (req, res) => {
    try {
      const newPost = new BlogPost(req.body);
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Update post
exports.updatePost = async (req, res) => {
    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // <- important to trigger validation
      );
      if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Delete post
exports.deletePost = async (req, res) => {
  const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
  if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted successfully' });
};
