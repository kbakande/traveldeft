const app = require("./server.js");
// const allWeatherData = {};

// configure the port
const port = 8081;

const server = app.listen(port, () => console.log(`The app is listening on port: ${port}`));