import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import sellerRoutes from "./routes/seller.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

const defaultOrigins = [
  "http://localhost:5173",
  "https://cart-forge.vercel.app",
  "https://cartforge-frontend-1.onrender.com",
];

const envFrontendUrl = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim().replace(/\/+$/, ""))
  : [];

const allowedOrigins = Array.from(
  new Set([...defaultOrigins, ...envFrontendUrl].filter(Boolean).map((url) => url.replace(/\/+$/, "")))
);

// Middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (like Postman or curl)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(null, false);
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Auth & Seller routes
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);

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