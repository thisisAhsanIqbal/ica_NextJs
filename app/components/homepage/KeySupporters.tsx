import Image from 'next/image';

interface Logo {
  src: string;
  alt: string;
}

interface KeySupportersProps {
  title?: string;
  description?: string;
  logos?: Logo[];
}

export default function KeySupporters({
  title = 'Key Supporters',
  description = 'These organizations are significant supporters of Illinois Conservatory for the Arts and the work we do. We appreciate your commitment to our students and furthering arts education for our community.',
  logos = [],
}: KeySupportersProps) {
  return (
    <section
      id="ica-key-supporters"
      className="bg-[var(--ica-bg)] py-[var(--global-padding-desktop)] [contain:layout] max-[480px]:py-[var(--global-padding-mobile)]"
      aria-label="Key Supporters"
    >
      <div className="max-w-[1280px] mx-auto px-8 w-full max-md:px-4">
        
        {/* HEADER: Clean 2-column layout */}
        <div className="grid grid-cols-[2fr_3fr] gap-[clamp(20px,4vw,60px)] items-start mb-[clamp(40px,6vw,64px)] max-md:grid-cols-1 max-md:gap-4">
          <div>
            <h2 className="m-0 font-[var(--font-heading)] font-semibold text-[clamp(40px,5vw,60px)] leading-[1.1] text-[var(--ica-green-deep)] tracking-tight">
              {title}
            </h2>
            {/* Decorative line to match Policy component */}
            <div className="h-[3px] w-[60px] bg-[var(--ica-teal)] mt-4" />
          </div>
          <div>
            <p className="m-0 text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-[var(--ica-green-deep)] opacity-80 text-pretty">
              {description}
            </p>
          </div>
        </div>

        {/* LOGO GRID */}
        {logos.length > 0 && (
          // Using borders instead of gap for a "Museum Wall" look
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[var(--ica-green-deep)]/10">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className="
                  group relative flex items-center justify-center 
                  h-[160px] p-8 
                  border-r border-b border-[var(--ica-green-deep)]/10
                  hover:bg-white/40 transition-colors duration-300
                "
              >
                <Image
                  // Grayscale by default, Color on hover (Standard for premium sites)
                  className="w-auto h-auto max-w-full max-h-[80px] object-contain opacity-60 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 mix-blend-multiply"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  // Increased dimensions for Retina displays (3x original)
                  width={300} 
                  height={150}
                  sizes="(min-width: 900px) 25vw, (min-width: 640px) 50vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}