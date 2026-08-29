import express from "express";
import { protect, requireSeller } from "../middleware/auth.middleware.js";
import {
  getSellerInventory,
  getSellerAnalytics,
} from "../controllers/seller.controller.js";

const router = express.Router();

// Apply protect (authentication) and requireSeller (authorization guard) to all seller endpoints
router.use(protect);
router.use(requireSeller);

router.get("/inventory", getSellerInventory);
router.get("/analytics", getSellerAnalytics);

export default router;
