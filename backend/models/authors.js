import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  email: String,
  data_di_nascita: Date,
  avatar: String,
});

const Author = mongoose.model(
  process.env.MONGODB_COLLECTION,
  authorSchema
);

export default Author;
