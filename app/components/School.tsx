// components/School.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import styles from './School.module.css';

interface SchoolProps {
  title?: string;
  headline?: string;
  paragraphs?: string[];
  cta?: {
    label: string;
    url?: string;
  };
  logoSrc?: string;
  logoAlt?: string;
  slides?: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  onInterestListClick?: () => void;
}

export default function School({
  title = 'The School',
  headline,
  paragraphs = [],
  cta,
  logoSrc,
  logoAlt = 'The School Logo',
  slides = [],
  onInterestListClick,
}: SchoolProps) {

  const handleCTAClick = () => {
    if (cta?.url && cta.url !== '#') {
      // Regular link - handled by Link component
      return;
    } else {
      // Popup trigger
      onInterestListClick?.();
    }
  };

  return (
    <section className={styles.icaSchool} aria-labelledby="school-title">
      <div className={styles.sectionInner}>
        <div className={styles.icaSchoolGrid}>
          {/* Media Column (Left) */}
          <figure className={styles.icaSchoolMedia}>
            {slides.length > 0 ? (
              <Swiper
                className={styles.icaSchoolSlider}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                keyboard={true}
                role="region"
                aria-label="School image gallery"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.schoolSlide}>
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className={styles.schoolSlideImg}
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding="async"
                        sizes="(min-width: 1025px) 530px, (min-width: 768px) 500px, 100vw"
                        quality={index === 0 ? 90 : 85}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                className={styles.icaSchoolPlaceholder}
                role="img"
                aria-label="School image placeholder"
              >
                <div className={styles.icaSchoolPlaceholderContent}>
                  <span
                    className={styles.icaSchoolPlaceholderIcon}
                    aria-hidden="true"
                  >
                    🎓
                  </span>
                  <p>School images loading...</p>
                </div>
              </div>
            )}

            {/* Optional Overlay Logo */}
            {logoSrc && (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={250}
                height={118}
                className={styles.schoolLogo}
                aria-hidden="true"
                loading="lazy"
              />
            )}
          </figure>

          {/* Content Column (Right) */}
          <div className={styles.icaSchoolCopy}>
            <h2 className={styles.eyebrow}>
              <Link
                href="/school/"
                aria-label="Learn more about The School"
              >
                {title}
              </Link>
            </h2>

            {headline && (
              <h3 id="school-title">{headline}</h3>
            )}

            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {cta?.label && (
              <>
                {cta.url && cta.url !== '#' ? (
                  <Link
                    href={cta.url}
                    className={`${styles.btnIcaLime} ${styles.btnIcaLimeFullWidth}`}
                  >
                    {cta.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={`${styles.btnIcaLime} ${styles.btnIcaLimeFullWidth} ${styles.schoolInterestBtn}`}
                    onClick={handleCTAClick}
                    aria-expanded="false"
                    aria-haspopup="dialog"
                    aria-label={`${cta.label} - Opens interest list form`}
                  >
                    {cta.label}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}