'use client';

import Image from 'next/image';
import ScrollReveal from '../shared/ScrollReveal';

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
      aria-labelledby="supporters-heading"
    >
      <div className="max-w-[1280px] mx-auto px-8 w-full max-md:px-4">
        
        {/* === HEADER SECTION === */}
        <ScrollReveal direction="up" delay={0} duration={0.6}>
          <div className="grid grid-cols-[2fr_3fr] gap-[clamp(20px,4vw,60px)] items-start mb-[clamp(40px,6vw,64px)] max-md:grid-cols-1 max-md:gap-6">
            <div>
              <h2 
                id="supporters-heading"
                className="m-0 font-[var(--font-heading)] font-semibold text-[clamp(40px,5vw,60px)] leading-[1.1] text-[var(--ica-green-deep)] tracking-tight"
              >
                {title}
              </h2>
              {/* Semantic divider line */}
              <div className="h-[3px] w-[60px] bg-[var(--ica-teal)] mt-5 rounded-full" role="presentation" />
            </div>
            <div>
              <p className="m-0 text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-[var(--ica-green-deep)] opacity-80 text-pretty">
                {description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* === SEMANTIC LOGO GRID === */}
        {logos.length > 0 && (
          /* GRID TRICK: We use a background color for the container 
             and a 1px gap to create perfect borders between items. 
          */
          <ul className="
            grid grid-cols-2 md:grid-cols-4 
            gap-[1px] bg-[var(--ica-green-deep)]/10 border border-[var(--ica-green-deep)]/10
            rounded-sm overflow-hidden
            p-0 m-0 list-none
          ">
            {logos.map((logo, index) => (
              <ScrollReveal 
                key={index}
                direction="up" 
                delay={0.2 + (index * 0.05)} 
                duration={0.5}
              >
                <li 
                  className="
                    group relative bg-[var(--ica-bg)] 
                    h-[180px] w-full
                    flex items-center justify-center p-8
                    hover:bg-white transition-colors duration-500
                  "
                >
                  {/* Figure tag used for semantic image wrapper */}
                  <figure className="relative w-full h-full flex items-center justify-center m-0 p-0">
                    <Image
                      className="
                        w-auto h-auto max-w-full max-h-[80px] object-contain 
                        opacity-60 grayscale mix-blend-multiply
                        
                        /* === PERFORMANCE OPTIMIZED ANIMATION === */
                        transform-gpu will-change-transform
                        transition-all duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94)
                        
                        /* Hover State */
                        group-hover:grayscale-0 
                        group-hover:opacity-100 
                        group-hover:scale-110 
                        group-hover:-translate-y-2
                        
                        /* Accessibility: Disable motion if user requests it */
                        motion-reduce:transition-none 
                        motion-reduce:transform-none
                      "
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      width={320} 
                      height={160}
                      quality={85} // Slight bump for crispness on logos
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                  </figure>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}