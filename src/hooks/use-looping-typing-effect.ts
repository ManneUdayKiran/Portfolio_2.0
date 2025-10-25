"use client";

import { useState, useEffect, useRef } from "react";

interface UseLoopingTypingEffectOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
  initialDelay?: number;
}

export function useLoopingTypingEffect({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
  initialDelay = 0,
}: UseLoopingTypingEffectOptions) {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setCurrentTextIndex(textIndex);
          timeoutId = setTimeout(type, typeSpeed);
        } else {
          timeoutId = setTimeout(type, deleteSpeed);
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentText.length) {
          setIsComplete(true);
          isDeleting = true;
          timeoutId = setTimeout(type, delayBetween);
        } else {
          setIsComplete(false);
          timeoutId = setTimeout(type, typeSpeed);
        }
      }
    };

    // Start typing after initial delay
    timeoutId = setTimeout(type, initialDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [texts, typeSpeed, deleteSpeed, delayBetween, initialDelay]);

  return { displayText, isComplete, currentTextIndex };
}
