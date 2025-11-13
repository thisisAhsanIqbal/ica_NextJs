'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import type { PopupData } from '@/app/types/popup';
import UniversalPopup from '@/app/components/ui/UniversalPopup';

interface PopupContextType {
  openPopup: (data: PopupData) => void;
  closePopup: () => void;
  isOpen: boolean;
  currentPopup: PopupData | null;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<PopupData | null>(null);
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

  const openPopup = useCallback((data: PopupData) => {
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
        timeoutRef.current = null;
      }, 300);
    } catch (error) {
      console.error('Error closing popup:', error);
      // Ensure popup is closed even if there's an error
      setIsOpen(false);
      setCurrentPopup(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, []);

  return (
    <PopupContext.Provider value={{ openPopup, closePopup, isOpen, currentPopup }}>
      {children}
      {currentPopup && (
        <UniversalPopup
          isOpen={isOpen}
          onClose={closePopup}
          data={currentPopup}
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

