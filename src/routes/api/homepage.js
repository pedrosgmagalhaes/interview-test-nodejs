const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/test', async (req, res) => {
    return res.status(200).send("Ok");
})

// GET request for homepage feed
router.get('/getFeeds', async (req, res) => {

  // Query to return 10 posts
  const query = await Post.find();

  // Execute the query and handle the result
  await query.exec((err, posts) => {
        if (err) {
            // Handle query error
            return res.status(500).send(err);
        } else {
            // Return the posts to the client
            res.status(200).send(posts);
        }
    });
});

module.exports = router;