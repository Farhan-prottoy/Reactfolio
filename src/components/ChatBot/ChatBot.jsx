import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Zap } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { FARHAN_CONTEXT, QUICK_RESPONSES } from '../../data/farhanInfo.js'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! 👋 I'm Farhan's personal assistant. I can help you learn about his work, projects, skills, and experience. I'll scan through his portfolio to give you the most relevant information. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { isDark } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Function to extract relevant content from the website
  const extractWebsiteContent = (userMessage) => {
    const messageLower = userMessage.toLowerCase();
    const extractedContent = [];
    
    // Get all text content from main sections
    const contentSelectors = [
      'main', 'section', 'article', '.content', 
      '[id*="about"]', '[id*="project"]', '[id*="skill"]', 
      '[id*="experience"]', '[id*="contact"]', '[id*="certificate"]',
      '[class*="about"]', '[class*="project"]', '[class*="skill"]',
      '[class*="experience"]', '[class*="contact"]', '[class*="certificate"]',
      'h1', 'h2', 'h3', 'h4', 'p', 'li'
    ];
    
    contentSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element && element.innerText) {
            const text = element.innerText.trim();
            if (text.length > 20 && text.length < 1000) { // Only meaningful content, not too long
              // Check if content is relevant to user's message
              const keywords = messageLower.split(' ').filter(word => word.length > 2);
              const isRelevant = keywords.some(word => 
                text.toLowerCase().includes(word)
              );
              
              // Include headers and relevant content
              if (isRelevant || ['H1', 'H2', 'H3', 'H4'].includes(element.tagName)) {
                extractedContent.push({
                  selector: selector,
                  text: text.substring(0, 400), // Limit text length
                  tag: element.tagName,
                  relevanceScore: isRelevant ? keywords.filter(word => 
                    text.toLowerCase().includes(word)
                  ).length : 0
                });
              }
            }
          }
        });
      } catch (error) {
        console.warn(`Error extracting content from ${selector}:`, error);
      }
    });
    
    // Remove duplicates and sort by relevance
    const uniqueContent = extractedContent
      .filter((item, index, self) => 
        index === self.findIndex(t => t.text === item.text)
      )
      .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
      .slice(0, 8); // Limit to top 8 most relevant pieces
    
    console.log(`🔍 Extracted ${uniqueContent.length} relevant content pieces from website`);
    return uniqueContent;
  };

  // Enhanced Gemini API integration with website content extraction
  const sendToGemini = async (message) => {
    try {
      // Validate message length
      if (message.length > 500) {
        return "Please keep your message under 500 characters for better response quality.";
      }

      // Extract relevant website content
      const websiteContent = extractWebsiteContent(message);
      
      console.log('🔍 Extracted website content:', websiteContent);

      // Use proxy path instead of absolute URL
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message.trim(),
          websiteContent: websiteContent 
        }),
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (response.status === 429) {
        const errorData = await response.json();
        return `I'm getting a lot of requests right now. Please try again in a few minutes. (Rate limit: ${Math.ceil(errorData.retryAfter / 60000)} minutes)`;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response) {
        return data.response;
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('API Error:', error);
      
      if (error.name === 'AbortError') {
        return "The request took too long. Please try asking a shorter question.";
      }
      
      // Return fallback response
      return getFallbackResponse(message);
    }
  }

  // Enhanced fallback responses using imported data
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    // Check for keywords and return appropriate response from imported data
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return QUICK_RESPONSES.skills;
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
      return QUICK_RESPONSES.education;
    }
    
    if (lowerMessage.includes('project')) {
      return QUICK_RESPONSES.projects;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return QUICK_RESPONSES.experience;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return QUICK_RESPONSES.contact;
    }
    
    if (lowerMessage.includes('programming') || lowerMessage.includes('competitive')) {
      return "Farhan is an active competitive programmer with 300+ problems solved on Codeforces (max rating: 1009), 150+ on CodeChef (max rating: 1436), and 50+ problems on platforms like LeetCode, LightOJ, UVA, and CSES. He has 5+ years of coding experience across multiple languages.";
    }
    
    if (lowerMessage.includes('hire') || lowerMessage.includes('recruit')) {
      return QUICK_RESPONSES.hire;
    }
    
    return "Thanks for your question! Farhan is a passionate Electrical & Electronic Engineering student with strong skills in programming, embedded systems, and machine learning. Feel free to ask me about his education, projects, skills, or experience. You can also check out the different sections of his portfolio for detailed information!"
  }

  // Enhanced message handling with better error handling and user feedback
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Validate message length
    if (inputMessage.length > 500) {
      const errorMessage = {
        id: messages.length + 1,
        text: "Please keep your message under 500 characters for better response quality.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')
    setIsTyping(true)

    // Add a "scanning website" message for better UX
    const scanningMessage = {
      id: messages.length + 2,
      text: "🔍 Let me scan through Farhan's portfolio to find the most relevant information...",
      sender: 'bot',
      timestamp: new Date(),
      isTemporary: true
    };
    
    setMessages(prev => [...prev, scanningMessage]);

    try {
      // Add variable delay for more natural feel
      const delay = Math.random() * 1000 + 1500; // 1.5-2.5 seconds
      
      await new Promise(resolve => setTimeout(resolve, delay))
      
      const botResponse = await sendToGemini(currentMessage)
      
      // Remove the scanning message and add the actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTemporary);
        return [...filtered, {
          id: messages.length + 3,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }];
      });
      
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Remove scanning message and show error
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTemporary);
        return [...filtered, {
          id: messages.length + 3,
          text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment. You can also try asking about Farhan's skills, projects, or experience!",
          sender: 'bot',
          timestamp: new Date()
        }];
      });
      
    } finally {
      setIsTyping(false)
    }
  }

  // Enhanced quick actions with imported responses
  const handleQuickAction = async (action) => {
    let message = ''
    let response = ''
    
    switch (action) {
      case 'hire':
        message = 'Tell me about hiring Farhan'
        response = QUICK_RESPONSES.hire
        break
      case 'skills':
        message = 'What are Farhan\'s key skills?'
        response = QUICK_RESPONSES.skills
        break
      case 'projects':
        message = 'Show me Farhan\'s projects'
        response = QUICK_RESPONSES.projects
        break
      default:
        return
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Add bot response after natural delay
    const delay = Math.random() * 800 + 1200; // 1.2-2 seconds
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, delay)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-primary-600 to-electric-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle size={20} className="md:hidden" />
        <MessageCircle size={24} className="hidden md:block" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-30"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 right-4 md:bottom-20 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm md:w-96 h-[70vh] max-h-[32rem] md:h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-electric-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">Farhan's AI Assistant</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.sender === 'user' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-electric-100 dark:bg-electric-900 text-electric-600 dark:text-electric-400'
                    }`}>
                      {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-electric-100 dark:bg-electric-900 text-electric-600 dark:text-electric-400 rounded-full flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                          className="w-1 h-1 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                          className="w-1 h-1 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                          className="w-1 h-1 bg-gray-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Action Buttons - Show when chat is empty */}
              {messages.length === 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      👋 Hi! I'm Farhan's AI Assistant
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ask me anything about Farhan or try these quick options:
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction('hire')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md text-sm font-medium"
                    >
                      💼 Why Hire Farhan?
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction('skills')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-md text-sm font-medium"
                    >
                      🛠️ Technical Skills
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction('projects')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md text-sm font-medium"
                    >
                      🚀 Featured Projects
                    </motion.button>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Farhan..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
