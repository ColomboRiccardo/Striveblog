import mongoose from "mongoose";
import "dotenv/config";

const authorSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  email: String,
  data_di_nascita: Date,
  avatar: String,
});

const blogPostSchema = new mongoose.Schema({
  categoria: String,
  titolo: String,
  cover: String,
  readTime: {
    value: Number,
    unit: String,
  },
  author: String,
  content: String,
});

const Author = mongoose.model(
  process.env.COLLECTION,
  authorSchema
);

export default Author;
