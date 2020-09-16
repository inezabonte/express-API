const express = require("express");
const router = express.Router();
const Message = require("../models/contact");

//the contact page
router.get("/", (req, res) => {
  res.send("This is the contact page");
});

//send a message
router.post("/", async (req, res) => {
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const savedMessage = await message.save();
    res.json(savedMessage);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
