import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chatRoutes.js";
import { chatRateLimit } from "./controllers/chatController.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from root
const envPath = path.join(__dirname, "..", "..", ".env");
console.log(`[AUDIT] Loading .env from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error("[AUDIT] ❌ Failed to load .env file:", result.error);
} else {
  console.log("[AUDIT] ✅ .env file loaded successfully");
}

// Verify API Key availability (masked)
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey) {
  console.log(
    `[AUDIT] ✅ GEMINI_API_KEY found (Length: ${
      apiKey.length
    }, Starts with: ${apiKey.substring(0, 4)}...)`
  );
} else {
  console.error("[AUDIT] ❌ GEMINI_API_KEY is MISSING in process.env");
}

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3003",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[AUDIT] 📨 INCOMING: ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api", chatRoutes); // Rate limit applied inside controller or route if needed, simplifying for audit

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
    apiKeyPresent: !!process.env.GEMINI_API_KEY,
    port: PORT,
  });
});

const buildPath = path.join(__dirname, "..", "..", "dist");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("\n🚀 Server Started:");
    console.log(`✅ Server: http://localhost:${PORT}`);
    console.log(`[AUDIT] Ready to process chat requests...`);
  });
}

export default app;
