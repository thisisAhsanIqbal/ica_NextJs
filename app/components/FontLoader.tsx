'use client'

import { useEffect } from 'react'

export default function FontLoader() {
  useEffect(() => {
    // Check if fonts are already loaded
    if (document.documentElement.classList.contains('fonts-loaded')) {
      return
    }

    // Wait for fonts to load, then show content
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded')
      })
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded')
      }, 100)
    }
  }, [])

  return null
}

