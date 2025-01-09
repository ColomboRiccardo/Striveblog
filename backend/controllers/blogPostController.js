import BlogPost from "../models/blogPostModel.js";

const getAllBlogPosts = async (req, res, next) => {
  try {
    const allBlogPosts = await BlogPost.find({});
    res.json(allBlogPosts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPaginatedBlogPosts = async (req, res, next) => {
  try {
    const page = req.params.page;
    const allBlogPosts = await BlogPost.find({})
      .limit(6)
      .skip(6 * (page - 1));
    res.json(allBlogPosts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBlogPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogPost = await BlogPost.findById({
      _id: id,
    }).populate("comments");
    if (!blogPost) {
      res.sendStatus(404).json("BlogPost not found");
      //throw new Error("BlogPost not found");
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBlogPagesCount = async (req, res, next) => {
  try {
    const countAll = await BlogPost.countDocuments();
    const pages = Math.ceil(countAll / 6);
    res.json(pages);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
};

const searchBlogPosts = async (req, res, next) => {
  try {
    // const searchResult = await BlogPost.find({
    //   $and: [
    //     { titolo: { $regex: req.body.titleSearch, $options: "i" } },
    //     { autore: { $regex: req.body.authorSearch, $options: "i" } },
    //   ],
    // })
    const page = req.params.page;

    const searchResult = await BlogPost.find({
      titolo: {
        $regex: req.body.titleSearch,
        $options: "i",
      },
      author: {
        $regex: req.body.authorSearch,
        $options: "i",
      },
    })
      .limit(6)
      .skip(6 * (page - 1));

    res.json(searchResult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  getAllBlogPosts,
  getBlogPostById,
  getPaginatedBlogPosts,
  getBlogPagesCount,
  searchBlogPosts,
};
