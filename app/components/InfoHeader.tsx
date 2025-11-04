export default function InfoHeader() {
  return (
    <div className="info-header" role="complementary" aria-label="Contact information and announcements">
      <div className="info-header-container">
        {/* Left Side - Contact Info */}
        <address className="info-contact" aria-label="Contact information">
          <span className="info-item">
            <svg className="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Naperville, IL</span>
          </span>
          <span className="info-item">
            <svg className="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <a href="tel:+16302435100" aria-label="Call us at 630-243-5100">(630) 243-5100</a>
          </span>
        </address>

        {/* Right Side - Announcement */}
        <div className="info-announcement" role="note" aria-label="Important announcement">
          Same Programming, New Name! Academy of the Arts is now Illinois Conservatory for the Arts
        </div>
      </div>
    </div>
  )
}

