const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/test', (req, res) => {
    try {
        return res.status(200).send("Working");
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error occurred while handling the request.');
    }
});

// // GET request for homepage feed
router.get('/getFeeds', async (req, res) => {

    // Query to return 10 posts
    const query = Post.find().limit(10);

    // Execute the query and handle the result
    query.exec((err, posts) => {
        if (err) {
            // Handle query error
            console.error(err);
            return res.status(500).send('Error querying the database.');
        } else {
            // Return the posts to the client
            res.status(200).send(posts);
        }
    });
});

module.exports = router;