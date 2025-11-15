// components/Events.tsx
'use client';

import FeatureSection from './FeatureSection';
import IcaButton from '../ui/IcaButton';
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
  primaryIcaButton?: CtaButton;
  secondaryIcaButton?: CtaButton;
  slides?: SlideImage[];
}

export default function Events({
  title = 'Events',
  subtitle,
  paragraph,
  primaryIcaButton,
  secondaryIcaButton,
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
  const getIcaButtonUrl = (label: string, fallbackUrl: string) => {
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
        {primaryIcaButton?.label && primaryIcaButton?.url && (
          <IcaButton
            variant="white"
            href={getIcaButtonUrl(primaryIcaButton.label, primaryIcaButton.url)}
            aria-label={primaryIcaButton['aria-label']}
            aria-describedby="events-title"
            itemProp="url"
            itemScope
            itemType="https://schema.org/ReadAction"
          >
            <span itemProp="name">{primaryIcaButton.label}</span>
          </IcaButton>
        )}
        {secondaryIcaButton?.label && secondaryIcaButton?.url && (
          <IcaButton
            variant="white"
            href={getIcaButtonUrl(secondaryIcaButton.label, secondaryIcaButton.url)}
            aria-label={secondaryIcaButton['aria-label']}
            aria-describedby="events-title"
            itemProp="url"
            itemScope
            itemType="https://schema.org/ReadAction"
          >
            <span itemProp="name">{secondaryIcaButton.label}</span>
          </IcaButton>
        )}
      </div>
    </FeatureSection>
  );
}