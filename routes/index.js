import express from "express";
import verify from "../middlewares/auth";
import { default as blogControl } from "../controllers/blog";
import { default as contactController } from "../controllers/contact";
import { default as dashboardController } from "../controllers/dashboard";
import { default as loginController } from "../controllers/login";

const router = express.Router();

//------------------Landing Page------------------

router.get("/", (req, res) => {
  res.send("This is the homepage");
});

//-------------------------------------------------

//--------------------About Route-----------------
//the default about page
router.get("/about", (req, res) => {
  res.send("You are on the about page");
});

//skills and my work section
router.get("/about/portfolio", (req, res) => {
  res.send("You are on the portfolio page");
});

//--------------------------------------------------

//---------------------Blog Route------------------

//show list of articles
router.get("/blog", blogControl.getArticle);

//new article page
router.get("/blog/newArticle", verify, blogControl.newArticle);

//post a new article
router.post("/blog/newArticle", verify, blogControl.postArticle);

//get a specific post
router.get("/blog/:postId", blogControl.blog_specific);

//posting comments
router.post("/blog/:postId", verify, blogControl.postComments);

//---------------------------------------------------

//--------------------contact route-----------------

//the contact page
router.get("/contact", contactController.contact);

//send a message
router.post("/contact", contactController.postMessage);

//---------------------------------------------------

//---------------------Dashboard Route ----------------

//the main dashboard page
router.get("/dashboard", verify, dashboardController.dashboard);

//profile page on the dashboard
router.get("/dashboard/profile", verify, dashboardController.profile);

//queries page on the dashboard page
router.get("/dashboard/queries", verify, dashboardController.queries);

//-------------------------------------------------------

//---------------------login Route----------------------

router.get("/login", (req, res) => {
  res.send("You are on the login page");
});

//when the user tries to login
router.post("/login", loginController.login);

//------------------------------------------------------

export default router;
