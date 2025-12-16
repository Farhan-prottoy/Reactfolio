import { chatHandler } from "../lib/chatHandler.js";

export default async function handler(req, res) {
  // CORS handling for Vercel
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust this in production if needed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, websiteContent } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    const result = await chatHandler({ message, websiteContent, apiKey });

    // Check if result has error property from fallback/handler
    if (result.error) {
      // Log internally but return "200" if we want to show a friendly fallback,
      // or return 500 if it's a critical failure.
      // The shared handler already provides a fallback response in most cases.
      // If `result.response` is present, it's safe to return 200.
      // If only `error` is present, return 500.
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("SERVERLESS FUNCTION ERROR:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
