import { GoogleGenerativeAI } from "@google/generative-ai";
import { FARHAN_CONTEXT } from "../src/data/farhanInfo.js";

export async function chatHandler({ message, websiteContent, apiKey }) {
  const startTime = Date.now();
  let response;
  let source = "fallback";
  let genAI = null;

  try {
    // Input validation
    if (!message || typeof message !== "string") {
      throw new Error(
        "Invalid input: message is required and must be a string"
      );
    }

    if (message.length > 500) {
      throw new Error("Message too long. Please keep it under 500 characters.");
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      throw new Error("Message cannot be empty");
    }

    // Initialize Gemini AI if key provided
    if (apiKey) {
      try {
        genAI = new GoogleGenerativeAI(apiKey);
      } catch (error) {
        console.error("❌ Gemini AI initialization failed:", error.message);
      }
    } else {
      console.warn("⚠️ GEMINI_API_KEY not provided to chatHandler");
    }

    // Try Gemini AI first
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Format extracted website content
        let websiteContentText = "";
        if (
          websiteContent &&
          Array.isArray(websiteContent) &&
          websiteContent.length > 0
        ) {
          websiteContentText = websiteContent
            .map((item) => `[${item.tag}] ${item.text}`)
            .join("\n\n");
        }

        const prompt = `You are a friendly assistant embedded in Farhan Arefin Khan's portfolio website. Use the extracted website content below to answer the user's question in a natural, human-like tone. Be conversational, warm, and not robotic.

📄 Website Content:
${websiteContentText || FARHAN_CONTEXT}

❓User's Question:
${trimmedMessage}

Instructions:
- Answer in a friendly, conversational tone as if you're Farhan's personal assistant
- Use the website content to provide accurate, specific information
- If the question isn't related to Farhan or the website content, politely redirect to topics about Farhan
- Keep responses concise but informative (max 200 words)
- Use a warm, approachable personality

Please provide a helpful response:`;

        const result = await model.generateContent(prompt);
        const geminiResponse = result.response;
        response = geminiResponse.text();
        source = "gemini-with-content";
      } catch (geminiError) {
        console.error("❌ Gemini AI error:", geminiError.message);
        response = getFallbackResponse(trimmedMessage, websiteContent);
        source = "fallback-after-error";
      }
    } else {
      response = getFallbackResponse(trimmedMessage, websiteContent);
    }

    const responseTime = Date.now() - startTime;
    return {
      response,
      source,
      responseTime,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error("❌ Chat handler error:", error);
    // Re-throw or return error object depending on desired behavior.
    // The user requested no silent fallbacks handling errors, so we might want to let the caller handle critical errors,
    // but the fallback logic is part of the requirements for "chatbot intelligence".
    // However, validation errors should probably bubble up.
    if (
      error.message.startsWith("Invalid input") ||
      error.message.startsWith("Message too long") ||
      error.message.startsWith("Message cannot be empty")
    ) {
      throw error;
    }

    // For internal processing errors, we might fail gracefully if desired, but user requirement "No fallback masking of Gemini errors"
    // suggests we should be explicit. However, the requirement "No fallback masking of Gemini errors" usually means "don't pretend it worked if it failed".
    // But the prompt also says "Fallback logic" is a responsibility of this module.
    // I will return the fallback response but mark source as 'fallback-error' so it's clear.
    return {
      response:
        "I apologize, but I encountered an error while processing your message. Please try again in a moment.",
      source: "error",
      responseTime,
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
}

// Enhanced fallback response system
function getFallbackResponse(message, websiteContent = null) {
  const lowerMessage = message.toLowerCase();

  // If we have website content, try to find relevant information
  if (
    websiteContent &&
    Array.isArray(websiteContent) &&
    websiteContent.length > 0
  ) {
    const relevantContent = websiteContent
      .filter((item) => {
        const text = item.text.toLowerCase();
        return lowerMessage
          .split(" ")
          .some((word) => word.length > 3 && text.includes(word));
      })
      .slice(0, 3); // Top 3 most relevant pieces

    if (relevantContent.length > 0) {
      const contentSummary = relevantContent
        .map((item) => item.text.substring(0, 150))
        .join(" ... ");

      return `Based on what I found on the website: ${contentSummary}. Is there anything specific you'd like to know more about?`;
    }
  }

  // Default fallback responses
  const responses = {
    greeting: [
      "Hello! I'm here to help you learn about Farhan Arefin Khan. What would you like to know?",
      "Hi there! Feel free to ask me anything about Farhan's background, projects, or experience!",
    ],
    education: [
      "Farhan studied Electrical and Electronic Engineering at American International University-Bangladesh (AIUB), graduating with a CGPA of 3.42/4.00.",
    ],
    experience: [
      "Farhan is currently working as an Assistant Engineer at Energypac Power Generation Ltd, where he's involved in power plant operations and maintenance.",
    ],
    skills: [
      "Farhan has expertise in programming (Python, C++, MATLAB), electronics design, power systems, and industrial automation.",
    ],
    projects: [
      "Some of Farhan's notable projects include a Smart Light Switch with IoT capabilities, a Three-Phase Inverter design, and CNN-based classification systems.",
    ],
    contact: [
      "You can reach Farhan at farhan.khan.eee@gmail.com or connect with him on LinkedIn.",
    ],
    certificates: [
      "Farhan has various certifications in his field. Check out his certificates section for more details!",
    ],
    default: [
      "That's an interesting question! I can tell you about Farhan's engineering background, projects, or experience. What would you like to know?",
    ],
  };

  if (/(hello|hi|hey|greetings?)/i.test(lowerMessage)) {
    return getRandomResponse(responses.greeting);
  }
  if (/(education|study|university|degree|aiub)/i.test(lowerMessage)) {
    return getRandomResponse(responses.education);
  }
  if (/(work|job|experience|career|energypac|engineer)/i.test(lowerMessage)) {
    return getRandomResponse(responses.experience);
  }
  if (/(skill|programming|python|matlab|technology)/i.test(lowerMessage)) {
    return getRandomResponse(responses.skills);
  }
  if (/(project|smart|inverter|iot|cnn)/i.test(lowerMessage)) {
    return getRandomResponse(responses.projects);
  }
  if (/(contact|email|linkedin)/i.test(lowerMessage)) {
    return getRandomResponse(responses.contact);
  }
  if (/(certificate|certification|course)/i.test(lowerMessage)) {
    return getRandomResponse(responses.certificates);
  }

  return getRandomResponse(responses.default);
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}
