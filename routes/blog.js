const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");

//show list of articles
router.get("/", blogController.getArticle);

//new article page
router.get("/newArticle", blogController.newArticle);

//post a new article
router.post("/newArticle", blogController.postArticle);

module.exports = router;
