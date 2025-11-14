/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // For components folder
    "./app/admin/**/*.{js,ts,jsx,tsx,mdx}", // Admin panel
    "./app/components/ui/**/*.{js,ts,jsx,tsx,mdx}", // Shadcn/ui components
 
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Add your brand colors
      colors: {
        'ica-green-deep': '#1E312F',
        'ica-green': '#03332e', // Primary brand green color
        'ica-bg': '#F9F6F4',
        'ica-lavender': '#CFADD1',
        // Inferred from your shadow color rgba(158, 164, 129, 0.8)
        'ica-lime': '#9EA481',
        // ---
        // !! Placeholder: Your CSS file didn't specify a fallback for --ica-mint
        // I've added a placeholder, replace it with your actual color.
        // ---
        'ica-mint': '#A1E0D6', // <-- REPLACE THIS
        // Shadcn/ui colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      
      // 2. Add your custom box shadows
      boxShadow: {
        'btn-primary': '-6px 6px 0px 1px rgba(30, 49, 47, 0.45)',
        // ---
        // !! Placeholder: Your CSS used --ica-shadow, which wasn't defined.
        // I'm assuming it's your main 'ica-green-deep' color.
        // ---
        'btn-tertiary': '2px 2px 0 #1E312F', // <-- CHECK THIS
        'btn-white': '-6px 6px 0px 1px rgb(247 255 254 / 80%)',
        'btn-lime': '-6px 6px 0px 1px rgba(158, 164, 129, 0.8)',
        'btn-lavender': '-6px 6px 0px 1px rgba(207, 173, 209, 0.45)',
        'btn-lime-hover': '-6px 6px 0px 1px rgba(69, 70, 66, 0.555)',
      },
      
      // 3. Add your custom font family
      fontFamily: {
        // ---
        // !! Placeholder: Your CSS used --font-ui. Make sure this
        // variable is defined in your global.css or update it here.
        // ---
        ui: ['var(--font-ui)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      
      // 4. Add custom spacing/sizing
      lineHeight: {
        'btn': '1.2', // for var(--btn-line-height)
      },
      scale: {
        '97': '0.97', // for var(--btn-active-transform)
      },
      
      // 5. Add custom breakpoints for max-width media queries
      // Tailwind is mobile-first, so we add breakpoints
      // for 480px and 768px.
      screens: {
        'xs': '480px',
        // 'sm': '640px', (default)
        // 'md': '768px', (default)
        // 'lg': '1024px', (default)
        // 'xl': '1280px', (default)
      },
      
      // 6. Add marquee animations
      animation: {
        'marquee-scroll': 'marquee-scroll 45s linear infinite',
        'marquee-scroll-mobile': 'marquee-scroll-mobile 25s linear infinite',
      },
      keyframes: {
        'marquee-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-scroll-mobile': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}