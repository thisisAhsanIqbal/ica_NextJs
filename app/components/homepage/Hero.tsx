// components/Hero.tsx
'use client';

import { useId } from 'react';
import FeatureSection from './FeatureSection';
import styles from './Hero.module.css';
import IcaButton from '../ui/IcaButton';
import { usePopup } from '@/app/contexts/PopupContext';
import { homeStayConnectedPopup, homeDonatePopup } from '@/app/data/popupData';
import { createGiveSmartPopupOptions } from '@/app/lib/popupHelpers';

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
  primaryIcaButton: {
    label: string;
    url: string;
  };
  secondaryIcaButton: {
    label: string;
  };
  tertiaryIcaButton: {
    label: string;
  };
  heroImages: HeroImage[];
}

export default function Hero({
  headline,
  subhead,
  paragraph,
  primaryIcaButton,
  secondaryIcaButton,
  tertiaryIcaButton,
  heroImages,
}: HeroProps) {
  const { openPopup } = usePopup();

  const reactId = useId();
  const heroId = `hero-${reactId.replace(/:/g, '-')}`;

  // Convert heroImages to slides format
  const slides = heroImages.map(img => ({
    src: img.src,
    alt: img.alt,
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
    if (normalizedLabel.includes('learn more')) {
      return '/team/';
    }
    return ensureTrailingSlash(fallbackUrl); // Ensure trailing slash for fallback URL
  };

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

        {(primaryIcaButton?.url || secondaryIcaButton?.label || tertiaryIcaButton?.label) && (
          <div
            className="flex flex-col gap-4 md:gap-[1.2rem] mt-4 md:mt-2 ml-0 md:ml-[5px] p-[3px] justify-start w-full"
            id={`hero-actions-${heroId}`}
            role="group"
            aria-label="Hero section actions"
          >
            {/* First Row: Two IcaButtons */}
            <div className="flex items-stretch w-full max-w-full gap-4 md:gap-7 justify-stretch flex-row flex-nowrap">
              {primaryIcaButton?.url && (
                <IcaButton
                  href={getIcaButtonUrl(primaryIcaButton.label, primaryIcaButton.url)}
                  variant="primary"
                  className="flex-1 min-w-0 w-full"
                  id={`hero-btn-primary-${heroId}`}
                  aria-describedby={`${heroId}-headline`}
                  itemProp="url"
                  itemScope
                  itemType="https://schema.org/ReadAction"
                >
                  <span itemProp="name">{primaryIcaButton.label}</span>
                </IcaButton>
              )}

              {secondaryIcaButton?.label && (
                <IcaButton
                  type="button"
                  variant="primary"
                  className="flex-1 min-w-0 w-full"
                  id={`hero-btn-secondary-${heroId}`}
                  onClick={() => openPopup(homeDonatePopup, createGiveSmartPopupOptions(homeDonatePopup))}
                  aria-haspopup="dialog"
                  aria-describedby={`${heroId}-headline`}
                  itemProp="potentialAction"
                  itemScope
                  itemType="https://schema.org/DonateAction"
                >
                  <span itemProp="name">{secondaryIcaButton.label}</span>
                </IcaButton>
              )}
            </div>

            {/* Second Row: Full-width IcaButton */}
            {tertiaryIcaButton?.label && (
              <div className="flex items-stretch w-full max-w-full gap-0 justify-stretch flex-row flex-nowrap md:gap-0">
                <IcaButton
                  type="button"
                  variant="primary"
                  width="full"
                  id={`hero-btn-tertiary-${heroId}`}
                  onClick={() => openPopup(homeStayConnectedPopup)}
                  aria-haspopup="dialog"
                  aria-describedby={`${heroId}-headline`}
                  itemProp="potentialAction"
                  itemScope
                  itemType="https://schema.org/SubscribeAction"
                >
                  <span itemProp="name">{tertiaryIcaButton.label}</span>
                </IcaButton>
              </div>
            )}
          </div>
        )}
      </FeatureSection>

    </header>
  );
}