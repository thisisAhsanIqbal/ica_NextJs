// components/ReviewsSlider.tsx
'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard, EffectFade } from 'swiper/modules';
// Swiper CSS is already imported globally in app/layout.tsx
import styles from './Testimonials.module.css';

interface Review {
  image_id?: number; // Not used in Next, but good to know
  image: string; // This is the src
  text: string;
}

interface ReviewsSliderProps {
  reviews: Review[];
}

export default function ReviewsSlider({ reviews = [] }: ReviewsSliderProps) {
  if (reviews.length === 0) {
    return null; // Don't render if no reviews
  }

  return (
    <div className={styles.icaTestimonialsLevel3}>
      <div className={styles.reviewsBanner}>
        <div className={styles.reviewsBadge} aria-hidden="true">
          ICA
        </div>
        <Swiper
          modules={[Autoplay, Pagination, Keyboard, EffectFade]}
          className={styles.reviewsSlider}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }}
          pagination={{
            el: `.${styles.reviewsDots}`, // Use our custom class for the dots container
            clickable: true,
            type: 'bullets',
          }}
          keyboard={{ enabled: true }}
          grabCursor={true}
          loop={reviews.length > 1}
          speed={600}
          allowTouchMove={true}
          watchOverflow={true}
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx} className={styles.reviewSlide}>
              <Image
                className={styles.reviewSlideAvatar}
                src={item.image} // Assumes image is a URL path like /images/ally.jpg
                alt="Student testimonial photo"
                loading="lazy"
                decoding="async"
                width="170"
                height="170"
                sizes="(min-width:1200px) 140px, (min-width:900px) 128px, 96px"
              />
              <blockquote className={styles.reviewSlideText}>
                {item.text}
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* This external container is required for Swiper's custom pagination */}
      <div
        className={styles.reviewsDots}
        role="tablist"
        aria-label="Review navigation"
      ></div>
    </div>
  );
}