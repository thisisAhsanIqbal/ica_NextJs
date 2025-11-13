'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './HeroPopup.module.css';
import type { PopupData } from '@/app/types/popup';

interface UniversalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: PopupData;
  popupId?: string; // Optional custom ID for accessibility
}

export default function UniversalPopup({
  isOpen,
  onClose,
  data,
  popupId,
}: UniversalPopupProps) {
  const scriptContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [scriptError, setScriptError] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptErrorMessage, setScriptErrorMessage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Reset error state when popup opens/closes
  useEffect(() => {
    if (!isOpen) {
      setScriptError(false);
      setScriptLoading(false);
      setScriptErrorMessage(null);
      scriptLoadedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isOpen]);

  // Handle script/iframe rendering
  useEffect(() => {
    if (!isOpen || !data.script || !scriptContainerRef.current || scriptLoadedRef.current) {
      return;
    }

    const container = scriptContainerRef.current;
    const { script } = data;

    // Validate script content exists
    if (!script.content || typeof script.content !== 'string') {
      console.error('Popup script content is invalid:', script);
      setScriptError(true);
      setScriptErrorMessage('Invalid script configuration. Please contact support.');
      return;
    }

    setScriptLoading(true);
    setScriptError(false);
    setScriptErrorMessage(null);

    // Set timeout to detect if script doesn't load within 10 seconds
    timeoutRef.current = setTimeout(() => {
      if (scriptLoadedRef.current === false) {
        console.error('Script loading timeout');
        setScriptError(true);
        setScriptLoading(false);
        setScriptErrorMessage('Request timeout. The form is taking too long to load. Please try again.');
      }
    }, 10000);

    const loadScript = async () => {
      try {
        // Clear any existing content
        container.innerHTML = '';

        if (script.type === 'iframe') {
          // Validate iframe URL
          if (!script.content.trim()) {
            console.error('Popup iframe URL is empty');
            setScriptError(true);
            setScriptLoading(false);
            setScriptErrorMessage('Invalid form URL. Please contact support.');
            scriptLoadedRef.current = false;
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            return;
          }

          try {
            // Check URL accessibility BEFORE creating iframe to catch 4xx/5xx errors
            const checkUrlBeforeLoad = async () => {
              try {
                const response = await fetch(script.content, { 
                  method: 'HEAD',
                  // Don't use no-cors here - we need to read the status
                });
                
                // Check for HTTP errors
                if (response.status >= 400 && response.status < 500) {
                  setScriptError(true);
                  setScriptLoading(false);
                  setScriptErrorMessage(`Client Error (${response.status}): The donation form is not available. Please contact support.`);
                  scriptLoadedRef.current = false;
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                  return false; // Don't create iframe
                } else if (response.status >= 500) {
                  setScriptError(true);
                  setScriptLoading(false);
                  setScriptErrorMessage(`Server Error (${response.status}): The donation service is experiencing issues. Please try again later.`);
                  scriptLoadedRef.current = false;
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                  return false; // Don't create iframe
                }
                return true; // URL is accessible
              } catch (fetchError: any) {
                // CORS error or network error
                // If it's a CORS error, we can't determine the status, so proceed with iframe
                // The iframe's onerror or timeout will catch it
                if (fetchError.name === 'TypeError' && fetchError.message.includes('CORS')) {
                  console.warn('CORS blocked URL check, proceeding with iframe load');
                  return true; // Proceed - let iframe handle it
                }
                // Network error - show generic message but still try iframe
                console.error('Network error checking URL:', fetchError);
                return true; // Proceed - let iframe handle it
              }
            };

            // Check URL first
            const shouldProceed = await checkUrlBeforeLoad();
            if (!shouldProceed) {
              return; // Error already set, don't create iframe
            }

            // Create iframe only if URL check passed
            const iframe = document.createElement('iframe');
            iframe.src = script.content;
            iframe.style.width = script.width || '100%';
            iframe.style.height = script.height || '500px';
            iframe.style.border = 'none';
            iframe.setAttribute('title', data.title || 'Popup content');
            iframe.setAttribute('loading', 'lazy');
            
            // Handle iframe load success
            iframe.onload = () => {
              // Check if iframe loaded successfully
              // Note: Due to CORS, we can't directly check iframe content for error pages
              // But if onload fires, assume it loaded (even if it's an error page)
              // The timeout will catch cases where content doesn't render properly
              setScriptLoading(false);
              setScriptError(false);
              setScriptErrorMessage(null);
              scriptLoadedRef.current = true;
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            };
            
            // Handle iframe load errors
            iframe.onerror = () => {
              console.error('Failed to load iframe:', script.content);
              
              // Try to detect HTTP error by checking URL (may be blocked by CORS)
              fetch(script.content, { method: 'HEAD' })
                .then(response => {
                  if (response.status >= 400 && response.status < 500) {
                    setScriptErrorMessage(`Client Error (${response.status}): The donation form is not available. Please contact support.`);
                  } else if (response.status >= 500) {
                    setScriptErrorMessage(`Server Error (${response.status}): The donation service is experiencing issues. Please try again later.`);
                  } else {
                    setScriptErrorMessage('Failed to load donation form. This may be due to a network error or the form is temporarily unavailable.');
                  }
                })
                .catch(() => {
                  // CORS or network error - can't determine exact status
                  setScriptErrorMessage('Failed to load donation form. This may be due to a network error or the form is temporarily unavailable.');
                });
              
              setScriptError(true);
              setScriptLoading(false);
              scriptLoadedRef.current = false;
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            };
            
            // Additional error handling for cross-origin iframes
            // Some iframes may not trigger onerror, so we rely on timeout
            iframe.addEventListener('error', () => {
              console.error('Iframe error event triggered');
              
              // Try to detect HTTP error
              fetch(script.content, { method: 'HEAD' })
                .then(response => {
                  if (response.status >= 400 && response.status < 500) {
                    setScriptErrorMessage(`Client Error (${response.status}): The donation form is not available. Please contact support.`);
                  } else if (response.status >= 500) {
                    setScriptErrorMessage(`Server Error (${response.status}): The donation service is experiencing issues. Please try again later.`);
                  } else {
                    setScriptErrorMessage('Error loading form. Please check your connection and try again.');
                  }
                })
                .catch(() => {
                  setScriptErrorMessage('Error loading form. Please check your connection and try again.');
                });
              
              setScriptError(true);
              setScriptLoading(false);
              scriptLoadedRef.current = false;
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            });

            if (script.allowFullScreen) {
              iframe.setAttribute('allowfullscreen', 'true');
            }
            
            if (script.sandbox) {
              iframe.setAttribute('sandbox', script.sandbox);
            }

            container.appendChild(iframe);
            
            // Try to detect HTTP errors by checking URL accessibility
            // Note: Due to CORS, we can't always detect 4xx/5xx for iframes, but we'll try
            fetch(script.content, { method: 'HEAD', mode: 'no-cors' })
              .catch(() => {
                // If fetch fails, it might be a network issue
                // We'll let the iframe try to load anyway and rely on onerror/timeout
              });
          } catch (error) {
            console.error('Error creating iframe:', error);
            setScriptError(true);
            setScriptLoading(false);
            setScriptErrorMessage('Unable to initialize donation form. Please try again later.');
            scriptLoadedRef.current = false;
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        } else if (script.type === 'script') {
          // Handle script tag - can be inline code or full script tag HTML
          // If content starts with '<script', it's a full script tag HTML
          if (script.content.trim().startsWith('<script')) {
            // Parse the script tag to extract attributes
            const scriptMatch = script.content.match(/<script\s+([^>]*)>/i);
            
            if (scriptMatch) {
              // Create script element manually (innerHTML doesn't execute scripts)
              const scriptElement = document.createElement('script');
              
              // Parse attributes from the script tag
              const attrs = scriptMatch[1];
              
              // Extract src
              const srcMatch = attrs.match(/src=['"]([^'"]+)['"]/i);
              if (srcMatch) {
                scriptElement.src = srcMatch[1];
              }
              
              // Extract type
              const typeMatch = attrs.match(/type=['"]([^'"]+)['"]/i);
              if (typeMatch) {
                scriptElement.type = typeMatch[1];
              } else {
                scriptElement.type = 'text/javascript';
              }
              
              // Extract async
              if (attrs.includes('async') || attrs.includes("async='true'") || attrs.includes('async="true"')) {
                scriptElement.async = true;
              }
              
              // Extract defer
              if (attrs.includes('defer') || attrs.includes("defer='true'") || attrs.includes('defer="true"')) {
                scriptElement.defer = true;
              }
              
              // Extract data attributes
              const dataAttrMatches = attrs.matchAll(/data-([^=]+)=['"]([^'"]+)['"]/gi);
              for (const match of dataAttrMatches) {
                const attrName = match[1];
                const attrValue = match[2];
                scriptElement.setAttribute(`data-${attrName}`, attrValue);
              }
              
              // Handle load and error events
              scriptElement.onload = () => {
                setScriptLoading(false);
                setScriptError(false);
                setScriptErrorMessage(null);
                scriptLoadedRef.current = true;
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              };
              
              scriptElement.onerror = () => {
                console.error('Failed to load external script:', scriptElement.src);
                
                // Try to detect HTTP error by checking URL
                fetch(scriptElement.src, { method: 'HEAD' })
                  .then(response => {
                    if (response.status >= 400 && response.status < 500) {
                      setScriptErrorMessage(`Client Error (${response.status}): The form service is not available. Please contact support.`);
                    } else if (response.status >= 500) {
                      setScriptErrorMessage(`Server Error (${response.status}): The form service is experiencing issues. Please try again later.`);
                    } else {
                      setScriptErrorMessage('Failed to load form. Please check your connection and try again.');
                    }
                  })
                  .catch(() => {
                    // CORS or network error - can't determine exact status
                    setScriptErrorMessage('Failed to load form. This may be due to a network error or the service is temporarily unavailable.');
                  });
                
                setScriptError(true);
                setScriptLoading(false);
                scriptLoadedRef.current = false;
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              };
              
              // Append to container
              container.appendChild(scriptElement);
            } else {
              // Fallback: try innerHTML if parsing fails
              container.innerHTML = script.content;
              const insertedScript = container.querySelector('script[src]');
              if (insertedScript) {
                // Clone and re-append to trigger execution
                const newScript = document.createElement('script');
                newScript.src = insertedScript.getAttribute('src') || '';
                newScript.type = insertedScript.getAttribute('type') || 'text/javascript';
                if (insertedScript.hasAttribute('async')) {
                  newScript.async = true;
                }
                // Copy all data attributes
                Array.from(insertedScript.attributes).forEach(attr => {
                  if (attr.name.startsWith('data-')) {
                    newScript.setAttribute(attr.name, attr.value);
                  }
                });
                
                newScript.onload = () => {
                  setScriptLoading(false);
                  setScriptError(false);
                  setScriptErrorMessage(null);
                  scriptLoadedRef.current = true;
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                };
                
                newScript.onerror = () => {
                  // Try to detect HTTP error
                  fetch(newScript.src, { method: 'HEAD' })
                    .then(response => {
                      if (response.status >= 400 && response.status < 500) {
                        setScriptErrorMessage(`Client Error (${response.status}): The form service is not available. Please contact support.`);
                      } else if (response.status >= 500) {
                        setScriptErrorMessage(`Server Error (${response.status}): The form service is experiencing issues. Please try again later.`);
                      } else {
                        setScriptErrorMessage('Failed to load form. Please check your connection and try again.');
                      }
                    })
                    .catch(() => {
                      setScriptErrorMessage('Failed to load form. This may be due to a network error or the service is temporarily unavailable.');
                    });
                  
                  setScriptError(true);
                  setScriptLoading(false);
                  scriptLoadedRef.current = false;
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                };
                
                container.innerHTML = '';
                container.appendChild(newScript);
              } else {
                // Inline script - assume it loaded immediately
                setScriptLoading(false);
                setScriptError(false);
                scriptLoadedRef.current = true;
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }
            }
          } else {
            // Execute inline script code
            try {
              const scriptElement = document.createElement('script');
              scriptElement.type = 'text/javascript';
              scriptElement.textContent = script.content;
              
              scriptElement.onerror = () => {
                console.error('Failed to execute inline script');
                setScriptError(true);
                setScriptLoading(false);
                setScriptErrorMessage('Failed to execute form script. Please contact support.');
                scriptLoadedRef.current = false;
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              };
              
              // For inline scripts, wait a tiny bit to ensure execution
              container.appendChild(scriptElement);
              
              // Use setTimeout to allow script to execute before hiding loader
              setTimeout(() => {
                setScriptLoading(false);
                setScriptError(false);
                setScriptErrorMessage(null);
                scriptLoadedRef.current = true;
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }, 100);
            } catch (error) {
              console.error('Error executing inline script:', error);
              setScriptError(true);
              setScriptLoading(false);
              setScriptErrorMessage('Error executing form script. Please contact support.');
              scriptLoadedRef.current = false;
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            }
          }
        } else if (script.type === 'html') {
          // Insert HTML content
          try {
            container.innerHTML = script.content;
            
            // Check if HTML contains scripts that need to load
            const scriptsInHtml = container.querySelectorAll('script[src]');
            if (scriptsInHtml.length > 0) {
              // Wait for all external scripts to load
              let loadedCount = 0;
              const totalScripts = scriptsInHtml.length;
              
              scriptsInHtml.forEach((scriptEl) => {
                const newScript = document.createElement('script');
                newScript.src = scriptEl.getAttribute('src') || '';
                newScript.type = scriptEl.getAttribute('type') || 'text/javascript';
                
                // Copy all attributes
                Array.from(scriptEl.attributes).forEach(attr => {
                  if (attr.name !== 'src' && attr.name !== 'type') {
                    newScript.setAttribute(attr.name, attr.value);
                  }
                });
                
                newScript.onload = () => {
                  loadedCount++;
                  if (loadedCount === totalScripts) {
                    setScriptLoading(false);
                    setScriptError(false);
                    setScriptErrorMessage(null);
                    scriptLoadedRef.current = true;
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                  }
                };
                
                newScript.onerror = () => {
                  console.error('Failed to load script in HTML:', newScript.src);
                  
                  // Try to detect HTTP error
                  fetch(newScript.src, { method: 'HEAD' })
                    .then(response => {
                      if (response.status >= 400 && response.status < 500) {
                        setScriptErrorMessage(`Client Error (${response.status}): The form service is not available. Please contact support.`);
                      } else if (response.status >= 500) {
                        setScriptErrorMessage(`Server Error (${response.status}): The form service is experiencing issues. Please try again later.`);
                      } else {
                        setScriptErrorMessage('Failed to load form. Please check your connection and try again.');
                      }
                    })
                    .catch(() => {
                      setScriptErrorMessage('Failed to load form. This may be due to a network error or the service is temporarily unavailable.');
                    });
                  
                  setScriptError(true);
                  setScriptLoading(false);
                  scriptLoadedRef.current = false;
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                };
                
                // Replace the script tag with executable one
                scriptEl.parentNode?.replaceChild(newScript, scriptEl);
              });
            } else {
              // No external scripts, content is ready
              setScriptLoading(false);
              setScriptError(false);
              setScriptErrorMessage(null);
              scriptLoadedRef.current = true;
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            }
          } catch (error) {
            console.error('Error inserting HTML content:', error);
            setScriptError(true);
            setScriptLoading(false);
            setScriptErrorMessage('Error loading form content. Please try again later.');
            scriptLoadedRef.current = false;
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        }
      } catch (error) {
        console.error('Error rendering popup script:', error);
        setScriptError(true);
        setScriptLoading(false);
        setScriptErrorMessage('An unexpected error occurred while loading the form. Please try again.');
        scriptLoadedRef.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    };

    // Small delay to ensure DOM is ready
    loadScript();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (!isOpen) {
        scriptLoadedRef.current = false;
        setScriptError(false);
        setScriptLoading(false);
      }
    };
  }, [isOpen, data.script, data.title]);

  // Retry function - reloads the page
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  // Validate data has required fields
  if (!data || !data.id) {
    console.error('Popup data is invalid:', data);
    return null;
  }

  const uniqueId = popupId || `popup-${data.id || 'unknown'}`;
  const titleId = `${uniqueId}-title`;

  // Determine if this is a minimal popup (only title, image, description, script)
  const isMinimal = !('description1' in data || 'description2' in data || 'date' in data);

  return (
    <div
      className={`${styles.heroPopupModal} ${isOpen ? styles.active : ''}`}
      id={uniqueId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-hidden={!isOpen}
    >
      <div className={styles.heroPopupOverlay} onClick={onClose} />
      <div className={styles.heroPopupContent}>
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

        {/* Header Section */}
        <div className={styles.heroPopupTop}>
          {/* Image */}
          {data.image && data.image.src && (
            <div className={styles.heroPopupImage}>
              <Image
                src={data.image.src}
                alt={data.image.alt || 'Popup image'}
                width={data.image.width || 200}
                height={data.image.height || 200}
                className={styles.popupImage}
                loading="lazy"
                onError={(e) => {
                  // Hide image on error to prevent broken image display
                  const target = e.target as HTMLImageElement;
                  if (target.parentElement) {
                    target.parentElement.style.display = 'none';
                  }
                  if (process.env.NODE_ENV === 'development') {
                    console.error('Failed to load popup image:', data.image?.src);
                  }
                }}
              />
            </div>
          )}

          {/* Title and Descriptions */}
          <div className={styles.heroPopupHeader}>
            <h2 id={titleId} className={styles.heroPopupTitle}>
              {data.title || 'Popup'}
            </h2>

            {/* For minimal popup: single description */}
            {isMinimal && 'description' in data && data.description && (
              <p className={styles.heroPopupSubtitle}>{data.description}</p>
            )}

            {/* For full popup: description1 and description2 */}
            {!isMinimal && (
              <>
                {'description1' in data && data.description1 && (
                  <p className={styles.heroPopupSubtitle}>{data.description1}</p>
                )}
                {'description2' in data && data.description2 && (
                  <p className={styles.heroPopupSubtitle}>{data.description2}</p>
                )}
                {'date' in data && data.date && (
                  <p className={styles.heroPopupDate}>{data.date}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Script/Content Area */}
        {data.script && (
          <div className={styles.heroPopupContentArea}>
            {scriptError ? (
              <div className={styles.scriptErrorContainer}>
                <h3 className={styles.scriptErrorTitle}>Unable to Load Form</h3>
                <p className={styles.scriptErrorMessage}>
                  {scriptErrorMessage || 'Failed to load registration form. Please try again.'}
                </p>
                <button
                  onClick={handleRetry}
                  className={styles.scriptRetryButton}
                  type="button"
                  aria-label="Retry loading form"
                >
                  Try Again
                </button>
                <div className={styles.scriptContactInfo}>
                  <p className={styles.scriptContactText}>Or contact us directly:</p>
                  <div className={styles.scriptContactLinks}>
                    <a
                      href="mailto:info@ilconservatory.org"
                      className={styles.scriptContactLink}
                      aria-label="Email us at info@ilconservatory.org"
                    >
                      Email: info@ilconservatory.org
                    </a>
                    <a
                      href="tel:+16302435100"
                      className={styles.scriptContactLink}
                      aria-label="Call us at 630-243-5100"
                    >
                      Phone: (630) 243-5100
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {scriptLoading && (
                  <div className={styles.scriptLoadingContainer}>
                    <div className={styles.scriptLoadingSpinner}></div>
                    <p className={styles.scriptLoadingText}>Loading form...</p>
                  </div>
                )}
                <div
                  ref={scriptContainerRef}
                  className={styles.heroPopupScript}
                  data-script-type={data.script.type}
                  style={{ display: scriptLoading ? 'none' : 'block' }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

