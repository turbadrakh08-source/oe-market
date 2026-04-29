import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/auth.js";
const router = Router();

router.post("/register", upload.single("image"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
