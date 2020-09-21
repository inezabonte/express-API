const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

//the contact page
router.get("/", contactController.contact);

//send a message
router.post("/", contactController.postMessage);

module.exports = router;
