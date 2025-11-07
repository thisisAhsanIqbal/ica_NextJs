'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset
          setIsVisible(scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => { window.removeEventListener('scroll', toggleVisibility) }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <button
      type="button"
      className={`${styles.backToTop} ${isVisible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
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


