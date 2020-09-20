const Article = require("../models/articles");
const { articleValidation } = require("./validation");

//retrieve all the articles
module.exports.getArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.json({ message: error });
  }
};

//post a new article
module.exports.postArticle = async (req, res) => {
  //validation
  const { error } = articleValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = new Article({
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
};

//response when visiting the newArticle page
module.exports.newArticle = (req, res) => {
  res.send("This is where you create a new article");
};

//retrieving a specific article
module.exports.blog_specific = async (req, res) => {
  try {
    const post = await Article.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
};
