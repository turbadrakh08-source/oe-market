import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  getMyPosts,
} from "../controllers/listing.controller.js";
import authMiddleware from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.post("/create", authMiddleware, upload.single("image"), createPost);

router.get("/getPosts", getPosts);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/my-posts", authMiddleware, getMyPosts);
export default router;
