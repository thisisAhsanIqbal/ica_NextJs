// components/homepage/FeatureSection.tsx

'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import styles from './FeatureSection.module.css';

// Define the props for the slides
interface Slide {
  src: string;
  alt: string;
}

interface AutoplayConfig {
  delay?: number;
  disableOnInteraction?: boolean;
  pauseOnMouseEnter?: boolean;
  enabled?: boolean;
}

interface FeatureSectionProps {
  // === Content Props ===
  children: ReactNode; // This is where we'll pass paragraphs & buttons
  title?: string; // For the "eyebrow" text
  titleLink?: string; // Link for the eyebrow
  headline?: string;
  // === Media Props ===
  slides: Slide[];
  logoSrc?: string; // For the optional logo overlay
  logoAlt?: string;
  // === Layout Props ===
  mediaPosition: 'left' | 'right';
  sectionClassName?: string; // For custom backgrounds (e.g., mint, lavender)
  eyebrowClassName?: string; // For custom eyebrow styles (e.g., Hero vs School)
  headlineClassName?: string; // For custom headline styles
  isHero?: boolean; // Flag to identify hero section for special styling
  // === Slider Props ===
  autoplayConfig?: AutoplayConfig; // Custom autoplay configuration per component
}

export default function FeatureSection({
  children,
  title,
  titleLink,
  headline,
  slides,
  logoSrc,
  logoAlt,
  mediaPosition,
  sectionClassName = '',
  eyebrowClassName = '',
  headlineClassName = '',
  isHero = false,
  autoplayConfig,
}: FeatureSectionProps) {
  // Content always first (order-1), Slider always second (order-2) on all screens
  const contentOrderClass = 'order-1';
  const mediaOrderClass = 'order-2';

  // Default autoplay configuration
  const defaultAutoplay = {
    delay: 4500,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  };

  // Merge custom autoplay config with defaults
  const autoplaySettings = autoplayConfig?.enabled === false 
    ? false 
    : {
        delay: autoplayConfig?.delay ?? defaultAutoplay.delay,
        disableOnInteraction: autoplayConfig?.disableOnInteraction ?? defaultAutoplay.disableOnInteraction,
        pauseOnMouseEnter: autoplayConfig?.pauseOnMouseEnter ?? defaultAutoplay.pauseOnMouseEnter,
      };

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Reset image counter when slides change
  useEffect(() => {
    setImagesLoaded(0);
  }, [slides]);

  // Update swiper when images are loaded to fix blank slides in loop mode
  useEffect(() => {
    if (swiperInstance && imagesLoaded === slides.length && slides.length > 1) {
      // Small delay to ensure all images are rendered
      setTimeout(() => {
        swiperInstance.update();
        swiperInstance.slideTo(0, 0); // Reset to first slide
      }, 100);
    }
  }, [imagesLoaded, slides.length, swiperInstance]);

  return (
    <section
      className={`w-full !py-8 md:!py-16 lg:!py-20 relative ${sectionClassName}`}
    >
      <div className="max-w-[1280px] w-full !mx-auto !px-4 sm:!px-6 md:!px-8 block">
        {/* 50/50 Grid Layout with Tailwind */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[clamp(2rem,4vw,4rem)] items-center w-full">
          {/* --- Content Column --- */}
          <div className={`flex flex-col gap-[clamp(1rem,2vw,1.5rem)] ${contentOrderClass}`}>
            {title && (
              <h2 className={`font-[var(--font-heading)] text-[clamp(65px,6vw,75px)] font-light leading-none text-[var(--ica-green-deep)] m-0 mb-[0.6rem] [&_a]:text-inherit [&_a]:no-underline [&_a:hover]:text-inherit [&_a:focus]:text-inherit [&_a:active]:text-inherit ${eyebrowClassName}`}>
                {titleLink ? <Link href={titleLink}>{title}</Link> : title}
              </h2>
            )}

            {headline && <h3 className={`font-[var(--font-ui)] text-[clamp(18px,2.5vw,24px)] leading-[1.3em] font-bold text-[var(--ica-green-deep)] m-0 ${headlineClassName}`}>{headline}</h3>}

            {/* All unique content (paragraphs, buttons) goes here */}
            {children}
          </div>

          {/* --- Media Column --- */}
          <figure className={`relative flex justify-center items-center w-full min-h-[300px] ${mediaOrderClass}`}>
            {slides.length > 0 ? (
              <Swiper
                className={`relative w-full aspect-[1100/650] h-[60vh] rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] ${styles.slider} ${isHero ? styles.heroSlider : ''}`}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={autoplaySettings}
                loop={slides.length > 1}
                loopAdditionalSlides={slides.length > 1 ? 2 : 0}
                loopPreventsSliding={false}
                keyboard={{ enabled: true }}
                speed={600}
                allowTouchMove={true}
                grabCursor={true}
                watchOverflow={true}
                role="region"
                aria-label={`${title || headline} image gallery`}
                onSwiper={(swiper) => {
                  setSwiperInstance(swiper);
                  // Initial update after swiper is initialized
                  if (slides.length > 1) {
                    setTimeout(() => {
                      swiper.update();
                    }, 100);
                  }
                }}
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={`${slide.src}-${index}`}>
                    <div className="relative w-full h-full bg-[var(--ica-bg)]">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className={`w-full h-full object-cover object-center block ${isHero ? 'max-md:object-[center_25%] md:object-[center_30%] lg:object-[center_30%] xl:object-center' : ''}`}
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        sizes="(min-width: 1025px) 50vw, (min-width: 768px) 50vw, 100vw"
                        quality={85}
                        onError={(e) => {
                          console.error(`Failed to load image: ${slide.src}`, e);
                        }}
                        onLoad={() => {
                          // Track loaded images to update swiper when all are ready
                          setImagesLoaded((prev) => {
                            const newCount = prev + 1;
                            return newCount;
                          });
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full aspect-[1100/650] h-[60vh] rounded-3xl flex items-center justify-center border-2 border-dashed border-[var(--ica-green-deep)]">
                <p>Images loading...</p>
              </div>
            )}

            {logoSrc && (
              <Image
                src={logoSrc}
                alt={logoAlt || ''}
                width={250}
                height={118}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)] pointer-events-none z-10"
                loading="lazy"
              />
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
