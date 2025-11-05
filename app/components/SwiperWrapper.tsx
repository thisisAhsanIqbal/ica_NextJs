/**
 * SwiperWrapper - Reusable Swiper component for global use
 * 
 * Swiper CSS is globally imported in app/layout.tsx
 * This wrapper component provides common Swiper configurations
 * 
 * Usage Example:
 * ```tsx
 * import SwiperWrapper from './SwiperWrapper';
 * 
 * <SwiperWrapper
 *   items={items}
 *   renderItem={(item) => <div>{item.content}</div>}
 *   slidesPerView={3}
 *   autoplay={true}
 * />
 * ```
 */

'use client';

import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { 
  Autoplay, 
  EffectFade, 
  Navigation, 
  Pagination,
  EffectSlide,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
  EffectCards,
  Thumbs,
  FreeMode,
  Grid
} from 'swiper/modules';

export interface SwiperWrapperProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  // Swiper configuration
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  autoplay?: boolean | {
    delay?: number;
    disableOnInteraction?: boolean;
    pauseOnMouseEnter?: boolean;
  };
  loop?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards';
  navigation?: boolean;
  pagination?: boolean | {
    clickable?: boolean;
    dynamicBullets?: boolean;
  };
  keyboard?: boolean;
  breakpoints?: {
    [width: number]: {
      slidesPerView?: number;
      spaceBetween?: number;
    };
  };
  className?: string;
  // Additional Swiper props
  [key: string]: any;
}

export default function SwiperWrapper({
  items,
  renderItem,
  slidesPerView = 1,
  spaceBetween = 30,
  autoplay = false,
  loop = false,
  effect = 'slide',
  navigation = false,
  pagination = false,
  keyboard = true,
  breakpoints,
  className = '',
  ...restProps
}: SwiperWrapperProps) {
  // Determine which modules to use
  const modules: any[] = [];
  
  if (autoplay) modules.push(Autoplay);
  if (effect === 'fade') modules.push(EffectFade);
  if (effect === 'slide') modules.push(EffectSlide);
  if (effect === 'cube') modules.push(EffectCube);
  if (effect === 'coverflow') modules.push(EffectCoverflow);
  if (effect === 'flip') modules.push(EffectFlip);
  if (effect === 'cards') modules.push(EffectCards);
  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);

  // Configure autoplay
  const autoplayConfig = typeof autoplay === 'boolean' 
    ? (autoplay ? { delay: 3000, disableOnInteraction: true } : false)
    : autoplay;

  // Configure pagination
  const paginationConfig = typeof pagination === 'boolean'
    ? (pagination ? { clickable: true } : false)
    : pagination;

  const swiperProps: SwiperProps = {
    modules,
    slidesPerView,
    spaceBetween,
    loop,
    effect: effect as any,
    keyboard,
    className,
    ...(autoplayConfig && { autoplay: autoplayConfig }),
    ...(navigation && { navigation: true }),
    ...(paginationConfig && { pagination: paginationConfig }),
    ...(breakpoints && { breakpoints }),
    ...restProps,
  };

  return (
    <Swiper {...swiperProps}>
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {renderItem(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

