"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./PastFacultySection.module.css";

// Swiper styles are globally imported in app/layout.tsx
// No need to import here to avoid duplication

// Faculty data interface
export interface FacultyMember {
  image: string;
  name: string;
  role: string;
  credits: string;
}

// Icon data for marquee (matching order from PastFacultySlider)
const marqueeIcons = [
  { src: "/asserts/IconArt.png", alt: "Visual Arts icon" },
  { src: "/asserts/IconChat.png", alt: "Communication icon" },
  { src: "/asserts/IconLightbulb.png", alt: "Arts Business icon" },
  { src: "/asserts/IconMedia.png", alt: "Media Arts icon" },
  { src: "/asserts/IconTech.png", alt: "Technology icon" },
  { src: "/asserts/IconMusic.png", alt: "Music icon" },
];

// Faculty data (from PastFacultySlider.jsx)
const defaultFacultyData: FacultyMember[] = [
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

interface PastFacultySectionProps {
  facultyData?: FacultyMember[];
}

const PastFacultySection: React.FC<PastFacultySectionProps> = ({
  facultyData = defaultFacultyData,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  // Throttle progress updates for better INP performance
  const updateProgress = useCallback((progress: number) => {
    setScrollProgress(Math.max(0, Math.min(1, progress)));
  }, []);

  // Initial progress update when swiper is ready
  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      updateProgress(swiper.progress);
    }
  }, [facultyData.length, updateProgress]);

  // Memoize marquee content to prevent unnecessary re-renders (CLS optimization)
  const marqueeContent = useMemo(
    () => (
      <>
        {[...Array(3)].map((_, repeatIndex) =>
          marqueeIcons.map((icon, iconIndex) => (
            <React.Fragment key={`${repeatIndex}-${iconIndex}`}>
              <span className={styles.marqueeText}>PAST FACULTY</span>
              <Image
                src={icon.src}
                alt={icon.alt}
                width={48}
                height={48}
                className={styles.marqueeIcon}
                loading="lazy"
                sizes="48px"
                aria-hidden="true"
              />
            </React.Fragment>
          ))
        )}
      </>
    ),
    []
  );

  // Memoize navigation handlers for better INP
  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  return (
    <section
      className={styles.section}
      id="faculty-second-slider-1"
      aria-labelledby="past-faculty-heading"
      role="region"
    >
      {/* SEO: Proper H2 Heading */}
      <h2 id="past-faculty-heading" className={styles.srOnly}>
        Past Faculty Members
      </h2>
      
      {/* Marquee Container */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>{marqueeContent}</div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          {/* Left Navigation Button */}
          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            id="faculty-second-slider-1-prev"
            aria-label="View previous faculty member"
            aria-controls="faculty-second-slider-1-track"
            type="button"
            title="Previous faculty member"
            onClick={handlePrev}
          >
            <span aria-hidden="true">❮</span>
          </button>

          {/* Swiper Carousel */}
          <div className={`${styles.wrapper} ${!isSwiperReady ? styles.wrapperLoading : ''}`}>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Mark Swiper as ready after initialization
                requestAnimationFrame(() => {
                  setIsSwiperReady(true);
                });
              }}
              onInit={(swiper) => {
                // Ensure Swiper is fully initialized before showing
                // Use double RAF to ensure DOM is updated
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setIsSwiperReady(true);
                  });
                });
              }}
              onProgress={(swiper, progress) => {
                // Swiper's progress is 0-1, but with loop it can go beyond
                // Normalize it to 0-1 range
                // Use requestAnimationFrame for better INP
                requestAnimationFrame(() => {
                  updateProgress(progress);
                });
              }}
              modules={[Navigation, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              watchSlidesProgress={true}
              observer={true}
              observeParents={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 18,
                },
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
              }}
              className={styles.track}
              id="faculty-second-slider-1-track"
              role="group"
              aria-label="Past faculty members"
            >
              {facultyData.map((faculty, index) => (
                <SwiperSlide key={`${faculty.name}-${index}`}>
                  <article
                    className={styles.facultyItem}
                    aria-label={`Faculty member: ${faculty.name}`}
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <div className={styles.cardImageContainer}>
                      <Image
                        src={faculty.image}
                        alt={`${faculty.name} - ${faculty.credits} in ${faculty.role}`}
                        width={400}
                        height={533}
                        className={styles.cardImage}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                        loading={index < 2 ? "eager" : "lazy"}
                        priority={index < 2}
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUzMyIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
                        itemProp="image"
                      />
                    </div>
                    {/* Info box positioned at bottom */}
                    <div className={styles.cardInfoBox}>
                      <h3 className={styles.personName} itemProp="name">{faculty.name}</h3>
                      {faculty.credits && (
                        <p className={styles.personCredit} itemProp="jobTitle">
                          {faculty.credits}
                        </p>
                      )}
                      {faculty.role && (
                        <p className={styles.personRole} itemProp="worksFor">
                          {faculty.role}
                        </p>
                      )}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Navigation Button */}
          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            id="faculty-second-slider-1-next"
            aria-label="View next faculty member"
            aria-controls="faculty-second-slider-1-track"
            type="button"
            title="Next faculty member"
            onClick={handleNext}
          >
            <span aria-hidden="true">❯</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Faculty slider progress"
          >
            <div
              className={styles.progressFill}
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastFacultySection;

