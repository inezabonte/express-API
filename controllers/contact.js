import Message from "../models/contact";
import { messageValidation } from "./validation";

//posting a message
const postMessage = async (req, res) => {
  //validate the data before the message is sent
  const { error } = messageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const savedMessage = await message.save();
    res.json(savedMessage);
  } catch (err) {
    res.json({ message: err });
  }
};

//response when a get request is done
const contact = (req, res) => {
  res.send("This is the contact page");
};

export default { postMessage, contact };
