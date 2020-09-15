const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

//about page
const aboutRoute = require("./routes/about");
app.use("/about", aboutRoute);

//blog page
const blogRoute = require("./routes/blog");
app.use("/blog", blogRoute);

//contact page
const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

//dashboard page
const dashboardRoute = require("./routes/dashboard");
app.use("/dashboard", dashboardRoute);

//loginpage
const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

//home route
const homepageRoute = require("./routes/homepage");
app.use("/", homepageRoute);

// Connect to DB
//The username and password are stored in a dotenv file for security
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});
