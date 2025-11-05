'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ArtsAreas.module.css';

interface ArtsAreaItem {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  subs: string[];
}

interface ArtsAreasProps {
  heading?: string;
  items: ArtsAreaItem[];
}

export default function ArtsAreas({
  heading = 'Arts Areas',
  items,
}: ArtsAreasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  // Scroll-triggered animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: immediately show content
      section.classList.add(styles.artsAreasAnimateIn);
      cardsRef.current.forEach((card) => {
        if (card) card.classList.add(styles.artsAreasAnimateIn);
      });
      return;
    }

    // Create intersection observer for section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.artsAreasAnimateIn);
            // Animate cards with staggered delays (handled by CSS)
            cardsRef.current.forEach((card) => {
              if (card) {
                card.classList.add(styles.artsAreasAnimateIn);
              }
            });
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '50px 0px -50px 0px', // Start 50px before viewport
      }
    );

    sectionObserver.observe(section);

    // Cleanup
    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  // Split title into first word and remaining words
  const splitTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length >= 2) {
      return {
        firstWord: words[0],
        remainingWords: words.slice(1).join(' '),
      };
    }
    return {
      firstWord: title,
      remainingWords: '',
    };
  };

  return (
    <section
      ref={sectionRef}
      className={styles.artsAreas}
      aria-labelledby="programs-heading"
    >
      <div className={styles.artsAreasSectionInner}>
        <h2 id="programs-heading" className={styles.artsAreasSectionHeading}>
          {heading}
        </h2>
        <ul className={styles.artsAreasGrid} role="list">
          {items.map((item, index) => {
            const { firstWord, remainingWords } = splitTitle(item.title);
            return (
              <li key={index} className={styles.artsAreasItem}>
                <article
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={styles.artsAreasCard}
                >
                  <div className={styles.artsAreasCardContent}>
                    {item.iconSrc && (
                      <Image
                        src={item.iconSrc}
                        alt={item.iconAlt || `${item.title} icon`}
                        width={40}
                        height={40}
                        className={styles.artsAreasIcon}
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          console.error('Failed to load icon:', item.iconSrc, e);
                        }}
                      />
                    )}
                  </div>
                  <h3 className={styles.artsAreasTitle}>
                    {remainingWords ? (
                      <>
                        <span className={styles.artsAreasFirstWord}>{firstWord}</span>
                        <br className={styles.artsAreasDesktopBreak} />
                        <span className={styles.artsAreasRemainingWords}>
                          {remainingWords}
                        </span>
                      </>
                    ) : (
                      firstWord
                    )}
                  </h3>
                  {item.subs && item.subs.length > 0 && (
                    <ul className={styles.artsAreasSublist} role="list">
                      {item.subs.map((sub, subIndex) => (
                        <li key={subIndex}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

