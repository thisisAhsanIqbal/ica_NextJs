# Nondiscriminatory Policy Component: Custom CSS to Tailwind Migration Analysis

## Summary
**✅ YES - 100% Convertible to Tailwind CSS**

This component can be fully migrated to Tailwind CSS while maintaining 100% design parity. All CSS properties have direct Tailwind equivalents, with some requiring arbitrary values for complex properties like `clamp()`, `contain`, and multi-part box-shadows.

---

## Migration Table

| **CSS Class** | **CSS Property** | **Current CSS** | **Can Replace?** | **Tailwind Equivalent** | **Where to Apply** | **Notes** |
|--------------|------------------|-----------------|------------------|------------------------|-------------------|-----------|
| `.icaNondiscriminatoryPolicy` | `font-weight` | `400` | ✅ **YES** | `font-normal` | Section element (Line 15) | Standard utility |
| `.icaNondiscriminatoryPolicy` | `background` | `var(--ica-green-deep)` | ✅ **YES** | `bg-[var(--ica-green-deep)]` | Section element (Line 15) | Arbitrary value with CSS variable |
| `.icaNondiscriminatoryPolicy` | `padding` | `var(--global-padding-desktop) 0` | ✅ **YES** | `py-[var(--global-padding-desktop)]` | Section element (Line 15) | Arbitrary value with CSS variable |
| `.icaNondiscriminatoryPolicy` | `text-align` | `center` | ✅ **YES** | `text-center` | Section element (Line 15) | Standard utility |
| `.icaNondiscriminatoryPolicy` | `display` | `flex` | ✅ **YES** | `flex` | Section element (Line 15) | Standard utility |
| `.icaNondiscriminatoryPolicy` | `flex-direction` | `column` | ✅ **YES** | `flex-col` | Section element (Line 15) | Standard utility |
| `.icaNondiscriminatoryPolicy` | `align-items` | `center` | ✅ **YES** | `items-center` | Section element (Line 15) | Standard utility |
| `.icaNondiscriminatoryPolicy` | `justify-content` | `center` | ✅ **YES** | `justify-center` | Section element (Line 15) | Standard utility |
| `.icaNondiscriminatoryPolicy` | `contain` | `layout style paint` | ✅ **YES** | `[contain:layout_style_paint]` | Section element (Line 15) | Arbitrary value |
| `.icaNondiscriminatoryPolicy` (mobile) | `padding` | `var(--global-padding-mobile)` | ✅ **YES** | `max-md:py-[var(--global-padding-mobile)]` | Section element (Line 15) | Responsive with arbitrary value |
| `.icaNondiscriminatoryPolicy` (reduced motion) | `transition` | `none` | ✅ **YES** | `motion-reduce:transition-none` | Section element (Line 15) | Reduced motion variant |
| `.icaNondiscriminatoryPolicy` (reduced motion) | `opacity` | `1` | ✅ **YES** | `motion-reduce:opacity-100` | Section element (Line 15) | Reduced motion variant |
| `.icaNondiscriminatoryPolicy` (reduced motion) | `transform` | `none` | ✅ **YES** | `motion-reduce:transform-none` | Section element (Line 15) | Reduced motion variant |
| `.sectionInner` | `max-width` | `1280px` | ✅ **YES** | `max-w-[1280px]` | Inner div (Line 20) | Arbitrary value |
| `.sectionInner` | `margin` | `0 auto` | ✅ **YES** | `mx-auto` | Inner div (Line 20) | Standard utility |
| `.sectionInner` | `padding` | `0 2rem` | ✅ **YES** | `px-8` | Inner div (Line 20) | Standard utility (2rem = 8) |
| `.sectionInner` | `width` | `100%` | ✅ **YES** | `w-full` | Inner div (Line 20) | Standard utility |
| `.sectionInner` (mobile) | `padding` | `0 1rem` | ✅ **YES** | `max-md:px-4` | Inner div (Line 20) | Responsive utility |
| `.policyCard` | `max-width` | `920px` | ✅ **YES** | `max-w-[920px]` | Card div (Line 21) | Arbitrary value |
| `.policyCard` | `margin` | `0 auto` | ✅ **YES** | `mx-auto` | Card div (Line 21) | Standard utility |
| `.policyCard` | `background` | `rgba(255, 255, 255, 0.06)` | ✅ **YES** | `bg-[rgba(255,255,255,0.06)]` | Card div (Line 21) | Arbitrary value with rgba |
| `.policyCard` | `border-radius` | `12px` | ✅ **YES** | `rounded-xl` | Card div (Line 21) | Standard utility (12px = xl) |
| `.policyCard` | `border` | `1px solid rgba(255, 255, 255, 0.15)` | ✅ **YES** | `border border-[rgba(255,255,255,0.15)]` | Card div (Line 21) | Arbitrary value with rgba |
| `.policyCard` | `padding` | `clamp(20px, 4vw, 40px)` | ✅ **YES** | `p-[clamp(20px,4vw,40px)]` | Card div (Line 21) | Arbitrary value with clamp |
| `.policyCard` | `box-shadow` | `0 1px 0 rgba(0,0,0,0.25) inset, 0 0 0 1px rgba(255,255,255,0.06)` | ✅ **YES** | `[box-shadow:0_1px_0_rgba(0,0,0,0.25)_inset,0_0_0_1px_rgba(255,255,255,0.06)]` | Card div (Line 21) | Arbitrary value for complex shadow |
| `.policyCardTitle` | `color` | `var(--ica-bg)` | ✅ **YES** | `text-[var(--ica-bg)]` | h2 element (Line 22) | Arbitrary value with CSS variable |
| `.policyCardTitle` | `font-family` | `"Termina", var(--font-ui)` | ✅ **YES** | `font-[Termina,var(--font-ui)]` | h2 element (Line 22) | Arbitrary value with font stack |
| `.policyCardTitle` | `font-weight` | `500 !important` | ✅ **YES** | `!font-medium` | h2 element (Line 22) | Important modifier |
| `.policyCardTitle` | `margin` | `0 0 12px` | ✅ **YES** | `mb-3` | h2 element (Line 22) | Standard utility (12px = 3) |
| `.policyCardTitle` | `font-size` | `clamp(19px, 4vw, 23px)` | ✅ **YES** | `text-[clamp(19px,4vw,23px)]` | h2 element (Line 22) | Arbitrary value with clamp |
| `.policyCardTitle` | `letter-spacing` | `1px` | ✅ **YES** | `tracking-[1px]` | h2 element (Line 22) | Arbitrary value |
| `.policyCardTitle` | `text-transform` | `uppercase` | ✅ **YES** | `uppercase` | h2 element (Line 22) | Standard utility |
| `.policyCardTitle` | `font-display` | `swap` | ✅ **YES** | `[font-display:swap]` | h2 element (Line 22) | Arbitrary value |
| `.policyCardText` | `color` | `var(--ica-bg)` | ✅ **YES** | `text-[var(--ica-bg)]` | p element (Line 25) | Arbitrary value with CSS variable |
| `.policyCardText` | `font-family` | `"Termina", var(--font-ui)` | ✅ **YES** | `font-[Termina,var(--font-ui)]` | p element (Line 25) | Arbitrary value with font stack |
| `.policyCardText` | `margin` | `0` | ✅ **YES** | `m-0` | p element (Line 25) | Standard utility |
| `.policyCardText` | `font-size` | `16px` | ✅ **YES** | `text-base` | p element (Line 25) | Standard utility (16px = base) |
| `.policyCardText` | `line-height` | `1.65` | ✅ **YES** | `leading-[1.65]` | p element (Line 25) | Arbitrary value |
| `.policyCardText` | `font-weight` | `400` | ✅ **YES** | `font-normal` | p element (Line 25) | Standard utility |
| `.policyCardText` | `text-align` | `justify` | ✅ **YES** | `text-justify` | p element (Line 25) | Standard utility |

---

## Complete Tailwind Class Strings

### Section Element (`.icaNondiscriminatoryPolicy`)
Replace `className={styles.icaNondiscriminatoryPolicy}` with:

```tsx
className="font-normal bg-[var(--ica-green-deep)] py-[var(--global-padding-desktop)] text-center flex flex-col items-center justify-center [contain:layout_style_paint] max-md:py-[var(--global-padding-mobile)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none"
```

### Section Inner (`.sectionInner`)
Replace `className={styles.sectionInner}` with:

```tsx
className="max-w-[1280px] mx-auto px-8 w-full max-md:px-4"
```

### Policy Card (`.policyCard`)
Replace `className={styles.policyCard}` with:

```tsx
className="max-w-[920px] mx-auto bg-[rgba(255,255,255,0.06)] rounded-xl border border-[rgba(255,255,255,0.15)] p-[clamp(20px,4vw,40px)] [box-shadow:0_1px_0_rgba(0,0,0,0.25)_inset,0_0_0_1px_rgba(255,255,255,0.06)]"
```

### Policy Card Title (`.policyCardTitle`)
Replace `className={styles.policyCardTitle}` with:

```tsx
className="text-[var(--ica-bg)] font-[Termina,var(--font-ui)] !font-medium mb-3 text-[clamp(19px,4vw,23px)] tracking-[1px] uppercase [font-display:swap]"
```

### Policy Card Text (`.policyCardText`)
Replace `className={styles.policyCardText}` with:

```tsx
className="text-[var(--ica-bg)] font-[Termina,var(--font-ui)] m-0 text-base leading-[1.65] font-normal text-justify"
```

---

## Migration Assessment

### ✅ **FULLY REPLACEABLE** (100% of CSS)
- **All layout properties** - Flexbox, positioning, spacing
- **All typography** - Font sizes, weights, line heights, letter spacing
- **All colors** - Background, text colors, borders
- **All responsive breakpoints** - Mobile padding adjustments
- **All complex properties** - Clamp functions, contain property, multi-part box-shadows
- **Reduced motion support** - Motion-reduce variants

### ⚠️ **REQUIRES ARBITRARY VALUES** (But fully supported)
- `clamp()` functions for responsive sizing
- `contain` property for performance optimization
- Complex multi-part box-shadows
- CSS variable references
- Font family stacks with fallbacks

### ❌ **NOT APPLICABLE**
- No CSS that cannot be converted

---

## Benefits of Migration

1. ✅ **Consistency** - All styles in one place (Tailwind)
2. ✅ **Maintainability** - Easier to read and modify inline
3. ✅ **Performance** - Tailwind purges unused styles
4. ✅ **Responsive** - Better breakpoint management with `max-md:` syntax
5. ✅ **No CSS Modules** - Reduce file dependencies
6. ✅ **100% Design Parity** - All styles can be replicated exactly

---

## Potential Challenges & Solutions

### Challenge 1: Complex Box Shadow
**Issue**: Multi-part box-shadow with inset and multiple layers
**Solution**: Use arbitrary value `[box-shadow:...]` - fully supported

### Challenge 2: CSS Variable References
**Issue**: Using `var(--ica-green-deep)` and `var(--global-padding-desktop)`
**Solution**: Tailwind supports CSS variables in arbitrary values: `bg-[var(--ica-green-deep)]`

### Challenge 3: Clamp Functions
**Issue**: Responsive font sizes and padding using `clamp()`
**Solution**: Arbitrary values support clamp: `text-[clamp(19px,4vw,23px)]`

### Challenge 4: Contain Property
**Issue**: CSS containment for performance
**Solution**: Arbitrary value: `[contain:layout_style_paint]`

---

## Migration Steps

1. **Update Component** (5 minutes)
   - Replace all `className={styles.*}` with Tailwind classes
   - Remove CSS module import

2. **Test Responsive** (5 minutes)
   - Verify mobile padding (`max-md:py-[var(--global-padding-mobile)]`)
   - Verify mobile inner padding (`max-md:px-4`)

3. **Test Reduced Motion** (2 minutes)
   - Enable reduced motion in browser settings
   - Verify transitions are disabled

4. **Visual Comparison** (5 minutes)
   - Compare before/after side-by-side
   - Verify all spacing, colors, and typography match

5. **Delete CSS Module** (1 minute)
   - Remove `NondiscriminatoryPolicy.module.css` file

**Total Estimated Time**: ~18 minutes

---

## Final Verdict

**✅ YES - This component can be 100% converted to Tailwind CSS**

All CSS properties have direct Tailwind equivalents. The design will remain 100% identical. The migration is straightforward and follows the same pattern as the Hero component migration already documented in the codebase.


