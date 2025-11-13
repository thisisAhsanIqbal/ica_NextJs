// components/Events.tsx
'use client';

import FeatureSection from './FeatureSection';
import Button from '../ui/Button';
import styles from './Events.module.css';

interface CtaButton {
  label: string;
  url: string;
  'aria-label'?: string;
}

interface SlideImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface EventsProps {
  title?: string;
  subtitle?: string; // This is the H3 headline
  paragraph?: string;
  primaryButton?: CtaButton;
  secondaryButton?: CtaButton;
  slides?: SlideImage[];
}

export default function Events({
  title = 'Events',
  subtitle,
  paragraph,
  primaryButton,
  secondaryButton,
  slides = [],
}: EventsProps) {
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
    if (normalizedLabel.includes('see our upcoming events') || normalizedLabel.includes('upcoming events')) {
      return '/events/';
    }
    return ensureTrailingSlash(fallbackUrl); // Ensure trailing slash for fallback URL
  };

  return (
    <FeatureSection
      title={title}
      headline={subtitle}
      slides={featureSlides}
      mediaPosition="right"
      sectionClassName={styles.icaEvents}
    >
      {paragraph && <p>{paragraph}</p>}

      <div
        className={styles.eventsCtaButtons}
        role="group"
        aria-label="Events actions"
      >
        {primaryButton?.label && primaryButton?.url && (
          <Button
            variant="white"
            href={getButtonUrl(primaryButton.label, primaryButton.url)}
            aria-label={primaryButton['aria-label']}
            aria-describedby="events-title"
          >
            {primaryButton.label}
          </Button>
        )}
        {secondaryButton?.label && secondaryButton?.url && (
          <Button
            variant="white"
            href={getButtonUrl(secondaryButton.label, secondaryButton.url)}
            aria-label={secondaryButton['aria-label']}
            aria-describedby="events-title"
          >
            {secondaryButton.label}
          </Button>
        )}
      </div>
    </FeatureSection>
  );
}