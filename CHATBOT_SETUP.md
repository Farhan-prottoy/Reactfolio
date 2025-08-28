# ChatBot Setup Guide

## Overview
This guide will help you set up the AI-powered ChatBot with Gemini API integration, proper security, and rate limiting.

## 🏗️ Architecture

```
Reactfolio/
├── src/
│   ├── components/ChatBot/ChatBot.jsx     # Frontend chatbot component  
│   └── data/farhanInfo.js                 # Centralized information store
├── server/
│   ├── chatAPI.js                         # Express server with Gemini API
│   └── package.json                       # Server dependencies
├── .env.example                           # Environment template
└── package.json                           # Main project config
```

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
# Install main project dependencies
npm install

# Install server dependencies
npm run server:install

# Or install everything at once
npm run full:install
```

### 2. Environment Configuration

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual values
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=development
PORT=3001
```

### 3. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

### 4. Start Development Servers

```bash
# Start both frontend and backend simultaneously
npm run full:dev

# Or start them separately:
npm run dev          # Frontend only
npm run server:dev   # Backend only
```

## 🛡️ Security Features

### Rate Limiting
- **Development**: 20 requests per 15 minutes per IP
- **Production**: 5 requests per 5 minutes per IP
- Automatic scaling based on NODE_ENV

### Input Validation
- Message length limit (500 characters)
- Content sanitization
- Type checking

### Error Handling
- Graceful API fallbacks
- Timeout protection (30 seconds)
- User-friendly error messages

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 3001 |
| `ALLOWED_ORIGINS` | CORS origins | localhost |

### Rate Limiting Configuration

```javascript
// Development settings
windowMs: 15 * 60 * 1000,  // 15 minutes
max: 20                     // 20 requests

// Production settings  
windowMs: 5 * 60 * 1000,   // 5 minutes
max: 5                      // 5 requests
```

## 📁 File Structure Details

### `src/data/farhanInfo.js`
- Centralized information storage
- Easy to update and maintain
- Shared between frontend and backend
- Includes quick responses for common questions

### `src/components/ChatBot/ChatBot.jsx`
- Enhanced UI with better error handling
- Mobile-responsive design
- Typing indicators and animations
- Quick action buttons

### `server/chatAPI.js`
- Express.js server with security middleware
- Gemini AI integration
- Rate limiting and CORS protection
- Comprehensive error handling

## 🎯 API Endpoints

### `GET /health`
Check server status and Gemini availability

### `POST /api/chat`
Send a message to the chatbot

**Request:**
```json
{
  "message": "Tell me about Farhan's skills"
}
```

**Response:**
```json
{
  "response": "Farhan has expertise in...",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "source": "gemini"
}
```

## 🚨 Error Handling

### Client-Side Fallbacks
- Network errors → Fallback responses
- Rate limiting → User-friendly messages
- API timeouts → Retry suggestions

### Server-Side Protection
- Input validation
- Rate limiting by IP
- CORS protection
- Request timeout handling

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive sizing
- Proper keyboard handling
- Accessible design

## 🔄 Development Workflow

1. **Update Information**: Edit `src/data/farhanInfo.js`
2. **Test Locally**: Run `npm run full:dev`
3. **Check API**: Visit `http://localhost:3001/health`
4. **Deploy**: Set production environment variables

## 🎨 Customization

### Adding New Quick Responses
Edit `src/data/farhanInfo.js`:

```javascript
export const QUICK_RESPONSES = {
  // Add your new response
  newTopic: "Your response here..."
}
```

### Modifying Rate Limits
Edit `server/chatAPI.js`:

```javascript
const chatRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15                   // 15 requests
});
```

## 🌐 Production Deployment

### Environment Setup
```bash
NODE_ENV=production
GEMINI_API_KEY=your_production_key
ALLOWED_ORIGINS=https://yourdomain.com
```

### Server Deployment
- Use PM2 or similar process manager
- Set up HTTPS/SSL certificates
- Configure proper logging
- Monitor rate limit metrics

## 🐛 Troubleshooting

### Common Issues

**"Gemini API not available"**
- Check your API key is correct
- Verify internet connection
- Check API quotas

**"Rate limit exceeded"**
- Wait for the time window to reset
- Check if you're making too many requests

**"Server not responding"**
- Ensure server is running on correct port
- Check firewall settings
- Verify CORS configuration

### Debug Mode
Set `NODE_ENV=development` for detailed error logs.

## 📊 Monitoring

The server provides health check endpoint:
```bash
curl http://localhost:3001/health
```

Response includes:
- Server status
- Gemini API availability
- Timestamp

## 🔐 Security Best Practices

1. **Never expose API keys in frontend code**
2. **Use environment variables for all secrets**
3. **Enable rate limiting in production**
4. **Set up proper CORS origins**
5. **Monitor API usage and costs**
6. **Implement request logging for security**

## 📝 License

This chatbot implementation is part of the Reactfolio project and follows the same licensing terms.
