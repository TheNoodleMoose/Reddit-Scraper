// Require express
const express = require("express");
//Define router
const router = express.Router();

// REQUIRE ALL THE CONTROLLERS WE NEED
const ScrapeController = require("../controllers/ScrapeController");
const Post = require("../controllers/PostController");
const SavedPost = require("../controllers/SavedPostController");
const DeletePost = require("../controllers/DeletePostController");
const ClearDB = require("../controllers/ClearDatabaseController");
const SavePost = require("../controllers/SavePostController");

// Define the routes and what to controller to run when that route is hit
router.get("/Posts", Post.FindPost);
router.get("/scrape", ScrapeController.Scrape);
router.get("/Posts/Saved", SavedPost.FindSavedPost);
router.post("/Posts/Saved/:id", DeletePost.DeletePost);
router.post("/Clear", ClearDB.ClearDB);
router.post("/Posts/:id", SavePost.SavePost);
module.exports = router;
