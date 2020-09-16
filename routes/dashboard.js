const express = require("express");
const router = express.Router();
const Messages = require("../models/contact");

//the main dashboard page
router.get("/", (req, res) => {
  res.send("You are on the dashboard page");
});

//profile page on the dashboard
router.get("/profile", (req, res) => {
  res.send("You are on the profile page");
});

//queries page on the dashboard page
router.get("/queries", async (req, res) => {
  try {
    const messages = await Messages.find();
    res.json(messages);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
