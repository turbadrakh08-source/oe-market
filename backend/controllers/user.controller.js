import { User } from "../models/user.model.js";
//jwt
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are important!",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    // handling image
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
      image: imagePath,
    });

    res.status(201).json({
      message: "User registered",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    //checking if the user already exists

    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    //compare passwords
    const isMatch = await user.comparePassword(password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    if (isMatch) {
      res.status(200).json({
        message: "user logged in",
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          image: user.image,
        },
      });
    }
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    res.status(200).json({
      message: "Logout successfuly",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal failure",
      error,
    });
  }
};
export { registerUser, loginUser, logoutUser };
