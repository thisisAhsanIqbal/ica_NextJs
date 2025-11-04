'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              src="/PrimaryLogo.webp"
              alt="Logo"
              width={180}
              height={60}
              priority
              className="logo-image"
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

        {/* Button */}
        <div className="header-actions">
          <button className="cta-button" aria-label="Shop">
            <Image
              src="/shop_icon.svg"
              alt="Shop"
              width={20}
              height={20}
              className="shop-icon"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

