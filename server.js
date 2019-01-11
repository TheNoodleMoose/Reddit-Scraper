const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/ApiRoutes");

const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(ApiRoutes);

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

app.listen(PORT, () => {
  console.log("Server Is Listening on http://localhost:" + PORT);
});
