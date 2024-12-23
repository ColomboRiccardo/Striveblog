import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  putAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.put("/:id", putAuthor);
router.delete("/:id", deleteAuthor);
router.post("/new", createAuthor);

export { router };
