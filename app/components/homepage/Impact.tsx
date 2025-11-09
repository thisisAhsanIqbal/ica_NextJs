// components/Impact.tsx
'use client';

import FeatureSection from './FeatureSection';
import Button from '../ui/Button';
import styles from './Impact.module.css';

interface CtaButton {
  label: string;
  url: string;
}

interface SlideImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImpactProps {
  title?: string;
  headline?: string;
  paragraphs?: string[];
  ctaButtons?: CtaButton[];
  logoSrc?: string;
  logoAlt?: string;
  slides?: SlideImage[];
  // This prop is for the extra "DANCE" info that was hardcoded in the PHP
  additionalSession?: {
    text: string;
    cta: CtaButton;
  };
}

export default function Impact({
  title = 'IMPACT',
  headline,
  paragraphs = [],
  ctaButtons = [],
  logoSrc,
  logoAlt = 'IMPACT Logo',
  slides = [],
  additionalSession,
}: ImpactProps) {
  // Handle paragraph splitting based on PHP logic
  // (Last 2 paragraphs are styled as 'sessionInfo')
  const mainParagraphs = paragraphs.slice(0, -2);
  const sessionParagraphs = paragraphs.slice(-2);

  // Convert slides to FeatureSection format
  const featureSlides = slides.map(slide => ({
    src: slide.src,
    alt: slide.alt,
  }));

  return (
    <FeatureSection
      title={title}
      titleLink="/impact/"
      headline={headline}
      slides={featureSlides}
      logoSrc={logoSrc}
      logoAlt={logoAlt}
      mediaPosition="right"
      sectionClassName="bg-[var(--ica-lavender)] relative [&_h2]:!font-[var(--font-heading)] [&_h2]:!text-[clamp(80px,6vw,85px)] [&_h3]:!font-[var(--font-ui)] [&_h3]:!text-[clamp(21px,2.5vw,22px)] [&_h3]:!font-semibold [&_p]:!font-[var(--font-body)] [&_p]:!font-normal [&_p]:!text-[var(--ica-green-deep)] [&_p]:!text-[clamp(19px,2.5vw,22px)] [&_p]:!mb-4 [&_.swiper]:max-md:aspect-[16/10] [&_.swiper]:max-md:h-auto [&_.swiper]:max-md:min-h-[300px] [&_.swiper]:max-md:max-h-[450px] [&_.swiper]:md:max-lg:aspect-[9/16] [&_.swiper]:md:max-lg:h-auto [&_.swiper]:md:max-lg:max-h-[550px] [&_.swiper]:lg:aspect-square [&_.swiper]:lg:h-auto [&_.swiper]:lg:max-h-none [&_.swiper_img]:max-md:object-[center_25%] [&_.swiper_img]:md:max-lg:object-[center_30%] [&_.swiper_img]:lg:object-[center_30%] [&_.swiper_img]:xl:object-center"
    >
      {mainParagraphs.map((p, index) => (
        <p key={index}>{p}</p>
      ))}

      {/* Session Info (from $paragraphs) */}
      <div className={styles.sessionInfoContainer}>
        {sessionParagraphs.map((p, index) => (
          <h3 key={index} className={styles.sessionInfo}>
            {p}
          </h3>
        ))}
      </div>

      {/* CTA Buttons (Winter/Summer) */}
      {ctaButtons.length > 0 && (
        <div
          className={styles.impactCtaButtons}
          role="group"
          aria-label="IMPACT program actions"
        >
          {ctaButtons.map((button, index) => {
            // Logic to assign button variant based on label, from impact.php
            const buttonVariant =
              button.label.toLowerCase() === 'winter'
                ? 'primary'
                : button.label.toLowerCase() === 'summer'
                ? 'white'
                : 'primary'; // Default

            return (
              <Button
                key={index}
                variant={buttonVariant as 'primary' | 'white'}
                href={button.url}
                aria-describedby="impact-title"
                className="flex-1 min-w-0 w-full"
              >
                {button.label}
              </Button>
            );
          })}
        </div>
      )}

      {/* Additional DANCE Session Info (from prop) */}
      {additionalSession && (
        <>
          <div className={styles.sessionInfoContainer}>
            <h3 className={styles.sessionInfo}>
              {additionalSession.text}
            </h3>
          </div>
          <div
            className={styles.impactCtaButtons}
            role="group"
            aria-label="DANCE program action"
          >
            <Button
              variant="primary"
              href={additionalSession.cta.url}
              width="full"
              aria-describedby="impact-title"
            >
              {additionalSession.cta.label}
            </Button>
          </div>
        </>
      )}
    </FeatureSection>
  );
}