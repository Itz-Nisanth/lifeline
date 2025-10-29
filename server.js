// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Resolve dirname (since ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use("/api/auth", authRoutes);

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// ✅ Fix for Express v5 wildcard route issue
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LifeLink server running on http://localhost:${PORT}`);
});
