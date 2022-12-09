const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]{1,14}$/
  },
  dateJoined: {
    type: Date,
    required: true,
  },
  postCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;