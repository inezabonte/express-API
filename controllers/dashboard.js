const Messages = require("../models/contact");

//display dashboard
module.exports.dashboard = (req, res) => {
  res.send("You are on the dashboard page");
};

//profile page
module.exports.profile = (req, res) => {
  res.send("You are on the profile page");
};

//queries page
module.exports.queries = async (req, res) => {
  try {
    const messages = await Messages.find();
    res.json(messages);
  } catch (error) {
    res.json({ message: error });
  }
};
