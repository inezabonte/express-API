import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  //check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("user doesn't exist");

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

export default { login };
