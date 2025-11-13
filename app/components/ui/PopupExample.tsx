'use client';

/**
 * Example Component: How to Use Universal Popup
 * 
 * This is a demonstration component showing how to use the popup system.
 * You can copy this pattern to any component in your app.
 */

import { usePopup } from '@/app/contexts/PopupContext';
import type { PopupData } from '@/app/types/popup';

export default function PopupExample() {
  const { openPopup } = usePopup();

  // Example 1: Full Popup
  const openFullPopup = () => {
    const popupData: PopupData = {
      id: 'event-announcement',
      image: {
        src: '/images/event-banner.jpg', // Replace with your image path
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
        content: 'https://example.com/event-registration-form', // Replace with your form URL
        width: '100%',
        height: '600px',
        allowFullScreen: false,
      },
    };
    openPopup(popupData);
  };

  // Example 2: Minimal Popup
  const openMinimalPopup = () => {
    const popupData: PopupData = {
      id: 'newsletter-signup',
      title: 'Stay Connected with ICA!',
      image: {
        src: '/images/newsletter-icon.png', // Replace with your image path
        alt: 'Newsletter',
        width: 150,
        height: 150,
      },
      description: 'Sign up for our newsletter to receive updates about events, programs, and opportunities.',
      script: {
        type: 'html',
        content: `
          <form class="newsletter-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              style="padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
            />
            <button 
              type="submit"
              style="padding: 0.75rem; background: var(--ica-teal); color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              Subscribe
            </button>
          </form>
        `,
      },
    };
    openPopup(popupData);
  };

  // Example 3: Popup with iframe (Third-party form)
  const openIframePopup = () => {
    const popupData: PopupData = {
      id: 'donation-form',
      title: 'DONATE TODAY!',
      image: {
        src: '/images/donate-icon.png', // Replace with your image path
        alt: 'Donate',
        width: 200,
        height: 200,
      },
      description: 'Illinois Conservatory for the Arts is a 501c3 not-for-profit arts institution. Your support helps us continue our mission.',
      script: {
        type: 'iframe',
        content: 'https://example.com/donation-form', // Replace with your donation form URL
        width: '100%',
        height: '700px',
        allowFullScreen: false,
      },
    };
    openPopup(popupData);
  };

  // Example 4: Simple Popup without Script
  const openSimplePopup = () => {
    const popupData: PopupData = {
      id: 'announcement',
      title: 'Important Announcement',
      image: {
        src: '/images/announcement.png', // Replace with your image path
        alt: 'Announcement',
        width: 300,
        height: 200,
      },
      description: 'We are excited to announce our new programs starting this fall semester.',
    };
    openPopup(popupData);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Popup Examples</h2>
      <button onClick={openFullPopup} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
        Open Full Popup (with date, 2 descriptions)
      </button>
      <button onClick={openMinimalPopup} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
        Open Minimal Popup (title, image, description, script)
      </button>
      <button onClick={openIframePopup} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
        Open Iframe Popup (donation form)
      </button>
      <button onClick={openSimplePopup} style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
        Open Simple Popup (no script)
      </button>
    </div>
  );
}

