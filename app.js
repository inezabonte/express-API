const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
require("dotenv/config");

//middleware
app.use(bodyParser.json());

//uploading images
app.use(
  fileupload({
    useTempFiles: true,
  })
);

//route middleware
require("./routes/index")(app);

// Connect to DB
//The username and password are stored in a dotenv file for security

const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect");
  }
};

connection();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});
