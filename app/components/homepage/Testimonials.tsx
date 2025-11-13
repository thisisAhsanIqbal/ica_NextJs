// components/Testimonials.tsx
import TestimonialsHeader from './TestimonialsHeader';
import ReviewsSlider from './ReviewsSlider';
import TwoColumnQuotes from './TwoColumnQuotes';
import SpotlightQuote from './SpotlightQuote';

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
    const sections: JSX.Element[] = [];
    let twoColumnIndex = 0;
    let spotlightIndex = 0;

    // Render first TwoColumnQuotes section (ALLY + ANDREEA)
    if (twoColumnIndex < allTwoColumnSections.length) {
      sections.push(
        <TwoColumnQuotes 
          key={`twoCol-${twoColumnIndex}`}
          quotes={allTwoColumnSections[twoColumnIndex]} 
          altBackground={altBackground} 
        />
      );
      twoColumnIndex++;
    }

    // Render first SpotlightQuote (LEON)
    if (spotlightIndex < spotlightQuotes.length) {
      sections.push(
        <SpotlightQuote 
          key={`spotlight-${spotlightIndex}`}
          quote={spotlightQuotes[spotlightIndex]} 
          ariaLabel={`Testimonials - Spotlight ${spotlightIndex + 1}`} 
        />
      );
      spotlightIndex++;
    }

    // Render second TwoColumnQuotes section (CAROLINA + AMIRA)
    if (twoColumnIndex < allTwoColumnSections.length) {
      sections.push(
        <TwoColumnQuotes 
          key={`twoCol-${twoColumnIndex}`}
          quotes={allTwoColumnSections[twoColumnIndex]} 
          altBackground={!altBackground} 
        />
      );
      twoColumnIndex++;
    }

    // Render second SpotlightQuote (NICOLAS)
    if (spotlightIndex < spotlightQuotes.length) {
      sections.push(
        <SpotlightQuote 
          key={`spotlight-${spotlightIndex}`}
          quote={spotlightQuotes[spotlightIndex]} 
          ariaLabel={`Testimonials - Spotlight ${spotlightIndex + 1}`} 
        />
      );
      spotlightIndex++;
    }

    // Render any remaining sections in order
    while (twoColumnIndex < allTwoColumnSections.length) {
      sections.push(
        <TwoColumnQuotes 
          key={`twoCol-${twoColumnIndex}`}
          quotes={allTwoColumnSections[twoColumnIndex]} 
          altBackground={twoColumnIndex % 2 === 1 ? !altBackground : altBackground} 
        />
      );
      twoColumnIndex++;
    }

    while (spotlightIndex < spotlightQuotes.length) {
      sections.push(
        <SpotlightQuote 
          key={`spotlight-${spotlightIndex}`}
          quote={spotlightQuotes[spotlightIndex]} 
          ariaLabel={`Testimonials - Spotlight ${spotlightIndex + 1}`} 
        />
      );
      spotlightIndex++;
    }

    return sections;
  };

  return (
    <>
      {typingWords.length > 0 && (
        <TestimonialsHeader words={typingWords} />
      )}
      {reviews.length > 0 && (
        <ReviewsSlider reviews={reviews} />
      )}
      {renderOrderedSections()}
    </>
  );
}

