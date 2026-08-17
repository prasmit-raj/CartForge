const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CartForge backend is running"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`CartForge server running on http://localhost:${PORT}`);
});