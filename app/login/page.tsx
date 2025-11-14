'use client'

import { SignIn, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import styles from './LoginPage.module.css'

function LoginForm() {
  const [isClerkLoaded, setIsClerkLoaded] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn } = useAuth()
  
  // Get redirect URL from query params, or default to home
  const redirectUrl = searchParams.get('redirect') || '/'

  useEffect(() => {
    // Check if Clerk is loaded
    const checkClerkLoaded = () => {
      if (typeof window !== 'undefined' && (window as any).Clerk) {
        setIsClerkLoaded(true)
      } else {
        // Retry after a short delay
        setTimeout(checkClerkLoaded, 100)
      }
    }
    // Start checking after a brief delay to allow Clerk to initialize
    const timer = setTimeout(checkClerkLoaded, 200)
    return () => clearTimeout(timer)
  }, [])

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push(redirectUrl)
    }
  }, [isSignedIn, redirectUrl, router])

  return (
    <div className={styles.loginContainer}>
      {/* 60% - Background Image Section */}
      <div className={styles.imageSection}>
        {/* Background Image */}
        <div className={styles.backgroundImage}>
          <Image
            src="/asserts/The-School-2.webp"
            alt="Illinois Conservatory for the Arts"
            fill
            priority
            className={styles.bgImage}
            quality={90}
            sizes="60vw"
          />
          {/* Overlay for better text readability */}
          <div className={styles.overlay}></div>
        </div>
        
        {/* Top Right - Back to Website Button */}
        <Link href="/" className={styles.backButton}>
          <Image
            src="/asserts/left-nav.svg"
            alt=""
            width={20}
            height={20}
            className={styles.backIcon}
            aria-hidden="true"
          />
          <span>Back to website</span>
        </Link>
        
        {/* Bottom Center - Quote Text */}
        <div className={styles.quoteText}>
          Nurturing Artistic Excellence, Inspiring Creative Futures
        </div>
      </div>

      {/* 40% - Login Form Section */}
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.logoContainer}>
            <Image
              src="/asserts/home/Stamp-Logo.png"
              alt="Illinois Conservatory for the Arts"
              width={200}
              height={200}
              className={styles.logoImage}
              priority
            />
          </div>
          {!isClerkLoaded && (
            <div className={styles.clerkSkeleton}>
              <div className={styles.skeletonHeader}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonSubtitle}></div>
              </div>
              <div className={styles.skeletonSocialButtons}>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonButton}></div>
              </div>
              <div className={styles.skeletonDivider}></div>
              <div className={styles.skeletonInput}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          )}
          <div style={{ display: isClerkLoaded ? 'block' : 'none' }}>
            <SignIn 
              routing="virtual"
              signUpUrl="/login"
              afterSignInUrl={redirectUrl}
              afterSignUpUrl={redirectUrl}
              forceRedirectUrl={redirectUrl}
            />
          </div>
          <Link href="/" className={styles.backToSiteLink}>
            <Image
              src="/asserts/left-nav.svg"
              alt=""
              width={20}
              height={20}
              className={styles.backToSiteIcon}
              aria-hidden="true"
            />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className={styles.loginContainer}>
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            <div className={styles.logoContainer}>
              <div style={{ width: 200, height: 200, backgroundColor: '#f0f0f0', borderRadius: '50%' }}></div>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
