const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters long'],
    },
  });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
