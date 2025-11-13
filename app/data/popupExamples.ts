/**
 * Example Popup Data
 * 
 * This file contains example popup data structures.
 * You can use these as templates or store your actual popup data here.
 */

import type { PopupData } from '@/app/types/popup';

/**
 * Example 1: Full Popup with all fields
 */
export const fullPopupExample: PopupData = {
  id: 'event-announcement-2024',
  image: {
    src: '/images/event-banner.jpg',
    alt: 'Event Announcement',
    width: 400,
    height: 250,
  },
  title: 'Annual Gala Event 2024',
  description1: 'Join us for our annual fundraising gala featuring performances by our talented students.',
  description2: 'This event supports our scholarship program and helps us continue providing quality arts education.',
  date: 'March 15, 2024',
  script: {
    type: 'iframe',
    content: 'https://example.com/event-registration-form',
    width: '100%',
    height: '600px',
    allowFullScreen: false,
  },
};

/**
 * Example 2: Minimal Popup (title, image, description, script)
 */
export const minimalPopupExample: PopupData = {
  id: 'newsletter-signup',
  title: 'Stay Connected with ICA!',
  image: {
    src: '/images/newsletter-icon.png',
    alt: 'Newsletter',
    width: 150,
    height: 150,
  },
  description: 'Sign up for our newsletter to receive updates about events, programs, and opportunities.',
  script: {
    type: 'html',
    content: `
      <form class="newsletter-form">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Subscribe</button>
      </form>
    `,
  },
};

/**
 * Example 3: Popup with Third-Party Script
 */
export const scriptPopupExample: PopupData = {
  id: 'donation-form',
  title: 'DONATE TODAY!',
  image: {
    src: '/images/donate-icon.png',
    alt: 'Donate',
    width: 200,
    height: 200,
  },
  description: 'Illinois Conservatory for the Arts is a 501c3 not-for-profit arts institution. Your support helps us continue our mission.',
  script: {
    type: 'script',
    content: `
      // Example: Third-party donation widget script
      (function() {
        // Your third-party script code here
        console.log('Donation widget loaded');
      })();
    `,
  },
};

/**
 * Example 4: Popup with iframe (Embedded Form)
 */
export const iframePopupExample: PopupData = {
  id: 'contact-form',
  title: 'Contact Us',
  description: 'Have questions? Fill out the form below and we\'ll get back to you soon.',
  script: {
    type: 'iframe',
    content: 'https://forms.example.com/contact',
    width: '100%',
    height: '700px',
    allowFullScreen: false,
    sandbox: 'allow-same-origin allow-scripts allow-forms',
  },
};

/**
 * Example 5: Simple Popup without Script
 */
export const simplePopupExample: PopupData = {
  id: 'announcement',
  title: 'Important Announcement',
  image: {
    src: '/images/announcement.png',
    alt: 'Announcement',
    width: 300,
    height: 200,
  },
  description: 'We are excited to announce our new programs starting this fall semester.',
};

/**
 * Helper function to get popup by ID
 * You can extend this to fetch from an API or database
 */
export function getPopupById(id: string): PopupData | null {
  const popups: PopupData[] = [
    fullPopupExample,
    minimalPopupExample,
    scriptPopupExample,
    iframePopupExample,
    simplePopupExample,
  ];

  return popups.find(popup => popup.id === id) || null;
}

