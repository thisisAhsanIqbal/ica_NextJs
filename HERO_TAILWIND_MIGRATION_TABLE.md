# Hero Component: Custom CSS to Tailwind Migration Guide

## Analysis Summary
This document provides a comprehensive breakdown of custom CSS in the Hero component that can be replaced with Tailwind CSS classes.

---

## Migration Table

| **CSS File** | **CSS Rule** | **Current CSS** | **Can Replace?** | **Tailwind Equivalent** | **Where to Apply** | **Notes** |
|-------------|-------------|----------------|------------------|------------------------|-------------------|-----------|
| **Hero.module.css** | `.hero` | `position: relative;` | ✅ **YES** | `relative` | Line 99 in `Hero.tsx` - `sectionClassName` | Simple utility class |
| **Hero.module.css** | `.hero *` | `text-rendering: optimizeLegibility;` | ⚠️ **PARTIAL** | `[text-rendering:optimizeLegibility]` | Apply to `<header>` wrapper (Line 95) | Requires arbitrary value |
| **Hero.module.css** | `.hero *` | `-webkit-font-smoothing: antialiased;` | ✅ **YES** | `antialiased` | Apply to `<header>` wrapper (Line 95) | Built-in Tailwind class |
| **Hero.module.css** | `.hero *` | `-moz-osx-font-smoothing: grayscale;` | ⚠️ **PARTIAL** | `[font-smoothing:grayscale]` | Apply to `<header>` wrapper (Line 95) | Requires arbitrary value |
| **Hero.module.css** | `.hero *` | `font-smooth: always;` | ⚠️ **PARTIAL** | `[font-smooth:always]` | Apply to `<header>` wrapper (Line 95) | Requires arbitrary value |
| **Hero.module.css** | `.hero *` | `box-sizing: border-box;` | ✅ **YES** | Already default in Tailwind | N/A | Tailwind resets this globally |
| **Hero.module.css** | `.btnIca` | `font-size: clamp(16px, 2.5vw, 18px);` | ✅ **YES** | `text-[clamp(16px,2.5vw,18px)]` | Lines 136, 147, 164 in `Hero.tsx` | Arbitrary value with clamp |
| **Hero.module.css** | `.btnIca` | `flex: 1 1 0;` | ✅ **YES** | `flex-[1_1_0]` | Lines 136, 147, 164 in `Hero.tsx` | Tailwind flex shorthand |
| **Hero.module.css** | `.btnIca` | `min-width: 0;` | ✅ **YES** | `min-w-0` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `width: 100%;` | ✅ **YES** | `w-full` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `text-align: center;` | ✅ **YES** | `text-center` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `gap: 1.5rem;` | ❌ **NO** | N/A | N/A | This is for flex children, not the button itself |
| **Hero.module.css** | `.btnIca` | `font-family: var(--font-ui);` | ✅ **YES** | `font-[var(--font-ui)]` | Lines 136, 147, 164 in `Hero.tsx` | Arbitrary value |
| **Hero.module.css** | `.btnIca` | `text-transform: uppercase;` | ✅ **YES** | `uppercase` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `font-weight: 600;` | ✅ **YES** | `font-semibold` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility (600 = semibold) |
| **Hero.module.css** | `.btnIca` | `letter-spacing: 0.05em;` | ✅ **YES** | `tracking-wider` or `tracking-[0.05em]` | Lines 136, 147, 164 in `Hero.tsx` | `tracking-wider` = 0.05em |
| **Hero.module.css** | `.btnIca` | `padding: 0.9rem 1.6rem;` | ✅ **YES** | `py-[0.9rem] px-[1.6rem]` | Lines 136, 147, 164 in `Hero.tsx` | Arbitrary values |
| **Hero.module.css** | `.btnIca` | `border: none;` | ✅ **YES** | `border-none` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `position: relative;` | ✅ **YES** | `relative` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `display: inline-block;` | ✅ **YES** | `inline-block` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `cursor: pointer;` | ✅ **YES** | `cursor-pointer` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `transition: all 0.3s ease;` | ✅ **YES** | `transition-all duration-300 ease-in-out` | Lines 136, 147, 164 in `Hero.tsx` | Standard utilities |
| **Hero.module.css** | `.btnIca` | `text-decoration: none;` | ✅ **YES** | `no-underline` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `border-radius: 0;` | ✅ **YES** | `rounded-none` | Lines 136, 147, 164 in `Hero.tsx` | Standard utility |
| **Hero.module.css** | `.btnIca` | `line-height: 1.2;` | ✅ **YES** | `leading-tight` or `leading-[1.2]` | Lines 136, 147, 164 in `Hero.tsx` | `leading-tight` = 1.25 (close) |
| **Hero.module.css** | `.btnIca` | `background: var(--ica-green-deep);` | ✅ **YES** | `bg-[var(--ica-green-deep)]` | Lines 136, 147, 164 in `Hero.tsx` | Arbitrary value |
| **Hero.module.css** | `.btnIca` | `color: var(--ica-bg);` | ✅ **YES** | `text-[var(--ica-bg)]` | Lines 136, 147, 164 in `Hero.tsx` | Arbitrary value |
| **Hero.module.css** | `.btnIca` | `box-shadow: -6px 6px 0px 1px rgba(30, 49, 47, 0.45);` | ✅ **YES** | `shadow-[-6px_6px_0px_1px_rgba(30,49,47,0.45)]` | Lines 136, 147, 164 in `Hero.tsx` | Arbitrary shadow value |
| **Hero.module.css** | `.btnIca:hover` | `background: var(--ica-bg);` | ✅ **YES** | `hover:bg-[var(--ica-bg)]` | Lines 136, 147, 164 in `Hero.tsx` | Hover variant |
| **Hero.module.css** | `.btnIca:hover` | `color: var(--ica-green-deep);` | ✅ **YES** | `hover:text-[var(--ica-green-deep)]` | Lines 136, 147, 164 in `Hero.tsx` | Hover variant |
| **Hero.module.css** | `.btnIca:hover` | `transform: translateY(-2px);` | ✅ **YES** | `hover:-translate-y-0.5` | Lines 136, 147, 164 in `Hero.tsx` | Hover variant (0.5 = 2px) |
| **Hero.module.css** | `@media (max-width: 510px)` | `font-size: 16px;` | ✅ **YES** | `max-[510px]:text-base` | Lines 136, 147, 164 in `Hero.tsx` | Custom breakpoint |
| **Hero.module.css** | `@media (max-width: 510px)` | `padding: 0.75rem 1.2rem;` | ✅ **YES** | `max-[510px]:py-3 max-[510px]:px-[1.2rem]` | Lines 136, 147, 164 in `Hero.tsx` | Custom breakpoint |
| **Hero.module.css** | `@media (max-width: 510px)` | `min-width: 0;` | ✅ **YES** | `max-[510px]:min-w-0` | Lines 136, 147, 164 in `Hero.tsx` | Custom breakpoint |
| **Hero.module.css** | `@media (max-width: 510px)` | `flex: 1 1 auto;` | ✅ **YES** | `max-[510px]:flex-[1_1_auto]` | Lines 136, 147, 164 in `Hero.tsx` | Custom breakpoint |
| **Hero.module.css** | `@media (max-width: 400px)` | `font-size: 12px !important;` | ✅ **YES** | `max-[400px]:!text-xs` | Lines 136, 147, 164 in `Hero.tsx` | Custom breakpoint with important |
| **Hero.module.css** | `@media (prefers-reduced-motion)` | `transition: none;` | ✅ **YES** | `motion-reduce:transition-none` | FeatureSection.tsx Line 79 | Reduced motion variant |
| **FeatureSection.module.css** | `.heroSlider` (mobile) | `aspect-ratio: 16 / 10;` | ✅ **YES** | `max-md:aspect-[16/10]` | FeatureSection.tsx Line 79 | Responsive aspect ratio |
| **FeatureSection.module.css** | `.heroSlider` (mobile) | `height: auto !important;` | ✅ **YES** | `max-md:!h-auto` | FeatureSection.tsx Line 79 | Responsive height |
| **FeatureSection.module.css** | `.heroSlider` (mobile) | `min-height: 300px !important;` | ✅ **YES** | `max-md:!min-h-[300px]` | FeatureSection.tsx Line 79 | Responsive min-height |
| **FeatureSection.module.css** | `.heroSlider` (mobile) | `max-height: 450px !important;` | ✅ **YES** | `max-md:!max-h-[450px]` | FeatureSection.tsx Line 79 | Responsive max-height |
| **FeatureSection.module.css** | `.heroSlider` (tablet) | `aspect-ratio: 4 / 3;` | ✅ **YES** | `md:aspect-[4/3] lg:aspect-[4/3]` | FeatureSection.tsx Line 79 | Responsive aspect ratio |
| **FeatureSection.module.css** | `.heroSlider` (tablet) | `height: auto !important;` | ✅ **YES** | `md:!h-auto lg:!h-auto` | FeatureSection.tsx Line 79 | Responsive height |
| **FeatureSection.module.css** | `.heroSlider` (tablet) | `max-height: 550px !important;` | ✅ **YES** | `md:!max-h-[550px] lg:!max-h-[550px]` | FeatureSection.tsx Line 79 | Responsive max-height |
| **FeatureSection.module.css** | `.heroSlider` (desktop) | `aspect-ratio: 1 / 1;` | ✅ **YES** | `xl:aspect-square` or `xl:aspect-[1/1]` | FeatureSection.tsx Line 79 | Responsive aspect ratio |
| **FeatureSection.module.css** | `.heroSlider` (desktop) | `height: auto !important;` | ✅ **YES** | `xl:!h-auto` | FeatureSection.tsx Line 79 | Responsive height |
| **FeatureSection.module.css** | `.heroSlider` (desktop) | `max-height: none !important;` | ✅ **YES** | `xl:!max-h-none` | FeatureSection.tsx Line 79 | Responsive max-height |

---

## Complete Tailwind Button Class String

Replace `.btnIca` class with this complete Tailwind string:

```tsx
className="text-[clamp(16px,2.5vw,18px)] flex-[1_1_0] min-w-0 w-full text-center font-[var(--font-ui)] uppercase font-semibold tracking-wider py-[0.9rem] px-[1.6rem] border-none relative inline-block cursor-pointer transition-all duration-300 ease-in-out no-underline rounded-none leading-tight bg-[var(--ica-green-deep)] text-[var(--ica-bg)] shadow-[-6px_6px_0px_1px_rgba(30,49,47,0.45)] hover:bg-[var(--ica-bg)] hover:text-[var(--ica-green-deep)] hover:-translate-y-0.5 max-[510px]:text-base max-[510px]:py-3 max-[510px]:px-[1.2rem] max-[510px]:min-w-0 max-[510px]:flex-[1_1_auto] max-[400px]:!text-xs"
```

---

## Complete Hero Slider Class String

Replace `${styles.slider} ${isHero ? styles.heroSlider : ''}` with:

```tsx
className={`relative w-full rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] max-md:aspect-[16/10] max-md:!h-auto max-md:!min-h-[300px] max-md:!max-h-[450px] md:aspect-[4/3] md:!h-auto md:!max-h-[550px] lg:aspect-[4/3] lg:!h-auto lg:!max-h-[550px] xl:aspect-square xl:!h-auto xl:!max-h-none ${isHero ? 'h-[60vh]' : 'aspect-[1100/650] h-[60vh]'}`}
```

---

## Hero Section Wrapper Class

Replace `${styles.hero}` with:

```tsx
className="relative [text-rendering:optimizeLegibility] antialiased [font-smoothing:grayscale] [font-smooth:always] print:!bg-transparent print:!text-[var(--ica-green-deep)]"
```

---

## Recommendations

### ✅ **FULLY REPLACEABLE** (95% of CSS)
- All button styles (`.btnIca`) - **100% replaceable**
- Hero section positioning - **100% replaceable**
- Hero slider responsive aspect ratios - **100% replaceable**
- All hover states - **100% replaceable**
- All responsive breakpoints - **100% replaceable**

### ⚠️ **PARTIALLY REPLACEABLE** (Requires Arbitrary Values)
- Font smoothing properties - Use arbitrary values `[property:value]`
- Text rendering - Use arbitrary value `[text-rendering:optimizeLegibility]`

### ❌ **NOT REPLACEABLE** (Minimal)
- Swiper global styles (`.slider :global(.swiper-wrapper)`) - These are third-party library styles that should remain in CSS
- CSS variables definitions - Keep in CSS or move to `tailwind.config.js`

---

## Migration Priority

1. **HIGH PRIORITY** - Button styles (`.btnIca`) - Most impactful, fully replaceable
2. **HIGH PRIORITY** - Hero slider responsive styles - Fully replaceable
3. **MEDIUM PRIORITY** - Hero wrapper styles - Mostly replaceable
4. **LOW PRIORITY** - Font smoothing (can stay in CSS if preferred)

---

## Benefits of Migration

1. ✅ **Consistency** - All styles in one place (Tailwind)
2. ✅ **Maintainability** - Easier to read and modify
3. ✅ **Performance** - Tailwind purges unused styles
4. ✅ **Responsive** - Better breakpoint management
5. ✅ **No CSS Modules** - Reduce file dependencies

---

## Estimated Migration Time

- **Button Styles**: 15 minutes
- **Hero Slider**: 10 minutes  
- **Hero Wrapper**: 5 minutes
- **Testing**: 10 minutes
- **Total**: ~40 minutes


