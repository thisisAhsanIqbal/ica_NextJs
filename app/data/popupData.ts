/**
 * Sitewide Popup Data
 * 
 * This file contains all popup data used across the site.
 * Update these when popup content needs to change.
 */

import type { PopupData } from '@/app/types/popup';

/**
 * Home Page Hero - Stay Connected with ICA! Popup
 * Used for newsletter signup in the home page hero component
 */
export const homeStayConnectedPopup: PopupData = {
  id: 'home-stay-connected-popup',
  title: 'Stay Connected with ICA!',
  image: {
    src: '/asserts/Primary-Logo-Cream-768x398.webp',
    alt: 'Illinois Conservatory for the Arts Logo',
    width: 250,
  },
  description: 'Join our mailing list to receive the latest news, upcoming events, and exciting updates from the Illinois Conservatory for the Arts. Be the first to learn about performances, student achievements, and opportunities to support our mission of empowering young artists through innovative arts education.',
  script: {
    type: 'script', // Will be handled as HTML since it's a full script tag
    content: `<script type='text/javascript' async='true' src='https://app.ontraport.com/js/ontraport/opt_assets/drivers/opf.js' data-opf-uid='p2c241273f33' data-opf-params='borderColor=#000000&borderSize=0px&embed=true&formHeight=441&formWidth=100%&popPosition=mc&instance=n507961016'></script>`,
  },
};

/**
 * Home Page Hero - Donate Today! Popup
 * Used for donation in the home page hero component
 */
export const homeDonatePopup: PopupData = {
  id: 'home-donate-popup',
  title: 'DONATE TODAY!',
  image: {
    src: '/asserts/Primary-Logo-Cream-768x398.webp',
    alt: 'Illinois Conservatory for the Arts Logo',
    width: 250,
  },
  description: 'Illinois Conservatory for the Arts is a 501c3 not-for-profit arts institution. Your support provides high-level arts experiences for students in the Chicagoland area.',
  script: {
    type: 'iframe',
    content: 'https://fundraise.givesmart.com/form/L4UzGQ?utm_source=embed&utm_medium=page&utm_campaign=donation',
    width: '100%',
    height: '1903px',
  },
};

/**
 * @deprecated Use homeStayConnectedPopup instead
 * Kept for backward compatibility
 */
export const stayConnectedPopup = homeStayConnectedPopup;

/**
 * Helper function to get popup by ID
 * You can extend this to fetch from an API or database
 */
export function getPopupById(id: string): PopupData | null {
  const popups: Record<string, PopupData> = {
    'home-stay-connected-popup': homeStayConnectedPopup,
    'home-donate-popup': homeDonatePopup,
    'stay-connected-popup': homeStayConnectedPopup, // Backward compatibility
    // Add more popups here as needed
  };

  return popups[id] || null;
}

/**
 * Export all popups for easy access
 */
export const allPopups = {
  homeStayConnected: homeStayConnectedPopup,
  homeDonate: homeDonatePopup,
  stayConnected: homeStayConnectedPopup, // Backward compatibility
};

