'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useTransition } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const [isPending, startTransition] = useTransition()

  const toggleTheme = () => {
    startTransition(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
      // Use requestAnimationFrame for smoother transition
      requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
      })
    })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image
              src={theme === 'dark' ? '/PrimaryLogoCream.png' : '/PrimaryLogo.webp'}
              alt="Logo"
              width={180}
              height={60}
              priority
              className="logo-image"
              sizes="(max-width: 920px) 150px, 180px"
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4="
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Menu */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/the-school" className="nav-link" onClick={() => setIsMenuOpen(false)}>The School</Link>
          <Link href="/impact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Impact</Link>
          <Link href="/the-studio" className="nav-link" onClick={() => setIsMenuOpen(false)}>The Studio</Link>
          <Link href="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</Link>
          <Link href="/support" className="nav-link" onClick={() => setIsMenuOpen(false)}>Support</Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
          
          {/* Shop Button */}
          <button className="cta-button" aria-label="Shop" type="button">
            <Image
              src="/shop_icon.svg"
              alt="Shop"
              width={20}
              height={20}
              className="shop-icon"
              priority
              loading="eager"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

