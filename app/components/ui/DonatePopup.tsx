// components/DonatePopup.tsx
'use client';

import { useEffect } from 'react';
import styles from './HeroPopup.module.css'; // Note: This uses a separate CSS file

interface DonatePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonatePopup({ isOpen, onClose }: DonatePopupProps) {
  useEffect(() => {
    // Prevent body scroll when popup is open
    if (isOpen) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }

    // Cleanup function to remove the class
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [isOpen]);

  // Handle keyboard escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.heroPopupModal} ${isOpen ? styles.active : ''}`}
      id="donate-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-popup-title"
      aria-hidden={!isOpen}
    >
      <div className={styles.heroPopupOverlay} onClick={onClose} />
      <div className={styles.heroPopupContent}>
        <button
          className={styles.heroPopupClose}
          onClick={onClose}
          aria-label="Close donate popup"
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
            {/* Logo image can go here */}
          </div>
          <div className={styles.heroPopupHeader}>
            <h2 id="donate-popup-title" className={styles.heroPopupTitle}>
              DONATE TODAY!
            </h2>
            <p className={styles.heroPopupSubtitle}>
              Illinois Conservatory for the Arts is a 501c3 not-for-profit arts institution...
            </p>
          </div>
        </div>

        <div className={styles.heroPopupContentArea}>
          <div className={styles.heroPopupScript}>
            {/* Donate form iframe or component would go here */}
            <p>Your donation form component or iframe goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}