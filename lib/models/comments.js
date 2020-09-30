import { Schema, model } from "mongoose";

const commentsSchema = Schema({
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

export default model("comment", commentsSchema);
