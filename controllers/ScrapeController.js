const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
module.exports = {
  Scrape: function(req, res) {
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
  }
};
