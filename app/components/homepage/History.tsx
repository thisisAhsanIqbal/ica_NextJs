// components/History.tsx
'use client';

import FeatureSection from './FeatureSection';
import Button from '../ui/Button';
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
  primaryButton?: CtaButton;
  secondaryButton?: CtaButton;
  slides?: SlideImage[];
}

export default function History({
  title = 'Our History',
  subtitle,
  paragraph,
  highlight,
  primaryButton,
  secondaryButton,
  slides = [],
}: HistoryProps) {
  // Convert slides to FeatureSection format
  const featureSlides = slides.map(slide => ({
    src: slide.src,
    alt: slide.alt,
  }));

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
        {primaryButton?.label && primaryButton?.url && (
          <Button
            variant="white"
            href={primaryButton.url}
            aria-describedby="history-title"
            width="full"
          >
            {primaryButton.label}
          </Button>
        )}
        {secondaryButton?.label && secondaryButton?.url && (
          <Button
            variant="white"
            href={secondaryButton.url}
            aria-describedby="history-title"
            width="full"
          >
            {secondaryButton.label}
          </Button>
        )}
      </div>
    </FeatureSection>
  );
}