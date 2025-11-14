# Hero vs School Component - Image Ratio & Size Comparison

## Image Slider Comparison Table

| Breakpoint | Hero Component | School Component |
|------------|---------------|-----------------|
| **Base (All Screens)** | `aspect-[1100/650]` (≈1.69:1)<br>`h-[60vh]` | `aspect-[1100/650]` (≈1.69:1)<br>`h-[60vh]` |
| **Mobile (≤700px)** | `aspect-ratio: 16/10` (1.6:1)<br>`min-height: 300px`<br>`max-height: 450px` | `height: 35vh`<br>`aspect-ratio: unset` |
| **Tablet (768px-1024px)** | `aspect-ratio: 9/16` (0.56:1, portrait)<br>`max-height: 550px` | `aspect-[1100/650]` (≈1.69:1)<br>`h-[60vh]` |
| **Desktop (≥1025px)** | `aspect-ratio: 1/1` (1:1, square)<br>`max-height: none` | `aspect-[1100/650]` (≈1.69:1)<br>`h-[60vh]` |

## Key Differences

### Hero Component
- **Mobile**: Uses 16:10 aspect ratio (landscape, optimized for group photos)
- **Tablet**: Uses 9:16 aspect ratio (portrait orientation)
- **Desktop**: Uses 1:1 aspect ratio (square)
- **Object Position**: Custom positioning for hero images:
  - Mobile: `object-[center_25%]`
  - Tablet/Desktop: `object-[center_30%]`
  - XL: `object-center`

### School Component
- **Mobile (≤700px)**: Uses viewport height (35vh) with aspect ratio disabled
- **Tablet & Desktop**: Maintains consistent 1100:650 aspect ratio (≈1.69:1 landscape)
- **Object Position**: Standard `object-center` (no custom positioning)

## Aspect Ratio Summary

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| **Hero** | 16:10 (1.6:1) | 9:16 (0.56:1) | 1:1 (1:1) |
| **School** | 35vh (no fixed ratio) | 1100:650 (1.69:1) | 1100:650 (1.69:1) |

## Image Sizing Details

### Hero Component
- **Base**: `aspect-[1100/650]` + `h-[60vh]`
- **Special handling**: Hero slider has responsive aspect ratios that change per breakpoint
- **Height constraints**: 
  - Mobile: 300px - 450px
  - Tablet: up to 550px
  - Desktop: no max height

### School Component  
- **Base**: `aspect-[1100/650]` + `h-[60vh]`
- **Mobile override**: Fixed at 35vh height, aspect ratio disabled
- **Tablet/Desktop**: Maintains base 1100:650 ratio with 60vh height

## Code References

### Hero Component
- **Component**: `app/components/homepage/Hero.tsx` (line 100: `isHero={true}`)
- **CSS**: `app/components/homepage/FeatureSection.module.css` (lines 13-47: `.heroSlider` responsive rules)
- **Base Styles**: `app/components/homepage/FeatureSection.tsx` (line 79: base slider classes)

### School Component
- **Component**: `app/components/homepage/School.tsx` (uses FeatureSection without `isHero` prop)
- **CSS**: `app/components/homepage/FeatureSection.module.css` (lines 77-82: `.slider:not(.heroSlider)` mobile override)
- **Base Styles**: `app/components/homepage/FeatureSection.tsx` (line 79: base slider classes)

