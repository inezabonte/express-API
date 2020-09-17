const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

//the main dashboard page
router.get("/", dashboardController.dashboard);

//profile page on the dashboard
router.get("/profile", dashboardController.profile);

//queries page on the dashboard page
router.get("/queries", dashboardController.queries);

module.exports = router;
