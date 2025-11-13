# Tailwind CSS Viewport-Based Font Sizing Guide

## Overview
Yes! Tailwind CSS supports viewport-based font sizing. You're already using it in your codebase. Here are all the methods available:

---

## Method 1: Using `clamp()` with Arbitrary Values (Currently Used)

This is the **best practice** for responsive typography. It sets a minimum, preferred (viewport-based), and maximum size.

### Syntax
```tsx
className="text-[clamp(minSize, preferredSize, maxSize)]"
```

### Examples from Your Codebase

**Hero Headline:**
```tsx
// Desktop: scales from 49.6px to 65.6px based on 5vw
// Mobile: scales from 52px to 55px based on 2.5vw
<h1 className="text-[clamp(49.6px,5vw,65.6px)] max-md:text-[clamp(52px,2.5vw,55px)]">
  Heading
</h1>
```

**Feature Section Title (Eyebrow):**
```tsx
// Scales from 65px to 75px based on 6vw
<h2 className="text-[clamp(65px,6vw,75px)]">
  Title
</h2>
```

**Feature Section Headline:**
```tsx
// Scales from 18px to 24px based on 2.5vw
<h3 className="text-[clamp(18px,2.5vw,24px)]">
  Headline
</h3>
```

### How `clamp()` Works
- **First value** (min): Minimum font size (e.g., `65px`)
- **Second value** (preferred): Viewport-based size (e.g., `6vw` = 6% of viewport width)
- **Third value** (max): Maximum font size (e.g., `75px`)

The browser will:
1. Calculate the preferred size based on viewport
2. Use the minimum if preferred is too small
3. Use the maximum if preferred is too large

---

## Method 2: Direct Viewport Units (vw, vh, vmin, vmax)

You can use viewport units directly, but they don't have min/max limits.

### Syntax
```tsx
className="text-[5vw]"  // 5% of viewport width
className="text-[10vh]" // 10% of viewport height
```

### Examples
```tsx
// Scales with viewport width (no limits)
<h1 className="text-[5vw]">Heading</h1>

// Scales with viewport height
<h2 className="text-[10vh]">Heading</h2>

// Uses smaller of width/height
<h3 className="text-[8vmin]">Heading</h3>

// Uses larger of width/height
<h4 className="text-[6vmax]">Heading</h4>
```

⚠️ **Warning**: Direct viewport units can become too small on mobile or too large on desktop. Use `clamp()` instead.

---

## Method 3: Responsive Breakpoints with Viewport Units

Combine Tailwind's responsive breakpoints with viewport units:

```tsx
<h1 className="text-[4vw] md:text-[5vw] lg:text-[6vw]">
  Responsive Viewport Heading
</h1>
```

---

## Method 4: Custom Tailwind Configuration

You can add custom font sizes to `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'fluid-h1': 'clamp(2rem, 5vw, 4rem)',
        'fluid-h2': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-h3': 'clamp(1.25rem, 3vw, 2rem)',
      }
    }
  }
}
```

Then use them like:
```tsx
<h1 className="text-fluid-h1">Heading</h1>
<h2 className="text-fluid-h2">Subheading</h2>
```

---

## Recommended Patterns

### Pattern 1: Hero Headings (Large)
```tsx
// Scales smoothly from mobile to desktop
<h1 className="text-[clamp(2.5rem, 5vw, 4rem)]">
  Main Hero Title
</h1>
```

### Pattern 2: Section Titles
```tsx
// Medium-sized headings
<h2 className="text-[clamp(2rem, 4vw, 3rem)]">
  Section Title
</h2>
```

### Pattern 3: Subheadings
```tsx
// Smaller headings
<h3 className="text-[clamp(1.125rem, 2.5vw, 1.5rem)]">
  Subheading
</h3>
```

### Pattern 4: With Responsive Overrides
```tsx
// Different scaling on mobile vs desktop
<h1 className="text-[clamp(2rem, 4vw, 3rem)] md:text-[clamp(3rem, 5vw, 4.5rem)]">
  Responsive Heading
</h1>
```

---

## Viewport Unit Reference

| Unit | Description | Example |
|------|-------------|---------|
| `vw` | 1% of viewport width | `5vw` = 5% of screen width |
| `vh` | 1% of viewport height | `10vh` = 10% of screen height |
| `vmin` | 1% of smaller dimension | `8vmin` = 8% of smaller side |
| `vmax` | 1% of larger dimension | `6vmax` = 6% of larger side |

---

## Best Practices

1. ✅ **Always use `clamp()`** - Prevents text from being too small or too large
2. ✅ **Set reasonable min/max values** - Test on mobile (320px) and large desktop (1920px+)
3. ✅ **Use `vw` for horizontal scaling** - Most common for typography
4. ✅ **Combine with responsive breakpoints** - Different scaling for mobile/tablet/desktop
5. ❌ **Avoid pure viewport units** - They can break on extreme screen sizes

---

## Current Implementation in Your Codebase

### Hero Component
```tsx
// Line 104 in Hero.tsx
<h1 className="text-[clamp(49.6px,5vw,65.6px)] max-md:text-[clamp(52px,2.5vw,55px)]">
```

### FeatureSection Component
```tsx
// Line 64 - Title (Eyebrow)
<h2 className="text-[clamp(65px,6vw,75px)]">

// Line 69 - Headline
<h3 className="text-[clamp(18px,2.5vw,24px)]">
```

---

## Testing Your Font Sizes

1. **Mobile (320px)**: Check minimum sizes aren't too small
2. **Tablet (768px)**: Verify scaling looks good
3. **Desktop (1280px)**: Ensure maximum sizes aren't too large
4. **Large Desktop (1920px+)**: Confirm text doesn't become huge

---

## Quick Reference

```tsx
// Small heading
text-[clamp(1rem, 2vw, 1.5rem)]

// Medium heading
text-[clamp(1.5rem, 3vw, 2.5rem)]

// Large heading
text-[clamp(2rem, 4vw, 3.5rem)]

// Extra large heading
text-[clamp(2.5rem, 5vw, 4.5rem)]
```



