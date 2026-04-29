import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  savePost,
  getSavedPosts,
  removeSaved,
} from "../controllers/saved.controller.js";

const router = Router();
router.post("/save", authMiddleware, savePost);
router.get("/saved", authMiddleware, getSavedPosts);
router.delete("/saved/:id", authMiddleware, removeSaved);

export default router;
