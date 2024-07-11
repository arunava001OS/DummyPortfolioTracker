//packages
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");

require('dotenv').config();

// custom modules
const routes = require('./routes/routes');

//DB Connection
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Server start
const app = express();
app.use(bodyParser.json()) // body parse new inclusion
app.use('/api', routes);
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});