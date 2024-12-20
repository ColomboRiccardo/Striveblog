import Author from "../models/authors.js";
import {
  crazyFunction,
  notFoundError,
} from "../utils/errorHandling.js";

const queryAuthorFromId = async (
  request,
  response,
  next
) => {
  const id = request.params.id;
  try {
    const author = await Author.find({ _id: id });
    if (author.length === 0) {
      //   const databaseError = new Error("Author not found");
      notFoundError();
    }
    response.json(author);
  } catch (error) {
    next(error);
  }
};

const addNewAuthor = async (request, response, next) => {
  try {
    const newAuthor = request.body;
    console.log(newAuthor);
    await Author.create(newAuthor);
  } catch (error) {
    next(error);
  }
};
export { queryAuthorFromId, addNewAuthor };
