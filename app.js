import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import routes from "./routes/index";
import "dotenv/config";

const app = express();

//middleware
app.use(bodyParser.json());

//uploading images
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use("/", routes);

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
