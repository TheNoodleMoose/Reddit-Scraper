// Require the models folder
const db = require("../models");

module.exports = {
  //When FindPost is ran, we search the database for all Post thats saved value is false and
  // send it back as json
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
