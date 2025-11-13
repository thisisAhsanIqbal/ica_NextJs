/**
 * Popup Data Types
 * 
 * This file defines the TypeScript interfaces for popup content.
 * Use these types to ensure type safety when passing popup data.
 */

export type ScriptType = 'iframe' | 'script' | 'html';

export interface PopupScript {
  type: ScriptType;
  content: string; // URL for iframe, script code for script, HTML string for html
  width?: string; // For iframe
  height?: string; // For iframe
  allowFullScreen?: boolean; // For iframe
  sandbox?: string; // For iframe security
}

export interface PopupImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Full Popup Data Structure
 * Includes all possible fields: image, title, description1, description2, date, script
 */
export interface FullPopupData {
  id: string; // Unique identifier for the popup
  image?: PopupImage;
  title: string;
  description1?: string;
  description2?: string;
  date?: string;
  script?: PopupScript;
}

/**
 * Minimal Popup Data Structure
 * Only includes: title, image, description, script
 */
export interface MinimalPopupData {
  id: string;
  title: string;
  image?: PopupImage;
  description?: string;
  script?: PopupScript;
}

/**
 * Union type - popup can be either full or minimal
 */
export type PopupData = FullPopupData | MinimalPopupData;

/**
 * Helper function to check if popup is minimal variant
 */
export function isMinimalPopup(data: PopupData): data is MinimalPopupData {
  return !('description1' in data || 'description2' in data || 'date' in data);
}

