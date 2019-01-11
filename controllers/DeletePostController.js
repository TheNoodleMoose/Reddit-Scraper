const db = require("../models");
const mongoose = require("mongoose");
module.exports = {
  DeletePost: function(req, res) {
    db.Post.findByIdAndDelete(req.params.id, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json("Post Deleted");
      }
    });
  }
};
