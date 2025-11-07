'use client';

import FeatureSection from './FeatureSection';
import Button from '../ui/Button';
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

function School({
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

  // Convert slides to FeatureSection format
  const featureSlides = slides.map(slide => ({
    src: slide.src,
    alt: slide.alt,
  }));

  return (
    <FeatureSection
      title={title}
      titleLink="/school/"
      headline={headline}
      slides={featureSlides}
      logoSrc={logoSrc}
      logoAlt={logoAlt}
      mediaPosition="left"
      sectionClassName={styles.icaSchool}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      {cta?.label && (
        <>
          {cta.url && cta.url !== '#' ? (
            <Button
              variant="lime"
              href={cta.url}
              width="full"
            >
              {cta.label}
            </Button>
          ) : (
            <Button
              type="button"
              variant="lime"
              width="full"
              onClick={handleCTAClick}
              aria-expanded="false"
              aria-haspopup="dialog"
              aria-label={`${cta.label} - Opens interest list form`}
            >
              {cta.label}
            </Button>
          )}
        </>
      )}
    </FeatureSection>
  );
}

export default School;
