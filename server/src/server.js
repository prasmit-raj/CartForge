import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://cartforge-frontend-1.onrender.com";

// Middleware setup
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Auth routes
app.use("/api/auth", authRoutes);

// Server health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CartForge backend API server is running",
  });
});

// Start server listener
app.listen(PORT, () => {
  console.log(`CartForge server running on http://localhost:${PORT}`);
});