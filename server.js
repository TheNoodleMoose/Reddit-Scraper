const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// ================================================ //
//                  ROUTES                         //
// ===============================================//

app.get("/scrape", (req, res) => {
  let results = [];
  axios.get("https://www.reddit.com/r/webdev/").then(function(response) {
    const $ = cheerio.load(response.data);

    $("div.imors3-1").each(function(i, element) {
      var result = {};

      result.title = $(element)
        .children()
        .find("h2")
        .text();
      result.link = `https://www.reddit.com${$(element)
        .find("a")
        .attr("href")}`;

      db.Post.create(result)
        .then(function(dbPost) {
          // View the added result in the console
          console.log(dbPost);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });

      results.push(result);
    });

    res.send("Post Scraped");
  });
});
app.get("/Posts", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.Post.find({ saved: false })
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function(err) {
      res.json(err);
    });
  // Log any errors if the server encounters one
});

app.get("/Posts/Saved", (req, res) => {
  db.Post.find({ saved: true }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.post("/Posts/Saved/:id", (req, res) => {
  db.Post.findByIdAndDelete(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json("Post Deleted");
    }
  });
});

app.post("/Clear", (req, res) => {
  db.Post.deleteMany({})
    .then(dbPost => {
      res.json("Database Wiped");
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/Posts/:id", (req, res) => {
  console.log(req.params);
  db.Post.findByIdAndUpdate(
    req.params.id,
    { $set: { saved: true } },
    { new: true }
  )
    .populate("note")
    .then(dbPost => {
      res.json("Post Saved");
    })
    .catch(err => {
      res.json(err);
    });
});
/* -/-/-/-/-/-/-/-/-/-/-/-/- */

app.listen(PORT, () => {
  console.log("Server Is Listening on http://localhost:" + PORT);
});
