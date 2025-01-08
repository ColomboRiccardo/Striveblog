import Author from "../models/authorModel.js";

const getAllAuthors = async (req, res, next) => {
  try {
    const allAuthors = await Author.find({});
    res.json(allAuthors);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const author = await Author.findById({ _id: id });
    if (!author) {
      res.sendStatus(404).json("Author not found");
      //throw new Error("Author not found");
    } else {
      res.json(author);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json("Aggiunto un nuovo author");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const putAuthor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      req.body
    );
    res.json("author aggiornato");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedAuthor = await Author.findByIdAndDelete(
      id
    );
    res.json("author eliminato");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  getAuthorById,
  getAllAuthors,
  createAuthor,
  putAuthor,
  deleteAuthor,
};
