import Post from "../models/listing.model.js";
//get my posts
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ seller: req.user.id });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
  console.log("ajilaj bnu");
};

//Create a post

const createPost = async (req, res) => {
  try {
    const { title, size, price, category, condition } = req.body;

    const image = req.file;
    if (!title || !price || !condition || !image || !size) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const post = await Post.create({
      title,
      size,
      price,
      category,
      condition,
      image: `/uploads/${req.file.filename}`,
      seller: req.user?.id,
    });
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    res.status(201).json({
      message: " Post created succussfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: " Internal server error",
      error,
    });
  }
};
//getposts all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};
//updating potss
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // checking owner
    if (post.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(post, req.body);
    await post.save();

    res.status(200).json({
      message: "Post Updated Successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
//deleting posts
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check owner
    if (post.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Your post deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
export { createPost, getPosts, updatePost, deletePost, getMyPosts };
