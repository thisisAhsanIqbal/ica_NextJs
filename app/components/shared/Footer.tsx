'use client'

import Image from 'next/image'
import Link from 'next/link'
import BackToTop from '../ui/BackToTop'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.icaFooter} role="contentinfo">
      <div className={styles.icaFooterContainer}>
        <div className={styles.icaFooterGrid}>
          {/* 1. Logo Section */}
          <div className={styles.icaLogoSection}>
            <Link href="/" aria-label="Illinois Conservatory for the Arts - Home">
              <Image
                src="/asserts/Stamp-Logo-300x300.webp"
                alt="Illinois Conservatory for the Arts"
                width={170}
                height={170}
                className={styles.icaFooterLogo}
                loading="lazy"
                sizes="(max-width: 479px) 160px, (max-width: 767px) 180px, (max-width: 1199px) 170px, (max-width: 1439px) 190px, 220px"
              />
            </Link>
          </div>

          {/* 2. Content Section (Headline + IcaButtons) */}
          <section className={styles.icaContentSection} aria-labelledby="footer-tagline">
            <h2 id="footer-tagline" className={styles.icaHeadline}>
              High-level arts <em>meets</em><br />high-achieving academics.
            </h2>
            <div className={styles.icaButtons}>
              <a 
                href="mailto:info@ilconservatory.org" 
                className={styles.icaButton}
                aria-label="Email us at info@ilconservatory.org"
              >
                <Image
                  src="/asserts/Email.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={styles.icaFooterIcon}
                  aria-hidden="true"
                  loading="lazy"
                />
                EMAIL US
              </a>
              <button
                type="button"
                className={styles.icaButton}
                onClick={() => window.open('https://m.me/100066957470546', '_blank')}
                aria-label="Chat now on Messenger"
              >
                <Image
                  src="/asserts/support-chat.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={styles.icaFooterIcon}
                  aria-hidden="true"
                  loading="lazy"
                />
                CHAT NOW
              </button>
            </div>
          </section>

          {/* 3. Badges Section */}
          <section className={styles.icaBadgesSection} aria-label="Program areas">
            <div className={styles.icaBadge}>
              <Link href="/the-school" aria-label="The School">
                <Image
                  src="/asserts/Icon-The-School.webp"
                  alt="The School"
                  width={130}
                  height={40}
                  loading="lazy"
                  sizes="(max-width: 479px) 95px, (max-width: 767px) 150px, (max-width: 1199px) 130px, (max-width: 1439px) 90px, 100px"
                />
              </Link>
            </div>
            <div className={styles.icaBadge}>
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
            <div className={styles.icaBadge}>
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
          <div className={styles.icaNavSocialRow}>
            <nav className={styles.icaFooterNav} aria-label="Footer navigation">
              <Link href="/about" prefetch={true}>WHO WE ARE</Link>
              <Link href="/blog" prefetch={true}>CURTAIN UP! THE BLOG</Link>
              <Link href="/support" prefetch={true}>SUPPORT ICA</Link>
              <Link href="/sitemap" prefetch={true}>SITEMAP</Link>
            </nav>
            <nav className={styles.icaFooterSocial} aria-label="Social media links">
              <a
                href="https://www.facebook.com/ilconservatory"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="Visit our Facebook page (opens in new tab)"
              >
                <Image
                  src="/asserts/home/fb.svg"
                  alt=""
                  width={32}
                  height={32}
                  className={styles.icaFooterSocialIcon}
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
                  className={styles.icaFooterSocialIcon}
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
                  className={styles.icaFooterSocialIcon}
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
                  className={styles.icaFooterSocialIcon}
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.icaCopyright}>
        <div className={styles.icaFooterContainer}>
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
      <div className={styles.icaWebsiteCredit}>
        <div className={styles.icaFooterContainer}>
          <p className={styles.icaCreditText}>
            Website Design and Development by{' '}
            <a href="https://muhammadahsaniqbal.com/" target="_blank" rel="noopener noreferrer">
              Muhammad Ahsan Iqbal
            </a>
          </p>
        </div>
      </div>

      <BackToTop />
    </footer>
  )
}

