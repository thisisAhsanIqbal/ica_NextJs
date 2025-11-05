'use client';

import { useEffect } from 'react';
import styles from './HeroPopup.module.css';

interface DonatePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonatePopup({ isOpen, onClose }: DonatePopupProps) {
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
      id="donate-popup"
      role="dialog"
      aria-labelledby="donate-popup-title"
      aria-hidden={!isOpen}
      aria-modal="true"
    >
      <div className={styles.heroPopupOverlay} onClick={onClose} />
      <div className={styles.heroPopupContent}>
        <button
          className={styles.heroPopupClose}
          onClick={onClose}
          aria-label="Close donate popup"
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
            <h2 id="donate-popup-title" className={styles.heroPopupTitle}>
              DONATE TODAY!
            </h2>
            <p className={styles.heroPopupSubtitle}>
              Illinois Conservatory for the Arts is a 501c3 not-for-profit arts institution. Your support helps us continue providing high-level arts programming and education.
            </p>
          </div>
        </div>

        <div className={styles.heroPopupContentArea}>
          <div className={styles.heroPopupScript}>
            {/* Donate form iframe or component will go here */}
            <p>Donate form will be integrated here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


