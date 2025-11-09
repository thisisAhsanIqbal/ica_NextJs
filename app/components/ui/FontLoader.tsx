'use client'

import { useEffect } from 'react'

/**
 * FontLoader Component
 * Optimized for Core Web Vitals (CLS, INP, LCP)
 * - Prevents CLS by managing font loading state
 * - Improves INP by using efficient font loading API
 * - Ensures fonts load with priority for LCP
 */
export default function FontLoader() {
  useEffect(() => {
    // Mark as loading immediately - prevents CLS
    document.documentElement.classList.add('fonts-loading')

    // Check if fonts are already loaded
    if (document.documentElement.classList.contains('fonts-loaded')) {
      document.documentElement.classList.remove('fonts-loading')
      return
    }

    // Priority-based font loading for Core Web Vitals
    if (document.fonts && document.fonts.ready) {
      // Use Font Loading API for better INP
      const loadFonts = async () => {
        try {
          // Wait for all fonts to be ready
          await document.fonts.ready
          
          // Check if critical fonts are loaded
          const checkFonts = [
            'ivypresto-display',
            'Termina',
            'roboto-condensed'
          ]
          
          // Verify fonts are actually loaded
          const fontsLoaded = checkFonts.every(fontName => {
            return document.fonts.check(`16px "${fontName}"`)
          })
          
          if (fontsLoaded) {
            document.documentElement.classList.remove('fonts-loading')
            document.documentElement.classList.add('fonts-loaded')
          } else {
            // Fallback: mark as loaded after timeout to prevent blocking
            setTimeout(() => {
              document.documentElement.classList.remove('fonts-loading')
              document.documentElement.classList.add('fonts-loaded')
            }, 100)
          }
        } catch (error) {
          // Error handling - don't block rendering
          console.warn('Font loading error:', error)
          document.documentElement.classList.remove('fonts-loading')
          document.documentElement.classList.add('fonts-loaded')
        }
      }
      
      loadFonts()
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        document.documentElement.classList.remove('fonts-loading')
        document.documentElement.classList.add('fonts-loaded')
      }, 100)
    }
  }, [])

  return null
}

