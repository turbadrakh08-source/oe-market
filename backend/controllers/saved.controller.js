import Saved from "../models/saved.model.js";
//saving section
const savePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;

    const existing = await Saved.findOne({ user: userId, post: postId });

    if (existing) {
      return res.status(400).json({ message: "Already saved" });
    }

    const saved = await Saved.create({
      user: userId,
      post: postId,
    });

    res.json({ message: "Saved!", saved });
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};
//remove saved files
const removeSaved = async (req, res) => {
  try {
    await Saved.findOneAndDelete({
      user: req.user.id,
      post: req.params.id,
    });

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};
//get saved posts
const getSavedPosts = async (req, res) => {
  try {
    const saved = await Saved.find({ user: req.user.id }).populate("post");

    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};
export { savePost, removeSaved, getSavedPosts };
