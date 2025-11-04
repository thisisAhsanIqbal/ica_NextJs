import type { Metadata } from 'next'
import './globals.css'
import InfoHeader from './components/InfoHeader'
import Header from './components/Header'
import PromotionalHeader from './components/PromotionalHeader'
import FontLoader from './components/FontLoader'
import Template from './template'

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
        
        {/* Load fonts immediately to prevent FOUT */}
        <link 
          rel="stylesheet" 
          href={`https://use.typekit.net/${ICA_TYPEKIT_ID}.css`}
        />
        
        {/* Prevent FOUT - show content immediately with fallback fonts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Font loading optimization */
            body { font-display: swap; }
          `
        }} />
      </head>
      <body>
        <FontLoader />
        <InfoHeader />
        <Header />
        <PromotionalHeader />
        <Template>
          {children}
        </Template>
      </body>
    </html>
  )
}

