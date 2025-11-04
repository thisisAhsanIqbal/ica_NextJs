'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [nextChildren, setNextChildren] = useState<React.ReactNode>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    // Mark fonts as loaded for smooth rendering
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('fonts-loaded')
    }
  }, [])

  useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (prevPathnameRef.current === pathname) {
      setDisplayChildren(children)
      return
    }

    prevPathnameRef.current = pathname

    // Smooth cross-fade transition - fade out current, fade in next simultaneously
    setNextChildren(children)
    setIsTransitioning(true)
    
    // Start simultaneous cross-fade
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // After transition completes, swap content
        setTimeout(() => {
          setDisplayChildren(children)
          setNextChildren(null)
          setIsTransitioning(false)
        }, 500) // Match CSS transition duration
      })
    })
  }, [children, pathname])

  return (
    <div className="page-transition-wrapper">
      <div className={`page-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        {displayChildren}
      </div>
      {nextChildren && (
        <div className="page-transition page-transition-next fade-in">
          {nextChildren}
        </div>
      )}
    </div>
  )
}

