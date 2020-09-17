const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");
const verify = require("../middlewares/auth");

//the main dashboard page
router.get("/", verify, dashboardController.dashboard);

//profile page on the dashboard
router.get("/profile", verify, dashboardController.profile);

//queries page on the dashboard page
router.get("/queries", verify, dashboardController.queries);

module.exports = router;
