const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


router.get('/test', (req, res) => {
    return res.status(200).send("Works");
})

// GET request for homepage feed
router.get('/getFeeds', (req, res) => {
    // Parse query parameters for filtering options
    let filter = {};
    if (req.query.mine) filter.author = req.user._id;
    if (req.query.startDate) filter.date = { $gte: req.query.startDate };
    if (req.query.endDate) filter.date = { ...filter.date, $lte: req.query.endDate };

    // Fetch 10 latest posts from database
    Post.find(filter)
        .sort({ date: -1 })
        .limit(10)
        .exec((err, posts) => {
            if (err) return res.status(500).send(err);
            // Send posts back to client
            res.status(200).send(posts);
        });
});

module.exports = router;