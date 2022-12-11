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

router.get('/getFeeds', async (req, res) => {
    // Retrieve query parameters from the request
    const { onlyMine, startDate, endDate } = req.query;

    // Create the base query that returns 10 posts by default
    let query = Post.find().limit(10);

    // If onlyMine is truthy and req.user is defined, add a condition to the query to only return posts written by the current user
    if (onlyMine && req.user) {
        query = query.where('user', req.user._id);
    }

    // If startDate is provided, add a condition to the query to only return posts posted after the start date
    if (startDate) {
        query = query.where('date').gte(startDate);
    }

    // If endDate is provided, add a condition to the query to only return posts posted before the end date
    if (endDate) {
        query = query.where('date').lte(endDate);
    }

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

// POST request for creating a post
router.post('/createPost', async (req, res) => {
    console.log(req.body);
    // Check if the user has reached the daily post limit
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const userPostCount = await Post.countDocuments({ user: req.body.user, date: { $gte: startOfToday } });

    if (userPostCount >= 5) {
        return res.status(400).send({ error: 'You have reached the daily post limit.' });
    }

    // Create a new post
    const post = new Post({
        content: req.body.content,
        user: req.body.user,
        type: req.body.type
    });

    // Save the post to the database
    try {
        const savedPost = await post.save();
        return res.status(200).send(savedPost);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error occurred while creating the post.');
    }
});

module.exports = router;