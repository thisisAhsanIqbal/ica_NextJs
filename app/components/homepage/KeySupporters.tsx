// components/KeySupporters.tsx
import Image from 'next/image';
import styles from './KeySupporters.module.css';

interface Logo {
  src: string;
  alt: string;
}

interface KeySupportersProps {
  title?: string;
  description?: string;
  logos?: Logo[];
}

export default function KeySupporters({
  title = 'Key Supporters',
  description = 'These organizations are significant supporters of Illinois Conservatory for the Arts and the work we do. We appreciate your commitment to our students and furthering arts education for our community.',
  logos = [],
}: KeySupportersProps) {
  return (
    <section
      id="ica-key-supporters"
      className={styles.icaKeySupporters}
      aria-label="Key Supporters"
    >
      <div className={styles.sectionInner}>
        <div className={styles.keySupportersIntro}>
          <div className={`${styles.introCol} ${styles.introColTitle}`}>
            <h2 className={styles.introTitle}>{title}</h2>
          </div>
          <div className={`${styles.introCol} ${styles.introColDesc}`}>
            <p className={styles.introDesc}>{description}</p>
          </div>
        </div>

        {logos.length > 0 && (
          <div className={styles.keySupportersGrid}>
            {logos.map((logo, index) => (
              <figure key={index} className={styles.supporter}>
                <Image
                  className={styles.supporterImg}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  width={120} // Base width from PHP
                  height={70} // Base height from PHP
                  sizes="(min-width: 900px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
                <figcaption className={styles.srOnly}>
                  {logo.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}