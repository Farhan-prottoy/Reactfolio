import React, { useState, useEffect } from 'react'

const DecryptedText = ({ text, trigger = false, className = "", duration = 1500 }) => {
  const [displayText, setDisplayText] = useState('')
  const [isDecrypting, setIsDecrypting] = useState(false)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  useEffect(() => {
    if (trigger && text && !isDecrypting) {
      setIsDecrypting(true)
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(prevText => 
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              if (char === ' ') return ' '
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          setIsDecrypting(false)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    } else if (!trigger) {
      setDisplayText('')
      setIsDecrypting(false)
    }
  }, [trigger, text, characters, isDecrypting])

  return (
    <span className={`${className} ${isDecrypting ? 'font-mono' : ''}`}>
      {displayText || (trigger ? text : '')}
    </span>
  )
}

export default DecryptedText
