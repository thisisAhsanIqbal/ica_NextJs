// components/History.tsx
'use client';

import FeatureSection from './FeatureSection';
import IcaButton from '../ui/IcaButton';
import styles from './History.module.css';

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

interface HistoryProps {
  title?: string;
  subtitle?: string; // This is the H3 headline
  paragraph?: string;
  highlight?: string;
  primaryIcaButton?: CtaButton;
  secondaryIcaButton?: CtaButton;
  slides?: SlideImage[];
}

export default function History({
  title = 'Our History',
  subtitle,
  paragraph,
  highlight,
  primaryIcaButton,
  secondaryIcaButton,
  slides = [],
}: HistoryProps) {
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
    if (normalizedLabel.includes('meet the team') || normalizedLabel.includes('team')) {
      return '/team/';
    }
    return ensureTrailingSlash(fallbackUrl); // Ensure trailing slash for fallback URL
  };

  return (
    <FeatureSection
      title={title}
      headline={subtitle}
      slides={featureSlides}
      mediaPosition="left"
      sectionClassName={styles.icaHistory}
    >
      {paragraph && <p>{paragraph}</p>}
      {highlight && (
        <p className={styles.historyHighlight}>{highlight}</p>
      )}

      <div className={styles.historyCtaButtons}>
        {primaryIcaButton?.label && primaryIcaButton?.url && (
          <IcaButton
            variant="white"
            href={getIcaButtonUrl(primaryIcaButton.label, primaryIcaButton.url)}
            aria-describedby="history-title"
            width="full"
          >
            {primaryIcaButton.label}
          </IcaButton>
        )}
        {secondaryIcaButton?.label && secondaryIcaButton?.url && (
          <IcaButton
            variant="white"
            href={getIcaButtonUrl(secondaryIcaButton.label, secondaryIcaButton.url)}
            aria-describedby="history-title"
            width="full"
          >
            {secondaryIcaButton.label}
          </IcaButton>
        )}
      </div>
    </FeatureSection>
  );
}