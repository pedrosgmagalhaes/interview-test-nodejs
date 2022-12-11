const express = require('express');
const mongoose = require('mongoose');
const app = express();

const homeRoutes = require("./routes/api/homepage");
const profileRoutes = require("./routes/api/profile");

const connect = async () => {
    try {
        return await mongoose.connect(
            'mongodb://mongodb:27017/interview-nodejs-db'
        );
    } catch (err) {
        console.error(err);
        return err;
    }
};

app.use(express.json());

// log errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use('/api/*', function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Define routes
app.use('/api/homepage', homeRoutes);
app.use('/api/profile', profileRoutes);

connect()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server Started at ${3000}`)
        })
    })
    .catch((err) => {
        console.error(err);
    });