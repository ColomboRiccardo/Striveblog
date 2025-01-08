import express from "express";
import {
  getAllBlogPosts,
  getBlogPostById,
  getPaginatedBlogPosts,
  getBlogPagesCount,
  searchBlogPosts,
} from "../controllers/blogPostController.js";

const router = express.Router();

router.get("/count", getBlogPagesCount);
router.get("/post/:id", getBlogPostById);
router.get("/page/:page", getPaginatedBlogPosts);
router.post("/search", searchBlogPosts);
router.get("/", getAllBlogPosts);

export { router };
