'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import FocusLock from 'react-focus-lock';
import styles from './HeroPopup.module.css';
import type { PopupData } from '@/app/types/popup';
import { isMinimalPopup, isSchoolPopup } from '@/app/types/popup';

// Dynamic import for DOMPurify (browser-only library)
let DOMPurify: any;
if (typeof window !== 'undefined') {
  DOMPurify = require('dompurify');
}

interface UniversalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: PopupData;
  popupId?: string; // Optional custom ID for accessibility
  onRetry?: () => void; // Optional custom retry handler
  retryButtonText?: string; // Optional custom retry button text
  contactEmail?: string; // Optional contact email
  contactPhone?: string; // Optional contact phone
}

// Helper function to sanitize HTML content to prevent XSS attacks
const sanitizeHtml = (html: string): string => {
  if (typeof window === 'undefined' || !DOMPurify) {
    console.warn('DOMPurify not available, returning empty string for security');
    return '';
  }
  
  // Configure DOMPurify to allow iframes and external scripts (with src only)
  // but sanitize all other potentially dangerous content
  const config = {
    ALLOWED_TAGS: ['iframe', 'script', 'div', 'span', 'p', 'br', 'strong', 'em', 'b', 'i', 'u'],
    ALLOWED_ATTR: [
      'id', 'class', 'src', 'width', 'height', 'frameborder', 'allowfullscreen',
      'scrolling', 'marginwidth', 'marginheight', 'onload', 'onLoad', 'overflow',
      'title', 'name', 'sandbox', 'loading', 'referrerpolicy', 'allow',
      'type', 'async', 'defer', 'crossorigin' // Script-specific attributes
    ],
    ALLOW_DATA_ATTR: true, // Allow data-* attributes (needed for scripts like Ontraport)
    // Allow iframes and scripts from trusted domains (you can customize this)
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // IMPORTANT: DOMPurify will strip inline script content automatically
    // Only scripts with src attribute will be preserved, which is what we want
  };
  
  let sanitized = DOMPurify.sanitize(html, config);
  
  // Additional security: Remove any script tags without src attribute (inline scripts)
  // This prevents XSS from inline script content
  if (typeof window !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitized;
    const scripts = tempDiv.querySelectorAll('script:not([src])');
    scripts.forEach(script => script.remove());
    sanitized = tempDiv.innerHTML;
  }
  
  return sanitized;
};

// Declarative Iframe Component
function PopupIframe({
  src,
  width = '100%',
  height = '500px',
  title,
  allowFullScreen,
  sandbox,
  onLoad,
  onError,
  style,
}: {
  src: string;
  width?: string;
  height?: string;
  title?: string;
  allowFullScreen?: boolean;
  sandbox?: string;
  onLoad?: () => void;
  onError?: (error?: string) => void;
  style?: React.CSSProperties;
}) {
  // Note: We don't pre-check URLs with HEAD requests because:
  // 1. CORS blocks most cross-domain checks, making them unreliable
  // 2. iframe.onload and iframe.onerror handlers are more reliable
  // 3. Pre-checking adds unnecessary delay and complexity
  // The iframe will handle errors naturally through its onerror handler
  // The parent UniversalPopup component has a timeout as a safety net for error detection

  const handleIframeError = () => {
    if (onError) {
      // Don't attempt fetch - CORS will block it for cross-domain URLs
      // The timeout in the parent component is the more reliable error-detection mechanism
      onError('Failed to load form. This may be due to a network error or the form is temporarily unavailable.');
    }
  };

  return (
    <iframe
      src={src}
      width={width}
      height={height}
      title={title || 'Popup content'}
      allowFullScreen={allowFullScreen}
      sandbox={sandbox}
      onLoad={onLoad}
      onError={handleIframeError}
      style={{ border: 'none', ...style }}
      loading="lazy"
    />
  );
}

// Custom Script Loader Component for scripts with data attributes
// This creates a real DOM script tag (not Next.js Script) so data attributes work properly
function PopupScriptLoader({
  script,
  onLoad,
  onError,
}: {
  script: PopupData['script'];
  onLoad?: () => void;
  onError?: (error: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoadedRef = useRef(false);
  const scriptSrcRef = useRef<string | null>(null); // Track which script is loaded
  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);

  // Keep callbacks in refs to avoid stale closures
  useEffect(() => {
    onLoadRef.current = onLoad;
    onErrorRef.current = onError;
  }, [onLoad, onError]);

  useEffect(() => {
    if (!script || !containerRef.current) return;

    const { content, type, ...rest } = script;

    // Prevent duplicate script loading - check if this script is already loaded
    if (scriptSrcRef.current === content && scriptRef.current && scriptRef.current.parentNode) {
      // Script already loaded, don't load again
      return;
    }

    // Also check if form already exists in container (prevent duplicate forms)
    const existingForms = containerRef.current.querySelectorAll('[class*="opf"], [id*="opf"], [class*="ontraport"]');
    if (existingForms.length > 0 && scriptSrcRef.current === content) {
      // Form already exists for this script, don't load again
      return;
    }

    // Clean up any existing script first
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Clear any existing timeout
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    hasLoadedRef.current = false;
    scriptSrcRef.current = content;

    // Validate content is a URL
    if (!content || typeof content !== 'string') {
      if (onErrorRef.current) {
        onErrorRef.current('Invalid script configuration: "content" must be a URL.');
            }
            return;
          }

    // Create a real script element (not Next.js Script component)
    // This is necessary for scripts like Ontraport that need data attributes
    const scriptElement = document.createElement('script');
    scriptElement.src = content;
    scriptElement.async = true;

    // Copy all attributes from the script config
    Object.keys(rest).forEach((key) => {
      const value = rest[key];
      if (value !== undefined) {
        if (typeof value === 'boolean') {
          // For boolean attributes like 'async', set the property
          if (value) {
            scriptElement.setAttribute(key, '');
          }
        } else {
          // For string attributes like data-*, set the attribute
          scriptElement.setAttribute(key, String(value));
        }
      }
    });

    // Handle script load
    scriptElement.onload = () => {
      hasLoadedRef.current = true;
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      if (onLoadRef.current) {
        onLoadRef.current();
      }
    };

    // Handle script error
    scriptElement.onerror = (err) => {
      hasLoadedRef.current = true; // Mark as "handled" to prevent fallback
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      console.error("SCRIPT ONERROR EVENT FIRED. This means the browser blocked the request.", content, err);
      if (onErrorRef.current) {
        onErrorRef.current(`Failed to load script: ${content}`);
      }
    };

    // Fallback: For "fire and forget" scripts that don't fire onload
    // Call onLoad after a short delay to ensure UI updates
    // This is especially important for marketing scripts like Ontraport
    fallbackTimeoutRef.current = setTimeout(() => {
      // Only call onLoad if script hasn't errored and hasn't already loaded
      if (!hasLoadedRef.current && scriptRef.current && scriptRef.current.parentNode && onLoadRef.current) {
        hasLoadedRef.current = true;
        console.log('Script fallback: Assuming script loaded successfully (fire-and-forget script)');
        onLoadRef.current();
      }
      fallbackTimeoutRef.current = null;
    }, 2000); // 2 second fallback

    // For Ontraport scripts with embed=true, they render inline near the script tag
    // Place the script inside our container so the form renders there
    if (containerRef.current) {
      containerRef.current.appendChild(scriptElement);
      scriptRef.current = scriptElement;
                  } else {
      // Fallback: append to body if container not ready
      document.body.appendChild(scriptElement);
      scriptRef.current = scriptElement;
      
      // Try to move form to container once it renders
      setTimeout(() => {
        if (containerRef.current) {
          const formElements = document.querySelectorAll('[class*="opf"], [id*="opf"], [class*="ontraport"]');
          formElements.forEach((el) => {
            if (el.parentElement === document.body) {
              containerRef.current?.appendChild(el);
            }
          });
        }
      }, 1000);
    }

    // Cleanup: remove script and clear timeout when component unmounts or script changes
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
      scriptSrcRef.current = null;
    };
  }, [script?.content]); // Only depend on script.content, not the whole script object or callbacks

  // Return a container div where the script will be placed
  // The script will render its content (like forms) into this container or nearby
  return (
    <div
      ref={containerRef}
      className={styles.heroPopupScript}
      style={{ minHeight: '200px' }}
    />
  );
}

// Declarative HTML Content Component
function PopupHtmlContent({
  html,
  onLoad,
  onError,
}: {
  html: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

  // Sanitize HTML on mount/update
  useEffect(() => {
    if (!html) {
      setSanitizedHtml('');
      return;
    }

    // Sanitize HTML
    const clean = sanitizeHtml(html);
    setSanitizedHtml(clean);
  }, [html]);

  // Process HTML and attach event handlers after DOM is updated
  useEffect(() => {
    if (!containerRef.current || !sanitizedHtml) return;

    // Use setTimeout to ensure DOM is fully updated after dangerouslySetInnerHTML
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return;

      const iframes = containerRef.current.querySelectorAll('iframe');
      const scripts = containerRef.current.querySelectorAll('script[src]');

      // We don't wait for iframes anymore (they can fire onload even when blocked).
      // We only call onLoad if there are scripts but no iframes.
      // For iframes, the parent component's timeout will handle error detection.

      // Handle iframe loads (we DO NOT wait for them)
      // Note: We removed the iframe.onload handler because when an iframe is blocked
      // (e.g., X-Frame-Options), the browser still fires onload with an error page.
      // This would incorrectly signal "success" and prevent our custom error from showing.
      // Instead, we let the parent component's 10-second timeout handle error detection.
      iframes.forEach((iframe) => {
        // Preserve existing onLoad attribute (e.g., window.scrollTo) but don't wait for onload event
        const existingOnLoad = iframe.getAttribute('onLoad') || iframe.getAttribute('onload');
        
        // Execute existing onLoad code immediately if it's just window.scrollTo
        // (This is safe to execute immediately)
        if (existingOnLoad && existingOnLoad.includes('window.scrollTo')) {
          try {
            window.scrollTo(0, 0);
          } catch (err) {
            console.warn('Error executing iframe onLoad handler:', err);
          }
        }
        
        // We REMOVED the iframe.onload handler.
        // This forces the parent component's 10-second timeout to be the
        // only "success" signal, which will fail (as intended) when iframe is blocked.
        
        iframe.onerror = () => {
          if (onError) {
            // Don't attempt fetch - CORS will block it for cross-domain URLs
            // The timeout in the parent component is the more reliable error-detection mechanism
            onError(`Failed to load iframe: ${iframe.src}`);
          }
        };
      });

      // Handle script loads (fire and forget)
      scripts.forEach((scriptEl) => {
        const script = document.createElement('script');
        script.src = scriptEl.getAttribute('src') || '';
        script.type = scriptEl.getAttribute('type') || 'text/javascript';
        
        // Copy attributes
        Array.from(scriptEl.attributes).forEach(attr => {
          if (attr.name !== 'src' && attr.name !== 'type') {
            script.setAttribute(attr.name, attr.value);
          }
        });
        
        // DO NOT wait for onload. Just report errors.
        script.onerror = (err) => {
          // Log error for debugging - this means the browser blocked the request
          console.error("SCRIPT ONERROR EVENT FIRED. This means the browser blocked the request.", script.src, err);
          
          if (onError) {
            onError(`Failed to load script: ${script.src}`);
          }
        };

        scriptEl.parentNode?.replaceChild(script, scriptEl);
      });

      // If there are scripts but no iframes, call onLoad immediately.
      // If there are iframes, we do NOT call onLoad (let timeout handle errors).
      // This prevents false "success" signals when iframes are blocked.
      if (iframes.length === 0 && scripts.length > 0) {
        if (onLoad) {
          onLoad();
        }
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [sanitizedHtml, onLoad, onError]);

  if (!sanitizedHtml) return null;

  return (
    <div
      ref={containerRef}
      className={styles.heroPopupScript}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default function UniversalPopup({
  isOpen,
  onClose,
  data,
  popupId,
  onRetry,
  retryButtonText,
  contactEmail,
  contactPhone,
}: UniversalPopupProps) {
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [scriptErrorMessage, setScriptErrorMessage] = useState<string | null>(null);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const minTimeRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    try {
      if (isOpen) {
        document.body.classList.add('popup-open');
              } else {
        document.body.classList.remove('popup-open');
      }
    } catch (error) {
      console.error('Error managing body scroll class:', error);
    }

    return () => {
      try {
        if (typeof document !== 'undefined') {
          document.body.classList.remove('popup-open');
        }
      } catch (error) {
        // Silently fail during cleanup
      }
    };
  }, [isOpen]);

  // Handle keyboard escape
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        try {
          onClose();
            } catch (error) {
          console.error('Error closing popup:', error);
        }
      }
    };

    if (isOpen) {
      try {
        document.addEventListener('keydown', handleEscape);
      } catch (error) {
        console.error('Error adding escape key listener:', error);
      }
    }

    return () => {
      try {
        if (typeof document !== 'undefined') {
          document.removeEventListener('keydown', handleEscape);
        }
      } catch (error) {
        // Silently fail during cleanup
      }
    };
  }, [isOpen, onClose]);

  // Reset state when popup opens/closes
  useEffect(() => {
    // Clear any lingering timers on open/close
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
    if (minTimeRef.current) {
      clearTimeout(minTimeRef.current);
      minTimeRef.current = null;
    }

    if (!isOpen) {
      // Reset states on close
      setScriptError(false);
              setScriptLoading(false);
      setScriptErrorMessage(null);
      setIsMinTimeElapsed(false);
    } else if (data?.script) {
      // Start loading when popup opens
    setScriptLoading(true);
              setScriptError(false);
              setScriptErrorMessage(null);
      setIsMinTimeElapsed(false);

      // Set 10-second request timeout for the script
    timeoutRef.current = setTimeout(() => {
        handleScriptError('Request timeout. The form is taking too long to load. Please try again.');
    }, 10000);

      // Set 3-second minimum load time
      minTimeRef.current = setTimeout(() => {
        setIsMinTimeElapsed(true);
      }, 3000); // 3 seconds
    }

    return () => {
      // Cleanup all timers on unmount or re-run
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
      if (minTimeRef.current) {
        clearTimeout(minTimeRef.current);
        minTimeRef.current = null;
                  }
    };
  }, [isOpen, data?.script]);

  // Validate script content on mount (must be before early returns)
  useEffect(() => {
    if (isOpen && data?.script) {
      if (!data.script.content || typeof data.script.content !== 'string') {
            setScriptError(true);
            setScriptLoading(false);
        setScriptErrorMessage('Invalid script configuration. Please contact support.');
            }
          }
  }, [isOpen, data?.script]);

  // Handle script load success
  const handleScriptLoad = () => {
        setScriptLoading(false);
                setScriptError(false);
                setScriptErrorMessage(null);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
                }
              };
              
  // Handle script load error
  const handleScriptError = (error?: string) => {
                  setScriptLoading(false);
                  setScriptError(true);
    setScriptErrorMessage(error || 'Failed to load form. Please try again.');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

  // Default retry handler
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
              } else {
      // Default: reload page
    if (typeof window !== 'undefined') {
      window.location.reload();
      }
                }
              };
              
  // Get retry button text
  const getRetryButtonText = (): string => {
    return retryButtonText || 'Try Again';
  };
            
  // Define what to show based on both script state AND min time
  const showLoader = scriptLoading || !isMinTimeElapsed;
  const showError = !scriptLoading && isMinTimeElapsed && scriptError;
  const showContent = !scriptLoading && isMinTimeElapsed && !scriptError;

  // Early returns must come AFTER all hooks
  if (!isOpen) return null;

  // Validate data has required fields
  if (!data || !data.id) {
    console.error('Popup data is invalid:', data);
    return null;
  }

  const uniqueId = popupId || `popup-${data.id || 'unknown'}`;
  const titleId = `${uniqueId}-title`;

  // Determine if this is a minimal popup using type helper
  const isMinimal = isMinimalPopup(data);
  const isSchool = isSchoolPopup(data);

  // Render script content declaratively
  const renderScriptContent = () => {
    if (!data.script) return null;

    const { script } = data;

    // Validate script content
    if (!script.content || typeof script.content !== 'string') {
      return null; // Error already handled in useEffect
    }

    if (script.type === 'iframe') {
      return (
        <PopupIframe
          src={script.content}
          width={script.width || '100%'}
          height={script.height || '500px'}
          title={data.title || 'Popup content'}
          allowFullScreen={script.allowFullScreen}
          sandbox={script.sandbox}
          onLoad={handleScriptLoad}
          onError={(error) => handleScriptError(error || 'Failed to load form. Please check your connection and try again.')}
          style={{ display: scriptLoading || scriptError ? 'none' : 'block' }}
        />
      );
    }

    if (script.type === 'script') {
      // For scripts that need data attributes (like Ontraport), we need to use a custom loader
      // because Next.js Script component doesn't properly handle data-* attributes
      return (
        <PopupScriptLoader
          script={script}
          onLoad={handleScriptLoad}
          onError={(error) => handleScriptError(error)}
        />
      );
    }

    if (script.type === 'html') {
      return (
        <PopupHtmlContent
          html={script.content}
          onLoad={handleScriptLoad}
          onError={(error) => handleScriptError(error)}
        />
      );
    }

    return null;
  };

  return (
    <div
      className={`${styles.heroPopupModal} ${isOpen ? styles.active : ''} ${isSchool ? styles.schoolPopup : ''}`}
      id={uniqueId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-hidden={!isOpen}
    >
      <div className={styles.heroPopupOverlay} onClick={onClose} />
      <FocusLock disabled={!isOpen} returnFocus={true}>
      <div className={`${styles.heroPopupContent} ${isSchool ? styles.schoolPopupContent : ''}`}>
        {/* Close Button - Always positioned absolutely */}
        {data.image && (
        <button
          className={styles.heroPopupClose}
          onClick={onClose}
          aria-label={`Close ${data.title} popup`}
          type="button"
        >
          <svg className={styles.promoCloseIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        )}

        {/* Images Container */}
        {data.image && (
          (Array.isArray(data.image) && data.image.length === 2) ? (
            /* Two Images Layout - 50/50 */
            <div className={styles.heroPopupImagesContainer} style={{ justifyContent: 'flex-start' }}>
              {/* First Image - 50% */}
              {data.image[0]?.src && (
                <div className={styles.heroPopupImage} style={{ width: '50%', maxWidth: '160px', justifyContent: 'flex-start' }}>
                  <Image
                    src={data.image[0].src}
                    alt={data.image[0].alt || 'Popup image 1'}
                    width={160}
                    height={data.image[0].height || 200}
                    className={styles.popupImage}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.parentElement) {
                        target.parentElement.style.display = 'none';
                      }
                      if (process.env.NODE_ENV === 'development') {
                        console.error('Failed to load popup image 1:', data.image && Array.isArray(data.image) ? data.image[0]?.src : '');
                      }
                    }}
                  />
                </div>
              )}
              {/* Second Image - 50% */}
              {data.image[1]?.src && (
                <div className={styles.heroPopupImage} style={{ width: '50%', maxWidth: '120px', justifyContent: 'flex-start' }}>
                  <Image
                    src={data.image[1].src}
                    alt={data.image[1].alt || 'Popup image 2'}
                    width={120}
                    height={data.image[1].height || 200}
                    className={styles.popupImage}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.parentElement) {
                        target.parentElement.style.display = 'none';
                      }
                      if (process.env.NODE_ENV === 'development') {
                        console.error('Failed to load popup image 2:', data.image && Array.isArray(data.image) ? data.image[1]?.src : '');
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Single Image Layout - 100% */
            !Array.isArray(data.image) && data.image && 'src' in data.image && data.image.src && (
              <div className={styles.heroPopupImage} style={{ width: '100%', maxWidth: '250px', margin: '0 auto', justifyContent: 'center' }}>
              <Image
                src={data.image.src}
                alt={data.image.alt || 'Popup image'}
                  width={200}
                height={data.image.height || 200}
                className={styles.popupImage}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.parentElement) {
                    target.parentElement.style.display = 'none';
                  }
                  if (process.env.NODE_ENV === 'development') {
                      const imageSrc = !Array.isArray(data.image) && data.image && 'src' in data.image ? data.image.src : '';
                      console.error('Failed to load popup image:', imageSrc);
                  }
                }}
              />
            </div>
            )
          )
        )}

        {/* Close button for popups without images */}
        {!data.image && (
          <button
            className={styles.heroPopupClose}
            onClick={onClose}
            aria-label={`Close ${data.title} popup`}
            type="button"
          >
            <svg className={styles.promoCloseIcon} viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Header Section */}
        <div className={styles.heroPopupTop}>

          {/* Title and Descriptions */}
          <div className={styles.heroPopupHeader}>
            {/* Date - appears above title for full popups */}
            {!isMinimal && 'date' in data && data.date && (
              <p className={`${styles.heroPopupDate} ${isSchool ? styles.schoolPopupDate : ''}`}>{data.date}</p>
            )}
            
            {/* For school popup: description1 appears above title */}
            {!isMinimal && isSchool && 'description1' in data && data.description1 && (
              <p className={`${styles.heroPopupSubtitle} ${styles.schoolPopupDescription1}`}>{data.description1}</p>
            )}
            
            <h2 id={titleId} className={`${styles.heroPopupTitle} ${isSchool ? styles.schoolPopupTitle : ''}`}>
              {data.title || 'Popup'}
            </h2>

            {/* For minimal popup: single description */}
            {isMinimal && 'description' in data && data.description && (
              <p className={`${styles.heroPopupSubtitle} ${isSchool ? styles.schoolPopupSubtitle : ''}`}>{data.description}</p>
            )}

            {/* For full popup: description1 (if not school) and description2 */}
            {!isMinimal && (
              <>
                {/* description1 for non-school popups appears here */}
                {!isSchool && 'description1' in data && data.description1 && (
                  <p className={`${styles.heroPopupSubtitle} ${styles.schoolPopupDescription1}`}>{data.description1}</p>
                )}
                {'description2' in data && data.description2 && (
                  <p className={`${styles.heroPopupSubtitle} ${isSchool ? styles.schoolPopupSubtitle : ''}`}>{data.description2}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Script/Content Area */}
        {data.script && (
          <div className={styles.heroPopupContentArea}>
              {/* 1. Loader: Show if loading OR min time not elapsed */}
              <div
                className={styles.scriptLoadingContainer}
                style={{
                  opacity: showLoader ? 1 : 0,
                  visibility: showLoader ? 'visible' : 'hidden',
                  transition: 'opacity 0.3s ease, visibility 0.3s ease',
                  // Ensure it's on top while visible
                  position: showLoader ? 'relative' : 'absolute',
                  width: '100%',
                  zIndex: 10,
                  pointerEvents: showLoader ? 'auto' : 'none',
                }}
                aria-hidden={!showLoader}
              >
                <div className={styles.scriptLoadingSpinner}></div>
                <p className={styles.scriptLoadingText}>Loading form...</p>
              </div>

              {/* 2. Error: Show only after loading/error AND min time elapsed */}
              {showError && (
                <div
                  className={styles.scriptErrorContainer}
                  style={{
                    opacity: showError ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.3s', // Fade in after loader fades
                  }}
                >
                  <h3 className={styles.scriptErrorTitle}>Something Went Wrong</h3>
                <p className={styles.scriptErrorMessage}>
                    {scriptErrorMessage || 'The form took too long to respond. Please try again.'}
                </p>
                <button
                  onClick={handleRetry}
                  className={styles.scriptRetryButton}
                  type="button"
                    aria-label={getRetryButtonText()}
                >
                    {getRetryButtonText()}
                </button>
                  {(contactEmail || contactPhone) && (
                <div className={styles.scriptContactInfo}>
                  <p className={styles.scriptContactText}>Or contact us directly:</p>
                  <div className={styles.scriptContactLinks}>
                        {contactEmail && (
                    <a
                            href={`mailto:${contactEmail}`}
                      className={styles.scriptContactLink}
                            aria-label={`Email us at ${contactEmail}`}
                    >
                            Email: {contactEmail}
                    </a>
                        )}
                        {contactPhone && (
                    <a
                            href={`tel:${contactPhone}`}
                      className={styles.scriptContactLink}
                            aria-label={`Call us at ${contactPhone}`}
                    >
                            Phone: {contactPhone}
                    </a>
                        )}
                  </div>
                </div>
                  )}
                  </div>
                )}

              {/* 3. Content: Show only after success AND min time elapsed */}
                <div
                  className={styles.heroPopupScript}
                style={{
                  opacity: showContent ? 1 : 0,
                  visibility: showContent ? 'visible' : 'hidden',
                  transition: 'opacity 0.3s ease 0.3s', // Fade in after loader fades
                }}
                aria-hidden={!showContent}
              >
                {renderScriptContent()}
              </div>
          </div>
        )}
      </div>
      </FocusLock>
    </div>
  );
}

