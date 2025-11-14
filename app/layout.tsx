import type { Metadata } from 'next'
import './fonts.css' // Import fonts configuration first
import './globals.css'
// Swiper CSS imports - Global setup for use across all components
// Any component can import and use Swiper components:
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ClerkProvider } from '@clerk/nextjs'
import FontLoader from './components/ui/FontLoader'
import Template from './template'
import { PopupProvider } from './contexts/PopupContext'
import ConditionalLayout from './components/shared/ConditionalLayout'

export const metadata: Metadata = {
  title: {
    default: 'Illinois Conservatory for the Arts',
    template: '%s | Illinois Conservatory for the Arts'
  },
  description: 'Illinois Conservatory for the Arts - Same Programming, New Name! Academy of the Arts is now Illinois Conservatory for the Arts. Located in Naperville, IL. Offering IMPACT: Musical Theater and IMPACT: Dance programs.',
  keywords: ['Illinois Conservatory for the Arts', 'Naperville', 'Arts education', 'Musical Theater', 'Dance', 'Performing Arts', 'Conservatory', 'Arts programs'],
  authors: [{ name: 'Illinois Conservatory for the Arts' }],
  creator: 'Illinois Conservatory for the Arts',
  publisher: 'Illinois Conservatory for the Arts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ilconservatory.org'), // Update with actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ilconservatory.org', // Update with actual domain
    siteName: 'Illinois Conservatory for the Arts',
    title: 'Illinois Conservatory for the Arts',
    description: 'Same Programming, New Name! Academy of the Arts is now Illinois Conservatory for the Arts. Located in Naperville, IL.',
    images: [
      {
        url: '/PrimaryLogo.webp',
        width: 180,
        height: 60,
        alt: 'Illinois Conservatory for the Arts Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Illinois Conservatory for the Arts',
    description: 'Same Programming, New Name! Academy of the Arts is now Illinois Conservatory for the Arts.',
    images: ['/PrimaryLogo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: 'verification_token',
    // yandex: 'verification_token',
    // yahoo: 'verification_token',
  },
}

// Adobe Fonts Configuration
const ICA_TYPEKIT_ID = 'nmi4cis' // ICA Ahsan Project ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured Data for SEO (JSON-LD)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Illinois Conservatory for the Arts',
    alternateName: 'ICA',
    url: 'https://ilconservatory.org', // Update with actual domain
    logo: 'https://ilconservatory.org/PrimaryLogo.webp', // Update with actual domain
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Naperville',
      addressRegion: 'IL',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-630-243-5100',
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.instagram.com/ilconservatory/',
      'https://x.com/ilconservatory',
      'https://www.linkedin.com/company/ilconservatory',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        {/* ============================================
            FONT LOADING OPTIMIZATION - Core Web Vitals
            Priority: LCP > CLS > INP
            ============================================ */}
        
        {/* Step 1: Preconnect to Adobe Fonts domains - Critical for LCP */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="dns-prefetch" href="https://p.typekit.net" />
        
        {/* Step 2: Preload Adobe Fonts CSS with highest priority - Critical for LCP */}
        <link 
          rel="preload" 
          href={`https://use.typekit.net/${ICA_TYPEKIT_ID}.css`} 
          as="style" 
          fetchPriority="high"
        />
        
        {/* Step 3: Load fonts immediately with high priority - Prevents FOUT and improves LCP */}
        <link 
          rel="stylesheet" 
          href={`https://use.typekit.net/${ICA_TYPEKIT_ID}.css`}
        />
        
        {/* Step 4: Preload critical logo image for LCP optimization */}
        <link 
          rel="preload" 
          href="/PrimaryLogo.webp" 
          as="image" 
          fetchPriority="high"
        />
        
        {/* Step 5: Preload hero image for LCP optimization (hero is likely LCP element) */}
        <link 
          rel="preload" 
          href="/asserts/home/High-level-arts-meets-high-achieving-academics.webp" 
          as="image" 
          fetchPriority="high"
          type="image/webp"
        />
        
        {/* ============================================
            PWA CONFIGURATION
            Progressive Web App Meta Tags
            ============================================ */}
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color - Matches manifest theme_color */}
        <meta name="theme-color" content="#CFADD1" />
        <meta name="msapplication-TileColor" content="#CFADD1" />
        
        {/* Apple Touch Icon - iOS home screen icon */}
        <link rel="apple-touch-icon" href="/pwa/icon-180.png" />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/pwa/icon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/pwa/icon-32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/pwa/icon-96.png" />
        
        {/* Apple Mobile Web App Capable */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ICA" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/pwa/icon-144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
          <ClerkProvider>
            <PopupProvider>
              <FontLoader />
              {/* Skip to main content link for accessibility */}
              <a href="#main-content" className="skip-to-main">
                Skip to main content
              </a>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </PopupProvider>
          </ClerkProvider>
        ) : (
          <PopupProvider>
            <FontLoader />
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </PopupProvider>
        )}
      </body>
    </html>
  )
}

