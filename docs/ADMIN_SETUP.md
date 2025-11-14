# Admin Panel Setup Guide

This document provides instructions for setting up and using the admin panel built with Refine and Shadcn/ui.

## ✅ What's Been Set Up

### 1. Folder Structure
- `app/admin/` - All admin-related files are in this separate folder
  - `components/` - Admin-specific components (Dashboard, Layout)
  - `providers/` - Auth and theme providers
  - `posts/` - Posts resource pages
  - `categories/` - Categories resource pages
  - `layout.tsx` - Admin layout with Refine provider
  - `page.tsx` - Admin dashboard

### 2. Dependencies Added
All required packages have been added to `package.json`:
- `@refinedev/core` - Core Refine functionality
- `@refinedev/simple-rest` - REST API data provider
- `@refinedev/react-hook-form` - Form handling
- `@refinedev/nextjs-router` - Next.js routing
- `@refinedev/inferencer` - Auto-generated CRUD pages
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `class-variance-authority` - Component variants
- `tailwind-merge` - Tailwind class merging
- `next-themes` - Theme management
- `sonner` - Toast notifications
- `@radix-ui/react-slot` - Radix UI primitives

### 3. Shadcn/ui Configuration
- `components.json` - Shadcn/ui configuration file
- UI components created:
  - `app/components/ui/card.tsx` - Card component
  - `app/components/ui/button.tsx` - Button component
  - `app/components/ui/sonner.tsx` - Toast notifications
- CSS variables added to `app/globals.css` for theming

### 4. Authentication
- Integrated with Clerk (already set up in your project)
- Auth provider connects Clerk to Refine
- Protected routes redirect to `/login` if not authenticated

## 📦 Installation

**Important**: Due to disk space issues encountered, you'll need to install the packages manually:

```bash
npm install
```

This will install all the dependencies listed in `package.json`.

## 🚀 Usage

### Accessing the Admin Panel

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin` in your browser
3. You'll be redirected to `/login` if not authenticated
4. After logging in with Clerk, you'll have access to:
   - **Dashboard** (`/admin`) - Overview and quick actions
   - **Posts** (`/admin/posts`) - Manage posts (list, create, edit, show)
   - **Categories** (`/admin/categories`) - Manage categories

### API Configuration

Set your API URL in an `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

If not set, it defaults to `https://api.fake-rest.refine.dev` (for testing).

## 🎨 Customization

### Adding New Resources

1. Create a new folder under `app/admin/`:
   ```
   app/admin/users/
   ├── page.tsx
   ├── create/page.tsx
   ├── edit/[id]/page.tsx
   └── show/[id]/page.tsx
   ```

2. Add the resource to `app/admin/layout.tsx`:
   ```typescript
   resources={[
     // ... existing resources
     {
       name: 'users',
       list: '/admin/users',
       create: '/admin/users/create',
       edit: '/admin/users/edit/:id',
       show: '/admin/users/show/:id',
     },
   ]}
   ```

3. Use Refine's Inferencer or create custom components:
   ```typescript
   import { ListInferencer } from '@refinedev/inferencer/list'
   ```

### Custom Components

Replace Inferencer with custom components:

```typescript
import { List, useTable } from '@refinedev/core'
import { AdminLayout } from '@/app/admin/components/layout'

export default function CustomList() {
  const { tableProps } = useTable()
  
  return (
    <AdminLayout>
      <List>
        {/* Your custom list UI */}
      </List>
    </AdminLayout>
  )
}
```

### Theming

The admin panel supports dark/light mode via `next-themes`. The theme provider is configured in `app/admin/layout.tsx`.

## 📁 File Structure

```
app/admin/
├── components/
│   ├── dashboard.tsx      # Main dashboard with stats and quick actions
│   └── layout.tsx        # Admin navigation layout
├── providers/
│   ├── auth-provider.ts   # Clerk authentication integration
│   └── theme-provider.tsx # Theme provider wrapper
├── posts/
│   ├── page.tsx          # Posts list
│   ├── create/page.tsx   # Create post
│   ├── edit/[id]/page.tsx # Edit post
│   └── show/[id]/page.tsx # Show post details
├── categories/
│   ├── page.tsx          # Categories list
│   ├── create/page.tsx   # Create category
│   ├── edit/[id]/page.tsx # Edit category
│   └── show/[id]/page.tsx # Show category details
├── layout.tsx            # Refine provider setup
├── page.tsx              # Admin dashboard home
└── README.md             # Admin-specific documentation
```

## 🔧 Troubleshooting

### Packages Not Found
If you see errors about missing packages:
1. Make sure you've run `npm install`
2. Check that all packages are listed in `package.json`
3. Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Authentication Issues
- Ensure Clerk is properly configured in your `.env.local`
- Check that the middleware is set up correctly
- Verify that `/login` route exists and works

### Styling Issues
- Make sure Tailwind is configured to include admin files (already done in `tailwind.config.js`)
- Check that CSS variables are loaded in `app/globals.css`

## 📚 Resources

- [Refine Documentation](https://refine.dev/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

## 🎯 Next Steps

1. **Install dependencies**: Run `npm install`
2. **Configure API**: Set `NEXT_PUBLIC_API_URL` in `.env.local`
3. **Customize resources**: Add your own resources or modify existing ones
4. **Style customization**: Adjust colors and styles in `app/globals.css`
5. **Add features**: Extend the dashboard with your own components

---

**Note**: The admin panel is fully isolated in the `app/admin/` folder, so it won't interfere with your main website code.

