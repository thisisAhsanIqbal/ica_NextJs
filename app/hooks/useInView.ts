// hooks/useInView.ts

'use client';

import { useState, useEffect, useRef, useLayoutEffect, RefObject } from 'react';

// A simple, reusable hook for IntersectionObserver-based animations
export function useInView(options: IntersectionObserverInit = { threshold: 0.1 }) {
  // Start with false - will be set to true if already visible or when scrolled into view
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasChecked = useRef(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;
    if (hasChecked.current) return;

    hasChecked.current = true;

    // Function to check if element is in viewport
    const checkIfInView = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      // Check if element is visible in viewport (with margin)
      const margin = 200; // Margin to trigger earlier
      const isInView = (
        rect.top < windowHeight + margin &&
        rect.bottom > -margin &&
        rect.left < windowWidth + margin &&
        rect.right > -margin
      );
      
      return isInView;
    };

    // Check immediately - if already in viewport, show immediately (no animation)
    const isInitiallyVisible = checkIfInView();
    
    if (isInitiallyVisible) {
      // Element is already visible, show immediately without animation
      setInView(true);
      return; // No need to set up observer
    }

    // Element is below the fold - will animate when scrolled into view
    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: show content after a short delay
      setTimeout(() => setInView(true), 200);
      return;
    }

    let hasTriggered = false;

    const triggerAnimation = () => {
      if (!hasTriggered) {
        hasTriggered = true;
        setInView(true); // This will trigger the CSS transition
      }
    };

    // Set up IntersectionObserver for scroll-triggered animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation(); // This triggers the fade-in animation
          observer.unobserve(element);
        }
      },
      options
    );

    observer.observe(element);

    // Fallback: show content after 1 second if observer hasn't triggered
    // This ensures content is never permanently hidden
    const fallbackTimer = setTimeout(() => {
      triggerAnimation();
    }, 1000);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return { ref: ref as RefObject<HTMLElement>, inView };
}
