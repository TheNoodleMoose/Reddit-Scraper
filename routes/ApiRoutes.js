const express = require("express");
const router = express.Router();

const ScrapeController = require("../controllers/ScrapeController");
const Post = require("../controllers/PostController");
const SavedPost = require("../controllers/SavedPostController");
const DeletePost = require("../controllers/DeletePostController");
const ClearDB = require("../controllers/ClearDatabaseController");
const SavePost = require("../controllers/SavePostController");

router.get("/Posts", Post.FindPost);
router.get("/scrape", ScrapeController.Scrape);
router.get("/Posts/Saved", SavedPost.FindSavedPost);
router.post("/Posts/Saved/:id", DeletePost.DeletePost);
router.post("/Clear", ClearDB.ClearDB);
router.post("/Posts/:id", SavePost.SavePost);
module.exports = router;
