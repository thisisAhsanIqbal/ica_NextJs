'use client';

import { useEffect, useRef, useState, useId } from 'react';
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
  const [isInitialMount, setIsInitialMount] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial mount - delay auto-rotation until after page transition
  useEffect(() => {
    // Wait for page transition to complete (500ms) + small buffer
    const mountTimer = setTimeout(() => {
      setIsInitialMount(false);
    }, 600);

    return () => clearTimeout(mountTimer);
  }, []);

  // Auto-rotate slider
  useEffect(() => {
    if (heroImages.length <= 1) return;
    // Don't start auto-rotation until after initial mount/page transition
    if (isInitialMount) return;

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
  }, [heroImages.length, isInitialMount]);

  // Keyboard navigation (only when slider is focused)
  useEffect(() => {
    if (heroImages.length <= 1) return;
    
    const slider = sliderRef.current;
    if (!slider) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if slider is focused or contains focused element
      if (!slider.contains(document.activeElement)) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }
    };

    slider.addEventListener('keydown', handleKeyDown);
    return () => slider.removeEventListener('keydown', handleKeyDown);
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

  const heroId = useId();

  return (
    <>
      <section
        className={styles.heroHome}
        id={heroId}
        role="banner"
        aria-labelledby={`${heroId}-headline`}
      >
        <div className={styles.heroHomeSectionInner}>
          <div className={styles.heroHomeGrid}>
            {/* Content Column (Left) */}
            <div className={styles.heroHomeContent} role="main">
              {headline && (
                <h1
                  className={styles.heroHomeHeadline}
                  id={`${heroId}-headline`}
                  dangerouslySetInnerHTML={{ __html: headline }}
                />
              )}

              {subhead && (
                <p className={styles.heroHomeSubhead}>{subhead}</p>
              )}

              {paragraph && (
                <p className={styles.heroHomeParagraph}>{paragraph}</p>
              )}

              {(primaryButton?.url || secondaryButton?.label || tertiaryButton?.label) && (
                <div
                  className={styles.heroHomeActions}
                  id={`hero-actions-${heroId}`}
                  role="group"
                  aria-label="Hero section actions"
                >
                  {/* First Row: Two Buttons */}
                  <div className={styles.heroHomeActionsRow}>
                    {primaryButton?.url && (
                      <Link
                        href={primaryButton.url}
                        className={styles.heroHomeBtnIca}
                        id={`hero-btn-primary-${heroId}`}
                        aria-describedby={`${heroId}-headline`}
                      >
                        {primaryButton.label}
                      </Link>
                    )}

                    {secondaryButton?.label && (
                      <button
                        type="button"
                        className={styles.heroHomeBtnIca}
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
                    <div className={styles.heroHomeActionsRow}>
                      <button
                        type="button"
                        className={`${styles.heroHomeBtnIca} ${styles.heroHomeBtnIcaFullWidth}`}
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
            <div className={styles.heroHomeMedia}>
              {heroImages && heroImages.length > 0 ? (
                <div className={styles.heroHomeMediaWrapper}>
                  <div
                    className={styles.heroHomeSlider}
                    ref={sliderRef}
                    role="region"
                    aria-label="Hero image gallery"
                    tabIndex={0}
                    aria-live="polite"
                    aria-atomic="true"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {heroImages.map((image, index) => {
                      const isActive = index === currentSlide;
                      return (
                        <div
                          key={`${image.src}-${index}`}
                          className={`${styles.heroHomeSlide} ${
                            isActive ? styles.heroHomeSlideActive : ''
                          } ${isInitialMount && index === 0 ? styles.heroHomeSlideInitial : ''}`}
                          role="img"
                          aria-label={image.alt}
                          aria-hidden={!isActive}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width || 1100}
                            height={image.height || 650}
                            className={styles.heroHomeSlideImg}
                            priority={index === 0}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 550px, 1100px"
                            quality={90}
                            onError={(e) => {
                              console.error('Failed to load image:', image.src, e);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className={styles.heroHomePlaceholder} role="img" aria-label="Hero image placeholder">
                  <div className={styles.heroHomePlaceholderContent}>
                    <span className={styles.heroHomePlaceholderIcon} aria-hidden="true">
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

