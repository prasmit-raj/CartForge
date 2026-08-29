import express from "express";

import {
  login,
  signup,
  logout,
  resetpassword,
  getMe,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Active authentication routes (Instant verification without OTP)
router.post("/signup", signup);
router.post("/login", login);
router.post("/resetpassword", resetpassword);

// Session routes
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;