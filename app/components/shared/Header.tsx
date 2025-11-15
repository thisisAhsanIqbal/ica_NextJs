'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isImpactSubmenuOpen, setIsImpactSubmenuOpen] = useState(true)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
    // Keep submenu open when main menu closes
    // Submenu will be visible when menu reopens
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    // Keep submenu state - don't close it
  }, [])

  const toggleImpactSubmenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsImpactSubmenuOpen(prev => !prev)
  }, [])

  // Change body and html background color when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Store original background colors
      const originalBodyBg = document.body.style.backgroundColor
      const originalHtmlBg = document.documentElement.style.backgroundColor
      
      // Set white background on both body and html for full coverage
      document.body.style.backgroundColor = 'white'
      document.documentElement.style.backgroundColor = 'white'
      
      return () => {
        // Restore original background when menu closes
        document.body.style.backgroundColor = originalBodyBg || ''
        document.documentElement.style.backgroundColor = originalHtmlBg || ''
      }
    } else {
      // Reset to default when menu closes
      document.body.style.backgroundColor = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [isMenuOpen])

  // Close menu on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, closeMenu])

  return (
    <header className={styles.header} role="banner" itemScope itemType="https://schema.org/Organization">
      {/* Organization Schema Meta Tags */}
      <meta itemProp="name" content="Illinois Conservatory for the Arts" />
      <meta itemProp="sameAs" content="https://www.facebook.com/ilconservatory" />
      <meta itemProp="sameAs" content="https://www.instagram.com/ilconservatory/" />
      <meta itemProp="sameAs" content="https://x.com/ilconservatory" />
      <meta itemProp="sameAs" content="https://www.linkedin.com/company/ilconservatory" />
      <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
        <meta itemProp="telephone" content="+1-630-243-5100" />
        <meta itemProp="contactType" content="Customer Service" />
        <meta itemProp="areaServed" content="US" />
        <meta itemProp="availableLanguage" content="English" />
      </div>
      
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link 
            href="/" 
            aria-label="Illinois Conservatory for the Arts - Home"
            itemProp="url"
          >
            <Image
              src="/PrimaryLogo.webp"
              alt="Illinois Conservatory for the Arts"
              width={180}
              height={60}
              priority
              fetchPriority="high"
              className={styles.logoImage}
              sizes="(max-width: 1010px) 150px, 180px"
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4="
              itemProp="logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav 
          className={styles.desktopNavMenu}
          role="navigation"
          aria-label="Main navigation"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          <Link href="/school/" className={styles.desktopNavLink} itemProp="url">
            <span itemProp="name">THE SCHOOL</span>
          </Link>
          <Link href="/impact" className={styles.desktopNavLink} itemProp="url">
            <span itemProp="name">IMPACT</span>
          </Link>
          <Link href="/studio/" className={styles.desktopNavLink} itemProp="url">
            <span itemProp="name">THE STUDIO</span>
          </Link>
          <Link href="/team/" className={styles.desktopNavLink} itemProp="url">
            <span itemProp="name">ABOUT</span>
          </Link>
          <Link href="/events" className={styles.desktopNavLink} itemProp="url">
            <span itemProp="name">EVENTS</span>
          </Link>
          <Link href="/support" className={styles.desktopNavLink} itemProp="url">
            <span itemProp="name">SUPPORT</span>
          </Link>
        </nav>

        {/* Mobile Menu Button - Transforms to X when menu is open */}
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

        {/* Mobile Dropdown Menu - Below Header */}
        <nav 
          id="main-navigation"
          className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!isMenuOpen}
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >

          <Link href="/school/" className={styles.navLink} onClick={closeMenu} itemProp="url">
            <span className={styles.navBullet}></span>
            <span className={styles.navText} itemProp="name">THE SCHOOL</span>
          </Link>
          
          {/* IMPACT with Submenu */}
          <div className={styles.navItemWithSubmenu}>
            <div className={styles.navLinkWithArrow}>
              <Link href="/impact" className={styles.navLink} onClick={closeMenu} itemProp="url">
                <span className={styles.navBullet}></span>
                <span className={styles.navText} itemProp="name">IMPACT</span>
              </Link>
              <button
                className={styles.submenuToggle}
                onClick={toggleImpactSubmenu}
                aria-expanded={isImpactSubmenuOpen}
                aria-haspopup="true"
                aria-controls="impact-submenu"
                aria-label="Toggle IMPACT submenu"
                type="button"
              >
                <svg 
                  className={`${styles.submenuArrow} ${isImpactSubmenuOpen ? styles.submenuArrowOpen : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    d="M4 6L8 10L12 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <ul 
              id="impact-submenu"
              className={`${styles.submenu} ${isImpactSubmenuOpen ? styles.submenuOpen : ''}`}
              role="menu"
              aria-label="IMPACT submenu"
            >
              <li role="none">
                <Link href="/impact/impact-dance" className={styles.submenuLink} onClick={closeMenu} role="menuitem" itemProp="url">
                  <span className={styles.submenuBullet}></span>
                  <span className={styles.submenuText} itemProp="name">IMPACT DANCE</span>
                </Link>
              </li>
              <li role="none">
                <Link href="/impact/impact-mt-winter" className={styles.submenuLink} onClick={closeMenu} role="menuitem" itemProp="url">
                  <span className={styles.submenuBullet}></span>
                  <span className={styles.submenuText} itemProp="name">IMPACT MT WINTER</span>
                </Link>
              </li>
              <li role="none">
                <Link href="/impact/impact-mt-summer" className={styles.submenuLink} onClick={closeMenu} role="menuitem" itemProp="url">
                  <span className={styles.submenuBullet}></span>
                  <span className={styles.submenuText} itemProp="name">IMPACT MT SUMMER</span>
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/studio/" className={styles.navLink} onClick={closeMenu} itemProp="url">
            <span className={styles.navBullet}></span>
            <span className={styles.navText} itemProp="name">THE STUDIO</span>
          </Link>
          <Link href="/team/" className={styles.navLink} onClick={closeMenu} itemProp="url">
            <span className={styles.navBullet}></span>
            <span className={styles.navText} itemProp="name">ABOUT</span>
          </Link>
          <Link href="/events" className={styles.navLink} onClick={closeMenu} itemProp="url">
            <span className={styles.navBullet}></span>
            <span className={styles.navText} itemProp="name">EVENTS</span>
          </Link>
          <Link href="/support" className={styles.navLink} onClick={closeMenu} itemProp="url">
            <span className={styles.navBullet}></span>
            <span className={styles.navText} itemProp="name">SUPPORT</span>
          </Link>
          
          {/* Conservatory Collections in Mobile Menu */}
          <a 
            href="https://shop.ilconservatory.org/" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileShopButton} 
            aria-label="Conservatory Collections"
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
            <span className={styles.shopText}>Conservatory Collections</span>
          </a>
          
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
          <a 
            href="https://shop.ilconservatory.org/" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton} 
            aria-label="Conservatory Collections"
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
          </a>
        </div>
      </div>
    </header>
  )
}

