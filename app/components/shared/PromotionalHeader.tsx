'use client'

import styles from './PromotionalHeader.module.css'
import { usePopup } from '@/app/contexts/PopupContext'
import { promotionalSaveMySpotPopup, promotionalRegisterNowPopup } from '@/app/data/popupData'

export default function PromotionalHeader() {
  const { openPopup } = usePopup()

  const handleSaveMySpotClick = () => {
    openPopup(promotionalSaveMySpotPopup)
  }

  const handleRegisterNowClick = () => {
    openPopup(promotionalRegisterNowPopup)
  }

  return (
    <section 
      className={styles.promotionalHeader} 
      aria-label="Promotional announcements"
      role="complementary"
    >
      {/* IMPACT: Musical Theater */}
      <article 
        className={`${styles.promoBanner} ${styles.promoMusical}`} 
        aria-labelledby="musical-title"
        role="region"
      >
        <div className={styles.promoBannerContainer}>
          <div className={styles.promoLabel}>Register Today!</div>
          <div className={styles.promoRow2}>
            <div className={styles.promoContentGroup}>
              <div 
                className={styles.promoTitle} 
                id="musical-title"
                aria-label="IMPACT: Musical Theater"
              >
                IMPACT: Musical Theater
              </div>
              <p className={styles.promoSubtitle}>Summer 2025 Registration</p>
            </div>
            <div className={styles.promoAction}>
              <button 
                type="button" 
                className={styles.promoButton} 
                aria-label="Save my spot for IMPACT: Musical Theater Summer 2025 Registration"
                onClick={handleSaveMySpotClick}
              >
                Save My Spot!
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* IMPACT: Dance */}
      <article 
        className={`${styles.promoBanner} ${styles.promoDance}`} 
        aria-labelledby="dance-title"
        role="region"
      >
        <div className={styles.promoBannerContainer}>
          <div className={styles.promoLabel}>Register Today!</div>
          <div className={styles.promoRow2}>
            <div className={styles.promoContentGroup}>
              <div 
                className={styles.promoTitle} 
                id="dance-title"
                aria-label="IMPACT: DANCE"
              >
                IMPACT: DANCE
              </div>
              <p className={styles.promoSubtitle}>Winter Session</p>
            </div>
            <div className={styles.promoAction}>
              <button 
                type="button" 
                className={styles.promoButton} 
                aria-label="Register now for IMPACT: Dance Winter Session"
                onClick={handleRegisterNowClick}
              >
                Register Now!
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

