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

const server = app.listen(port, () => console.log | (`The app is listening on port: ${port}`));

app.get('/', (req, res) => res.sendFile('dist/index.html'));
