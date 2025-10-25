'use client'

import { useState, useEffect } from 'react'

interface UseTypingEffectOptions {
  text: string
  speed?: number
  delay?: number
}

export function useTypingEffect({ text, speed = 100, delay = 0 }: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    let timeoutId: NodeJS.Timeout

    const typeText = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
        timeoutId = setTimeout(typeText, speed)
      } else {
        setIsComplete(true)
      }
    }

    const startTyping = () => {
      setDisplayText('')
      setIsComplete(false)
      index = 0
      typeText()
    }

    timeoutId = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay])

  return { displayText, isComplete }
}
