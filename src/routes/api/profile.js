const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

// GET request for user profile page
router.get('/getUsers', (req, res) => {
  // Retrieve user data from database
  User.findOne({ username: req.query.username }, (err, user) => {
    if (err) return res.status(500).send(err);

    // Retrieve user's posts from database
    Post.find({ author: user._id })
      .sort({ date: -1 })
      .limit(5)
      .exec((err, posts) => {
        if (err) return res.status(500).send(err);

        // Return user data and posts
        return res.send({
          user: {
            username: user.username,
            dateJoined: user.dateJoined,
            postCount: user.postCount,
          },
          posts: posts,
        });
      });
  });
});

module.exports = router;