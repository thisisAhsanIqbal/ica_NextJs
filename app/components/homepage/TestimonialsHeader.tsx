// components/TestimonialsHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

interface TestimonialsHeaderProps {
  words: string[];
}

const TYPE_SPEED = 120;
const DELETE_SPEED = 90;
const END_PAUSE = 2000; // Slightly longer pause feels more natural

export default function TestimonialsHeader({
  words,
}: TestimonialsHeaderProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate current text during render (Derived State) - Removes one useState
  const currentWord = words[wordIndex % words.length];
  const currentText = currentWord.substring(0, charIndex);

  // Determine if cursor should blink (blinks when fully typed and waiting)
  const isWaiting = !isDeleting && charIndex === currentWord.length;

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        // Deleting
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      } else {
        // Typing
        if (charIndex < currentWord.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      }
    };

    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(handleTyping, DELETE_SPEED);
    } else if (charIndex === currentWord.length) {
      // Context: Finished typing word, pause before deleting
      timer = setTimeout(handleTyping, END_PAUSE);
    } else {
      // Context: Typing normally
      timer = setTimeout(handleTyping, TYPE_SPEED);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentWord, wordIndex]);

  // SEO & A11y: Create a static string of all words for screen readers
  const screenReaderText = `ICA... ${words.join(', ')}`;

  return (
    <section
      className={styles.icaTestimonials}
      aria-label="Testimonials"
    >
      <div className={styles.icaTestimonialsLevel1}>
        <div className={styles.sectionInnerWide}>
          <div className={styles.icaTestimonialsLevel2}>
            
            {/* Screen Reader Only Text */}
            <h2 className={styles.srOnly}>{screenReaderText}</h2>

            <div
              className={styles.icaTestimonialsTyping}
              aria-hidden="true" // Hide animation from screen readers
            >
              <div className={styles.icaTestimonialsTypingContainer}>
                <span className={styles.ica}>ICA...</span>
                <span 
                  className={`${styles.typingTarget} ${isWaiting ? styles.blinkingCursor : ''}`}
                >
                  {currentText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}