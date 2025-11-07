// components/Hero.tsx
'use client';

import { useState, useId } from 'react';
import FeatureSection from './FeatureSection';
import styles from './Hero.module.css';
import DonatePopup from '../ui/DonatePopup';
import NewsletterPopup from '../ui/NewsletterPopup';
import Button from '../ui/Button';

interface HeroImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface HeroProps {
  headline: string;
  subhead: string;
  paragraph: string;
  primaryButton: {
    label: string;
    url: string;
  };
  secondaryButton: {
    label: string;
  };
  tertiaryButton: {
    label: string;
  };
  heroImages: HeroImage[];
}

export default function Hero({
  headline,
  subhead,
  paragraph,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  heroImages,
}: HeroProps) {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const reactId = useId();
  const heroId = `hero-${reactId.replace(/:/g, '-')}`;

  // Convert heroImages to slides format
  const slides = heroImages.map(img => ({
    src: img.src,
    alt: img.alt,
  }));

  // Parse headline to safely render <br /> and <em> tags
  const parseHeadline = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let keyCounter = 0;

    // First split by <br /> tags
    const lines = text.split('<br />');
    
    lines.forEach((line, lineIndex) => {
      // Process <em> tags within each line
      const emRegex = /<em>(.*?)<\/em>/g;
      let lastIndex = 0;
      let match;

      while ((match = emRegex.exec(line)) !== null) {
        // Add text before <em>
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add <em> content
        parts.push(<em key={`em-${keyCounter++}`}>{match[1]}</em>);
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after last <em>
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      // Add <br /> between lines (except after last line)
      if (lineIndex < lines.length - 1) {
        parts.push(<br key={`br-${keyCounter++}`} />);
      }
    });

    return parts.length > 0 ? parts : [text];
  };

  return (
    <header>
      <FeatureSection
        slides={slides}
        mediaPosition="right"
        sectionClassName={`${styles.hero} print:!bg-transparent print:!text-[var(--ica-green-deep)]`}
        isHero={true}
      >
        {headline && (
          <h1
            className="!font-[var(--font-heading)] !font-semibold !text-[var(--ica-green-deep)] !mb-[clamp(0.5rem,2vw,1.5rem)] !text-left !leading-none [&_em]:italic [&_em]:font-[var(--font-heading)] [&_em]:font-semibold"
            id={`${heroId}-headline`}
          >
            {parseHeadline(headline)}
          </h1>
        )}

        {subhead && (
          <p 
            className="!text-[21px] md:!text-[22px] !leading-[1.35em] !font-bold !text-[rgba(0,0,0,0.7)] !m-0 !text-left mb-3 md:mb-0"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {subhead}
          </p>
        )}

        {paragraph && (
          <p className="!font-[var(--font-body)] !text-[21px] md:!text-[22px] lg:!text-[23px] !leading-[1.3] !font-normal !text-[rgba(0,0,0,0.7)] !m-0 !text-justify">{paragraph}</p>
        )}

        {(primaryButton?.url || secondaryButton?.label || tertiaryButton?.label) && (
          <div
            className="flex flex-col gap-4 md:gap-[1.2rem] mt-4 md:mt-2 ml-0 md:ml-[5px] p-[3px] justify-start w-full"
            id={`hero-actions-${heroId}`}
            role="group"
            aria-label="Hero section actions"
          >
            {/* First Row: Two Buttons */}
            <div className="flex items-stretch w-full max-w-full gap-4 md:gap-7 justify-stretch flex-row flex-nowrap">
              {primaryButton?.url && (
                <Button
                  href={primaryButton.url}
                  variant="primary"
                  className="flex-1 min-w-0 w-full"
                  id={`hero-btn-primary-${heroId}`}
                  aria-describedby={`${heroId}-headline`}
                >
                  {primaryButton.label}
                </Button>
              )}

              {secondaryButton?.label && (
                <Button
                  type="button"
                  variant="primary"
                  className="flex-1 min-w-0 w-full"
                  id={`hero-btn-secondary-${heroId}`}
                  onClick={() => setIsDonateOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isDonateOpen}
                  aria-describedby={`${heroId}-headline`}
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>

            {/* Second Row: Full-width Button */}
            {tertiaryButton?.label && (
              <div className="flex items-stretch w-full max-w-full gap-0 justify-stretch flex-row flex-nowrap md:gap-0">
                <Button
                  type="button"
                  variant="primary"
                  width="full"
                  id={`hero-btn-tertiary-${heroId}`}
                  onClick={() => setIsNewsletterOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isNewsletterOpen}
                  aria-describedby={`${heroId}-headline`}
                >
                  {tertiaryButton.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </FeatureSection>

      {/* Popups */}
      <DonatePopup isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      {/* <NewsletterPopup isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} /> */}
    </header>
  );
}