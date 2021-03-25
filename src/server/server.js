// intialise variable to hold data
const allWeatherData = {};

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure a pointer to static file
app.use(express.static("dist"));

// configure the port
// const port = 8081;

// const server = app.listen(port, () => console.log(`The app is listening on port: ${port}`));

app.get('/', (req, res) => res.sendFile('dist/index.html'));

app.get('/getData', (req, res) => { res.send(allWeatherData["weatherData"]) });

app.post('/postData', (req, res) => {
    allWeatherData["weatherData"] = req.body.data;
    res.send({ success: true });
})

module.exports = app;
