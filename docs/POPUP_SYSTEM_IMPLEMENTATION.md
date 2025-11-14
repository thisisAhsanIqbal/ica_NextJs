# Universal Popup System - Implementation Summary

## ✅ What Has Been Created

I've created a complete, flexible popup system for your Next.js application. Here's what's included:

### 1. **Type Definitions** (`app/types/popup.ts`)
   - TypeScript interfaces for popup data
   - Support for both full and minimal popup variants
   - Type-safe script handling (iframe, script, html)

### 2. **Universal Popup Component** (`app/components/ui/UniversalPopup.tsx`)
   - Reusable popup component that accepts data as props
   - Supports all fields: image, title, description1, description2, date, script
   - Handles minimal variant: title, image, description, script
   - Safe script/iframe rendering
   - Accessibility features (ARIA labels, keyboard navigation)
   - Body scroll lock when open

### 3. **Popup Context** (`app/contexts/PopupContext.tsx`)
   - React Context for sitewide popup management
   - Easy to use hook: `usePopup()`
   - Single popup instance managed globally

### 4. **Example Data** (`app/data/popupExamples.ts`)
   - Ready-to-use popup data examples
   - Shows all variants and use cases
   - Helper function to get popup by ID

### 5. **Example Component** (`app/components/ui/PopupExample.tsx`)
   - Working examples of how to use the popup
   - Demonstrates all popup types

### 6. **Updated CSS** (`app/components/ui/HeroPopup.module.css`)
   - Added styles for images, dates, and script containers
   - Responsive and accessible styling

### 7. **Documentation** (`app/components/ui/POPUP_USAGE_GUIDE.md`)
   - Complete usage guide
   - Code examples
   - Best practices

## 🚀 How to Use

### Step 1: Add PopupProvider to Layout

Update `app/layout.tsx` to wrap your app with the PopupProvider:

```tsx
import { PopupProvider } from '@/app/contexts/PopupContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PopupProvider>
          {/* Your existing content */}
          <InfoHeader />
          <Header />
          <PromotionalHeader />
          <main id="main-content">
            <Template>{children}</Template>
          </main>
          <Footer />
        </PopupProvider>
      </body>
    </html>
  );
}
```

### Step 2: Use Popup Anywhere

In any component:

```tsx
'use client';

import { usePopup } from '@/app/contexts/PopupContext';
import type { PopupData } from '@/app/types/popup';

export default function MyComponent() {
  const { openPopup } = usePopup();

  const handleClick = () => {
    const popupData: PopupData = {
      id: 'my-popup',
      title: 'My Popup Title',
      image: {
        src: '/path/to/image.jpg',
        alt: 'Image description',
      },
      description: 'Popup description text',
      script: {
        type: 'iframe',
        content: 'https://example.com/form',
        width: '100%',
        height: '500px',
      },
    };

    openPopup(popupData);
  };

  return <button onClick={handleClick}>Open Popup</button>;
}
```

## 📋 Popup Data Structure

### Full Popup (All Fields)
```tsx
{
  id: 'unique-id',
  image: { src: '/path.jpg', alt: 'Description' },
  title: 'Title',
  description1: 'First description',
  description2: 'Second description',
  date: 'March 15, 2024',
  script: { type: 'iframe', content: 'https://...', ... }
}
```

### Minimal Popup (Simplified)
```tsx
{
  id: 'unique-id',
  title: 'Title',
  image: { src: '/path.jpg', alt: 'Description' },
  description: 'Single description',
  script: { type: 'html', content: '<div>...</div>' }
}
```

## 🎯 Script Types

1. **iframe**: Embed external forms/widgets
   ```tsx
   script: {
     type: 'iframe',
     content: 'https://example.com/form',
     width: '100%',
     height: '600px',
   }
   ```

2. **script**: Third-party JavaScript
   ```tsx
   script: {
     type: 'script',
     content: '(function() { /* code */ })();',
   }
   ```

3. **html**: Custom HTML content
   ```tsx
   script: {
     type: 'html',
     content: '<form>...</form>',
   }
   ```

## 💡 Best Approach for Sitewide Use

**Recommended: Use Popup Context**

✅ **Pros:**
- Single popup instance (better performance)
- Easy to open from anywhere
- Centralized state management
- No prop drilling

**Alternative: Direct Component Usage**

If you prefer local state management, you can use `UniversalPopup` directly:

```tsx
const [isOpen, setIsOpen] = useState(false);
<UniversalPopup isOpen={isOpen} onClose={() => setIsOpen(false)} data={popupData} />
```

## 🔄 Migration from Existing Popups

You can gradually migrate your existing popups:

1. **DonatePopup.tsx** → Use UniversalPopup with donation data
2. **NewsletterPopup.tsx** → Use UniversalPopup with newsletter data

Example migration:

```tsx
// Old way
<DonatePopup isOpen={isOpen} onClose={onClose} />

// New way
const { openPopup } = usePopup();
openPopup({
  id: 'donate',
  title: 'DONATE TODAY!',
  description: '...',
  script: { type: 'iframe', content: 'https://donation-form.com' }
});
```

## 📁 File Structure

```
app/
├── types/
│   └── popup.ts                    # Type definitions
├── contexts/
│   └── PopupContext.tsx            # Context provider
├── components/
│   └── ui/
│       ├── UniversalPopup.tsx      # Main popup component
│       ├── PopupExample.tsx        # Usage examples
│       ├── HeroPopup.module.css    # Styles (updated)
│       └── POPUP_USAGE_GUIDE.md    # Documentation
└── data/
    └── popupExamples.ts            # Example data
```

## ✨ Features

- ✅ Type-safe with TypeScript
- ✅ Supports full and minimal variants
- ✅ Handles iframes, scripts, and HTML
- ✅ Accessible (ARIA, keyboard navigation)
- ✅ Responsive design
- ✅ Body scroll lock
- ✅ Easy to use sitewide
- ✅ Reusable with different data

## 🎨 Customization

- **Styling**: Modify `HeroPopup.module.css`
- **Behavior**: Edit `UniversalPopup.tsx`
- **Data**: Store popup data in `app/data/` or fetch from API

## 📝 Next Steps

1. Add `PopupProvider` to your layout
2. Replace existing popups with UniversalPopup
3. Store your popup data (in data files or API)
4. Customize styles as needed

## ❓ Questions?

Check `app/components/ui/POPUP_USAGE_GUIDE.md` for detailed examples and troubleshooting.

