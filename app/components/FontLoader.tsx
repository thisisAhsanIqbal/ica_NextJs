'use client'

import { useEffect } from 'react'

export default function FontLoader() {
  useEffect(() => {
    // Non-blocking CSS loading technique
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://use.typekit.net/nmi4cis.css'
    link.media = 'print'
    link.onload = function() {
      if (this instanceof HTMLLinkElement) {
        this.media = 'all'
      }
    }
    document.head.appendChild(link)
  }, [])

  return null
}

