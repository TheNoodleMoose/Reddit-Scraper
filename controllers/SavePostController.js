//Require the models folder
const db = require("../models");

module.exports = {
  // When SavePost is ran, we find a post by its id and update its saved value to true
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
