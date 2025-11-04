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
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image
              src="/PrimaryLogo.webp"
              alt="Logo"
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
          <button className="mobile-shop-button" aria-label="Shopping Cart" type="button" onClick={closeMenu}>
            <Image
              src="/shop_icon.svg"
              alt="Shopping Cart"
              width={20}
              height={20}
              className="shop-icon"
              priority
              fetchPriority="high"
              loading="eager"
            />
            <span className="shop-text">Shopping Cart</span>
          </button>
          
          {/* Social Icons in Mobile Menu */}
          <div className="mobile-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <Image
                src="/asserts/fb.svg"
                alt="Facebook"
                width={24}
                height={24}
                className="social-icon-img"
                priority
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Image
                src="/asserts/insta.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="social-icon-img"
                priority
              />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X (Twitter)">
              <Image
                src="/asserts/x.svg"
                alt="X (Twitter)"
                width={24}
                height={24}
                className="social-icon-img"
                priority
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Image
                src="/asserts/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="social-icon-img"
                priority
              />
            </a>
          </div>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Shop Button */}
          <button className="cta-button" aria-label="Shop" type="button">
            <Image
              src="/shop_icon.svg"
              alt="Shop"
              width={20}
              height={20}
              className="shop-icon"
              priority
              fetchPriority="high"
              loading="eager"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

