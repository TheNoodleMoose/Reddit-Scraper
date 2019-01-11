// Require Express
const express = require("express");
//Require Morgan as logger
const logger = require("morgan");
//Require Mongoose
const mongoose = require("mongoose");
// Require our routes to the our controllers
const ApiRoutes = require("./routes/ApiRoutes");
// Define our port
const PORT = process.env.PORT || 3000;
// Initialize express as app
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// use our routes files to fire off the controllers when we hit the routes
app.use(ApiRoutes);
// Initialize our connection to the our local mongo database or the heroku versions
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//Connect to the database
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);
// Console log when our port is connected
app.listen(PORT, () => {
  console.log("Server Is Listening on http://localhost:" + PORT);
});
