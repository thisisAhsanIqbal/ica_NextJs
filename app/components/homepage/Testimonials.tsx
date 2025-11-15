// components/Testimonials.tsx
'use client';

import TestimonialsHeader from './TestimonialsHeader';
import ReviewsSlider from './ReviewsSlider';
import TwoColumnQuotes from './TwoColumnQuotes';
import SpotlightQuote from './SpotlightQuote';
import ScrollReveal from '../shared/ScrollReveal';

interface Review {
  image_id?: number;
  image: string;
  text: string;
}

interface Quote {
  text: string;
  highlights?: string[];
  name: string;
  role: string;
  avatar_id?: number;
  avatar: string;
  isParent?: boolean;
}

interface SpotlightQuoteData {
  text: string;
  name: string;
  role: string;
  avatar_id?: number;
  avatar: string;
}

interface TestimonialsProps {
  typingWords?: string[];
  reviews?: Review[];
  twoColumnQuotes?: Quote[];
  twoColumnQuotesSections?: Quote[][];
  spotlightQuotes?: SpotlightQuoteData[];
  altBackground?: boolean;
}

export default function Testimonials({
  typingWords = [],
  reviews = [],
  twoColumnQuotes = [],
  twoColumnQuotesSections = [],
  spotlightQuotes = [],
  altBackground = false,
}: TestimonialsProps) {
  // Combine single twoColumnQuotes with sections array
  const allTwoColumnSections = twoColumnQuotes.length > 0 
    ? [twoColumnQuotes, ...twoColumnQuotesSections]
    : twoColumnQuotesSections;

  // Interleave TwoColumnQuotes and SpotlightQuotes in the correct order
  // Order: TwoColumnQuotes 1 -> SpotlightQuote 1 (LEON) -> TwoColumnQuotes 2 -> SpotlightQuote 2 (NICOLAS)
  const renderOrderedSections = () => {
    const sections: React.ReactNode[] = [];
    let twoColumnIndex = 0;
    let spotlightIndex = 0;
    let sectionIndex = 0; // Track total sections for animation delay

    // Render first TwoColumnQuotes section (ALLY + ANDREEA)
    if (twoColumnIndex < allTwoColumnSections.length) {
      sections.push(
        <ScrollReveal 
          key={`twoCol-${twoColumnIndex}`}
          direction="up" 
          delay={0.1 + (sectionIndex * 0.15)} 
          duration={0.6}
        >
          <TwoColumnQuotes 
            quotes={allTwoColumnSections[twoColumnIndex]} 
            altBackground={altBackground} 
          />
        </ScrollReveal>
      );
      twoColumnIndex++;
      sectionIndex++;
    }

    // Render first SpotlightQuote (LEON)
    if (spotlightIndex < spotlightQuotes.length) {
      sections.push(
        <ScrollReveal 
          key={`spotlight-${spotlightIndex}`}
          direction="up" 
          delay={0.1 + (sectionIndex * 0.15)} 
          duration={0.6}
        >
          <SpotlightQuote 
            quote={spotlightQuotes[spotlightIndex]} 
            ariaLabel={`Testimonials - Spotlight ${spotlightIndex + 1}`} 
          />
        </ScrollReveal>
      );
      spotlightIndex++;
      sectionIndex++;
    }

    // Render second TwoColumnQuotes section (CAROLINA + AMIRA)
    if (twoColumnIndex < allTwoColumnSections.length) {
      sections.push(
        <ScrollReveal 
          key={`twoCol-${twoColumnIndex}`}
          direction="up" 
          delay={0.1 + (sectionIndex * 0.15)} 
          duration={0.6}
        >
          <TwoColumnQuotes 
            quotes={allTwoColumnSections[twoColumnIndex]} 
            altBackground={!altBackground} 
          />
        </ScrollReveal>
      );
      twoColumnIndex++;
      sectionIndex++;
    }

    // Render second SpotlightQuote (NICOLAS)
    if (spotlightIndex < spotlightQuotes.length) {
      sections.push(
        <ScrollReveal 
          key={`spotlight-${spotlightIndex}`}
          direction="up" 
          delay={0.1 + (sectionIndex * 0.15)} 
          duration={0.6}
        >
          <SpotlightQuote 
            quote={spotlightQuotes[spotlightIndex]} 
            ariaLabel={`Testimonials - Spotlight ${spotlightIndex + 1}`} 
          />
        </ScrollReveal>
      );
      spotlightIndex++;
      sectionIndex++;
    }

    // Render any remaining sections in order
    while (twoColumnIndex < allTwoColumnSections.length) {
      sections.push(
        <ScrollReveal 
          key={`twoCol-${twoColumnIndex}`}
          direction="up" 
          delay={0.1 + (sectionIndex * 0.15)} 
          duration={0.6}
        >
          <TwoColumnQuotes 
            quotes={allTwoColumnSections[twoColumnIndex]} 
            altBackground={twoColumnIndex % 2 === 1 ? !altBackground : altBackground} 
          />
        </ScrollReveal>
      );
      twoColumnIndex++;
      sectionIndex++;
    }

    while (spotlightIndex < spotlightQuotes.length) {
      sections.push(
        <ScrollReveal 
          key={`spotlight-${spotlightIndex}`}
          direction="up" 
          delay={0.1 + (sectionIndex * 0.15)} 
          duration={0.6}
        >
          <SpotlightQuote 
            quote={spotlightQuotes[spotlightIndex]} 
            ariaLabel={`Testimonials - Spotlight ${spotlightIndex + 1}`} 
          />
        </ScrollReveal>
      );
      spotlightIndex++;
      sectionIndex++;
    }

    return sections;
  };

  return (
    <>
      {typingWords.length > 0 && (
        <ScrollReveal direction="up" delay={0} duration={0.6}>
          <TestimonialsHeader words={typingWords} />
        </ScrollReveal>
      )}
      {reviews.length > 0 && (
        <ScrollReveal direction="up" delay={0.1} duration={0.6}>
          <ReviewsSlider reviews={reviews} />
        </ScrollReveal>
      )}
      {renderOrderedSections()}
    </>
  );
}

