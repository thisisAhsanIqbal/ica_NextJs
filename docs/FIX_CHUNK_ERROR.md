# Fix: Failed to load chunk server error

## Error
```
Failed to load chunk server/chunks/ssr/[root-of-the-server]__a51f1ba0._.js from runtime for chunk server/app/page.js
```

## Solution

This is typically a Next.js/Turbopack cache issue. Try these steps in order:

### Step 1: Clear Next.js Cache
```bash
# Delete .next folder
rmdir /s /q .next

# Or on Mac/Linux:
rm -rf .next
```

### Step 2: Clear Node Modules Cache (if Step 1 doesn't work)
```bash
# Delete node_modules and reinstall
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json

# Then reinstall
npm install
```

### Step 3: Restart Dev Server
```bash
# Stop the current dev server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: If Still Failing - Check for Missing Dependencies
Make sure all packages are installed:
```bash
npm install
```

### Step 5: Alternative - Use Webpack Instead of Turbopack
If Turbopack continues to have issues, you can use webpack:
```bash
npm run dev:webpack
```

## Common Causes
1. **Cache corruption** - Most common cause
2. **Missing dependencies** - Packages not fully installed
3. **Turbopack issues** - Known issues with Next.js 16 + Turbopack
4. **File system issues** - Windows path length or permissions

## Quick Fix Command (Windows)
```powershell
rmdir /s /q .next
npm run dev
```

## If Nothing Works
Try switching to webpack mode which is more stable:
```bash
npm run dev:webpack
```

