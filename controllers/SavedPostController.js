const db = require("../models");
const mongoose = require("mongoose");
module.exports = {
  FindSavedPost: function(req, res) {
    db.Post.find({ saved: true }, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  }
};
