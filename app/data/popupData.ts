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
    type: 'script', // Change type to 'script'
    content: 'https://app.ontraport.com/js/ontraport/opt_assets/drivers/opf.js', // 'content' is now just the src URL
    // All other attributes are added as props
    async: true, // Use a boolean for 'async'
    'data-opf-uid': 'p2c241273f33',
    'data-opf-params': 'borderColor=#000000&borderSize=0px&embed=true&formHeight=441&formWidth=100%&popPosition=mc&instance=n507961016',
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
    type: 'html',
    content: '<iframe id="mc-donation" src="https://fundraise.givesmart.com/form/K-2RDQ?utm_source=embed&utm_medium=page&utm_campaign=donation" width="100%" height="1889" overflow="scroll" onLoad="window.scrollTo(0,0);"></iframe>',
  },
};

/**
 * School - Join the Interest List Popup
 * Used for the interest list form in the School component
 */
export const schoolInterestListPopup: PopupData = {
  id: 'school-interest-list-popup',
  title: 'JOIN THE INTEREST LIST',
  variant: 'school-popup',
  image: [
    {
      src: '/asserts/PrimaryLogo-green-deep.webp',
      alt: 'Illinois Conservatory for the Arts Logo',
      width: 160,
    },
    {
      src: '/asserts/Icon-The-School.webp',
      alt: 'The School Icon',
      width: 160,
    },
  ],
  description1: "COMING SOON",
  description2: 'Fill out the form below to get on the official interest list and access the survey form.',
  script: {
    type: 'script',
    content: 'https://app.ontraport.com/js/ontraport/opt_assets/drivers/opf.js',
    async: true,
    'data-opf-uid': 'p2c241273f3',
    'data-opf-params': 'borderColor=#fff&borderSize=0px&embed=true&formHeight=1271&formWidth=480px&popPosition=mc&instance=n324261454',
  },
};

/**
 * Promotional Header - Save My Spot! Popup
 * Used for IMPACT: Musical Theater registration in the promotional header
 */
export const promotionalSaveMySpotPopup: PopupData = {
  id: 'promotional-save-my-spot-popup',
  title: 'IMPACT: Musical Theater fills up fast!',
  image: {
    src: '/asserts/home/impact-MT-logo.webp',
    alt: 'IMPACT: Musical Theater Logo',
    width: 250,
  },
  description: 'Check to see if a spot is available using the form below.',
  script: {
    type: 'script',
    content: 'https://app.ontraport.com/js/ontraport/opt_assets/drivers/opf.js',
    async: true,
    'data-opf-uid': 'p2c241273f33',
    'data-opf-params': 'borderColor=%23C6D62B&borderSize=2px&embed=true&formHeight=441&formWidth=100%&popPosition=mc&instance=n507961016&textColor=%231E312F&backgroundColor=%23F9F6F4',
  },
};

/**
 * Promotional Header - Register Now! Popup
 * Used for IMPACT: Dance registration in the promotional header
 */
export const promotionalRegisterNowPopup: PopupData = {
  id: 'promotional-register-now-popup',
  variant: 'full',
  title: 'Check availability',
  image: {
    src: '/asserts/home/Impact-Dance-logo-main.webp',
    alt: 'IMPACT: Dance Logo',
    width: 250,
  },
  description1: "IMPACT is popular and fills up fast! You'll be forwarded to the registration form to grab your spot.",
  date: 'December 30, 2025',
  script: {
    type: 'script',
    content: 'https://app.ontraport.com/js/ontraport/opt_assets/drivers/opf.js',
    async: true,
    'data-opf-uid': 'p2c241273f35',
    'data-opf-params': 'borderColor=#000000&borderSize=0px&embed=true&formHeight=441&formWidth=100%&popPosition=mc&instance=n507961016',
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
    'school-interest-list-popup': schoolInterestListPopup,
    'promotional-save-my-spot-popup': promotionalSaveMySpotPopup,
    'promotional-register-now-popup': promotionalRegisterNowPopup,
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
  schoolInterestList: schoolInterestListPopup,
  promotionalSaveMySpot: promotionalSaveMySpotPopup,
  promotionalRegisterNow: promotionalRegisterNowPopup,
  stayConnected: homeStayConnectedPopup, // Backward compatibility
};

