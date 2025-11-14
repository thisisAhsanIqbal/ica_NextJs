# Universal Popup Usage Guide

## Overview

The Universal Popup system provides a flexible, reusable popup component that can display different types of content sitewide. It supports two variants:

1. **Full Popup**: image, title, description1, description2, date, script
2. **Minimal Popup**: title, image, description, script

## Quick Start

### Option 1: Using Popup Context (Recommended for Sitewide Use)

This is the best approach for managing popups across your entire site.

#### Step 1: Wrap your app with PopupProvider

In `app/layout.tsx`:

```tsx
import { PopupProvider } from '@/app/contexts/PopupContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PopupProvider>
          {/* Your existing content */}
          {children}
        </PopupProvider>
      </body>
    </html>
  );
}
```

#### Step 2: Use the popup anywhere in your app

```tsx
'use client';

import { usePopup } from '@/app/contexts/PopupContext';
import type { PopupData } from '@/app/types/popup';

export default function MyComponent() {
  const { openPopup } = usePopup();

  const handleButtonClick = () => {
    const popupData: PopupData = {
      id: 'my-popup',
      title: 'Welcome!',
      image: {
        src: '/images/welcome.jpg',
        alt: 'Welcome Image',
      },
      description: 'This is a minimal popup example.',
      script: {
        type: 'iframe',
        content: 'https://example.com/form',
        width: '100%',
        height: '500px',
      },
    };

    openPopup(popupData);
  };

  return <button onClick={handleButtonClick}>Open Popup</button>;
}
```

### Option 2: Direct Component Usage

If you prefer to manage popup state locally:

```tsx
'use client';

import { useState } from 'react';
import UniversalPopup from '@/app/components/ui/UniversalPopup';
import type { PopupData } from '@/app/types/popup';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  const popupData: PopupData = {
    id: 'my-popup',
    title: 'My Popup',
    description: 'Popup content here',
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Popup</button>
      <UniversalPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={popupData}
      />
    </>
  );
}
```

## Popup Data Structure

### Full Popup Example

```tsx
const fullPopup: PopupData = {
  id: 'unique-popup-id',
  image: {
    src: '/path/to/image.jpg',
    alt: 'Image description',
    width: 400,  // Optional
    height: 250, // Optional
  },
  title: 'Popup Title',
  description1: 'First description paragraph',
  description2: 'Second description paragraph',
  date: 'March 15, 2024',
  script: {
    type: 'iframe', // or 'script' or 'html'
    content: 'https://example.com/form',
    width: '100%',
    height: '600px',
    allowFullScreen: false,
    sandbox: 'allow-same-origin allow-scripts', // Optional for iframe security
  },
};
```

### Minimal Popup Example

```tsx
const minimalPopup: PopupData = {
  id: 'simple-popup',
  title: 'Simple Popup',
  image: {
    src: '/path/to/image.jpg',
    alt: 'Image description',
  },
  description: 'Single description text',
  script: {
    type: 'html',
    content: '<div>Your HTML content here</div>',
  },
};
```

## Script Types

### 1. Iframe Script

Use for embedding external forms, widgets, or content:

```tsx
script: {
  type: 'iframe',
  content: 'https://example.com/embedded-form',
  width: '100%',
  height: '600px',
  allowFullScreen: false,
  sandbox: 'allow-same-origin allow-scripts allow-forms', // Security sandbox
}
```

### 2. Script Tag

Use for third-party JavaScript widgets:

```tsx
script: {
  type: 'script',
  content: `
    (function() {
      // Your third-party script code here
      // Example: Google Analytics, Facebook Pixel, etc.
    })();
  `,
}
```

### 3. HTML Content

Use for custom HTML content:

```tsx
script: {
  type: 'html',
  content: `
    <form>
      <input type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  `,
}
```

## Common Use Cases

### Newsletter Signup

```tsx
const newsletterPopup: PopupData = {
  id: 'newsletter',
  title: 'Stay Connected!',
  description: 'Sign up for our newsletter',
  script: {
    type: 'iframe',
    content: 'https://mailchimp.com/embed-form',
    width: '100%',
    height: '400px',
  },
};
```

### Donation Form

```tsx
const donationPopup: PopupData = {
  id: 'donate',
  title: 'DONATE TODAY!',
  image: {
    src: '/images/donate-icon.png',
    alt: 'Donate',
  },
  description: 'Support our mission',
  script: {
    type: 'iframe',
    content: 'https://donation-platform.com/form',
    width: '100%',
    height: '700px',
  },
};
```

### Event Announcement

```tsx
const eventPopup: PopupData = {
  id: 'event-2024',
  image: {
    src: '/images/event-banner.jpg',
    alt: 'Event Banner',
  },
  title: 'Annual Gala 2024',
  description1: 'Join us for our annual fundraising event',
  description2: 'Featuring performances by our talented students',
  date: 'March 15, 2024',
  script: {
    type: 'iframe',
    content: 'https://ticketing-platform.com/event',
    width: '100%',
    height: '600px',
  },
};
```

## Best Practices

1. **Unique IDs**: Always provide unique `id` values for each popup
2. **Image Optimization**: Use Next.js Image component (already included)
3. **Accessibility**: Popup includes proper ARIA attributes
4. **Security**: Use `sandbox` attribute for iframes from untrusted sources
5. **Performance**: Scripts are only loaded when popup opens
6. **Mobile Responsive**: Popup is responsive by default

## Styling

The popup uses `HeroPopup.module.css`. You can customize styles by:

1. Modifying the CSS module file
2. Adding custom classes via the component (future enhancement)
3. Using CSS variables defined in `globals.css`

## TypeScript Support

All types are defined in `app/types/popup.ts`. Import them for type safety:

```tsx
import type { PopupData, FullPopupData, MinimalPopupData } from '@/app/types/popup';
```

## Troubleshooting

### Script not loading?
- Check browser console for errors
- Verify script content is valid
- For iframes, check CORS settings

### Popup not closing?
- Ensure `onClose` callback is properly passed
- Check for JavaScript errors in console

### Styling issues?
- Check CSS module is imported correctly
- Verify CSS variables are defined in `globals.css`

