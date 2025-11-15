'use client';

import Image from 'next/image';
import styles from './ArtsAreas.module.css';
import ScrollReveal from '../shared/ScrollReveal';

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
      className={styles.artsAreas}
      aria-labelledby="programs-heading"
    >
      <div className={styles.artsAreasSectionInner}>
        <ScrollReveal direction="up" delay={0} duration={0.6}>
          <h2 id="programs-heading" className={styles.artsAreasSectionHeading}>
            {heading}
          </h2>
        </ScrollReveal>
        <ul className={styles.artsAreasGrid} role="list">
          {items.map((item, index) => {
            const { firstWord, remainingWords } = splitTitle(item.title);
            return (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={0.1 + (index * 0.1)} 
                duration={0.5}
              >
                <li className={styles.artsAreasItem}>
                  <article className={styles.artsAreasCard}>
                    <div className={styles.artsAreasCardContent}>
                      {item.iconSrc && (
                        <Image
                          src={item.iconSrc}
                          alt={item.iconAlt || `${item.title} icon`}
                          width={40}
                          height={40}
                          className={styles.artsAreasIcon}
                          style={{ width: 'auto', height: 'auto' }}
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
                          <span className={styles.artsAreasSpace}> </span>
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
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
