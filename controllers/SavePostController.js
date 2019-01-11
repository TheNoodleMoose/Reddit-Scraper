const db = require("../models");
const mongoose = require("mongoose");
module.exports = {
  SavePost: function(req, res) {
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
  }
};
