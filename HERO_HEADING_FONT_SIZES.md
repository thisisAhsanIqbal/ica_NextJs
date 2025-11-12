# Hero Component Heading Font Sizes

## Responsive Font Size Implementation

The Hero component heading (`h1`) now uses specific font sizes based on viewport width.

## Font Size Breakpoints

| Screen Width | Font Size | Implementation |
|--------------|-----------|----------------|
| **< 450px** | **40px** | Default (base) |
| **450px - 499px** | **45px** | `min-width: 450px` |
| **500px - 549px** | **50px** | `min-width: 500px` |
| **550px - 599px** | **54px** | `min-width: 550px` |
| **600px - 649px** | **60px** | `min-width: 600px` |
| **650px - 699px** | **65px** | `min-width: 650px` |
| **700px - 749px** | **70px** | `min-width: 700px` |
| **750px - 767px** | **75px** | `min-width: 750px` |
| **768px - 1000px** | **50px** | `min-width: 768px` and `max-width: 1000px` |
| **1001px - 1199px** | **clamp(53px, 0.5vw, 65px)** | `min-width: 1001px` and `max-width: 1199px` |
| **≥ 1200px** | **clamp(65px, 0.3vw, 68px)** | `min-width: 1200px` |

## Implementation Details

### Location
- **CSS File**: `app/components/homepage/Hero.module.css`
- **Component**: `app/components/homepage/Hero.tsx`

### CSS Structure
The font sizes are implemented using CSS media queries in `Hero.module.css`:

```css
/* Base (mobile-first) */
.hero h1 {
  font-size: 40px;
}

/* Progressive breakpoints */
@media (min-width: 450px) { font-size: 45px; }
@media (min-width: 500px) { font-size: 50px; }
@media (min-width: 550px) { font-size: 54px; }
@media (min-width: 600px) { font-size: 60px; }
@media (min-width: 650px) { font-size: 65px; }
@media (min-width: 700px) { font-size: 70px; }
@media (min-width: 750px) { font-size: 75px; }

/* Range-based breakpoints */
@media (min-width: 768px) and (max-width: 1000px) {
  font-size: 50px;
}

@media (min-width: 1001px) and (max-width: 1199px) {
  font-size: clamp(53px, 0.5vw, 65px);
}

@media (min-width: 1200px) {
  font-size: clamp(65px, 0.3vw, 68px);
}
```

### Viewport-Based Scaling (clamp)

For larger screens (1001px+), the font size uses `clamp()` for smooth scaling:

- **1001px - 1199px**: `clamp(53px, 0.5vw, 65px)`
  - Minimum: 53px
  - Preferred: 0.5% of viewport width
  - Maximum: 65px

- **≥ 1200px**: `clamp(65px, 0.3vw, 68px)`
  - Minimum: 65px
  - Preferred: 0.3% of viewport width
  - Maximum: 68px

## Notes

1. **Mobile-First Approach**: The base font size (40px) applies to screens smaller than 450px
2. **Progressive Enhancement**: Font sizes increase as screen width increases
3. **Tablet Range**: The 768px-1000px range uses a fixed 50px (slightly smaller than mobile's peak of 75px)
4. **Desktop Scaling**: Screens 1001px and above use fluid scaling with `clamp()` for smooth transitions
5. **Large Desktop**: Screens 1200px+ have a tighter range (65px-68px) for optimal readability

## Testing Recommendations

Test the heading at these key breakpoints:
- 320px (small mobile)
- 450px (breakpoint change)
- 500px, 550px, 600px, 650px, 700px, 750px (progressive increases)
- 767px vs 768px (75px → 50px transition)
- 1000px vs 1001px (50px → clamp transition)
- 1199px vs 1200px (clamp range change)
- 1920px (large desktop, should be near 68px max)


