export default function PromotionalHeader() {
  return (
    <section className="promotional-header" aria-label="Promotional announcements">
      {/* IMPACT: Musical Theater */}
      <div className="promo-banner promo-musical">
        <div className="promo-banner-container">
          <div className="promo-label">Register Today!</div>
          <div className="promo-row-2">
            <div className="promo-content-group">
              <div className="promo-title">IMPACT: Musical Theater</div>
              <div className="promo-subtitle">Summer 2025 Registration</div>
            </div>
            <div className="promo-action">
              <button type="button" className="promo-button" aria-label="Save my spot for IMPACT: Musical Theater">Save My Spot!</button>
            </div>
          </div>
        </div>
      </div>

      {/* IMPACT: Dance */}
      <div className="promo-banner promo-dance">
        <div className="promo-banner-container">
          <div className="promo-label">Register Today!</div>
          <div className="promo-row-2">
            <div className="promo-content-group">
              <div className="promo-title">IMPACT: DANCE</div>
              <div className="promo-subtitle">Winter Session</div>
            </div>
            <div className="promo-action">
              <button type="button" className="promo-button" aria-label="Register now for IMPACT: Dance">Register Now!</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

