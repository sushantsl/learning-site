import express from 'express';
import MongoClient from 'mongodb';

const app = express();
const port = 4000;
const mongoUsername = 'admin';
const mongoPwd = 'admin123'
const mongoUrl = `mongodb+srv://${mongoUsername}:${mongoPwd}@cluster0-hcing.mongodb.net/test?retryWrites=true&w=majority`;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let client;
let db;

MongoClient.connect(mongoUrl, mongoOptions)
    .then((connection) => {
        client = connection;
        db = client.db("learning");
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error(`Could not connect to MongoDB- ${err}`);
    })

app.get('/courses', (req, res) => {
    console.log(`Received request on courses`);
    const collection = db.collection('courses');
    collection.find({}).toArray()
        .then((courses) => {
            console.log(`Found the following records ${JSON.stringify(courses, null, 2)}`);
            res.send(courses);
            client.close();
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            client.close();
        });
});

app.listen(port, () => console.log(`Learning Site - Server listening on port ${port}`));