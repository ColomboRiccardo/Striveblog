import mongoose from "mongoose";
import "dotenv/config";

const commentSchema = new mongoose.Schema({
  author: String,
  comment: String,
  likes: Number,
});

const Comment = new mongoose.model(
  process.env.COMMENT_COLLECTION,
  commentSchema
);

export default Comment;
