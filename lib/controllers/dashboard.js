import Messages from "../models/contact";

//display dashboard
const dashboard = (req, res) => {
  res.send("You are on the dashboard page");
};

//profile page
const profile = (req, res) => {
  res.send("You are on the profile page");
};

//queries page
const queries = async (req, res) => {
  try {
    const messages = await Messages.find();
    res.json(messages);
  } catch (error) {
    res.json({ message: error });
  }
};

export default { dashboard, profile, queries };
