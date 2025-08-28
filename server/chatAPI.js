import express from 'express';
import rateLimit from 'express-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { FARHAN_CONTEXT } from '../src/data/farhanInfo.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from React build
const buildPath = path.join(__dirname, '..', 'dist');
app.use(express.static(buildPath));

// Middleware - Setup CORS first
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3003', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize Gemini AI
let genAI = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log('🔑 Environment Check:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- GEMINI_API_KEY:', GEMINI_API_KEY ? '✅ Found' : '❌ Not found');
console.log('- PORT:', PORT);

if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    console.log('🤖 Gemini AI: ✅ Initialized successfully');
  } catch (error) {
    console.error('❌ Gemini AI initialization failed:', error.message);
  }
} else {
  console.warn('⚠️  GEMINI_API_KEY not found. Chatbot will use fallback responses.');
}

// Rate limiting
const chatRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: {
    error: 'Too many chat requests from this IP, please try again after 15 minutes.',
    retryAfter: 15 * 60 * 1000
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development'
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('📋 Health check requested');
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiStatus: genAI ? 'connected' : 'fallback mode',
    env: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Main chat endpoint
app.post('/api/chat', chatRateLimit, async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { message, websiteContent } = req.body;
    
    console.log('💬 Chat request received:', { 
      message: message?.substring(0, 50) + '...',
      websiteContentCount: websiteContent?.length || 0
    });
    
    // Input validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input: message is required and must be a string' 
      });
    }

    if (message.length > 500) {
      return res.status(400).json({ 
        error: 'Message too long. Please keep it under 500 characters.' 
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({ 
        error: 'Message cannot be empty' 
      });
    }

    let response;
    let source = 'fallback';

    // Try Gemini AI first
    if (genAI) {
      try {
        console.log('🤖 Querying Gemini AI with website content...');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        // Format extracted website content
        let websiteContentText = '';
        if (websiteContent && Array.isArray(websiteContent) && websiteContent.length > 0) {
          websiteContentText = websiteContent
            .map(item => `[${item.tag}] ${item.text}`)
            .join('\n\n');
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
        source = 'gemini-with-content';
        
        console.log('✅ Gemini AI response generated successfully with website content');
      } catch (geminiError) {
        console.error('❌ Gemini AI error:', geminiError.message);
        response = getFallbackResponse(trimmedMessage, websiteContent);
        source = 'fallback-after-error';
      }
    } else {
      console.log('📋 Using fallback responses (Gemini not available)');
      response = getFallbackResponse(trimmedMessage, websiteContent);
    }

    const responseTime = Date.now() - startTime;
    console.log(`⚡ Response generated in ${responseTime}ms (source: ${source})`);

    res.json({ 
      response,
      source,
      responseTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('❌ Chat endpoint error:', error);
    
    res.status(500).json({ 
      error: 'I apologize, but I encountered an error while processing your message. Please try again in a moment.',
      timestamp: new Date().toISOString(),
      responseTime
    });
  }
});

// Enhanced fallback response system that can use website content
function getFallbackResponse(message, websiteContent = null) {
  const lowerMessage = message.toLowerCase();
  
  // If we have website content, try to find relevant information
  if (websiteContent && Array.isArray(websiteContent) && websiteContent.length > 0) {
    const relevantContent = websiteContent
      .filter(item => {
        const text = item.text.toLowerCase();
        return lowerMessage.split(' ').some(word => 
          word.length > 3 && text.includes(word)
        );
      })
      .slice(0, 3); // Top 3 most relevant pieces
    
    if (relevantContent.length > 0) {
      const contentSummary = relevantContent
        .map(item => item.text.substring(0, 150))
        .join(' ... ');
      
      return `Based on what I found on the website: ${contentSummary}. Is there anything specific you'd like to know more about?`;
    }
  }
  
  // Default fallback responses
  const responses = {
    greeting: [
      "Hello! I'm here to help you learn about Farhan Arefin Khan. What would you like to know?",
      "Hi there! Feel free to ask me anything about Farhan's background, projects, or experience!"
    ],
    education: [
      "Farhan studied Electrical and Electronic Engineering at American International University-Bangladesh (AIUB), graduating with a CGPA of 3.42/4.00."
    ],
    experience: [
      "Farhan is currently working as an Assistant Engineer at Energypac Power Generation Ltd, where he's involved in power plant operations and maintenance."
    ],
    skills: [
      "Farhan has expertise in programming (Python, C++, MATLAB), electronics design, power systems, and industrial automation."
    ],
    projects: [
      "Some of Farhan's notable projects include a Smart Light Switch with IoT capabilities, a Three-Phase Inverter design, and CNN-based classification systems."
    ],
    contact: [
      "You can reach Farhan at farhan.khan.eee@gmail.com or connect with him on LinkedIn."
    ],
    certificates: [
      "Farhan has various certifications in his field. Check out his certificates section for more details!"
    ],
    default: [
      "That's an interesting question! I can tell you about Farhan's engineering background, projects, or experience. What would you like to know?"
    ]
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

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  // Don't serve React app for API routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  const indexPath = path.join(buildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving React app:', err);
      res.status(500).send('Error loading the application. Please make sure the React app is built.');
    }
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('\n🚀 Chat API Server Started:');
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`✅ Chat API: http://localhost:${PORT}/api/chat`);
  console.log('✅ Ready to accept connections\n');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log('💡 Try changing the PORT in your .env file or stop the process using that port');
  } else {
    console.error('❌ Server error:', error);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
