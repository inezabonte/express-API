import Article from "../models/articles";
import Comments from "../models/comments";
import { articleValidation, commentValidation } from "./validation";
import { uploadImage } from "./uploadImage";

//retrieve all the articles
const getArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.json({ message: error });
  }
};

//post a new article
const postArticle = async (req, res) => {
  //upload the coverImage to cloudinary
  if (req.files) {
    try {
      let coverImage = await uploadImage(req.files.coverImage);
      req.body.coverImage = coverImage;
    } catch (error) {
      res.json({ error });
    }
  } else {
    res.send("coverImage is required");
  }

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
    res.send(err.message);
  }
};

//response when visiting the newArticle page
const newArticle = (req, res) => {
  res.send("This is where you create a new article");
};

//retrieving a specific article
const blog_specific = async (req, res) => {
  try {
    let jsonArray = {};
    jsonArray.post = await Article.find({ _id: req.params.postId });
    jsonArray.comments = await Comments.find({ blogId: req.params.postId });
    res.json(jsonArray);
  } catch (error) {
    res.json({ message: error });
  }
};

//posting comments to an article
const postComments = async (req, res) => {
  const { error } = commentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = new Comments({
    name: req.body.name,
    discussion: req.body.discussion,
    blogId: req.params.postId,
  });

  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (error) {
    res.send(error.message);
  }
};

export default {
  getArticle,
  postArticle,
  newArticle,
  blog_specific,
  postComments,
};
