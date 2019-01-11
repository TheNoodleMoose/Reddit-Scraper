// Require the models folder
const db = require("../models");

module.exports = {
  //When FindSavedPost is ran, we find all the post with a saved value of true and send it
  // back as json
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
