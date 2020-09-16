const express = require("express");

const aboutRoute = require("./about");
const blogRoute = require("./blog");
const contactRoute = require("./contact");
const dashboardRoute = require("./dashboard");
const loginRoute = require("./login");
const homepageRoute = require("./homepage");

module.exports = function (app) {
  app.use("/", homepageRoute);
  app.use("/about", aboutRoute);
  app.use("/blog", blogRoute);
  app.use("/contact", contactRoute);
  app.use("/dashboard", dashboardRoute);
  app.use("/login", loginRoute);
};
