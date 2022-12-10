const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 777
  },
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['original', 'repost', 'quote']
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;