import type { Metadata } from 'next'
import './globals.css'
import InfoHeader from './components/InfoHeader'
import Header from './components/Header'
import PromotionalHeader from './components/PromotionalHeader'
import FontLoader from './components/FontLoader'

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'A simple Next.js application',
}

// Adobe Fonts Configuration
const ICA_TYPEKIT_ID = 'nmi4cis' // ICA Ahsan Project ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical font preconnects for maximum LCP performance */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="dns-prefetch" href="https://p.typekit.net" />
        
        {/* Preload Adobe Fonts CSS for earliest fetch */}
        <link 
          rel="preload" 
          href={`https://use.typekit.net/${ICA_TYPEKIT_ID}.css`} 
          as="style" 
        />
      </head>
      <body>
        <FontLoader />
        <InfoHeader />
        <Header />
        <PromotionalHeader />
        {children}
      </body>
    </html>
  )
}

