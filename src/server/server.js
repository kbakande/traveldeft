const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure a pointer to static file
app.use(express.static("dist"));

// configure the port
const port = 8080;

const server = app.listen(port, () => console.log | (`The app is listening on port ${port}`));

app.get('/', (req, res) => res.sendFile('dist/index.html'));





// Setup empty JS object to act as endpoint for all routes
projectData = {};

// // load environment variables
// require('dotenv').config();
// const baseUrl = "api.openweathermap.org/data/2.5/weather?";
// const api = process.env.OPENWEATHER;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000; //create port variable

const server = app.listen(port, () => console.log(`The app is running on port: ${port}`));

// add a get route for data return
app.get('/getData', (req, res) => res.send(projectData));

// add a post route to add data
app.post('/postData', (req, res) => {
    projectData["temperature"] = req.body.temperature;
    projectData["date"] = req.body.date;
    projectData['user response'] = req.body["user response"];
    res.send("Data has been added");
});