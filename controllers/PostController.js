const db = require("../models");
const mongoose = require("mongoose");
module.exports = {
  FindPost: function(req, res) {
    db.Post.find({ saved: false })
      .then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(function(err) {
        res.json(err);
      });
  }
};
