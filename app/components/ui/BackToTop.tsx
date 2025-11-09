'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const lastScrollY = useRef(0)
  const rotationRef = useRef(0)

  // Handle scroll for rotation
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || window.pageYOffset
          const scrollDelta = currentScrollY - lastScrollY.current
          
          // Update visibility
          setIsVisible(currentScrollY > 300)
          
          // Calculate rotation: positive delta (scrolling down) = clockwise, negative = counter-clockwise
          if (Math.abs(scrollDelta) > 0) {
            rotationRef.current = rotationRef.current + (scrollDelta * 0.5)
            setRotation(rotationRef.current)
          }
          
          lastScrollY.current = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    // Initialize
    lastScrollY.current = window.scrollY || window.pageYOffset
    setIsVisible(lastScrollY.current > 300)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    setIsClicking(true)
    
    // Add 360 degree rotation on click with CSS transition
    const currentRotation = rotationRef.current
    const targetRotation = currentRotation + 360
    rotationRef.current = targetRotation
    setRotation(targetRotation)
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    setTimeout(() => {
      setIsClicking(false)
    }, 600)
  }, [])

  return (
    <button
      type="button"
      className={`${styles.backToTop} ${isVisible ? styles.show : ''} ${isClicking ? styles.rotating : ''}`}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Back to top"
      style={{
        transform: `rotate(${rotation}deg) translateY(${isVisible ? (isHovered ? -2 : 0) : 20}px)`,
      }}
    >
      <Image
        src="/asserts/Stamp-Logo-300x300.webp"
        alt=""
        width={80}
        height={80}
        className={styles.backToTopLogo}
        loading="lazy"
        aria-hidden="true"
      />
    </button>
  )
}


