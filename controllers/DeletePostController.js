// Require the models folder
const db = require("../models");

module.exports = {
  //When DeletePost is ran, we searh the database by id and delete the post we find
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
