import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Zap } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Farhan's AI assistant. I can help you learn more about his experience, projects, and skills. What would you like to know?",
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

  // Gemini API integration
  const sendToGemini = async (message) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
    
    if (!GEMINI_API_KEY) {
      return getFallbackResponse(message)
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an AI assistant for Farhan Arefin Khan's portfolio website. Here's his information:

Name: Farhan Arefin Khan
Education: Bachelor of Science in Electrical and Electronic Engineering (EEE) from Sylhet Engineering College (2020-2025), CGPA: 3.57/4.00
Thesis: Detection and Classification of 2D Material Flakes Using Ensemble GMM and Neural Networks
Location: Sylhet District, Bangladesh
Email: farhan.prottoy.17@gmail.com
Phone: 01751948747

Skills:
- Programming: Python, C, C++, MATLAB, HTML, CSS, JavaScript, React
- Embedded Systems: Arduino, ESP32, Proteus
- ML/DL & CV: NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, OpenCV
- Tools: MATLAB, Simulink, AutoCAD, Git, GitHub

Projects:
- Three-Phase Inverter System using IGBT and Arduino
- Smart Light Switch with Manual and Automatic Control

Certifications:
- Control Design Onramp with Simulink – MATLAB Academy, 2024
- 30 Days Webinar Participation on PLC, VFD, HMI – Gobeshona Learning Academy, 2024
- VLSI System On Chip Design – Overview – Maven Silicon, 2025

Experience:
- Cultural Secretary at EEE Association, Sylhet Engineering College (Aug 2024 – Jul 2025)
- Industrial Technology on Electrical Engineering & Instrumentation, TICI, Narsingdi (A+ Grade)

Programming Experience:
- Codeforces: 300+ problems solved, Max rating: 1009
- CodeChef: 150+ problems solved, Max rating: 1436
- LeetCode, LightOJ, UVA, CSES: 50+ problems on DSA

User question: ${message}

Please provide a helpful, informative response about Farhan's background, skills, or experience. Keep it conversational and engaging.`
              }]
            }]
          })
        }
      )

      const data = await response.json()
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      } else {
        return getFallbackResponse(message)
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return getFallbackResponse(message)
    }
  }

  // Fallback responses when Gemini API is not available
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return "Farhan has expertise in multiple areas including Python, C++, JavaScript, React, Arduino, ESP32, machine learning with TensorFlow and PyTorch, and tools like MATLAB and Simulink. He's also experienced in web development and embedded systems."
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
      return "Farhan is pursuing a Bachelor of Science in Electrical and Electronic Engineering (EEE) at Sylhet Engineering College (2020-2025) with a CGPA of 3.57/4.00. His thesis focuses on 'Detection and Classification of 2D Material Flakes Using Ensemble GMM and Neural Networks'."
    }
    
    if (lowerMessage.includes('project')) {
      return "Farhan has worked on several interesting projects including a Three-Phase Inverter System using IGBT and Arduino, and a Smart Light Switch with Manual and Automatic Control. He's also developed his thesis project on 2D material flake detection using machine learning."
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Farhan has served as Cultural Secretary of the EEE Association at Sylhet Engineering College and completed industrial training in Electrical Engineering & Instrumentation at TICI, Narsingdi with an A+ grade. He's also an active competitive programmer."
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach Farhan at farhan.prottoy.17@gmail.com or call him at 01751948747. He's based in Sylhet District, Bangladesh. You can also connect with him on LinkedIn at farhan-arefin-khan."
    }
    
    if (lowerMessage.includes('programming') || lowerMessage.includes('competitive')) {
      return "Farhan is an active competitive programmer with 300+ problems solved on Codeforces (max rating: 1009), 150+ on CodeChef (max rating: 1436), and 50+ problems on platforms like LeetCode, LightOJ, UVA, and CSES."
    }
    
    return "Thanks for your question! Farhan is a passionate Electrical & Electronic Engineering student with strong skills in programming, embedded systems, and machine learning. Feel free to ask me about his education, projects, skills, or experience. You can also check out the different sections of his portfolio for detailed information!"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = await sendToGemini(inputMessage)
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickAction = async (action) => {
    let message = ''
    let response = ''
    
    switch (action) {
      case 'hire':
        message = 'Tell me about hiring Farhan'
        response = "🚀 Ready to hire Farhan? Great choice! He's an Electrical & Electronic Engineering student with strong programming skills (Python, C++, JavaScript, React), experience in embedded systems (Arduino, ESP32), and machine learning expertise. He's completed industrial training with A+ grade and has proven project experience. Farhan is passionate, quick-learning, and ready to contribute to your team immediately!"
        break
      case 'skills':
        message = 'What are Farhan\'s key skills?'
        response = "💻 Farhan's Technical Skills:\n\n🔧 Programming: Python, C++, JavaScript, React\n⚡ Embedded Systems: Arduino, ESP32, IoT development\n🤖 Machine Learning: TensorFlow, PyTorch, Neural Networks\n🔬 Engineering Tools: MATLAB, Simulink, AutoCAD\n🌐 Web Development: HTML, CSS, React, Node.js\n🏆 Competitive Programming: 300+ problems solved\n📊 Data Analysis & Visualization\n\nHe combines theoretical knowledge with hands-on experience!"
        break
      case 'projects':
        message = 'Show me Farhan\'s projects'
        response = "🔥 Farhan's Featured Projects:\n\n1. 🔌 Three-Phase Inverter System - IGBT-based power electronics project with Arduino control\n\n2. 💡 Smart Light Switch - Automated lighting system with manual/automatic control modes\n\n3. 🧠 2D Material Flake Detection - Thesis project using Ensemble GMM and Neural Networks for advanced classification\n\n4. 🏆 Competitive Programming Solutions - 300+ algorithmic problems solved across multiple platforms\n\nEach project demonstrates his blend of hardware expertise and software innovation!"
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

    // Add bot response after delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
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
