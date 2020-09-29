import Message from "../models/contact";

//posting a message
const postMessage = async (req, res) => {
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//response when requesting the contact page
const contact = (req, res) => {
  res.status(200).send("This is the contact page");
};

export default { postMessage, contact };
