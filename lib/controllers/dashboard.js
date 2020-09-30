import Messages from "../models/contact";

//display dashboard
const dashboard = (req, res) => {
  res.status(200).json({ message: "You are on the dashboard page" });
};

//profile page
const profile = (req, res) => {
  res.status(200).json({ message: "You are on the profile page" });
};

//queries page
const queries = async (req, res) => {
  try {
    const messages = await Messages.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default { dashboard, profile, queries };
