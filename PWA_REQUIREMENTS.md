# PWA Requirements for Next.js - Complete Guide

## 📋 What You Need to Provide

### 1. **App Icons & Images** (Required)
You need to provide icon images in multiple sizes for different devices:

#### **App Icons (Square Icons)**
- **192x192 pixels** - Android home screen icon
- **512x512 pixels** - Android splash screen and high-res icon
- **180x180 pixels** - iOS home screen icon (Apple touch icon)
- **144x144 pixels** - Windows tile icon
- **96x96 pixels** - General purpose icon

#### **Favicon**
- **32x32 pixels** - Standard favicon
- **16x16 pixels** - Small favicon

#### **Splash Screen Images** (Optional but recommended)
- **1920x1080 pixels** - Android splash screen
- **2048x2732 pixels** - iPad Pro splash screen
- **1668x2388 pixels** - iPad Air splash screen
- **1536x2048 pixels** - iPad splash screen
- **1242x2688 pixels** - iPhone X/XS Max splash screen
- **828x1792 pixels** - iPhone XR splash screen
- **1125x2436 pixels** - iPhone X/XS splash screen

**Where to place:** All icons should be in the `/public` folder

---

### 2. **App Information** (Required)
You need to provide the following details about your app:

#### **Basic Information**
- **App Name**: Full name of your app (e.g., "Illinois Conservatory for the Arts")
- **Short Name**: Short version (max 12 characters, e.g., "ICA")
- **Description**: Brief description of your app (2-3 sentences)
- **Theme Color**: Primary brand color (hex code, e.g., "#FF5733")
- **Background Color**: Background color for splash screens (hex code)
- **Display Mode**: 
  - `standalone` - App-like experience (recommended)
  - `fullscreen` - Full screen experience
  - `minimal-ui` - Minimal browser UI
  - `browser` - Regular browser experience

#### **Start URL**
- The URL where the app should start when opened (usually `/`)

#### **Scope**
- The navigation scope of your PWA (usually `/`)

---

### 3. **App Categories** (Optional)
- Select categories your app belongs to (e.g., Education, Arts, Entertainment)

---

### 4. **Screenshots** (Optional but recommended)
For app stores and PWA installation prompts:
- **Desktop screenshots**: 1280x720 or 1920x1080
- **Mobile screenshots**: 750x1334 or 1080x1920
- At least 1-2 screenshots showing key features

---

### 5. **Offline Page** (Optional but recommended)
- Decide if you want a custom offline page or use default
- Content for when users are offline

---

### 6. **Service Worker Strategy** (Configuration)
Choose caching strategy:
- **Cache First**: Serve from cache, fallback to network
- **Network First**: Try network, fallback to cache
- **Stale While Revalidate**: Serve cache, update in background
- **Network Only**: Always use network
- **Cache Only**: Always use cache

---

### 7. **Push Notifications** (Optional)
If you want push notifications:
- **VAPID Public Key**: For web push notifications
- **Notification Icon**: 192x192 or 512x512 icon
- **Notification Badge**: 72x72 icon for notification badge

---

### 8. **HTTPS** (Required for Production)
- Your app must be served over HTTPS in production
- Local development can use HTTP (localhost)

---

### 9. **Domain Information**
- **Production Domain**: Your final domain (e.g., `https://ilconservatory.org`)
- **Base URL**: For manifest.json and service worker

---

## 📦 Technical Implementation Requirements

### **Package Dependencies**
We'll need to install:
- `next-pwa` - PWA plugin for Next.js
- Or use Next.js built-in PWA support (Next.js 13+)

### **Files to Create**
1. **manifest.json** - App manifest file
2. **Service Worker** - For offline functionality
3. **next.config.js updates** - PWA configuration
4. **Metadata updates** - In layout.tsx

---

## 🎨 Design Assets Checklist

### **Icons Needed:**
- [ ] 192x192 icon (Android)
- [ ] 512x512 icon (Android splash)
- [ ] 180x180 icon (iOS)
- [ ] 144x144 icon (Windows)
- [ ] 96x96 icon (General)
- [ ] 32x32 favicon
- [ ] 16x16 favicon

### **Information Needed:**
- [ ] App name
- [ ] Short name (12 chars max)
- [ ] Description
- [ ] Theme color (hex)
- [ ] Background color (hex)
- [ ] Display mode preference

---

## 📝 Quick Start Information Form

Please provide:

1. **App Name**: Illinois Conservatory for the Arts
2. **Short Name**: ICA (or your preference)
3. **Description**: [Your app description]
4. **Theme Color**: [Your brand color hex code]
5. **Background Color**: [Background color hex code]
6. **Display Mode**: standalone (recommended)
7. **Start URL**: /
8. **Icons**: [Location of your icon files or I can help create them]

---

## 🚀 Next Steps

Once you provide:
1. ✅ Icon images (or I can help generate them from your logo)
2. ✅ App information (name, colors, description)
3. ✅ Your preferences (display mode, caching strategy)

I can implement the complete PWA setup for you!

---

## 📚 Additional Resources

- **PWA Checklist**: https://web.dev/pwa-checklist/
- **Manifest Generator**: https://www.pwabuilder.com/imageGenerator
- **Icon Generator**: https://realfavicongenerator.net/

