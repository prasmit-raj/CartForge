import express from "express";

import {
  login,
  signup,
  logout,
  loginotp,
  verifyloginotp,
  signupotp,
  verifysignupotp,
  sendforgotpasswordotp,
  verifyforgotpasswordotp,
  resetpassword,
  getMe,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Registration flows
router.post("/signup", signup);
router.post("/signupotp", signupotp);
router.post("/verifysignupotp", verifysignupotp);

// Login flows
router.post("/login", login);
router.post("/loginotp", loginotp);
router.post("/verifyloginotp", verifyloginotp);

// Password recovery flows
router.post("/sendforgotpasswordotp", sendforgotpasswordotp);
router.post("/verifyforgotpasswordotp", verifyforgotpasswordotp);
router.post("/resetpassword", resetpassword);

// Session flows
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;