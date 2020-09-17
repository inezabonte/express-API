const Message = require("../models/contact");
const { messageValidation } = require("./validation");

//posting a message
module.exports.postMessage = async (req, res) => {
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
module.exports.contact = (req, res) => {
  res.send("This is the contact page");
};
