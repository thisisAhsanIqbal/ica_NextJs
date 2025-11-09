'use client'

import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('fonts-loaded')
    }
  }, [])

  return (
    <div className="page-transition-wrapper">
      <div className="page-transition">
        {children}
      </div>
    </div>
  )
}

