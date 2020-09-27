import Article from "../models/articles";
import Comments from "../models/comments";
import { articleValidation, commentValidation } from "./validation";
import { uploadImage } from "./uploadImage";

//retrieve all the articles
const getArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//post a new article
const postArticle = async (req, res) => {
  // upload image
  if (!req.files) return res.status(400).send("Image cannot be empty");
  const coverImage = await uploadImage(req.files.coverImage);
  if (coverImage == undefined)
    return res.status(400).send("coverImage cannot be empty");
  req.body.coverImage = coverImage;

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
    res.status(201).json(savedArticle);
  } catch (err) {
    res.send(err.message);
  }
};

//response when visiting the newArticle page
const newArticle = (req, res) => {
  res.status(200).send("This is where you create a new article");
};

//retrieving a specific article
const blog_specific = async (req, res) => {
  try {
    let jsonArray = {};
    jsonArray.post = await Article.find({ _id: req.params.postId });
    jsonArray.comments = await Comments.find({ blogId: req.params.postId });
    res.status(200).json(jsonArray);
  } catch (error) {
    res.status(404).json("Article not found");
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
    res.status(200).send("Comment has been posted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getArticle,
  postArticle,
  newArticle,
  blog_specific,
  postComments,
};
