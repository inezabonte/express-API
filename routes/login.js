const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

router.get("/", (req, res) => {
  res.send("You are on the login page");
});

//when the user tries to login
router.post("/", loginController.login);

module.exports = router;
