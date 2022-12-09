const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const connect = async () => {
    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017',
            { useNewUrlParser: true }
        );
        const db = client.db('mydb');
        console.log('Connected to MongoDB');
        return db;
    } catch (err) {
        console.error(err);
        return err;
    }
};

connect()
    .then(() => {
        // Connection successful
    })
    .catch((err) => {
        // Connection failed
        console.error(err);
    });

app.use(express.json());

// Define routes
app.use('/api/homepage', require('./routes/api/homepage'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})