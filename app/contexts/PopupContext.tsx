'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import type { PopupData } from '@/app/types/popup';
import UniversalPopup from '@/app/components/ui/UniversalPopup';

export interface PopupOptions {
  onRetry?: () => void;
  retryButtonText?: string;
  contactEmail?: string;
  contactPhone?: string;
}

interface PopupContextType {
  openPopup: (data: PopupData, options?: PopupOptions) => void;
  closePopup: () => void;
  isOpen: boolean;
  currentPopup: PopupData | null;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Default retry handler - reloads the page
const defaultRetryHandler = () => {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<PopupData | null>(null);
  const [popupOptions, setPopupOptions] = useState<PopupOptions | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const openPopup = useCallback((data: PopupData, options?: PopupOptions) => {
    // Validate popup data
    if (!data) {
      console.error('Cannot open popup: data is null or undefined');
      return;
    }

    if (!data.id) {
      console.error('Cannot open popup: data.id is missing', data);
      return;
    }

    if (!data.title) {
      console.warn('Popup opened without title:', data);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    try {
      setCurrentPopup(data);
      setPopupOptions(options || null);
      setIsOpen(true);
    } catch (error) {
      console.error('Error opening popup:', error);
    }
  }, []);

  const closePopup = useCallback(() => {
    try {
      setIsOpen(false);
      // Clear popup data after animation completes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCurrentPopup(null);
        setPopupOptions(null);
        timeoutRef.current = null;
      }, 300);
    } catch (error) {
      console.error('Error closing popup:', error);
      // Ensure popup is closed even if there's an error
      setIsOpen(false);
      setCurrentPopup(null);
      setPopupOptions(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, []);

  // Use custom retry handler if provided, otherwise use default
  const handleRetry = useCallback(() => {
    if (popupOptions?.onRetry) {
      popupOptions.onRetry();
    } else {
      defaultRetryHandler();
    }
  }, [popupOptions]);

  // Use custom retry button text if provided, otherwise use default
  const getRetryButtonText = useCallback((): string => {
    return popupOptions?.retryButtonText || 'Try Again';
  }, [popupOptions]);

  return (
    <PopupContext.Provider value={{ openPopup, closePopup, isOpen, currentPopup }}>
      {children}
      {currentPopup && (
        <UniversalPopup
          isOpen={isOpen}
          onClose={closePopup}
          data={currentPopup}
          onRetry={handleRetry}
          retryButtonText={getRetryButtonText()}
          contactEmail={popupOptions?.contactEmail || "info@ilconservatory.org"}
          contactPhone={popupOptions?.contactPhone || "(630) 243-5100"}
        />
      )}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
}

