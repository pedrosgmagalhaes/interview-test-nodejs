const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

const connect = async () => {
    try {
        const client = await mongoose.connect(
            'mongodb://mongodb:27017',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 10000
            }
        );
        const db = client.db('interview-nodejs-db');
        return db;
    } catch (err) {
        console.error(err);
        return err;
    }
};

connect()
    .then(() => {
        console.error("Connection successful");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json);

// Define routes
app.use('/api/homepage', require('./routes/api/homepage'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})