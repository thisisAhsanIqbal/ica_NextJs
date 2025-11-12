// components/PastFacultySlider.jsx
"use client";

import React, { useMemo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// --- Static Data (defined once, globally) ---
const facultyData = [
  {
    image: "/asserts/SamanthaPauly.webp",
    name: "SAMANTHA PAULY",
    role: "SIX",
    credits: "ORIGINAL BROADWAY CAST",
  },
  {
    image: "/asserts/TaylorLouderman.webp",
    name: "TAYLOR LOUDERMAN",
    role: "MEAN GIRLS",
    credits: "TONY NOMINATED BEST ACTRESS",
  },
  {
    image: "/asserts/JJNiemann.webp",
    name: "JJ NIEMANN",
    role: "BOOK OF MORMON, BACK TO THE FUTURE",
    credits: "TIKTOK STAR / BROADWAY ACTOR",
  },
  {
    image: "/asserts/MerriSugarman.webp",
    name: "MERRI SUGARMAN",
    role: "TARA RUBIN CASTING",
    credits: "BROADWAY CASTING DIRECTOR",
  },
  {
    image: "/asserts/ErikaHenningson.webp",
    name: "ERIKA HENNINGSON",
    role: "JUST IN TIME, MEAN GIRLS",
    credits: "BROADWAY ACTRESS DIRECTOR",
  },
  {
    image: "/asserts/GalenJWilliams.webp",
    name: "GALEN J. WILLIAMS",
    role: "SLAVE PLAY, MOTOWN",
    credits: "BROADWAY ACTOR",
  },
  {
    image: "/asserts/SalishaThomas.webp",
    name: "SALISHA THOMAS",
    role: "ONCE UPON A ONE MORE TIME",
    credits: "BROADWAY ACTRESS",
  },
  {
    image: "/asserts/ZonyaLove.webp",
    name: "ZONYA LOVE",
    role: "BEETLEJUICE, THE COLOR PURPLE TIME",
    credits: "BROADWAY ACTRESS",
  },
  {
    image: "/asserts/ChazWolcott.webp",
    name: "CHAZ WOLCOTT",
    role: "NEWSIES",
    credits: "BROADWAY ACTOR",
  },
  {
    image: "/asserts/JustinPrescott.webp",
    name: "JUSTIN PRESCOTT",
    role: "FUNNY GIRL",
    credits: "BROADWAY ACTOR",
  },
  {
    image: "/asserts/EmilyKristenMorris.webp",
    name: "EMILY KRISTEN MORRIS",
    role: "WICKED",
    credits: "TIKTOK STAR / BROADWAY ACTRESS",
  },
  {
    image: "/asserts/JudithFranklin.webp",
    name: "JUDITH FRANKLIN",
    role: "TINA, SUMMER",
    credits: "BROADWAY ACTOR",
  },
  {
    image: "/asserts/ChawntaVan.webp",
    name: "CHAWNTA VAN",
    role: "LIZZO",
    credits: "PROFESSIONAL DANCER CAST",
  },
  {
    image: "/asserts/AbbyMueller.webp",
    name: "ABBY MUELLER",
    role: "SIX, BEAUTIFUL",
    credits: "ORIGINAL BROADWAY CAST",
  },
  {
    image: "/asserts/FanaTesfagiorgis.webp",
    name: "FANA TESFAGIORGIS",
    role: "MY FAIR LADY, AILEY",
    credits: "BROADWAY DANCER",
  },
];

const marqueeIcons = [
  { src: "/asserts/IconArt.png", alt: "Visual Arts icon" },
  { src: "/asserts/IconChat.png", alt: "Communication icon" },
  { src: "/asserts/IconLightbulb.png", alt: "Arts Business icon" },
  { src: "/asserts/IconMedia.png", alt: "Media Arts icon" },
  { src: "/asserts/IconTech.png", alt: "Technology icon" },
  { src: "/asserts/IconMusic.png", alt: "Music icon" },
];
// ------------------------------------

const PastFacultySlider = () => {

  // Memoize marquee content to prevent unnecessary re-renders
  const marqueeContent = useMemo(() => {
    return [...Array(4)].map((_, index) => (
      <React.Fragment key={index}>
        {marqueeIcons.map((icon, i) => (
          <React.Fragment key={`${index}-${i}`}>
            <span 
              className="font-ui text-[34px] md:text-[50px] font-medium text-[#03332e] uppercase tracking-[2px] mx-4 whitespace-nowrap"
              aria-hidden="true"
            >
              PAST FACULTY
            </span>
            <Image
              src={icon.src}
              alt={icon.alt}
              width={48}
              height={48}
              className="w-12 h-12 object-contain mx-4"
              loading="lazy"
              sizes="48px"
              aria-hidden="true"
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    ));
  }, []);

  // Embla Carousel autoplay plugin
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: false,
      skipSnaps: false,
    },
    [autoplayPlugin]
  );

  // Progress bar state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress
  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollProgress = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setScrollProgress(progress);
    };

    emblaApi.on("scroll", updateScrollProgress);
    emblaApi.on("reInit", updateScrollProgress);
    updateScrollProgress();

    return () => {
      emblaApi.off("scroll", updateScrollProgress);
      emblaApi.off("reInit", updateScrollProgress);
    };
  }, [emblaApi]);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      }
    };

    const emblaNode = emblaApi.containerNode();
    emblaNode.addEventListener("keydown", handleKeyDown);
    emblaNode.setAttribute("tabIndex", "0");
    emblaNode.setAttribute("aria-label", "Past faculty members carousel");

    return () => {
      emblaNode.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi, scrollPrev, scrollNext]);

  return (
    <section 
      className="w-full my-8 overflow-hidden flex flex-col"
      aria-labelledby="faculty-heading"
    >
        <h2 id="faculty-heading" className="sr-only">
          Past Faculty Members
        </h2>
        
        {/* Row 1: Marquee Animation */}
        <div className="w-full overflow-hidden py-6" aria-hidden="true">
          <div 
            className="flex items-center will-change-transform [transform:translateZ(0)] marquee-container"
          >
            {marqueeContent}
          </div>
          <style jsx>{`
            @keyframes marquee-scroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-scroll-mobile {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .marquee-container {
              animation: marquee-scroll-mobile 25s linear infinite;
              white-space: nowrap;
            }
            @media (min-width: 768px) {
              .marquee-container {
                animation: marquee-scroll 45s linear infinite !important;
              }
            }
          `}</style>
        </div>

        {/* Row 2: Embla Carousel Slider */}
        <div className="relative w-full flex justify-center items-center" style={{ marginTop: '2.5rem', marginBottom: '2.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
          {/* Previous Button - Outside Slider */}
          <button
            className="relative z-10 text-[#03332e] bg-white/90 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 hidden md:flex mr-4"
            onClick={scrollPrev}
            aria-label="Previous faculty member"
            type="button"
          >
            <Image
              src="/asserts/left-nav.svg"
              alt="Previous"
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            />
          </button>

          {/* Slider Container */}
          <div className="relative w-full max-w-[1600px] px-16 md:px-2">
            <div 
              className="overflow-hidden w-full" 
              ref={emblaRef}
              aria-label="Past faculty members carousel"
            >
              <div className="flex gap-2.5 md:gap-2.5 lg:gap-[15px] 2xl:gap-5">
                {facultyData.map((faculty, index) => (
                  <div
                    key={`${faculty.name}-${index}`}
                    className="flex-none min-w-0 flex-[0_0_100%] md:flex-[0_0_calc((100%-10px)/2)] lg:flex-[0_0_calc((100%-30px)/3)] 2xl:flex-[0_0_calc((100%-60px)/4)]"
                  >
                    <article className="faculty-slider-card relative w-full block aspect-[3/4] md:scale-105 lg:scale-110 transition-all duration-200 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_15px_25px_rgba(0,0,0,0.1)] rounded-[30px] overflow-hidden">
                      <div className="relative w-full h-full overflow-hidden rounded-[30px]">
                        <Image
                          src={faculty.image}
                          alt={`${faculty.name} - ${faculty.role}`}
                          fill
                          className="w-full h-full block object-cover bg-[#f5f5f5]"
                          sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, (max-width: 1600px) 33vw, 25vw"
                          loading={index < 2 ? "eager" : "lazy"}
                          priority={index < 2}
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUzMyIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
                        />
                      </div>
                      <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 w-[90%] z-[2] bg-[#f9f6f4] text-[#03332e] p-5 text-center min-h-[80px] flex flex-col justify-center items-center box-border">
                        <h3 className="faculty-name font-ui text-[16px] text-[#03332e] m-0 mb-1.5 uppercase leading-tight font-semibold">
                          {faculty.name}
                        </h3>
                        {faculty.credits && (
                          <p className="font-body italic font-medium !text-[13px] text-[#03332e] m-0 mb-1 leading-snug uppercase">
                            {faculty.credits}
                          </p>
                        )}
                        {faculty.role && (
                          <p className="font-body !text-[13px] text-[#03332e] m-0 leading-snug uppercase font-normal">
                            {faculty.role}
                          </p>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button - Outside Slider */}
          <button
            className="relative z-10 text-[#03332e] bg-white/90 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 hidden md:flex ml-4"
            onClick={scrollNext}
            aria-label="Next faculty member"
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 5L11 9L7 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Row 3: Progress Bar */}
        <div className="relative w-full flex justify-center items-center" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="relative w-[30%] h-1 bg-black/10 overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 w-full bg-[#03332e] origin-left transition-transform duration-200 ease-in-out"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>
      </section>
  );
};

export default PastFacultySlider;
