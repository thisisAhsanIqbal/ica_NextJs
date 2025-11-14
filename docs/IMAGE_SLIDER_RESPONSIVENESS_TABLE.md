# Image Slider Responsiveness Table

## Overview
This document details the responsive behavior of image sliders across all screen sizes. The project uses two types of sliders:
1. **Hero Slider** (`isHero={true}`) - Used in the Hero component
2. **Regular Slider** (`isHero={false}`) - Used in FeatureSection components

---

## Hero Slider Responsiveness

| Screen Size | Breakpoint | Aspect Ratio | Height | Max Height | Object Position | Image Sizes |
|------------|------------|--------------|--------|------------|------------------|-------------|
| **Mobile** | `max-width: 767px` | **16:10** | `auto` | **450px** | `center 25%` | `100vw` |
| **Tablet** | `768px - 1024px` | **9:16** | `auto` | **550px** | `center 30%` | `50vw` |
| **Desktop** | `min-width: 1025px` | **1:1** (Square) | `auto` | `none` | `center 30%` | `50vw` |
| **XL Desktop** | `min-width: 1280px` | **1:1** (Square) | `auto` | `none` | `center` | `50vw` |

### Hero Slider Additional Properties
- **Min Height**: `300px` (Mobile only)
- **Base Classes**: `aspect-[1100/650] h-[60vh]` (overridden by CSS)
- **Border Radius**: `rounded-3xl`
- **Shadow**: `shadow-[0_8px_32px_rgba(0,0,0,0.15)]`

---

## Regular Slider Responsiveness

| Screen Size | Breakpoint | Aspect Ratio | Height | Max Height | Object Position | Image Sizes |
|------------|------------|--------------|--------|------------|------------------|-------------|
| **Mobile** | `max-width: 700px` | `unset` | **35vh** | `none` | `center` | `100vw` |
| **Tablet** | `701px - 1024px` | **1100:650** | **60vh** | `none` | `center` | `50vw` |
| **Desktop** | `min-width: 1025px` | **1100:650** | **60vh** | `none` | `center` | `50vw` |

### Regular Slider Additional Properties
- **Base Classes**: `aspect-[1100/650] h-[60vh]`
- **Border Radius**: `rounded-3xl`
- **Shadow**: `shadow-[0_8px_32px_rgba(0,0,0,0.15)]`

---

## Common Slider Properties (Both Types)

### Swiper Configuration
- **Effect**: `fade` (crossFade: true)
- **Autoplay**: `4500ms` delay
- **Loop**: `true` (if more than 1 slide)
- **Keyboard**: `enabled`
- **Touch**: `enabled` (allowTouchMove: true)
- **Speed**: `600ms` transition
- **Grab Cursor**: `true`

### Image Properties
- **Fill**: `true` (Next.js Image component)
- **Object Fit**: `cover`
- **Quality**: `85`
- **Priority**: First slide only (`priority={index === 0}`)
- **Loading**: First slide `eager`, others `lazy`

---

## Breakpoint Reference

Based on Tailwind config and CSS media queries:

| Breakpoint Name | Pixel Range | Usage |
|----------------|-------------|-------|
| **Mobile** | `0px - 700px` | Small phones, regular slider mobile override |
| **Mobile (Hero)** | `0px - 767px` | Small phones, hero slider mobile |
| **Tablet** | `768px - 1024px` | Tablets, both sliders |
| **Desktop** | `1025px+` | Desktop screens |
| **XL Desktop** | `1280px+` | Large desktop screens |

---

## Tailwind Breakpoints Used

| Class | Breakpoint | Description |
|-------|------------|-------------|
| `max-md:` | `max-width: 767px` | Mobile and below |
| `md:` | `min-width: 768px` | Tablet and above |
| `lg:` | `min-width: 1024px` | Desktop and above |
| `xl:` | `min-width: 1280px` | XL Desktop and above |

---

## CSS Media Query Breakpoints

| Media Query | Breakpoint | Applied To |
|-------------|------------|------------|
| `@media (max-width: 767px)` | Mobile | Hero slider aspect ratio |
| `@media (min-width: 768px) and (max-width: 1024px)` | Tablet | Hero slider aspect ratio |
| `@media (min-width: 1025px)` | Desktop | Hero slider aspect ratio |
| `@media (max-width: 700px)` | Mobile | Regular slider height override |

---

## Image Sizes Attribute Breakdown

The `sizes` attribute for Next.js Image optimization:

```html
sizes="(min-width: 1025px) 50vw, (min-width: 768px) 50vw, 100vw"
```

| Condition | Image Width | Screen Size |
|-----------|-------------|-------------|
| `min-width: 1025px` | `50vw` | Desktop (slider takes 50% of viewport in grid) |
| `min-width: 768px` | `50vw` | Tablet (slider takes 50% of viewport in grid) |
| Default | `100vw` | Mobile (slider takes full width) |

---

## Summary

### Hero Slider
- **Mobile**: Taller, portrait-friendly (16:10), max 450px height
- **Tablet**: Portrait orientation (9:16), max 550px height
- **Desktop**: Square (1:1), no height limit

### Regular Slider
- **Mobile**: Fixed viewport height (35vh), aspect ratio disabled
- **Tablet+**: Maintains 1100:650 aspect ratio, 60vh height

Both sliders use fade transitions, autoplay, and are fully touch/keyboard accessible.

