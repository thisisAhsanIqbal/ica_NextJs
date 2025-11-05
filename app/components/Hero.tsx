// components/Hero.tsx
'use client';

// Import Swiper components (CSS is globally available via layout.tsx)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import { useState, useId } from 'react'; // Keep for popups
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import DonatePopup from './DonatePopup';
import NewsletterPopup from './NewsletterPopup'; // Assuming you create a similar popup

interface HeroImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface HeroProps {
  headline: string;
  subhead: string;
  paragraph: string;
  primaryButton: {
    label: string;
    url: string;
  };
  secondaryButton: {
    label: string;
  };
  tertiaryButton: {
    label: string;
  };
  heroImages: HeroImage[];
}

export default function Hero({
  headline,
  subhead,
  paragraph,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  heroImages,
}: HeroProps) {
  // 2. We only need state for the popups now
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // 3. ALL the slider-related useEffects, useRefs, 
  //    and handleTouch functions have been DELETED.

  // Use useId() for stable SSR-safe IDs (fixes hydration mismatch)
  const reactId = useId();
  const heroId = `hero-${reactId.replace(/:/g, '-')}`;

  return (
    <>
      <section
        className={styles.hero}
        id={heroId}
        aria-labelledby={`${heroId}-headline`}
      >
        <div className={styles.sectionInner}>
          <div className={styles.heroGrid}>
            {/* Content Column (Left) */}
            <div className={styles.heroContent}>
              {headline && (
                <h1
                  className={styles.heroHeadline}
                  id={`${heroId}-headline`}
                  dangerouslySetInnerHTML={{ __html: headline }}
                />
              )}

              {subhead && (
                <p className={styles.heroSubhead}>{subhead}</p>
              )}

              {paragraph && (
                <p className={styles.heroParagraph}>{paragraph}</p>
              )}

              {(primaryButton?.url || secondaryButton?.label || tertiaryButton?.label) && (
                <div
                  className={styles.heroActions}
                  id={`hero-actions-${heroId}`}
                  role="group"
                  aria-label="Hero section actions"
                >
                  {/* First Row: Two Buttons */}
                  <div className={styles.heroActionsRow}>
                    {primaryButton?.url && (
                      <Link
                        href={primaryButton.url}
                        className={styles.btnIca}
                        id={`hero-btn-primary-${heroId}`}
                        aria-describedby={`${heroId}-headline`}
                      >
                        {primaryButton.label}
                      </Link>
                    )}

                    {secondaryButton?.label && (
                      <button
                        type="button"
                        className={styles.btnIca}
                        id={`hero-btn-secondary-${heroId}`}
                        onClick={() => setIsDonateOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={isDonateOpen}
                        aria-describedby={`${heroId}-headline`}
                      >
                        {secondaryButton.label}
                      </button>
                    )}
                  </div>

                  {/* Second Row: Full-width Button */}
                  {tertiaryButton?.label && (
                    <div className={styles.heroActionsRow}>
                      <button
                        type="button"
                        className={`${styles.btnIca} ${styles.btnIcaFullWidth}`}
                        id={`hero-btn-tertiary-${heroId}`}
                        onClick={() => setIsNewsletterOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={isNewsletterOpen}
                        aria-describedby={`${heroId}-headline`}
                      >
                        {tertiaryButton.label}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Media Column (Right) */}
            <div className={styles.heroMedia}>
              {heroImages && heroImages.length > 0 ? (
                // 4. Replace the custom slider div with the Swiper component
                <Swiper
                  className={styles.heroSlider} // Use your existing class for sizing
                  modules={[Autoplay, EffectFade]} // Add modules
                  effect="fade" // Use fade effect like the guide
                  fadeEffect={{ crossFade: true }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: true, // Pauses on hover/touch
                  }}
                  loop={true}
                  keyboard={true} // Enables keyboard navigation
                  style={{
                    // Ensure Swiper respects your border-radius
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                  }}
                  role="region"
                  aria-label="Hero image gallery"
                >
                  {heroImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.heroSlide}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className={styles.heroSlideImg}
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          sizes="(min-width: 1280px) 1100px, (min-width: 768px) 640px, 92vw"
                          quality={index === 0 ? 90 : 85}
                          placeholder={index === 0 ? 'blur' : undefined}
                          blurDataURL={index === 0 ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEwMCIgaGVpZ2h0PSI2NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjExMDAiIGhlaWdodD0iNjUwIiBmaWxsPSIjRjlGNkY0Ii8+PC9zdmc+' : undefined}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className={styles.heroPlaceholder} role="img" aria-label="Hero image placeholder">
                  <div className={styles.heroPlaceholderContent}>
                    <span className={styles.heroPlaceholderIcon} aria-hidden="true">
                      🎵
                    </span>
                    <p>Hero images loading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popups */}
      <DonatePopup isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      {/* <NewsletterPopup isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} /> */}
    </>
  );
}