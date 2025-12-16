import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { chatHandler } from "../lib/chatHandler.js";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from React build
const buildPath = path.join(__dirname, "..", "dist");
app.use(express.static(buildPath));

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rate limiting
const chatRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Higher limit for local dev
  message: {
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mode: "local-server",
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint
app.post("/api/chat", chatRateLimit, async (req, res) => {
  try {
    const { message, websiteContent } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Call shared handler
    const result = await chatHandler({ message, websiteContent, apiKey });

    res.json(result);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve React App for all other routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error serving React app:", err);
      // Fallback
      res.status(500).send('React app not built. Run "npm run build" first.');
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log("\n🚀 Local Dev Server Started:");
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`✅ API: http://localhost:${PORT}/api/chat`);
  console.log(
    "✅ Environment Key:",
    process.env.GEMINI_API_KEY ? "Loaded" : "Missing"
  );
});
