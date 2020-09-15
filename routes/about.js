const express = require("express");
const router = express.Router();

//the default about page
router.get("/", (req, res) => {
  res.send("You are on the about page");
});

//skills and my work section
router.get("/portfolio", (req, res) => {
  res.send("You are on the portfolio page");
});

module.exports = router;
