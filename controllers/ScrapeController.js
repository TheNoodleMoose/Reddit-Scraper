// Require the models
const db = require("../models");
//Require axios
const axios = require("axios");
//Require cheerio
const cheerio = require("cheerio");

module.exports = {
  //When scrape is ran, it goes the the subreddit page for webdevs and scrapes all the articles
  //on the main page. For each article, i assign its title and link to result.title and
  //result.link. We then create a post with the result object we created
  Scrape: function(req, res) {
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
      });
      //We then send back that the post have been scraped
      res.send("Post Scraped");
    });
  }
};
