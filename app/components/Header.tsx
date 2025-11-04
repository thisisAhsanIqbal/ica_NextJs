'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="header" role="banner">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link href="/" aria-label="Illinois Conservatory for the Arts - Home">
            <Image
              src="/PrimaryLogo.webp"
              alt="Illinois Conservatory for the Arts"
              width={180}
              height={60}
              priority
              fetchPriority="high"
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
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          type="button"
        >
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Menu */}
        <nav 
          id="main-navigation"
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!isMenuOpen ? 'true' : 'false'}
        >
          <Link href="/the-school" className="nav-link" onClick={closeMenu}>
            <span className="nav-bullet"></span>
            <span className="nav-text">THE SCHOOL</span>
          </Link>
          <Link href="/impact" className="nav-link" onClick={closeMenu}>
            <span className="nav-bullet"></span>
            <span className="nav-text">IMPACT</span>
          </Link>
          <Link href="/the-studio" className="nav-link" onClick={closeMenu}>
            <span className="nav-bullet"></span>
            <span className="nav-text">THE STUDIO</span>
          </Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>
            <span className="nav-bullet"></span>
            <span className="nav-text">ABOUT</span>
          </Link>
          <Link href="/events" className="nav-link" onClick={closeMenu}>
            <span className="nav-bullet"></span>
            <span className="nav-text">EVENTS</span>
          </Link>
          <Link href="/support" className="nav-link" onClick={closeMenu}>
            <span className="nav-bullet"></span>
            <span className="nav-text">SUPPORT</span>
          </Link>
          
          {/* Shopping Cart in Mobile Menu */}
          <button 
            className="mobile-shop-button" 
            aria-label="Shopping Cart" 
            type="button" 
            onClick={closeMenu}
          >
            <Image
              src="/shop_icon.svg"
              alt=""
              width={20}
              height={20}
              className="shop-icon"
              priority
              fetchPriority="high"
              loading="eager"
              aria-hidden="true"
            />
            <span className="shop-text">Shopping Cart</span>
          </button>
          
          {/* Social Icons in Mobile Menu */}
          <div className="mobile-social-icons" role="list" aria-label="Social media links">
            <a 
              href="https://www.facebook.com/ilconservatory" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className="social-icon" 
              aria-label="Visit our Facebook page"
              role="listitem"
            >
              <Image
                src="/asserts/fb.svg"
                alt=""
                width={24}
                height={24}
                className="social-icon-img"
                priority
                aria-hidden="true"
              />
            </a>
            <a 
              href="https://www.instagram.com/ilconservatory/" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className="social-icon" 
              aria-label="Visit our Instagram page"
              role="listitem"
            >
              <Image
                src="/asserts/insta.svg"
                alt=""
                width={24}
                height={24}
                className="social-icon-img"
                priority
                aria-hidden="true"
              />
            </a>
            <a 
              href="https://x.com/ilconservatory" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className="social-icon" 
              aria-label="Visit our X (Twitter) page"
              role="listitem"
            >
              <Image
                src="/asserts/x.svg"
                alt=""
                width={24}
                height={24}
                className="social-icon-img"
                priority
                aria-hidden="true"
              />
            </a>
            <a 
              href="https://www.linkedin.com/company/ilconservatory" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className="social-icon" 
              aria-label="Visit our LinkedIn page"
              role="listitem"
            >
              <Image
                src="/asserts/linkedin.svg"
                alt=""
                width={24}
                height={24}
                className="social-icon-img"
                priority
                aria-hidden="true"
              />
            </a>
          </div>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Shop Button */}
          <button className="cta-button" aria-label="Shopping Cart" type="button">
            <Image
              src="/shop_icon.svg"
              alt=""
              width={20}
              height={20}
              className="shop-icon"
              priority
              fetchPriority="high"
              loading="eager"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

