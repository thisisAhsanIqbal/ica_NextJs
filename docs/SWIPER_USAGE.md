# Swiper Global Setup & Usage Guide

Swiper is configured globally in this Next.js project and can be used in any component.

## Global Setup

Swiper CSS is imported in `app/layout.tsx`, making it available globally:
- `swiper/css` - Base styles
- `swiper/css/effect-fade` - Fade effect
- `swiper/css/autoplay` - Autoplay styles
- `swiper/css/navigation` - Navigation arrows
- `swiper/css/pagination` - Pagination dots

## Usage Options

### Option 1: Direct Swiper Import (Recommended for custom implementations)

```tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function MyComponent() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      slidesPerView={3}
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      navigation={true}
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
}
```

### Option 2: Using SwiperWrapper Component

For simpler, reusable sliders, use the `SwiperWrapper` component:

```tsx
'use client';

import SwiperWrapper from './components/ui/SwiperWrapper';
import Image from 'next/image';

export default function ImageCarousel() {
  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
  ];

  return (
    <SwiperWrapper
      items={images}
      renderItem={(image) => (
        <Image src={image.src} alt={image.alt} width={800} height={600} />
      )}
      slidesPerView={3}
      spaceBetween={30}
      autoplay={{ delay: 5000 }}
      navigation={true}
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    />
  );
}
```

## Available Swiper Modules

Import from `swiper/modules`:
- `Autoplay` - Auto-rotation
- `EffectFade` - Fade transition
- `EffectSlide` - Slide transition
- `EffectCube` - 3D cube effect
- `EffectCoverflow` - Coverflow effect
- `EffectFlip` - Flip effect
- `EffectCards` - Cards effect
- `Navigation` - Navigation arrows
- `Pagination` - Pagination dots
- `Thumbs` - Thumbnail navigation
- `FreeMode` - Free mode scrolling
- `Grid` - Grid layout

## Common Patterns

### Image Gallery with Fade Effect
```tsx
<Swiper
  modules={[Autoplay, EffectFade]}
  effect="fade"
  autoplay={{ delay: 5000 }}
  loop={true}
>
  {images.map((img, i) => (
    <SwiperSlide key={i}>
      <Image src={img.src} alt={img.alt} fill />
    </SwiperSlide>
  ))}
</Swiper>
```

### Card Carousel
```tsx
<Swiper
  modules={[Navigation, Pagination]}
  slidesPerView={3}
  spaceBetween={20}
  navigation={true}
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {cards.map((card, i) => (
    <SwiperSlide key={i}>
      <CardComponent {...card} />
    </SwiperSlide>
  ))}
</Swiper>
```

### Testimonial Slider
```tsx
<Swiper
  modules={[Autoplay, Pagination]}
  slidesPerView={1}
  autoplay={{ delay: 6000 }}
  pagination={{ clickable: true, dynamicBullets: true }}
  loop={true}
>
  {testimonials.map((testimonial, i) => (
    <SwiperSlide key={i}>
      <TestimonialCard {...testimonial} />
    </SwiperSlide>
  ))}
</Swiper>
```

## Notes

- Always use `'use client'` directive when using Swiper in components
- CSS is already globally available, no need to import CSS files
- Import only the modules you need for better bundle size
- Use `breakpoints` for responsive design
- Use `loop={true}` for infinite scrolling
- Use `keyboard={true}` for keyboard navigation (arrow keys)

