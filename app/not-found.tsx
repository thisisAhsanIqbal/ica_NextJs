import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Decorative elements */}
        <div className={styles.decorativeCircle1}></div>
        <div className={styles.decorativeCircle2}></div>
        <div className={styles.decorativeCircle3}></div>
        
        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={styles.errorCode}>
            <span className={styles.errorNumber}>4</span>
            <span className={styles.errorIcon}>🎭</span>
            <span className={styles.errorNumber}>4</span>
          </div>
          
          <h1 className={styles.title}>Page Not Found</h1>
          
          <p className={styles.description}>
            The page you're looking for seems to have taken a bow and exited the stage. 
            Don't worry—every great performance has its intermission!
          </p>
          
          <div className={styles.buttonGroup}>
            <Link href="/" className={styles.primaryButton}>
              Return Home
            </Link>
            <Link href="/the-school" className={styles.secondaryButton}>
              Learn About The School
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

