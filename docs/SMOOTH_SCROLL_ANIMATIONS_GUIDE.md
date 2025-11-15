# 🎬 Smooth Scroll Animations Guide

This guide shows you how to add premium, smooth scroll-triggered animations to any page in your Next.js app.

## 📦 What You Have

- ✅ **Framer Motion** (already installed) - Best for smooth animations
- ✅ **useInView hook** - Basic intersection observer
- ✅ **ScrollReveal component** - New reusable component
- ✅ **StaggerReveal component** - For staggered animations

---

## 🚀 Quick Start

### Option 1: Using ScrollReveal Component (Recommended)

Wrap any component with `ScrollReveal` for smooth animations:

```tsx
import ScrollReveal from '@/app/components/shared/ScrollReveal';

export default function MyPage() {
  return (
    <div>
      {/* Fade in from bottom */}
      <ScrollReveal direction="up">
        <section>
          <h2>Your Content</h2>
        </section>
      </ScrollReveal>

      {/* Slide from left with delay */}
      <ScrollReveal direction="left" delay={0.3}>
        <div>Another section</div>
      </ScrollReveal>
    </div>
  );
}
```

### Option 2: Using StaggerReveal for Lists/Grids

Perfect for card grids, lists, or any repeated content:

```tsx
import StaggerReveal from '@/app/components/shared/StaggerReveal';

export default function ProgramsPage() {
  const programs = [/* your data */];
  
  return (
    <StaggerReveal delay={0.15} direction="up">
      {programs.map((program, index) => (
        <ProgramCard key={index} program={program} />
      ))}
    </StaggerReveal>
  );
}
```

---

## 🎨 Available Options

### ScrollReveal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'fade'` | `'up'` | Animation direction |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `duration` | `number` | `0.6` | Animation duration (seconds) |
| `amount` | `number` | `0.3` | How much must be visible to trigger (0-1) |
| `className` | `string` | `''` | Additional CSS classes |

### StaggerReveal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | `number` | `0.1` | Delay between each item (seconds) |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Animation direction |
| `duration` | `number` | `0.5` | Animation duration per item |
| `className` | `string` | `''` | Container CSS classes |
| `itemClassName` | `string` | `''` | Individual item CSS classes |

---

## 💡 Best Practices

### 1. **Use Different Directions for Variety**
```tsx
<ScrollReveal direction="up">    {/* Most common - feels natural */}
<ScrollReveal direction="left">  {/* Good for sidebars */}
<ScrollReveal direction="right"> {/* Good for alternating sections */}
<ScrollReveal direction="fade">  {/* Subtle, elegant */}
```

### 2. **Adjust Trigger Point**
```tsx
// Trigger early (when 10% visible) - good for slow scrollers
<ScrollReveal amount={0.1}>

// Trigger late (when 50% visible) - more dramatic
<ScrollReveal amount={0.5}>
```

### 3. **Stagger for Grids**
```tsx
// Fast stagger (0.1s) - quick, energetic
<StaggerReveal delay={0.1}>

// Slow stagger (0.2s) - elegant, premium
<StaggerReveal delay={0.2}>
```

### 4. **Combine with Your Existing Components**
```tsx
import ScrollReveal from '@/app/components/shared/ScrollReveal';
import Programs from '@/app/components/homepage/Programs';

export default function HomePage() {
  return (
    <ScrollReveal direction="up" delay={0.2}>
      <Programs heading="Arts Areas" items={programsData} />
    </ScrollReveal>
  );
}
```

---

## 🎯 Common Use Cases

### Hero Section
```tsx
<ScrollReveal direction="fade" duration={1}>
  <HeroSection />
</ScrollReveal>
```

### Feature Cards
```tsx
<StaggerReveal delay={0.15} direction="up">
  {features.map(feature => (
    <FeatureCard key={feature.id} feature={feature} />
  ))}
</StaggerReveal>
```

### Alternating Sections
```tsx
<ScrollReveal direction="left">
  <Section1 />
</ScrollReveal>

<ScrollReveal direction="right">
  <Section2 />
</ScrollReveal>
```

### Image Galleries
```tsx
<StaggerReveal delay={0.1} direction="up" className="grid grid-cols-3">
  {images.map(img => (
    <Image key={img.id} src={img.src} alt={img.alt} />
  ))}
</StaggerReveal>
```

---

## 🔧 Advanced: Custom Animations with Framer Motion

If you need more control, use Framer Motion directly:

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CustomAnimatedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2>Custom Animation</h2>
    </motion.section>
  );
}
```

---

## ⚡ Performance Tips

1. **Use `once: true`** - Animations only play once (already included)
2. **Don't over-animate** - Not every element needs animation
3. **Use `will-change` sparingly** - Framer Motion handles this automatically
4. **Test on mobile** - Some animations may feel slow on low-end devices

---

## 🎨 Animation Timing Recommendations

| Content Type | Duration | Delay | Direction |
|-------------|----------|-------|-----------|
| Hero/Title | 0.8-1.0s | 0s | fade or up |
| Sections | 0.6-0.8s | 0.1-0.2s | up |
| Cards/Grids | 0.5s | 0.1-0.15s | up (staggered) |
| Images | 0.6s | 0.2s | fade |
| Sidebars | 0.5s | 0s | left/right |

---

## 🐛 Troubleshooting

### Animation not triggering?
- Check if element is initially visible (above fold)
- Reduce `amount` prop (try 0.1)
- Add `margin` to trigger earlier

### Animation feels choppy?
- Reduce `duration` (try 0.4-0.5s)
- Check browser performance
- Ensure Framer Motion is properly installed

### Too many animations?
- Use animations selectively on key sections
- Consider reducing stagger delay
- Use `fade` direction for subtler effects

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- Your existing `useInView` hook: `app/hooks/useInView.ts`

---

## ✅ Quick Checklist

- [ ] Import `ScrollReveal` or `StaggerReveal`
- [ ] Wrap your component
- [ ] Choose appropriate `direction`
- [ ] Adjust `delay` and `duration` if needed
- [ ] Test on different screen sizes
- [ ] Test scroll speed (fast vs slow)

---

**Happy Animating! 🎉**

