import Comment from "../models/commentModel.js";
import BlogPost from "../models/blogPostModel.js";

const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const newComment = await Comment.create(req.body);
    const targetPost = await BlogPost.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    console.log(newComment._id, targetPost);

    if (!targetPost) {
      const error = new Error("Blog post not found");
      error.status = 404;
      throw error;
    }

    res.status(201).json("Aggiunto un nuovo Comment");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createComment };
