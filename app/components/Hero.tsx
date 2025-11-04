'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import DonatePopup from './DonatePopup';
import NewsletterPopup from './NewsletterPopup';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate slider
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const startAutoRotation = () => {
      if (intervalRef.current) return;
      
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
    };

    const pauseAutoRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startAutoRotation();

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('mouseenter', pauseAutoRotation);
      slider.addEventListener('mouseleave', startAutoRotation);
      slider.addEventListener('focusin', pauseAutoRotation);
      slider.addEventListener('focusout', startAutoRotation);
    }

    return () => {
      pauseAutoRotation();
      if (slider) {
        slider.removeEventListener('mouseenter', pauseAutoRotation);
        slider.removeEventListener('mouseleave', startAutoRotation);
        slider.removeEventListener('focusin', pauseAutoRotation);
        slider.removeEventListener('focusout', startAutoRotation);
      }
    };
  }, [heroImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [heroImages.length]);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    }
  };

  const heroId = `hero-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <section
        className={styles.hero}
        id={heroId}
        role="banner"
        aria-labelledby={`${heroId}-headline`}
      >
        <div className={styles.sectionInner}>
          <div className={styles.heroGrid}>
            {/* Content Column (Left) */}
            <div className={styles.heroContent} role="main">
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
                <div
                  className={styles.heroSlider}
                  ref={sliderRef}
                  role="region"
                  aria-label="Hero image gallery"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`${styles.heroSlide} ${
                        index === currentSlide ? styles.active : ''
                      }`}
                      role="img"
                      aria-label={image.alt}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width || 1100}
                        height={image.height || 650}
                        className={styles.heroSlideImg}
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding={index === 0 ? 'sync' : 'async'}
                        sizes="(min-width: 1280px) 1100px, (min-width: 768px) 640px, 92vw"
                      />
                    </div>
                  ))}
                </div>
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
      <NewsletterPopup isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </>
  );
}

