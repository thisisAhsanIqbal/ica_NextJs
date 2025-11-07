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

  return (
    <>
      {typingWords.length > 0 && (
        <TestimonialsHeader words={typingWords} />
      )}
      {reviews.length > 0 && (
        <ReviewsSlider reviews={reviews} />
      )}
      {allTwoColumnSections.map((quotes, sectionIndex) => (
        <TwoColumnQuotes 
          key={sectionIndex}
          quotes={quotes} 
          altBackground={sectionIndex % 2 === 1 ? !altBackground : altBackground} 
        />
      ))}
      {spotlightQuotes.length > 0 && spotlightQuotes.map((quote, index) => (
        <SpotlightQuote 
          key={index} 
          quote={quote} 
          ariaLabel={`Testimonials - Spotlight ${index + 1}`} 
        />
      ))}
    </>
  );
}

