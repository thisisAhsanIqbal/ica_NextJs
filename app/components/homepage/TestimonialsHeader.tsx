// components/TestimonialsHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

interface TestimonialsHeaderProps {
  words: string[];
}

const TYPE_SPEED = 120;
const DELETE_SPEED = 90;
const END_PAUSE = 1300;

export default function TestimonialsHeader({
  words,
}: TestimonialsHeaderProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const typeLoop = () => {
      if (isDeleting) {
        // Deleting
        setCurrentText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      } else {
        // Typing
        setCurrentText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === currentWord.length) {
          setIsDeleting(true);
        }
      }
    };

    let nextDelay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    if (!isDeleting && charIndex === currentWord.length) {
      nextDelay = END_PAUSE;
    }

    const timer = setTimeout(typeLoop, nextDelay);
    return () => clearTimeout(timer);
    
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <section
      className={styles.icaTestimonials}
      aria-label="Testimonials"
    >
      <div className={styles.icaTestimonialsLevel1}>
        <div className={styles.sectionInnerWide}>
          <div className={styles.icaTestimonialsLevel2}>
            <div
              className={styles.icaTestimonialsTyping}
              data-duration="3000"
              aria-label="ICA Mission Statement"
            >
              <div className={styles.icaTestimonialsTypingContainer}>
                <span className={styles.ica}>ICA...</span>
                <span className={styles.typingTarget} aria-live="polite">
                  {currentText}
                </span>
              </div>
            </div>
            {/* Data node is no longer needed as words are passed via props */}
          </div>
        </div>
      </div>
    </section>
  );
}