import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { QUICK_RESPONSES } from '../../data/farhanInfo.js'
// ReactMarkdown import removed to prevent build error as package is not installed 
// If react-markdown isn't installed, we'll stick to text, but the plan implies "modern".
// I'll stick to text rendering to avoid dependency errors unless I install it. 
// I'll use simple text for now but style it nicely.

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Farhan's virtual assistant. Ask me anything about his projects, skills, or experience!",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendToAPI = async (message) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error(error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMsg = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    const responseText = await sendToAPI(userMsg.text)

    setIsTyping(false)
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      text: responseText,
      sender: 'bot',
      timestamp: new Date()
    }])
  }

  const handleQuickAction = (actionKey) => {
    let text = "";
    switch(actionKey) {
        case 'skills': text = "What are your technical skills?"; break;
        case 'projects': text = "Tell me about your projects."; break;
        case 'hire': text = "Why should I hire you?"; break;
        default: return;
    }
    
    // Simulate user typing for quick action
    const userMsg = { id: Date.now(), text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    // Call API
    sendToAPI(text).then(response => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        }]);
    });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary-600 to-electric-600 text-white rounded-full shadow-2xl hover:shadow-electric-500/50 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle size={28} />
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary-600/90 to-electric-600/90 text-white flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs opacity-80">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm'
                    }`}>
                      {/* Markdown-ish formatting for simple lists/bold if needed (rendered as text for now) */}
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex gap-1">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (only if empty or few messages) */}
            {messages.length < 3 && (
                <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                    <button onClick={() => handleQuickAction('skills')} className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-600 transition-colors">
                        🛠️ Skills
                    </button>
                    <button onClick={() => handleQuickAction('projects')} className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-600 transition-colors">
                        🚀 Projects
                    </button>
                    <button onClick={() => handleQuickAction('hire')} className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-600 transition-colors">
                        💼 Hire Me
                    </button>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
                  disabled={!inputMessage.trim()}
                >
                  <Send size={20} />
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
