'use client';

import FeatureSection from './FeatureSection';
import Button from '../ui/Button';

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
      sectionClassName="bg-[var(--ica-bg)] [&_h2]:!font-[var(--font-heading)] [&_h2]:!text-[clamp(80px,6vw,87px)] [&_h3]:!font-[var(--font-ui)] [&_h3]:!text-[clamp(23px,2.5vw,25px)] [&_h3]:!font-semibold [&_p]:!font-[var(--font-body)] [&_p]:!font-normal [&_p]:!text-[var(--ica-green-deep)] [&_p]:!text-[21px] [&_.order-1]:order-2 [&_.order-2]:order-1 [&_.swiper]:max-md:aspect-[16/10] [&_.swiper]:max-md:h-auto [&_.swiper]:max-md:min-h-[300px] [&_.swiper]:max-md:max-h-[450px] [&_.swiper]:md:max-lg:aspect-[9/16] [&_.swiper]:md:max-lg:h-auto [&_.swiper]:md:max-lg:max-h-[550px] [&_.swiper]:lg:aspect-square [&_.swiper]:lg:h-auto [&_.swiper]:lg:max-h-none [&_.swiper_img]:max-md:object-[center_25%] [&_.swiper_img]:md:max-lg:object-[center_30%] [&_.swiper_img]:lg:object-[center_30%] [&_.swiper_img]:xl:object-center"
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
