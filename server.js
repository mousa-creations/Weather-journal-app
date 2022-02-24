// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require("cors");
app.use(Cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server and make it listen to the port
const port = 4000;

// Make Spin up the server
app.listen(port, () => {
  console.log(`server is running and listening to port ${port}`);
});

// Callback function to complete GET '/all'
app.get("/all", (request, response) => {
  response.send(projectData);
});

// Post Route
app.post("/add", (req, res) => {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.content = req.body.feelings;
  res.send(projectData);
});
