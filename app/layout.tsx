import type { Metadata } from 'next'
import './globals.css'
import InfoHeader from './components/InfoHeader'
import Header from './components/Header'
import PromotionalHeader from './components/PromotionalHeader'
import FontLoader from './components/FontLoader'
import Template from './template'

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
    <html lang="en">
      <head>
        {/* Structured Data for SEO (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        {/* Critical font preconnects for maximum LCP performance */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="dns-prefetch" href="https://p.typekit.net" />
        
        {/* Preload critical logo image for LCP optimization */}
        <link 
          rel="preload" 
          href="/PrimaryLogo.webp" 
          as="image" 
          fetchPriority="high"
        />
        
        {/* Preload Adobe Fonts CSS for earliest fetch */}
        <link 
          rel="preload" 
          href={`https://use.typekit.net/${ICA_TYPEKIT_ID}.css`} 
          as="style" 
          fetchPriority="high"
        />
        
        {/* Load fonts immediately to prevent FOUT */}
        <link 
          rel="stylesheet" 
          href={`https://use.typekit.net/${ICA_TYPEKIT_ID}.css`}
        />
        
        {/* Prevent FOUT and CLS - show content immediately with fallback fonts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Font loading optimization - prevent CLS */
            body { 
              font-display: swap;
              font-size-adjust: 0.5;
            }
            /* Prevent layout shift during font load */
            html {
              font-size: 16px;
            }
          `
        }} />
      </head>
      <body>
        <FontLoader />
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <InfoHeader />
        <Header />
        <PromotionalHeader />
        <main id="main-content">
          <Template>
            {children}
          </Template>
        </main>
      </body>
    </html>
  )
}

