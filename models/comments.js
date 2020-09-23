const mongoose = require("mongoose");

const commentsScehma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discussion: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("comment", commentsScehma);
