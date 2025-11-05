'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" aria-label="Illinois Conservatory for the Arts - Home">
            <Image
              src="/PrimaryLogo.webp"
              alt="Illinois Conservatory for the Arts"
              width={180}
              height={60}
              priority
              fetchPriority="high"
              className={styles.logoImage}
              sizes="(max-width: 920px) 150px, 180px"
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4="
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          type="button"
        >
          <span className={isMenuOpen ? `${styles.hamburger} ${styles.hamburgerOpen}` : styles.hamburger} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Menu */}
        <nav 
          id="main-navigation"
          className={`${styles.navMenu} ${isMenuOpen ? 'active' : ''}`}
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!isMenuOpen}
        >
          <Link href="/the-school" className={styles.navLink} onClick={closeMenu}>
            <span className={styles.navBullet}></span>
            <span className={styles.navText}>THE SCHOOL</span>
          </Link>
          <Link href="/impact" className={styles.navLink} onClick={closeMenu}>
            <span className={styles.navBullet}></span>
            <span className={styles.navText}>IMPACT</span>
          </Link>
          <Link href="/the-studio" className={styles.navLink} onClick={closeMenu}>
            <span className={styles.navBullet}></span>
            <span className={styles.navText}>THE STUDIO</span>
          </Link>
          <Link href="/about" className={styles.navLink} onClick={closeMenu}>
            <span className={styles.navBullet}></span>
            <span className={styles.navText}>ABOUT</span>
          </Link>
          <Link href="/events" className={styles.navLink} onClick={closeMenu}>
            <span className={styles.navBullet}></span>
            <span className={styles.navText}>EVENTS</span>
          </Link>
          <Link href="/support" className={styles.navLink} onClick={closeMenu}>
            <span className={styles.navBullet}></span>
            <span className={styles.navText}>SUPPORT</span>
          </Link>
          
          {/* Shopping Cart in Mobile Menu */}
          <button 
            className={styles.mobileShopButton} 
            aria-label="Shopping Cart" 
            type="button" 
            onClick={closeMenu}
          >
            <Image
              src="/shop_icon.svg"
              alt=""
              width={20}
              height={20}
              className={styles.shopIcon}
              priority
              fetchPriority="high"
              loading="eager"
              aria-hidden="true"
            />
            <span className={styles.shopText}>Shopping Cart</span>
          </button>
          
          {/* Social Icons in Mobile Menu */}
          <div className={styles.mobileSocialIcons} role="list" aria-label="Social media links">
            <a 
              href="https://www.facebook.com/ilconservatory" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className={styles.socialIcon} 
              aria-label="Visit our Facebook page"
              role="listitem"
            >
              <Image
                src="/asserts/home/fb.svg"
                alt=""
                width={24}
                height={24}
                className={styles.socialIconImg}
                priority
                aria-hidden="true"
              />
            </a>
            <a 
              href="https://www.instagram.com/ilconservatory/" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className={styles.socialIcon} 
              aria-label="Visit our Instagram page"
              role="listitem"
            >
              <Image
                src="/asserts/insta.svg"
                alt=""
                width={24}
                height={24}
                className={styles.socialIconImg}
                priority
                aria-hidden="true"
              />
            </a>
            <a 
              href="https://x.com/ilconservatory" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className={styles.socialIcon} 
              aria-label="Visit our X (Twitter) page"
              role="listitem"
            >
              <Image
                src="/asserts/x.svg"
                alt=""
                width={24}
                height={24}
                className={styles.socialIconImg}
                priority
                aria-hidden="true"
              />
            </a>
            <a 
              href="https://www.linkedin.com/company/ilconservatory" 
              target="_blank" 
              rel="noopener noreferrer me" 
              className={styles.socialIcon} 
              aria-label="Visit our LinkedIn page"
              role="listitem"
            >
              <Image
                src="/asserts/linkedin.svg"
                alt=""
                width={24}
                height={24}
                className={styles.socialIconImg}
                priority
                aria-hidden="true"
              />
            </a>
          </div>
        </nav>

        {/* Actions */}
        <div className={styles.headerActions}>
          {/* Shop Button */}
          <button className={styles.ctaButton} aria-label="Shopping Cart" type="button">
            <Image
              src="/shop_icon.svg"
              alt=""
              width={20}
              height={20}
              className={styles.shopIcon}
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

