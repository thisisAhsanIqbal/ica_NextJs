# ICA Programs Component - Complete Guide

## 📋 Overview

The ICA Programs component displays 4 program cards in a responsive grid layout with scroll-triggered fade-in animations. It features a mint background, centered heading, and card-based layout with hover effects.

---

## 🏗️ Layout Structure

### **HTML Structure (from programs.php)**

```html
<section class="ica-programs" aria-labelledby="programs-heading">
  <div class="section__inner section__inner--wide">
    <h2 id="programs-heading" class="programs-section-heading">Arts Areas</h2>
    <ul class="programs-grid" role="list">
      <?php foreach ($items as $it): ?>
        <li class="programs-item">
          <article class="programs-card">
            <div class="programs-card-content">
              <!-- Icon -->
              <img src="..." 
                   class="programs-icon" 
                   alt="..." 
                   width="40" 
                   height="40"
                   aria-hidden="true" />
            </div>
            <h3 class="programs-title">
              <span class="first-word">Performing</span>
              <br class="desktop-break">
              <span class="remaining-words">Arts</span>
            </h3>
            <ul class="programs-sublist" role="list">
              <li>Dance</li>
              <li>Music</li>
              <li>Theatre</li>
            </ul>
          </article>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
```

**Data Structure**:
```php
$items = [
  [
    'icon_id' => 123, // WordPress attachment ID
    'title' => 'Performing Arts',
    'subs' => ['Dance', 'Music', 'Theatre']
  ],
  // ... 3 more items
];
```

---

## 📐 CSS Grid Layout System

### **Desktop (1101px+)**
- **Layout**: 4-column grid
- **Grid Template**:
```css
grid-template-columns: repeat(4, minmax(0, 1fr));
gap: clamp(1.2rem, 2.5vw, 2rem);
```

**All 4 cards in a single row**

---

### **Tablet (561px - 1100px)**
- **Layout**: 2-column grid
- **Grid Template**:
```css
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: clamp(1.2rem, 2.5vw, 2rem);
```

**2 rows × 2 columns**

---

### **Mobile (0-560px)**
- **Layout**: Single column
- **Grid Template**:
```css
grid-template-columns: 1fr;
gap: 1.5rem;
```

**All 4 cards stacked vertically**

---

## 🎨 Design Specifications

### **Colors (CSS Variables)**
```css
--ica-green-deep: #1E312F;    /* Text color, border hover */
--ica-mint: #DCF4EF;           /* Background color */
--ica-bg: #F9F6F4;             /* Card hover background */
```

### **Typography**
```css
--font-heading: "ivypresto-display", serif;  /* Section heading */
--font-ui: "Termina", sans-serif;           /* Title (likely) */
--font-body: "roboto-condensed", sans-serif; /* Sublist items */
```

---

## 📏 Component Sizes & Typography

### **Section Container**
- Background: `var(--ica-mint)` (#DCF4EF)
- Padding: `50px 0` (top/bottom)
- Display: Flex column
- Justify-content: Center

### **Section Heading**
- Font-family: `var(--font-heading)` (ivypresto-display)
- Font-size: `clamp(3.4375rem, 5vw, 4.0625rem)` (55px - 65px)
- Font-weight: `300`
- Line-height: `1`
- Text-transform: `uppercase`
- Color: `var(--ica-green-deep)`
- Text-align: `center`
- Margin-bottom: `2rem` (desktop), `3.5rem` (tablet), `3.25rem` (mobile)

### **Program Cards**

#### **Card Container**
- Background: `white`
- Padding: `1.2rem 0.8rem` (desktop/tablet), `1rem 0.75rem` (mobile ≤400px)
- Border-radius: `.6rem`
- Border: `1px solid rgba(30, 49, 47, 0.1)`
- Box-shadow: `0 2px 8px rgba(0,0,0,0.1)`
- Max-width: `360px` (mobile 560px), `330px` (mobile ≤400px)
- Margin: `0 auto` (mobile, for centering)

#### **Card Hover State**
- Transform: `translateY(-3px)`
- Background: `var(--ica-bg)` (#F9F6F4)
- Border-color: `var(--ica-green-deep)`
- Box-shadow: `0 6px 20px rgba(0,0,0,0.12)`
- Transition: `transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease`

#### **Card Focus State**
- Outline: `2px solid var(--ica-green-deep)`
- Outline-offset: `3px`

### **Program Icon**
- Width: `40px`
- Height: `40px`
- Display: `block`
- Margin: `0 auto .6rem`
- Image-rendering: `-webkit-optimize-contrast`, `crisp-edges`

### **Program Title**
- Font-size: `clamp(1.2rem, 2vw, 1.4rem)` (desktop), `1.1rem` (mobile ≤400px)
- Letter-spacing: `.06em`
- Text-transform: `uppercase`
- Font-weight: `500`
- Line-height: `1.2`
- Margin: `.3rem 0 .6rem`
- Margin-top: `.5rem`

**Title Word Breaking**:
- Desktop: First word on one line, remaining words on second line (via `<br class="desktop-break">`)
- Mobile: All words on one line (`.desktop-break` hidden, `.first-word::after` adds space)

### **Program Sublist**
- Font-size: `18px`
- Letter-spacing: `.03em`
- Display: `grid`
- Gap: `.2rem`
- List-style: `none`
- Margin: `0`
- Padding: `0`

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout | Key Changes |
|------------|-------|--------|-------------|
| **Small Mobile** | 0-400px | 1 column | Card: 330px max-width, Title: 1.1rem, Padding: 1rem 0.75rem |
| **Mobile** | 0-560px | 1 column | Card: 360px max-width, Gap: 1.5rem, Hide desktop-break |
| **Tablet** | 561px-1100px | 2 columns | Grid: repeat(2, 1fr), Heading margin: 3.5rem |
| **Desktop** | 1101px+ | 4 columns | Grid: repeat(4, 1fr), Full row display |

---

## 🎬 Animation System

### **Scroll-Triggered Fade-In**

The component uses **IntersectionObserver** to trigger animations when scrolled into view.

**Animation Properties**:
- Section: `opacity 0.8s ease-out, transform 0.8s ease-out`
- Cards: `opacity 0.6s ease-out` with staggered delays
- Will-change: `opacity, transform` (section), `transform` (cards)

**Staggered Delays**:
- Card 1: `0.1s` delay
- Card 2: `0.2s` delay
- Card 3: `0.3s` delay
- Card 4: `0.4s` delay

**IntersectionObserver Configuration**:
```javascript
{
  threshold: 0.2,           // Trigger when 20% visible
  rootMargin: '50px 0px -50px 0px'  // Start 50px before viewport
}
```

**Animation Classes**:
- `.ica-programs.animate-in` - Section fade-in
- `.programs-card.animate-in` - Individual card fade-in

---

## 🔧 Key CSS Techniques

### **1. CSS Grid Layout**
```css
.programs-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.2rem, 2.5vw, 2rem);
}
```

### **2. Card Flex Container**
```css
.programs-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
```

### **3. Title Word Breaking**
```css
/* Desktop: First word on separate line */
.desktop-break {
  display: block; /* Desktop */
}

/* Mobile: Hide break, add space after first word */
@media (max-width: 560px) {
  .desktop-break {
    display: none;
  }
  .programs-title .first-word::after {
    content: " ";
  }
}
```

### **4. Hover Effects**
```css
.programs-card:hover {
  transform: translateY(-3px);
  background: var(--ica-bg);
  border-color: var(--ica-green-deep);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}
```

---

## 🚀 Next.js Implementation Guide

### **Step 1: Create Programs Component**

```tsx
// components/Programs.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Programs.module.css';

interface ProgramItem {
  iconId?: string;
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  subs: string[];
}

interface ProgramsProps {
  heading?: string;
  items: ProgramItem[];
}

export default function Programs({
  heading = 'Arts Areas',
  items,
}: ProgramsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll-triggered animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: immediately show content
      section.classList.add(styles.animateIn);
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '50px 0px -50px 0px', // Start 50px before viewport
      }
    );

    observer.observe(section);
    observerRef.current = observer;

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Split title into first word and remaining words
  const splitTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length >= 2) {
      return {
        firstWord: words[0],
        remainingWords: words.slice(1).join(' '),
      };
    }
    return {
      firstWord: title,
      remainingWords: '',
    };
  };

  return (
    <section
      ref={sectionRef}
      className={styles.icaPrograms}
      aria-labelledby="programs-heading"
    >
      <div className={styles.sectionInner}>
        <h2 id="programs-heading" className={styles.programsSectionHeading}>
          {heading}
        </h2>
        <ul className={styles.programsGrid} role="list">
          {items.map((item, index) => {
            const { firstWord, remainingWords } = splitTitle(item.title);
            return (
              <li key={index} className={styles.programsItem}>
                <article className={styles.programsCard}>
                  <div className={styles.programsCardContent}>
                    {item.iconSrc && (
                      <Image
                        src={item.iconSrc}
                        alt={item.iconAlt || `${item.title} icon`}
                        width={40}
                        height={40}
                        className={styles.programsIcon}
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <h3 className={styles.programsTitle}>
                    {remainingWords ? (
                      <>
                        <span className={styles.firstWord}>{firstWord}</span>
                        <br className={styles.desktopBreak} />
                        <span className={styles.remainingWords}>
                          {remainingWords}
                        </span>
                      </>
                    ) : (
                      firstWord
                    )}
                  </h3>
                  {item.subs && item.subs.length > 0 && (
                    <ul className={styles.programsSublist} role="list">
                      {item.subs.map((sub, subIndex) => (
                        <li key={subIndex}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

### **Step 2: Create CSS Module**

```css
/* components/Programs.module.css */

/* CSS Variables */
.icaPrograms {
  --ica-green-deep: #1e312f;
  --ica-mint: #dcf4ef;
  --ica-bg: #f9f6f4;
  --font-heading: "ivypresto-display", "Bodoni Moda", Georgia, serif;

  grid-column: full-start / full-end;
  background: var(--ica-mint);
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Fade-in animation properties */
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  will-change: opacity, transform;
  opacity: 0;
  transform: translateY(20px);
}

/* Animation trigger class */
.icaPrograms.animateIn {
  opacity: 1;
  transform: translateY(0);
  filter: brightness(1) contrast(1);
}

.sectionInner {
  grid-column: content-start / content-end;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1280px;
  padding-inline: 1rem;
  width: 100%;
}

.programsSectionHeading {
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: clamp(3.4375rem, 5vw, 4.0625rem);
  font-weight: 300;
  line-height: 1;
  color: var(--ica-green-deep);
  text-align: center;
  margin: 0 0 2rem;
}

/* ========================================
   GRID LAYOUT
   ======================================== */
.programsGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.2rem, 2.5vw, 2rem);
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
}

.programsItem {
  list-style: none;
}

.programsCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-height: auto;
  max-height: none;
  text-align: center;
  color: var(--ica-green-deep);
  background: white;
  padding: 1.2rem 0.8rem;
  border-radius: 0.6rem;
  transition: transform 0.2s ease, background-color 0.2s ease,
    border-color 0.2s ease, opacity 0.6s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(30, 49, 47, 0.1);
  will-change: transform;
  opacity: 0;
  transform: translateY(10px);
}

/* Staggered animation for cards */
.programsCard.animateIn {
  opacity: 1;
  transform: translateY(0);
  filter: brightness(1) contrast(1);
}

/* Staggered delays */
.programsCard:nth-child(1).animateIn {
  transition-delay: 0.1s;
}

.programsCard:nth-child(2).animateIn {
  transition-delay: 0.2s;
}

.programsCard:nth-child(3).animateIn {
  transition-delay: 0.3s;
}

.programsCard:nth-child(4).animateIn {
  transition-delay: 0.4s;
}

.programsCard:focus-visible {
  outline: 2px solid var(--ica-green-deep);
  outline-offset: 3px;
}

.programsCard:hover {
  transform: translateY(-3px);
  background: var(--ica-bg);
  border-color: var(--ica-green-deep);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.programsCardContent {
  width: 100%;
}

.programsIcon {
  display: block;
  margin: 0 auto 0.6rem;
  width: 40px;
  height: 40px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.programsTitle {
  margin-top: 0.5rem;
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0.3rem 0 0.6rem;
  line-height: 1.2;
  font-weight: 500;
}

.firstWord {
  display: inline;
}

.desktopBreak {
  display: block;
}

.remainingWords {
  display: inline;
}

.programsSublist {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 18px;
  letter-spacing: 0.03em;
  display: grid;
  gap: 0.2rem;
}

.programsSublist li {
  margin: 0;
  padding: 0;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */

/* Tablet (561px - 1100px) */
@media (max-width: 1100px) {
  .programsGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .programsSectionHeading {
    margin-bottom: 3.5rem;
  }
}

/* Mobile (0-560px) */
@media (max-width: 560px) {
  .programsGrid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .programsCard {
    max-width: 360px;
    margin: 0 auto;
    padding: 1.2rem 0.8rem;
  }

  .desktopBreak {
    display: none;
  }

  .programsTitle .firstWord::after {
    content: ' ';
  }

  .programsSectionHeading {
    font-size: clamp(3.4375rem, 5vw, 4.0625rem);
    margin-bottom: 3.25rem;
  }
}

/* Small Mobile (0-400px) */
@media (max-width: 400px) {
  .programsCard {
    max-width: 330px;
    padding: 1rem 0.75rem;
  }

  .programsTitle {
    font-size: 1.1rem;
  }
}

/* ========================================
   REDUCED MOTION SUPPORT
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .programsCard {
    transition: none;
  }

  .programsCard:hover {
    transform: none;
  }

  .icaPrograms {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

### **Step 3: Usage Example**

```tsx
// app/page.tsx or pages/index.tsx
import Programs from '@/components/Programs';

export default function HomePage() {
  const programsData = {
    heading: 'Arts Areas',
    items: [
      {
        iconSrc: '/images/performing-arts-icon.svg',
        iconAlt: 'Performing Arts icon',
        title: 'Performing Arts',
        subs: ['Dance', 'Music', 'Theatre'],
      },
      {
        iconSrc: '/images/visual-arts-icon.svg',
        iconAlt: 'Visual Arts icon',
        title: 'Visual Arts',
        subs: ['Drawing', 'Painting', 'Ceramics & Sculpture'],
      },
      {
        iconSrc: '/images/media-arts-icon.svg',
        iconAlt: 'Media Arts icon',
        title: 'Media Arts',
        subs: ['Graphic Design', 'Animation', 'Photo & Video'],
      },
      {
        iconSrc: '/images/arts-business-icon.svg',
        iconAlt: 'Arts Business icon',
        title: 'Arts Business',
        subs: ['Entrepreneurship', 'Finance', 'Marketing'],
      },
    ],
  };

  return (
    <main>
      {/* Other components */}
      <Programs {...programsData} />
    </main>
  );
}
```

---

## ✅ Pixel-Perfect Checklist

### **1. Typography**
- [ ] Section heading: `clamp(3.4375rem, 5vw, 4.0625rem)`, `300` weight, `uppercase`
- [ ] Title: `clamp(1.2rem, 2vw, 1.4rem)`, `500` weight, `.06em` letter-spacing
- [ ] Sublist: `18px`, `.03em` letter-spacing

### **2. Spacing**
- [ ] Section padding: `50px 0`
- [ ] Heading margin-bottom: `2rem` (desktop), `3.5rem` (tablet), `3.25rem` (mobile)
- [ ] Grid gap: `clamp(1.2rem, 2.5vw, 2rem)` (desktop/tablet), `1.5rem` (mobile)
- [ ] Card padding: `1.2rem 0.8rem` (desktop/tablet), `1rem 0.75rem` (mobile ≤400px)
- [ ] Icon margin: `0 auto .6rem`
- [ ] Title margin: `.3rem 0 .6rem`
- [ ] Sublist gap: `.2rem`

### **3. Colors**
- [ ] Background: `var(--ica-mint)` (#DCF4EF)
- [ ] Card background: `white`
- [ ] Card hover background: `var(--ica-bg)` (#F9F6F4)
- [ ] Text/border: `var(--ica-green-deep)` (#1E312F)
- [ ] Border: `rgba(30, 49, 47, 0.1)`

### **4. Sizing**
- [ ] Icon: `40px × 40px`
- [ ] Card max-width: `360px` (mobile), `330px` (mobile ≤400px)
- [ ] Border-radius: `.6rem`

### **5. Layout**
- [ ] Desktop: 4-column grid
- [ ] Tablet: 2-column grid
- [ ] Mobile: 1-column grid

### **6. Animations**
- [ ] Section fade-in: `opacity 0.8s ease-out, transform 0.8s ease-out`
- [ ] Card fade-in: `opacity 0.6s ease-out` with staggered delays (0.1s, 0.2s, 0.3s, 0.4s)
- [ ] Hover transform: `translateY(-3px)`
- [ ] IntersectionObserver: `threshold: 0.2`, `rootMargin: '50px 0px -50px 0px'`

### **7. Title Word Breaking**
- [ ] Desktop: First word on separate line (via `<br>`)
- [ ] Mobile: All words on one line (`.desktop-break` hidden, space after first word)

---

## 🎯 Key Differences: WordPress vs Next.js

### **Image Handling**
- **WordPress**: `wp_get_attachment_image()` with `icon_id` (attachment ID)
- **Next.js**: Use `next/image` with `iconSrc` (URL path)

### **Title Word Breaking**
- **WordPress**: PHP splits title into words and wraps first word in `<span>`
- **Next.js**: JavaScript function splits title, conditionally renders `<br>`

### **Animation**
- **WordPress**: Separate JavaScript file with IntersectionObserver
- **Next.js**: React `useEffect` hook with IntersectionObserver

### **Data Structure**
- **WordPress**: `icon_id` (attachment ID) for WordPress media library
- **Next.js**: `iconSrc` (image URL) for Next.js Image component

---

## 📝 Additional Notes

1. **Scroll Animation**: Uses IntersectionObserver for performance-optimized scroll-triggered animations
2. **Staggered Delays**: Cards animate in sequence (0.1s, 0.2s, 0.3s, 0.4s) for visual appeal
3. **Responsive Grid**: 4 columns → 2 columns → 1 column based on viewport width
4. **Title Breaking**: Smart word breaking for better typography on desktop vs mobile
5. **Hover Effects**: Subtle lift effect (`translateY(-3px)`) with enhanced shadow
6. **Accessibility**: Focus states, ARIA labels, semantic HTML (`<article>`, `role="list"`)
7. **Reduced Motion**: Respects `prefers-reduced-motion` user preference

---

## 🔍 Testing Recommendations

1. **Viewport Testing**: Test at 1100px, 560px, 400px breakpoints
2. **Animation Testing**: Verify scroll-triggered fade-in, staggered delays
3. **Hover Testing**: Card lift effect, background change, shadow enhancement
4. **Title Breaking**: Verify desktop (2 lines) vs mobile (1 line)
5. **Browser Testing**: Chrome, Firefox, Safari, Edge
6. **Device Testing**: iPhone, iPad, Android, Desktop
7. **Accessibility**: Keyboard navigation, screen reader, focus states
8. **Performance**: Lighthouse score, animation performance

---

This guide provides everything needed to recreate the programs component pixel-perfect in Next.js! 🚀

