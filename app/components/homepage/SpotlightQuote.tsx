// components/SpotlightQuote.tsx
import Image from 'next/image';
import styles from './Testimonials.module.css';

interface SpotlightQuoteData {
  text: string;
  name: string;
  role: string;
  avatar_id?: number;
  avatar: string;
}

interface SpotlightQuoteProps {
  quote: SpotlightQuoteData;
  ariaLabel?: string;
}

export default function SpotlightQuote({ quote, ariaLabel }: SpotlightQuoteProps) {
  if (!quote) return null;

  const { text, name, role, avatar } = quote;

  return (
    <section
      className={styles.icaSpotlightQuote}
      aria-label={ariaLabel || 'Testimonials - Spotlight'}
    >
      <div className={styles.icaSpotlightQuoteContainer}>
        <div className={styles.spotlight}>
          <div className={styles.spotlightAvatar}>
            <Image
              className={styles.spotlightImg}
              src={avatar}
              alt={`${name} - ${role}`}
              loading="lazy"
              decoding="async"
              width="220"
              height="220"
              sizes="(min-width:1200px) 220px, (min-width:900px) 180px, 120px"
            />
          </div>
          <div className={styles.spotlightContent}>
            <blockquote className={styles.spotlightQuote}>
              &ldquo;{text}&rdquo;
            </blockquote>
            <div className={styles.spotlightMeta}>
              <cite className={styles.spotlightAttribution}>
                <span className={styles.spotlightName}>{name}</span>
                <span className={styles.spotlightRole}>, {role}</span>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}