import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
const envPath = path.join(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error("❌ No API Key found in .env");
    return;
  }

  console.log(`🔑 Using Key: ${key.substring(0, 10)}...`);

  try {
    const genAI = new GoogleGenerativeAI(key);
    // Note: listModels might not be exposed directly on the main class in some versions,
    // strictly checking the SDK usage or manually fetching via fetch if needed.
    // The node SDK usually exposes `getGenerativeModel` but `listModels` is on the `GoogleGenerativeAI` instance or separate?
    // Checking docs mental model: it's not always direct.
    // Let's use a simple fetch to be 100% sure of what the HTTP API says, independent of SDK wrappers.
    // v1beta list models endpoint: https://generativelanguage.googleapis.com/v1beta/models?key=KEY

    console.log("📡 Fetching models via HTTP...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("❌ API Error:", data.error);
      return;
    }

    if (data.models) {
      console.log("\n✅ AVAILABLE MODELS:");
      data.models.forEach((m) => {
        if (
          m.supportedGenerationMethods &&
          m.supportedGenerationMethods.includes("generateContent")
        ) {
          console.log(`   - ${m.name} [${m.displayName}]`);
        }
      });
    } else {
      console.log("⚠️ No models returned.", data);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

listModels();
