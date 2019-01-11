// Require the models folder
const db = require("../models");

module.exports = {
  // When ClearDB is ran we find all the post and delete everything
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
