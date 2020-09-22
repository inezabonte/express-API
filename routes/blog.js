const express = require("express");
const router = express.Router();
const {
  newArticle,
  postArticle,
  getArticle,
  blog_specific,
} = require("../controllers/blog");
const verify = require("../middlewares/auth");

//show list of articles
router.get("/", getArticle);

//new article page
router.get("/newArticle", verify, newArticle);

//post a new article
router.post("/newArticle", verify, postArticle);

//get a specific post
router.get("/:postId", blog_specific);

module.exports = router;
