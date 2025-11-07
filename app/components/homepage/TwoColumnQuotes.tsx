// components/TwoColumnQuotes.tsx
import Image from 'next/image';
import styles from './Testimonials.module.css';

interface Quote {
  text: string;
  highlights?: string[];
  name: string;
  role: string;
  avatar_id?: number;
  avatar: string;
  isParent?: boolean;
}

interface TwoColumnQuotesProps {
  quotes: Quote[];
  altBackground?: boolean;
}

// Helper to highlight text
function HighlightedText({ text, highlights = [] }: { text: string, highlights: string[] }) {
  if (highlights.length === 0) {
    return <>{text}</>;
  }
  // Escape special regex characters in highlights
  const escapedHighlights = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className={styles.quoteHl}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function TwoColumnQuotes({
  quotes = [],
  altBackground = false,
}: TwoColumnQuotesProps) {
  if (quotes.length === 0) return null;

  const sectionClasses = [
    styles.icaTwoColQuotes,
    altBackground ? styles.icaTwoColQuotesAlt : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} aria-label="Testimonials - Quotes">
      <div className={styles.icaTwoColQuotesContainer}>
        <div className={styles.twoColQuotes}>
          {quotes.slice(0, 2).map((q, idx) => (
            <article key={idx} className={styles.quoteCard}>
              <blockquote className={styles.quoteCardText}>
                <HighlightedText text={q.text} highlights={q.highlights || []} />
              </blockquote>
              <footer className={styles.quoteCardPerson}>
                {q.isParent ? (
                  <Image
                    className={styles.parentVerifiedBadge}
                    src="/asserts/home/Icon Parent Verified.png"
                    alt="Parent Verified"
                    loading="lazy"
                    decoding="async"
                    width="93"
                    height="93"
                    sizes="93px"
                  />
                ) : (
                  <Image
                    className={styles.quoteCardAvatar}
                    src={q.avatar}
                    alt={`${q.name} - ${q.role}`}
                    loading="lazy"
                    decoding="async"
                    width="93"
                    height="93"
                    sizes="60px"
                  />
                )}
                <cite className={styles.quoteCardMeta}>
                  <span className={styles.quoteCardName}>{q.name}</span>
                  <span className={styles.quoteCardRole}>{q.role}</span>
                </cite>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}