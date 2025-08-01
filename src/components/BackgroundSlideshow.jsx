import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BackgroundSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Electrical engineering themed background images/patterns
  const backgrounds = [
    {
      type: 'gradient',
      class: 'bg-gradient-to-br from-primary-900 via-electric-800 to-gray-900'
    },
    {
      type: 'pattern',
      class: 'bg-gradient-to-br from-gray-900 via-primary-900 to-electric-900',
      pattern: 'circuit'
    },
    {
      type: 'gradient',
      class: 'bg-gradient-to-br from-electric-900 via-primary-800 to-gray-900'
    },
    {
      type: 'pattern',
      class: 'bg-gradient-to-br from-gray-800 via-electric-900 to-primary-900',
      pattern: 'grid'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgrounds.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [backgrounds.length])

  return (
    <div className="fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        {backgrounds.map((bg, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className={`absolute inset-0 ${bg.class}`}
            >
              {/* Circuit Pattern Overlay */}
              {bg.pattern === 'circuit' && (
                <div className="absolute inset-0 opacity-10">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern
                        id="circuit"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                        <path
                          d="M2,2 L10,2 M10,2 L10,10 M10,10 L18,10"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          fill="none"
                        />
                        <circle cx="10" cy="10" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                  </svg>
                </div>
              )}

              {/* Grid Pattern Overlay */}
              {bg.pattern === 'grid' && (
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-pattern" />
                </div>
              )}

              {/* Animated Elements */}
              <div className="absolute inset-0">
                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-electric-400 rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Electrical current lines */}
                <motion.div
                  className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-400 to-transparent opacity-30"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-30"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2,
                  }}
                />
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm" />
    </div>
  )
}

export default BackgroundSlideshow
