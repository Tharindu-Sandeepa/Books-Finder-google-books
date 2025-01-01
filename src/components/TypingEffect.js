import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, delay, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let letterIndex = 0;
    const interval = setInterval(() => {
      if (letterIndex <= text.length) {
        setDisplayedText(text.substring(0, letterIndex));
        letterIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return (
    <p className="text-lg">{displayedText}</p>
  );
};

export default TypingEffect;