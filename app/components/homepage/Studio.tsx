// components/Studio.tsx

'use client';

// 1. Import our reusable layout component

import FeatureSection from './FeatureSection';
import Button from '../ui/Button'; 

// 2. Keep the module CSS for UNIQUE styles

import styles from './Studio.module.css';

// ... (Interface definitions remain the same) ...

interface CtaButton {

  label: string;

  url: string;

  'aria-label'?: string;

}

interface SlideImage {

  src: string;

  alt: string;

}

interface StudioProps {

  title?: string;

  subtitle?: string; // This is the H3 headline

  paragraph?: string;

  highlight?: string;

  primaryButton?: CtaButton;

  secondaryButton?: CtaButton;

  logoSrc?: string;

  logoAlt?: string;

  slides?: SlideImage[];

}

export default function Studio({

  title = 'The Studio',

  subtitle,

  paragraph,

  highlight,

  primaryButton,

  secondaryButton,

  logoSrc,

  logoAlt = 'The Studio Logo',

  slides = [],

}: StudioProps) {

  // Convert slides to FeatureSection format
  const featureSlides = slides.map(slide => ({
    src: slide.src,
    alt: slide.alt,
  }));

  // Ensure trailing slash for internal URLs
  const ensureTrailingSlash = (url: string): string => {
    // Don't modify external URLs (http/https)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Add trailing slash if missing for internal URLs
    return url.endsWith('/') ? url : `${url}/`;
  };

  // Map button labels to their slugs/URLs
  const getButtonUrl = (label: string, fallbackUrl: string) => {
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel.includes('learn more')) return '/studio/';
    if (normalizedLabel.includes('register now') || normalizedLabel.includes('register')) {
      return 'https://register.ilconservatory.org/studio';
    }
    return ensureTrailingSlash(fallbackUrl); // Ensure trailing slash for fallback URL
  };

  return (

    // 3. Use the FeatureSection component

    <FeatureSection

      title={title}

      titleLink="/studio/"

      headline={subtitle}

      slides={featureSlides}

      logoSrc={logoSrc}

      logoAlt={logoAlt}

      // 4. Pass in the unique props for this component

      mediaPosition="left" // From Studio.module.css logic

      sectionClassName={styles.icaStudio} // This provides the mint background

    >

      {/* 5. Pass all unique content as children */}

      {paragraph && <p>{paragraph}</p>}

      {highlight && (

        <p className={styles.studioHighlight}>{highlight}</p>

      )}

      <div className={styles.studioCtaButtons}>

        {primaryButton?.label && primaryButton?.url && (

          <Button

            variant="primary"

            href={getButtonUrl(primaryButton.label, primaryButton.url)}

            aria-label={primaryButton['aria-label']}

            className="flex-1 min-w-0 w-full"

          >

            {primaryButton.label}

          </Button>

        )}

        {secondaryButton?.label && secondaryButton?.url && (

          <Button

            variant="white"

            href={getButtonUrl(secondaryButton.label, secondaryButton.url)}

            className="flex-1 min-w-0 w-full"

          >

            {secondaryButton.label}

          </Button>

        )}

      </div>

    </FeatureSection>

  );

}