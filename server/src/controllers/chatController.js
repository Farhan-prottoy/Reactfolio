import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FARHAN_CONTEXT,
  QUICK_RESPONSES,
} from "../../../src/data/farhanInfo.js";
import { certificates } from "../../../src/data/certificatesData.js";
import rateLimit from "express-rate-limit";

// Rate limiting
export const chatRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: "Too many chat requests from this IP",
  },
  skip: (req) => process.env.NODE_ENV === "development",
});

const CERTIFICATES_CONTEXT = certificates
  .map(
    (c) =>
      `- ${c.title} (${c.year}): Issued by ${c.issuer}. Skills: ${c.skills.join(
        ", "
      )}.`
  )
  .join("\n");

const FULL_CONTEXT = `
ABOUT FARHAN:
${FARHAN_CONTEXT}

DETAILED CERTIFICATES:
${CERTIFICATES_CONTEXT}

QUICK SUMMARY:
${QUICK_RESPONSES.skills}
${QUICK_RESPONSES.education}
${QUICK_RESPONSES.projects}
${QUICK_RESPONSES.experience}
`;

const SYSTEM_PROMPT = `
You are the official AI Portfolio Assistant for Farhan Arefin Khan.
CONTEXT:
${FULL_CONTEXT}

RULES:
1. Answer ONLY based on the context.
2. Be professional and friendly.
3. No hallucinations.
`;

export const chatController = {
  handleChat: async (req, res) => {
    const runId = Date.now().toString().slice(-6);
    console.log(`[AUDIT-${runId}] 🏁 Controller Entered`);

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error(`[AUDIT-${runId}] ❌ CRITICAL: GEMINI_API_KEY is missing.`);
      return res.status(500).json({
        error: "Configuration Error: API Key missing",
        source: "backend-validation",
      });
    }

    try {
      const { message } = req.body;
      console.log(
        `[AUDIT-${runId}] 📩 Message received: "${message?.substring(
          0,
          20
        )}..."`
      );

      if (!message) return res.status(400).json({ error: "Message required" });

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

      // Extended model list to find a working one.
      // Removed 'models/' prefix as SDK usually handles it.
      const models = [
        "gemini-2.5-flash",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-3-pro-preview",
      ];

      let success = false;
      let finalResponse = "";
      let usedModel = "";

      for (const modelName of models) {
        if (success) break;
        console.log(`[AUDIT-${runId}] 🤖 Attempting model: ${modelName}`);

        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
          });

          const combinedPrompt = `${SYSTEM_PROMPT}\n\nUSER QUESTION: "${message}"`;

          const result = await model.generateContent(combinedPrompt);
          const response = await result.response;
          const text = response.text();

          if (text) {
            console.log(`[AUDIT-${runId}] ✅ Success with ${modelName}`);
            finalResponse = text;
            usedModel = modelName;
            success = true;
          }
        } catch (e) {
          // Detailed error logging
          console.error(
            `[AUDIT-${runId}] ⚠️ Failed ${modelName}: [${
              e.status || "Unknown"
            }] ${e.message}`
          );
        }
      }

      if (success) {
        res.json({
          response: finalResponse,
          source: `gemini-${usedModel}`,
          auditId: runId,
        });
      } else {
        // If all specific models fail, throw default error
        throw new Error(
          "All Gemini models failed. Please check API Key permissions or Region availability."
        );
      }
    } catch (error) {
      console.error(`[AUDIT-${runId}] ❌ FINAL ERROR:`, error.message);
      res.status(500).json({
        error: "Gemini API Error",
        details: error.message,
        auditId: runId,
      });
    }
  },
};
