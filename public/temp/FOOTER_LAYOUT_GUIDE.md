# ICA Footer Layout - Complete Guide

## 📋 Overview

The ICA footer uses **CSS Grid** (NOT tables) for layout. It's a mobile-first, responsive design that adapts across 6 breakpoints.

---

## 🏗️ Layout Structure

### **HTML Structure (from footer.php)**

```html
<footer class="ica-footer">
  <div class="ica-container">
    <div class="ica-footer-grid">
      <!-- 1. Logo Section -->
      <div class="ica-logo-section">
        <a href="/">
          <img class="ica-logo" src="..." alt="ICA Logo" />
        </a>
      </div>
      
      <!-- 2. Content Section (Headline + Buttons) -->
      <div class="ica-content-section">
        <h2 class="ica-headline">High-level arts <em>meets</em><br>high-achieving academics.</h2>
        <div class="ica-buttons">
          <a href="mailto:..." class="ica-button">
            <img class="ica-button-icon" src="..." alt="Email" />
            EMAIL US
          </a>
          <button class="ica-button">CHAT NOW</button>
        </div>
      </div>
      
      <!-- 3. Badges Section -->
      <div class="ica-badges-section">
        <div class="ica-badge"><a href="/school/">...</a></div>
        <div class="ica-badge"><a href="/impact/">...</a></div>
        <div class="ica-badge"><a href="/studio/">...</a></div>
      </div>
      
      <!-- 4. Navigation + Social Row -->
      <div class="ica-nav-social-row">
        <nav class="ica-footer-nav">
          <a href="/about">WHO WE ARE</a>
          <a href="/blog">CURTAIN UP! THE BLOG</a>
          <a href="/support">SUPPORT ICA</a>
          <a href="/sitemap">SITEMAP</a>
        </nav>
        <div class="ica-social">
          <!-- Facebook, Instagram, X, LinkedIn SVGs -->
        </div>
      </div>
    </div>
  </div>
  
  <!-- Copyright Bar -->
  <div class="ica-copyright">
    <p>NAPERVILLE, ILLINOIS · COPYRIGHT 2024 ILLINOIS CONSERVATORY FOR THE ARTS. ALL RIGHTS RESERVED.</p>
  </div>
  
  <!-- Website Credit -->
  <div class="ica-website-credit">
    <p>Website Design and Development by <a href="...">Muhammad Ahsan Iqbal</a></p>
  </div>
  
  <!-- Back to Top Button -->
  <button class="back-to-top">...</button>
</footer>
```

---

## 📐 CSS Grid Layout System

### **Mobile First (Default - All Screens)**
- **Layout**: Single column stack
- **Grid Template Areas**:
```css
grid-template-areas:
  "logo"
  "content"
  "badges"
  "navsocial";
```

**Order**: Logo → Content → Badges → Nav/Social (stacked vertically, centered)

---

### **Tablet (768px+)**
- **Layout**: 2-column for content section
- **Content Section**: Headline and buttons side-by-side
- **Nav/Social**: Still stacked, but centered

---

### **Desktop (1024px+)**
- **Layout**: 3-column grid
- **Grid Template**:
```css
grid-template-columns: 150px 1fr 415px;
grid-template-areas:
  "logo   content   badges"
  "logo   content   navsocial";
```

**Column Breakdown**:
- **Column 1 (150px)**: Logo (spans 2 rows)
- **Column 2 (1fr)**: Content (headline + buttons) - spans 2 rows
- **Column 3 (415px)**: 
  - Row 1: Badges (3 badges in a row)
  - Row 2: Nav + Social (80/20 split using nested grid)

---

### **Large Desktop (1200px+)**
- **Grid Columns**: `200px 1fr 415px`
- **Padding**: `5rem 0`
- **Larger logo**: 190px

---

### **Extra Large Desktop (1440px+)**
- **Grid Columns**: `240px 1fr 380px`
- **Padding**: `6rem 0`
- **Largest logo**: 220px
- **Headline**: 42px font size

---

## 🎨 Design Specifications

### **Colors (CSS Variables)**
```css
--ica-green-deep: #1E312F;    /* Primary text, borders */
--ica-teal: #17968C;          /* Links, hover states */
--ica-mint: #DCF4EF;           /* Back-to-top button background */
--ica-lavender: #CFADD1;       /* Button hover background */
--ica-bg: #F9F6F4;            /* Footer background */
--ica-white: #FFFFFF;          /* Copyright text */
```

### **Typography**
```css
--font-heading: "ivypresto-display", serif;  /* Headlines */
--font-ui: "Termina", sans-serif;           /* Buttons, nav links */
--font-body: "roboto-condensed", sans-serif; /* Body text */
```

### **Component Sizes**

#### **Mobile (Default)**
- Logo: 160px × 160px
- Headline: 30px
- Buttons: 0.75rem font, 120px min-width
- Badges: 95px × 95px
- Social icons: 32px × 32px

#### **Small Mobile (480px+)**
- Logo: 200px × 200px
- Headline: 35px
- Buttons: 0.8rem font, 140px min-width
- Badges: 125px × 65px

#### **Tablet (768px+)**
- Logo: 180px × 180px
- Headline: 32px
- Badges: 150px × 45px
- Content section: 2-column (headline left, buttons right)

#### **Desktop (1024px+)**
- Logo: 170px × 170px
- Headline: 2.25rem (36px)
- Buttons: 10px font, 140px min-width
- Badges: 130px × 40px
- Nav links: 1.2rem font, vertical column
- Social icons: 36px × 36px

#### **Large Desktop (1200px+)**
- Logo: 190px × 190px
- Headline: 36px
- Buttons: 0.875rem font, 160px min-width
- Badges: 90px × 75px

#### **Extra Large (1440px+)**
- Logo: 220px × 220px
- Headline: 42px
- Buttons: 0.9rem font, 170px min-width
- Badges: 100px × 90px

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| **Ultra Small** | 0-350px | Single column, reduced sizes |
| **Mobile** | 0-479px | Single column, centered |
| **Small Mobile** | 480px+ | Single column, larger sizes |
| **Tablet** | 768px+ | 2-column content section |
| **Desktop** | 1024px+ | 3-column grid |
| **Large Desktop** | 1200px+ | 3-column, larger spacing |
| **Extra Large** | 1440px+ | 3-column, maximum sizes |

---

## 🔧 Key CSS Techniques

### **1. Grid Template Areas**
Uses named grid areas for semantic, responsive layout:
```css
.ica-footer-grid {
  display: grid;
  grid-template-areas:
    "logo   content   badges"
    "logo   content   navsocial";
}

.ica-logo-section { grid-area: logo; }
.ica-content-section { grid-area: content; }
.ica-badges-section { grid-area: badges; }
.ica-nav-social-row { grid-area: navsocial; }
```

### **2. Nested Grid (Desktop)**
Nav + Social row uses nested grid:
```css
.ica-nav-social-row {
  display: grid;
  grid-template-columns: 4fr 1fr;  /* 80/20 split */
  column-gap: 2rem;
}
```

### **3. Flexbox for Internal Layouts**
- Content section: Flex column/row based on breakpoint
- Buttons: Flex row
- Badges: Flex row
- Social icons: Flex (row on mobile, column on desktop)

### **4. Image Override System**
Prevents inline styles from breaking layout:
```css
.ica-footer img[style] {
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
}
```

---

## 🚀 Next.js Implementation Guide

### **Step 1: Create Footer Component**

```tsx
// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <Link href="/" aria-label="Illinois Conservatory for the Arts - Home">
              <Image
                src="/images/footer-logo.png"
                alt="Illinois Conservatory for the Arts"
                width={170}
                height={170}
                className={styles.logo}
                priority={false}
                loading="lazy"
              />
            </Link>
          </div>
          
          {/* Content Section */}
          <div className={styles.contentSection}>
            <h2 className={styles.headline}>
              High-level arts <em>meets</em><br />high-achieving academics.
            </h2>
            <div className={styles.buttons}>
              <a href="mailto:info@ilconservatory.org" className={styles.button}>
                <Image
                  src="/images/email-icon.svg"
                  alt="Email"
                  width={18}
                  height={18}
                  className={styles.buttonIcon}
                />
                EMAIL US
              </a>
              <button
                type="button"
                className={styles.button}
                onClick={() => window.open('https://m.me/100066957470546', '_blank')}
                aria-label="Chat now on Messenger"
              >
                <Image
                  src="/images/chat-icon.svg"
                  alt="Chat"
                  width={18}
                  height={18}
                  className={styles.buttonIcon}
                />
                CHAT NOW
              </button>
            </div>
          </div>
          
          {/* Badges Section */}
          <div className={styles.badgesSection}>
            <div className={styles.badge}>
              <Link href="/school/" aria-label="The School">
                <Image
                  src="/images/school-badge.png"
                  alt="The School"
                  width={130}
                  height={40}
                  loading="lazy"
                />
              </Link>
            </div>
            <div className={styles.badge}>
              <Link href="/impact/" aria-label="IMPACT">
                <Image
                  src="/images/impact-badge.png"
                  alt="Impact"
                  width={130}
                  height={40}
                  loading="lazy"
                />
              </Link>
            </div>
            <div className={styles.badge}>
              <Link href="/studio/" aria-label="The Studio">
                <Image
                  src="/images/studio-badge.png"
                  alt="The Studio"
                  width={130}
                  height={40}
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
          
          {/* Nav + Social Row */}
          <div className={styles.navSocialRow}>
            <nav className={styles.footerNav} aria-label="Footer navigation">
              <Link href="/about">WHO WE ARE</Link>
              <Link href="/blog">CURTAIN UP! THE BLOG</Link>
              <Link href="/support">SUPPORT ICA</Link>
              <Link href="/sitemap">SITEMAP</Link>
            </nav>
            <div className={styles.social}>
              <a
                href="https://www.facebook.com/ilconservatory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                {/* SVG or Image */}
              </a>
              {/* Other social icons */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className={styles.copyright}>
        <div className={styles.container}>
          <p>
            NAPERVILLE, ILLINOIS · COPYRIGHT{' '}
            <time dateTime="2024">2024</time> ILLINOIS CONSERVATORY FOR THE ARTS.
            ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
      
      {/* Website Credit */}
      <div className={styles.websiteCredit}>
        <div className={styles.container}>
          <p className={styles.creditText}>
            Website Design and Development by{' '}
            <a href="https://muhammadahsaniqbal.com/" target="_blank" rel="noopener noreferrer">
              Muhammad Ahsan Iqbal
            </a>
          </p>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </footer>
  );
}
```

### **Step 2: Create CSS Module**

```css
/* components/Footer.module.css */

/* CSS Variables */
.footer {
  --ica-green-deep: #1e312f;
  --ica-teal: #17968c;
  --ica-mint: #dcf4ef;
  --ica-lavender: #cfadd1;
  --ica-bg: #f9f6f4;
  --font-heading: "ivypresto-display", "Bodoni Moda", Georgia, serif;
  --font-ui: "Termina", "Helvetica Neue", Helvetica, Arial, sans-serif;
  
  background: var(--ica-bg);
  color: var(--ica-green-deep);
  padding: 0;
  width: 100%;
  font-family: var(--font-ui);
}

.footer * {
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}

/* ========================================
   MOBILE FIRST (Default)
   ======================================== */
.footerGrid {
  display: grid;
  gap: 2rem;
  padding: 2rem 0;
  align-items: center;
  text-align: center;
  grid-template-areas:
    "logo"
    "content"
    "badges"
    "navsocial";
}

.logoSection {
  grid-area: logo;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: contain;
}

.contentSection {
  grid-area: content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 10px;
}

.headline {
  font-family: var(--font-heading);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  text-align: center;
  color: var(--ica-green-deep);
}

.headline em {
  font-style: italic;
  font-weight: 600;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  border: 2px solid var(--ica-green-deep);
  background: transparent;
  color: var(--ica-green-deep);
  text-decoration: none;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  min-width: 120px;
  border-radius: 0;
  cursor: pointer;
}

.button:hover {
  background: var(--ica-lavender);
  color: var(--ica-green-deep);
  border: none;
}

.buttonIcon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.badgesSection {
  grid-area: badges;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.badge:hover {
  transform: scale(1.1);
}

.badge img {
  width: 95px;
  height: 95px;
  object-fit: contain;
}

.navSocialRow {
  grid-area: navsocial;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.footerNav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  flex-wrap: wrap;
  line-height: 0.5;
}

.footerNav a {
  color: var(--ica-green-deep);
  text-decoration: none;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  padding: 0.25rem 0;
}

.footerNav a:hover {
  color: var(--ica-teal);
}

.social {
  display: flex;
  justify-content: center;
  gap: 5rem;
}

.social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;
}

.social a:hover {
  transform: scale(1.1);
}

.social img,
.social svg {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

/* ========================================
   SMALL MOBILE (480px+)
   ======================================== */
@media (min-width: 480px) {
  .logo {
    width: 200px;
    height: 200px;
  }
  
  .headline {
    font-size: 35px;
  }
  
  .buttons {
    gap: 2rem;
  }
  
  .button {
    font-size: 0.8rem;
    padding: 0.875rem 1.75rem;
    min-width: 140px;
  }
  
  .buttonIcon {
    width: 18px;
    height: 18px;
  }
  
  .badge img {
    width: 125px;
    height: 65px;
  }
  
  .footerNav {
    gap: 2rem;
  }
  
  .footerNav a {
    font-size: 0.8rem;
  }
}

/* ========================================
   TABLET (768px+)
   ======================================== */
@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
  
  .footerGrid {
    padding: 3rem 0;
    gap: 2.5rem;
  }
  
  .logo {
    width: 180px;
    height: 180px;
  }
  
  .contentSection {
    flex-direction: row;
    gap: 3rem;
    align-items: center;
    text-align: left;
    padding: 0 30px;
  }
  
  .headline {
    font-size: 32px;
    text-align: left;
    flex: 1;
  }
  
  .buttons {
    flex-direction: row;
    align-items: flex-end;
    flex: 1;
    gap: 2.5rem;
  }
  
  .button {
    font-size: 0.875rem;
    padding: 0.5rem 0.5rem;
    min-width: 150px;
  }
  
  .buttonIcon {
    width: 20px;
    height: 20px;
  }
  
  .badge img {
    width: 150px;
    height: 45px;
  }
  
  .footerNav {
    justify-content: center;
    gap: 2.5rem;
  }
  
  .footerNav a {
    font-size: 0.875rem;
  }
  
  .social {
    margin-top: 1rem;
    justify-content: center;
  }
  
  .social a {
    width: 32px;
    height: 32px;
  }
}

/* ========================================
   DESKTOP (1024px+)
   ======================================== */
@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
  
  .footerGrid {
    display: grid;
    grid-template-columns: 150px 1fr 415px;
    grid-template-areas:
      "logo   content   badges"
      "logo   content   navsocial";
    gap: 2rem;
    align-items: center;
    padding: 3rem 0;
    text-align: left;
  }
  
  .badge img {
    width: 130px;
    height: 40px;
  }
  
  .navSocialRow {
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-items: flex-start;
    column-gap: 2rem;
    width: 85%;
  }
  
  .footerNav {
    justify-content: flex-start;
    gap: 2rem;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.5rem;
  }
  
  .footerNav a {
    font-size: 1.2rem;
    padding: 0.25rem 0;
  }
  
  .social {
    justify-content: flex-end;
    gap: 0.75rem;
    flex-direction: column;
  }
  
  .social a {
    width: 36px;
    height: 36px;
  }
  
  .logoSection {
    justify-content: flex-start;
    align-items: flex-start;
  }
  
  .logo {
    width: 170px;
    height: 170px;
  }
  
  .contentSection {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }
  
  .headline {
    font-size: 2.25rem;
    line-height: 1.2;
    text-align: left;
    margin: 0;
  }
  
  .buttons {
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
    justify-content: flex-start;
  }
  
  .button {
    font-size: 10px;
    padding: 0.5rem 1rem;
    min-width: 140px;
  }
  
  .buttonIcon {
    width: 18px;
    height: 18px;
  }
  
  .badgesSection {
    justify-content: flex-start;
    width: 100%;
  }
  
  .badge img {
    width: 80px;
    height: 80px;
  }
}

/* ========================================
   LARGE DESKTOP (1200px+)
   ======================================== */
@media (min-width: 1200px) {
  .footerGrid {
    grid-template-columns: 200px 1fr 415px;
    gap: 0;
    padding: 5rem 0;
  }
  
  .logo {
    width: 190px;
    height: 190px;
  }
  
  .headline {
    font-size: 36px;
    line-height: 1.15;
  }
  
  .buttons {
    gap: 2.5rem;
  }
  
  .button {
    font-size: 0.875rem;
    padding: 1rem 2rem;
    min-width: 160px;
  }
  
  .buttonIcon {
    width: 20px;
    height: 20px;
  }
  
  .badge img {
    width: 90px;
    height: 75px;
  }
  
  .footerNav a {
    padding: 0.4rem 0;
  }
  
  .social a {
    width: 36px;
    height: 36px;
  }
}

/* ========================================
   EXTRA LARGE DESKTOP (1440px+)
   ======================================== */
@media (min-width: 1440px) {
  .footerGrid {
    grid-template-columns: 240px 1fr 380px;
    gap: 0;
    padding: 6rem 0;
  }
  
  .logo {
    width: 220px;
    height: 220px;
  }
  
  .headline {
    font-size: 42px;
  }
  
  .buttons {
    gap: 3rem;
  }
  
  .button {
    font-size: 0.9rem;
    padding: 1rem 0.2rem;
    min-width: 170px;
  }
  
  .buttonIcon {
    width: 22px;
    height: 22px;
  }
  
  .badge img {
    width: 100px;
    height: 90px;
  }
  
  .footerNav a {
    padding: 0.5rem 0;
  }
  
  .social {
    gap: 1.2rem;
  }
  
  .social a {
    width: 40px;
    height: 40px;
  }
}

/* ========================================
   COPYRIGHT BAR
   ======================================== */
.copyright {
  background: var(--ica-green-deep);
  color: white;
  padding: 1rem 0;
  text-align: center;
}

.copyright p {
  margin: 0;
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .copyright {
    padding: 1.25rem 0;
  }
  
  .copyright p {
    font-size: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .copyright p {
    font-size: 0.8rem;
  }
}

@media (min-width: 1440px) {
  .copyright p {
    font-size: 0.85rem;
  }
}

/* ========================================
   WEBSITE CREDIT
   ======================================== */
.websiteCredit {
  background-color: rgba(76, 175, 80, 0.1);
  padding: 0.75rem 0;
  text-align: center;
  font-size: 0.75rem;
  font-family: var(--font-ui);
  font-weight: 400;
  line-height: 1.4;
  border-top: 1px solid var(--ica-green-deep);
}

.websiteCredit p {
  margin: 0;
  color: #2c3e50;
}

.creditText {
  font-family: var(--font-ui);
  font-size: 8px;
}

.websiteCredit a {
  color: var(--ica-green-deep);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.websiteCredit a:hover {
  color: #1e312f;
  text-decoration: underline;
}

@media (max-width: 350px) {
  .creditText {
    font-size: 7px;
  }
}

@media (min-width: 480px) {
  .creditText {
    font-size: 9px;
  }
}
```

### **Step 3: Back to Top Button Component**

```tsx
// components/BackToTopButton.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './BackToTopButton.module.css';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`${styles.backToTop} ${isVisible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <Image
        src="/images/footer-logo.png"
        alt="Back to top"
        width={80}
        height={80}
        loading="lazy"
      />
    </button>
  );
}
```

```css
/* components/BackToTopButton.module.css */
.backToTop {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 80px;
  height: 80px;
  max-width: 80px;
  max-height: 80px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 9999;
}

.backToTop:hover {
  transform: translateY(-2px);
}

.backToTop.show {
  background-color: #dcf4ef; /* --ica-mint */
  padding: 5px;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.backToTop img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

---

## ✅ Pixel-Perfect Checklist

### **1. Typography**
- [ ] Use exact font families: `ivypresto-display`, `Termina`, `roboto-condensed`
- [ ] Match font sizes at each breakpoint
- [ ] Match letter-spacing and text-transform (uppercase)

### **2. Spacing**
- [ ] Container max-width: `1200px`
- [ ] Padding: `0 1rem` (mobile), `0 2rem` (tablet+)
- [ ] Grid gaps: `2rem` (mobile), `2.5rem` (tablet), `2rem` (desktop)
- [ ] Section padding: `2rem 0` (mobile), `3rem 0` (tablet), `5rem 0` (large), `6rem 0` (xl)

### **3. Colors**
- [ ] Use exact hex values from CSS variables
- [ ] Match hover states (lavender on buttons, teal on links)

### **4. Sizing**
- [ ] Logo sizes match at each breakpoint
- [ ] Badge sizes match exactly
- [ ] Button sizes and padding match
- [ ] Social icon sizes match

### **5. Layout**
- [ ] Mobile: Single column stack
- [ ] Tablet: 2-column content section
- [ ] Desktop: 3-column grid with exact column widths
- [ ] Nav/Social: 80/20 split on desktop

### **6. Responsive Behavior**
- [ ] Test all 6 breakpoints
- [ ] Verify grid template areas change correctly
- [ ] Check flex direction changes (column ↔ row)
- [ ] Ensure text alignment changes (center ↔ left)

---

## 🎯 Key Differences: WordPress vs Next.js

### **Image Handling**
- **WordPress**: `wp_get_attachment_image()` with responsive sizes
- **Next.js**: Use `next/image` with `width` and `height` props

### **Font Loading**
- **WordPress**: Fonts loaded via theme font system
- **Next.js**: Use `next/font` or load fonts in `_document.tsx`

### **SVG Icons**
- **WordPress**: SVG sprite system (`sprite.svg#icon-fb`)
- **Next.js**: Import SVGs directly or use a sprite system

### **CSS Modules**
- **WordPress**: Global CSS with `.ica-footer` prefix
- **Next.js**: CSS Modules (`.module.css`) for scoped styles

---

## 📝 Additional Notes

1. **No Tables**: The footer uses CSS Grid, NOT HTML tables
2. **Mobile First**: All styles start mobile, then scale up
3. **Grid Template Areas**: Semantic naming for responsive layout
4. **Nested Grid**: Desktop nav/social uses nested grid for 80/20 split
5. **Image Optimization**: Use Next.js Image component for automatic optimization
6. **Accessibility**: All links have `aria-label` attributes
7. **Performance**: Lazy load images below the fold

---

## 🔍 Testing Recommendations

1. **Viewport Testing**: Test at all breakpoints (350px, 480px, 768px, 1024px, 1200px, 1440px)
2. **Browser Testing**: Chrome, Firefox, Safari, Edge
3. **Device Testing**: iPhone, iPad, Android, Desktop
4. **Accessibility**: Screen reader testing, keyboard navigation
5. **Performance**: Lighthouse score, Core Web Vitals

---

This guide provides everything needed to recreate the footer pixel-perfect in Next.js! 🚀

