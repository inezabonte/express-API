const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const verify = require("../middlewares/auth");

//show list of articles
router.get("/", blogController.getArticle);

//new article page
router.get("/newArticle", verify, blogController.newArticle);

//post a new article
router.post("/newArticle", verify, blogController.postArticle);

//get a specific post
router.get("/:postId", blogController.blog_specific);

module.exports = router;
