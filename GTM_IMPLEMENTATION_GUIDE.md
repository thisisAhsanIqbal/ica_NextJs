# Google Tag Manager (GTM) Implementation Guide

## Best Practices for Performance-Optimized GTM in Next.js

### ✅ Recommended Approach: Using Official Next.js Package

**We're using `@next/third-parties`** - The official Next.js package for third-party integrations.

**Why this package?**
1. ✅ **Official Next.js Package** - Maintained by Vercel/Next.js team
2. ✅ **Automatic Optimization** - Handles preconnect, script loading, noscript fallback automatically
3. ✅ **Performance-First** - Uses `strategy="afterInteractive"` by default
4. ✅ **Zero Configuration** - Just pass your GTM ID
5. ✅ **Type-Safe** - Full TypeScript support
6. ✅ **Future-Proof** - Automatically gets Next.js optimizations

**What it does automatically:**
- ✅ Preconnect to GTM domains (performance optimization)
- ✅ Loads GTM after page becomes interactive (non-blocking)
- ✅ Adds noscript fallback for users with JavaScript disabled
- ✅ Proper script placement and optimization

### 🚀 Performance Benefits

- **Non-blocking**: GTM loads after page is interactive (handled by package)
- **Async loading**: Doesn't delay initial page render
- **Preconnect optimization**: Faster connection to GTM servers (automatic)
- **Conditional loading**: Can be disabled in development
- **Optimized by Next.js**: Automatically benefits from Next.js script optimizations

### 📝 Implementation Steps

1. ✅ **Package installed**: `@next/third-parties` (official Next.js package)
2. ✅ **GTM component added** to `app/layout.tsx` using `GoogleTagManager` component
3. ✅ **All optimizations handled automatically** by the package:
   - Preconnect links
   - Script loading optimization
   - Noscript fallback
4. ⚠️ **YOU NEED TO**: Add your GTM ID to environment variables

### 🔧 Configuration

**Step 1: Create `.env.local` file** (in the root directory, same level as `package.json`)

**Step 2: Add your GTM ID:**
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Step 3: Replace `GTM-XXXXXXX` with your actual GTM ID**
- Get your GTM ID from: https://tagmanager.google.com/
- Format: `GTM-XXXXXXX` (7 characters after GTM-)
- Example: `NEXT_PUBLIC_GTM_ID=GTM-ABC1234`

**Step 4: Restart your Next.js development server** after adding the environment variable

### 📊 Testing

1. **Development**: GTM won't load if `NEXT_PUBLIC_GTM_ID` is not set
2. **Production**: Verify GTM container loads correctly
3. **GTM Preview Mode**: Use GTM's preview mode to test tags
4. **Browser DevTools**: Check Network tab for GTM requests

### ⚠️ Important Notes

- **GTM ID format**: `GTM-XXXXXXX` (7 characters after GTM-)
- **Never commit `.env.local`** to version control (it's already in `.gitignore`)
- **Restart dev server** after adding environment variables
- **Test in production-like environment** before deploying
- **Monitor Core Web Vitals** after implementation

### 🎯 Why This Implementation is Performance-Optimized

**The `@next/third-parties` package handles all of this automatically:**

1. **`strategy="afterInteractive"`** (automatic):
   - GTM loads AFTER the page becomes interactive
   - Doesn't block initial page render
   - Improves Largest Contentful Paint (LCP)

2. **Preconnect Links** (automatic):
   - Establishes early connection to GTM servers
   - Reduces DNS lookup and connection time
   - Improves Time to First Byte (TTFB)

3. **Conditional Loading**:
   - Only loads if GTM_ID is set
   - Safe for development (won't break if not configured)
   - Easy to disable by removing env variable

4. **Next.js Optimizations** (automatic):
   - Uses Next.js Script component internally
   - Handles hydration properly
   - Automatically gets future Next.js optimizations
   - Better than manual implementation

### 📦 Package Details

**Package**: `@next/third-parties`
- **Official**: Maintained by Vercel/Next.js team
- **Size**: Minimal bundle impact
- **Support**: Full TypeScript support
- **Documentation**: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries

### 🔍 How to Verify It's Working

1. **Browser DevTools**:
   - Open Network tab
   - Look for requests to `googletagmanager.com`
   - Check that GTM container loads

2. **GTM Preview Mode**:
   - Go to GTM dashboard
   - Click "Preview" button
   - Enter your website URL
   - Should see GTM debugger connect

3. **Console Check**:
   - Open browser console
   - Type: `window.dataLayer`
   - Should see the dataLayer array

4. **Tag Assistant**:
   - Install Google Tag Assistant Chrome extension
   - Visit your site
   - Should detect GTM container

