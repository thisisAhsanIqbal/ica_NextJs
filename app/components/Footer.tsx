'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

export default function Footer() {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)

  useEffect(() => {
    // Debounce scroll handler for better performance
    let ticking = false

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset
          setIsBackToTopVisible(scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <footer className="ica-footer" role="contentinfo">
      <div className="ica-footer-container">
        <div className="ica-footer-grid">
          {/* 1. Logo Section */}
          <div className="ica-logo-section">
            <Link href="/" aria-label="Illinois Conservatory for the Arts - Home">
              <Image
                src="/asserts/Stamp-Logo-300x300.webp"
                alt="Illinois Conservatory for the Arts"
                width={170}
                height={170}
                className="ica-footer-logo"
                loading="lazy"
                sizes="(max-width: 479px) 160px, (max-width: 767px) 180px, (max-width: 1199px) 170px, (max-width: 1439px) 190px, 220px"
              />
            </Link>
          </div>

          {/* 2. Content Section (Headline + Buttons) */}
          <section className="ica-content-section" aria-labelledby="footer-tagline">
            <h2 id="footer-tagline" className="ica-headline">
              High-level arts <em>meets</em><br />high-achieving academics.
            </h2>
            <div className="ica-buttons">
              <a 
                href="mailto:info@ilconservatory.org" 
                className="ica-button" 
                aria-label="Email us at info@ilconservatory.org"
              >
                <Image
                  src="/asserts/Email.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="ica-footer-icon"
                  aria-hidden="true"
                  loading="lazy"
                />
                EMAIL US
              </a>
              <button
                type="button"
                className="ica-button"
                onClick={() => window.open('https://m.me/100066957470546', '_blank')}
                aria-label="Chat now on Messenger"
              >
                <Image
                  src="/asserts/support-chat.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="ica-footer-icon"
                  aria-hidden="true"
                  loading="lazy"
                />
                CHAT NOW
              </button>
            </div>
          </section>

          {/* 3. Badges Section */}
          <section className="ica-badges-section" aria-label="Program areas">
            <div className="ica-badge">
              <Link href="/the-school" aria-label="The School">
                <Image
                  src="/asserts/Icon-The-School-300x142.webp"
                  alt="The School"
                  width={130}
                  height={40}
                  loading="lazy"
                  sizes="(max-width: 479px) 95px, (max-width: 767px) 150px, (max-width: 1199px) 130px, (max-width: 1439px) 90px, 100px"
                />
              </Link>
            </div>
            <div className="ica-badge">
              <Link href="/impact" aria-label="IMPACT">
                <Image
                  src="/asserts/Icon-IMPACT-300x110.webp"
                  alt="IMPACT"
                  width={130}
                  height={40}
                  loading="lazy"
                  sizes="(max-width: 479px) 95px, (max-width: 767px) 150px, (max-width: 1199px) 130px, (max-width: 1439px) 90px, 100px"
                />
              </Link>
            </div>
            <div className="ica-badge">
              <Link href="/the-studio" aria-label="The Studio">
                <Image
                  src="/asserts/Icon-The-Studio-300x151.webp"
                  alt="The Studio"
                  width={130}
                  height={40}
                  loading="lazy"
                  sizes="(max-width: 479px) 95px, (max-width: 767px) 150px, (max-width: 1199px) 130px, (max-width: 1439px) 90px, 100px"
                />
              </Link>
            </div>
          </section>

          {/* 4. Navigation + Social Row */}
          <div className="ica-nav-social-row">
            <nav className="ica-footer-nav" aria-label="Footer navigation">
              <Link href="/about" prefetch={true}>WHO WE ARE</Link>
              <Link href="/blog" prefetch={true}>CURTAIN UP! THE BLOG</Link>
              <Link href="/support" prefetch={true}>SUPPORT ICA</Link>
              <Link href="/sitemap" prefetch={true}>SITEMAP</Link>
            </nav>
            <nav className="ica-footer-social" aria-label="Social media links">
              <a
                href="https://www.facebook.com/ilconservatory"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="Visit our Facebook page (opens in new tab)"
              >
                <Image
                  src="/asserts/fb.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="ica-footer-social-icon"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.instagram.com/ilconservatory/"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="Visit our Instagram page (opens in new tab)"
              >
                <Image
                  src="/asserts/insta.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="ica-footer-social-icon"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://x.com/ilconservatory"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="Visit our X (Twitter) page (opens in new tab)"
              >
                <Image
                  src="/asserts/x.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="ica-footer-social-icon"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/ilconservatory"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="Visit our LinkedIn page (opens in new tab)"
              >
                <Image
                  src="/asserts/linkedin.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="ica-footer-social-icon"
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="ica-copyright">
        <div className="ica-footer-container">
          <address className="not-italic">
            <span>NAPERVILLE, ILLINOIS</span>
          </address>
          <p>
            COPYRIGHT{' '}
            <time dateTime="2024">2024</time> ILLINOIS CONSERVATORY FOR THE ARTS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Website Credit */}
      <div className="ica-website-credit">
        <div className="ica-footer-container">
          <p className="ica-credit-text">
            Website Design and Development by{' '}
            <a href="https://muhammadahsaniqbal.com/" target="_blank" rel="noopener noreferrer">
              Muhammad Ahsan Iqbal
            </a>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        type="button"
        className={`back-to-top ${isBackToTopVisible ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <Image
          src="/asserts/Stamp-Logo-300x300.webp"
          alt=""
          width={80}
          height={80}
          className="back-to-top-logo"
          loading="lazy"
          aria-hidden="true"
        />
      </button>
    </footer>
  )
}

