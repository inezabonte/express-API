const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

//import the routes
require("./routes/index")(app);

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
