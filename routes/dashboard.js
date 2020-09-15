const express = require("express");
const router = express.Router();

//the main dashboard page
router.get("/", (req, res) => {
  res.send("You are on the dashnoard page");
});

//profile page on the dashboard
router.get("/profile", (req, res) => {
  res.send("You are on the profile page");
});

//queries page on the dashboard page
router.get("/queries", (req, res) => {
  res.send("You are on the queries page");
});

module.exports = router;
