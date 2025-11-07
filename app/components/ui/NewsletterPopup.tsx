'use client';

import { useEffect } from 'react';
import styles from './HeroPopup.module.css';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterPopup({ isOpen, onClose }: NewsletterPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }

    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.heroPopupModal} ${isOpen ? styles.active : ''}`}
      id="stay-connected-popup"
      role="dialog"
      aria-labelledby="newsletter-popup-title"
      aria-hidden={!isOpen}
      aria-modal="true"
    >
      <div className={styles.heroPopupOverlay} onClick={onClose} />
      <div className={styles.heroPopupContent}>
        <button
          className={styles.heroPopupClose}
          onClick={onClose}
          aria-label="Close newsletter popup"
          type="button"
        >
          <svg className={styles.promoCloseIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.heroPopupTop}>
          <div className={styles.heroPopupImage}>
            {/* Logo image placeholder */}
          </div>
          <div className={styles.heroPopupHeader}>
            <h2 id="newsletter-popup-title" className={styles.heroPopupTitle}>
              STAY CONNECTED WITH ICA!
            </h2>
            <p className={styles.heroPopupSubtitle}>
              Sign up for our newsletter to receive updates about events, programs, and opportunities at Illinois Conservatory for the Arts.
            </p>
          </div>
        </div>

        <div className={styles.heroPopupContentArea}>
          <div className={styles.heroPopupScript}>
            {/* Newsletter form will go here */}
            <p>Newsletter signup form will be integrated here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}




