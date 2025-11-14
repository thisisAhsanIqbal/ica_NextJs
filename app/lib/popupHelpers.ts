/**
 * Popup Helper Functions
 * 
 * This file contains helper functions for popup-specific business logic.
 * These functions can be used when opening popups to provide custom behavior.
 */

import type { PopupData, PopupOptions } from '@/app/contexts/PopupContext';

/**
 * Check if URL is a fundraise.givesmart.com form URL
 */
export function isGiveSmartFormUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'fundraise.givesmart.com' && 
           urlObj.pathname.startsWith('/form/');
  } catch {
    return false;
  }
}

/**
 * Extract URL from script data
 */
export function getScriptUrl(script: PopupData['script']): string | null {
  if (!script) return null;
  
  if (script.type === 'iframe') {
    return script.content;
  } else if (script.type === 'html') {
    // Extract iframe src from HTML content
    if (typeof window === 'undefined') return null;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = script.content;
    const iframe = tempDiv.querySelector('iframe');
    return iframe?.getAttribute('src') || null;
  }
  
  return null;
}

/**
 * Create popup options for GiveSmart forms
 * This provides custom retry behavior that opens the form in a new tab
 */
export function createGiveSmartPopupOptions(popupData: PopupData): PopupOptions {
  const scriptUrl = getScriptUrl(popupData.script);
  
  const onRetry = () => {
    if (scriptUrl && isGiveSmartFormUrl(scriptUrl)) {
      // Open GiveSmart form in a new tab
      if (typeof window !== 'undefined') {
        window.open(scriptUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // Fallback: reload page
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  };

  const retryButtonText = scriptUrl && isGiveSmartFormUrl(scriptUrl) 
    ? 'Load Form Directly' 
    : 'Try Again';

  return {
    onRetry,
    retryButtonText,
  };
}

