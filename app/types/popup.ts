/**
 * Popup Data Types
 * 
 * This file defines the TypeScript interfaces for popup content.
 * Use these types to ensure type safety when passing popup data.
 */

export type ScriptType = 'iframe' | 'script' | 'html';

export interface PopupScript {
  type: ScriptType;
  content: string; // URL for iframe/script, HTML string for html
  width?: string; // For iframe
  height?: string; // For iframe
  allowFullScreen?: boolean; // For iframe
  sandbox?: string; // For iframe security
  // Additional properties for script type (e.g., async, data-* attributes)
  [key: string]: string | boolean | undefined;
}

export interface PopupImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Popup can have either a single image or an array of images (max 2)
 */
export type PopupImageData = PopupImage | PopupImage[];

/**
 * Full Popup Data Structure
 * Includes all possible fields: image, title, description1, description2, date, script
 */
export interface FullPopupData {
  id: string; // Unique identifier for the popup
  variant?: 'full' | 'school-popup'; // Optional explicit variant indicator
  image?: PopupImageData; // Single image or array of up to 2 images
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
  variant?: 'minimal'; // Optional explicit variant indicator
  title: string;
  image?: PopupImageData; // Single image or array of up to 2 images
  description?: string;
  script?: PopupScript;
}

/**
 * Union type - popup can be either full or minimal
 */
export type PopupData = FullPopupData | MinimalPopupData;

/**
 * Helper function to check if popup is minimal variant
 * Checks variant property first, then falls back to property detection
 */
export function isMinimalPopup(data: PopupData): data is MinimalPopupData {
  // If variant is explicitly set, use it
  if (data.variant === 'minimal') return true;
  if (data.variant === 'full' || data.variant === 'school-popup') return false;
  
  // Otherwise, infer from properties (backward compatibility)
  return !('description1' in data || 'description2' in data || 'date' in data);
}

/**
 * Helper function to check if popup is school-popup variant
 */
export function isSchoolPopup(data: PopupData): boolean {
  return data.variant === 'school-popup';
}

