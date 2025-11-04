export default function PromotionalHeader() {
  return (
    <section className="promotional-header" aria-label="Promotional announcements">
      {/* IMPACT: Musical Theater */}
      <article className="promo-banner promo-musical" aria-labelledby="musical-title">
        <div className="promo-banner-container">
          <div className="promo-label" role="text">Register Today!</div>
          <div className="promo-row-2">
            <div className="promo-content-group">
              <h2 className="promo-title" id="musical-title">IMPACT: Musical Theater</h2>
              <p className="promo-subtitle">Summer 2025 Registration</p>
            </div>
            <div className="promo-action">
              <button type="button" className="promo-button" aria-label="Save my spot for IMPACT: Musical Theater Summer 2025 Registration">
                Save My Spot!
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* IMPACT: Dance */}
      <article className="promo-banner promo-dance" aria-labelledby="dance-title">
        <div className="promo-banner-container">
          <div className="promo-label" role="text">Register Today!</div>
          <div className="promo-row-2">
            <div className="promo-content-group">
              <h2 className="promo-title" id="dance-title">IMPACT: DANCE</h2>
              <p className="promo-subtitle">Winter Session</p>
            </div>
            <div className="promo-action">
              <button type="button" className="promo-button" aria-label="Register now for IMPACT: Dance Winter Session">
                Register Now!
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

