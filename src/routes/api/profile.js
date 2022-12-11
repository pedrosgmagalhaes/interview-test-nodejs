const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

// GET request for user profile page
router.get('/getUsers', (req, res) => {
  // Retrieve user data from database
  const username = req.query.username;
  if (!username) return res.status(400).send("Missing required 'username' parameter");

  User.findOne({ username: req.query.username }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send("User not found");

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
            dateJoined: user.dateJoined.toDateString(), // Format date as "Month Day, Year"
            postCount: user.postCount,
          },
          posts: posts,
        });
      });
  });
});

// POST request for adding a new user
router.post('/addUser', (req, res) => {
  // Check if username is valid and unique
  const username = req.body.username;
  if (!username || !username.match(/^[a-zA-Z0-9]{1,14}$/)) return res.status(400).send("Invalid 'username' parameter");
  User.findOne({ username: username }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (user) return res.status(400).send("'username' must be unique");

    // Create new user object
    const newUser = new User({
      username: username,
      dateJoined: new Date(), // Set date joined to current date
      postCount: 0, // Set initial post count to 0
    });

    // Save new user to database
    newUser.save((err) => {
      if (err) return res.status(500).send(err);
      return res.send("User added successfully");
    });
  });
});

module.exports = router;