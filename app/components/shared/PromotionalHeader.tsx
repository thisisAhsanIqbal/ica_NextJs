import styles from './PromotionalHeader.module.css'

export default function PromotionalHeader() {
  return (
    <section className={styles.promotionalHeader} aria-label="Promotional announcements">
      {/* IMPACT: Musical Theater */}
      <article className={`${styles.promoBanner} ${styles.promoMusical}`} aria-labelledby="musical-title">
        <div className={styles.promoBannerContainer}>
          <div className={styles.promoLabel} role="text">Register Today!</div>
          <div className={styles.promoRow2}>
            <div className={styles.promoContentGroup}>
              <h2 className={styles.promoTitle} id="musical-title">IMPACT: Musical Theater</h2>
              <p className={styles.promoSubtitle}>Summer 2025 Registration</p>
            </div>
            <div className={styles.promoAction}>
              <button type="button" className={styles.promoButton} aria-label="Save my spot for IMPACT: Musical Theater Summer 2025 Registration">
                Save My Spot!
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* IMPACT: Dance */}
      <article className={`${styles.promoBanner} ${styles.promoDance}`} aria-labelledby="dance-title">
        <div className={styles.promoBannerContainer}>
          <div className={styles.promoLabel} role="text">Register Today!</div>
          <div className={styles.promoRow2}>
            <div className={styles.promoContentGroup}>
              <h2 className={styles.promoTitle} id="dance-title">IMPACT: DANCE</h2>
              <p className={styles.promoSubtitle}>Winter Session</p>
            </div>
            <div className={styles.promoAction}>
              <button type="button" className={styles.promoButton} aria-label="Register now for IMPACT: Dance Winter Session">
                Register Now!
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

