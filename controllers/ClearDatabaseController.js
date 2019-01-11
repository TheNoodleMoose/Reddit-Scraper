const db = require("../models");
const mongoose = require("mongoose");
module.exports = {
  ClearDB: function(req, res) {
    db.Post.deleteMany({})
      .then(dbPost => {
        res.json("Database Wiped");
      })
      .catch(err => {
        res.json(err);
      });
  }
};
