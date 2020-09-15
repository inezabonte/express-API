const express = require("express");
const router = express.Router();
const newArticle = require("../models/articles");

//show list of articles
router.get("/", (req, res) => {
  res.send("This is the blog page");
});

//show the article itself
router.get("/showArticle", (req, res) => {
  res.send("This is where you can read the article itself");
});

//create a new article
router.get("/newArticle", (req, res) => {
  res.send("This is where you create a new article");
});

//post a new article
router.post("/newArticle", async (req, res) => {
  const article = new newArticle({
    title: req.body.title,
    coverImage: req.body.coverImage,
    content: req.body.content,
  });
  try {
    const savedArticle = await article.save();
    res.json(savedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
