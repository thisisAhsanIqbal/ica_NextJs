import IcaButton from './components/ui/IcaButton'

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .not-found-container {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2rem);
          background-color: var(--ica-bg);
          position: relative;
          overflow: hidden;
        }

        .not-found-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          width: 100%;
          text-align: center;
        }

        .not-found-decorative-circle1,
        .not-found-decorative-circle2,
        .not-found-decorative-circle3 {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: not-found-float 20s ease-in-out infinite;
        }

        .not-found-decorative-circle1 {
          width: 300px;
          height: 300px;
          background: var(--ica-teal);
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .not-found-decorative-circle2 {
          width: 200px;
          height: 200px;
          background: var(--ica-lavender);
          bottom: 15%;
          right: 10%;
          animation-delay: -7s;
        }

        .not-found-decorative-circle3 {
          width: 150px;
          height: 150px;
          background: var(--ica-mint);
          top: 50%;
          right: 5%;
          animation-delay: -14s;
        }

        @keyframes not-found-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .not-found-main-content {
          position: relative;
          z-index: 3;
        }

        .not-found-error-code {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.5rem, 2vw, 1.5rem);
          margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
          animation: not-found-fadeInUp 0.8s ease-out;
        }

        .not-found-error-number {
          font-family: var(--font-heading);
          font-size: clamp(80px, 15vw, 140px);
          font-weight: 600;
          color: var(--ica-green-deep);
          line-height: 1;
          display: inline-block;
          animation: not-found-bounceIn 0.8s ease-out;
        }

        .not-found-error-number:first-child {
          animation-delay: 0.1s;
        }

        .not-found-error-number:last-child {
          animation-delay: 0.3s;
        }

        .not-found-error-icon {
          font-size: clamp(60px, 12vw, 100px);
          display: inline-block;
          animation: not-found-rotateIn 1s ease-out 0.5s both, not-found-floatIcon 3s ease-in-out 1.5s infinite;
          transform-origin: center;
        }

        @keyframes not-found-bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
          }
          50% {
            transform: scale(1.1) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes not-found-rotateIn {
          0% {
            opacity: 0;
            transform: rotate(-180deg) scale(0);
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes not-found-floatIcon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes not-found-fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .not-found-title {
          font-family: var(--font-heading);
          font-size: clamp(32px, 6vw, 48px);
          font-weight: 600;
          color: var(--ica-green-deep);
          margin-bottom: clamp(1rem, 3vw, 1.5rem);
          line-height: 1.2;
          animation: not-found-fadeInUp 0.8s ease-out 0.2s both;
        }

        .not-found-title em {
          font-style: italic;
          color: var(--ica-teal);
        }

        .not-found-description {
          font-family: var(--font-body);
          font-size: clamp(16px, 2.5vw, 20px);
          line-height: 1.6;
          color: var(--ica-green-deep);
          margin-bottom: clamp(2rem, 5vw, 3rem);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
          animation: not-found-fadeInUp 0.8s ease-out 0.4s both;
        }

        .not-found-button-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          animation: not-found-fadeInUp 0.8s ease-out 0.6s both;
        }

        @media (min-width: 768px) {
          .not-found-button-group {
            flex-direction: row;
            gap: 1.5rem;
          }

          .not-found-error-code {
            margin-bottom: 2rem;
          }

          .not-found-decorative-circle1 {
            width: 400px;
            height: 400px;
          }

          .not-found-decorative-circle2 {
            width: 250px;
            height: 250px;
          }

          .not-found-decorative-circle3 {
            width: 180px;
            height: 180px;
          }
        }

        @media (min-width: 1024px) {
          .not-found-container {
            padding: clamp(3rem, 6vw, 5rem) 2rem;
          }

          .not-found-error-code {
            gap: 2rem;
          }

          .not-found-description {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .not-found-error-code {
            gap: 0.5rem;
          }

          .not-found-decorative-circle1,
          .not-found-decorative-circle2,
          .not-found-decorative-circle3 {
            opacity: 0.05;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .not-found-error-number,
          .not-found-error-icon,
          .not-found-title,
          .not-found-description,
          .not-found-button-group {
            animation: none;
          }

          .not-found-decorative-circle1,
          .not-found-decorative-circle2,
          .not-found-decorative-circle3 {
            animation: none;
          }
        }

        @media (prefers-contrast: high) {
          .not-found-decorative-circle1,
          .not-found-decorative-circle2,
          .not-found-decorative-circle3 {
            opacity: 0.2;
          }
        }
      ` }} />
      <div className="not-found-container">
        <div className="not-found-content">
          {/* Decorative elements */}
          <div className="not-found-decorative-circle1"></div>
          <div className="not-found-decorative-circle2"></div>
          <div className="not-found-decorative-circle3"></div>
          
          {/* Main content */}
          <div className="not-found-main-content">
            <div className="not-found-error-code">
              <span className="not-found-error-number">4</span>
              <span className="not-found-error-icon">🎭</span>
              <span className="not-found-error-number">4</span>
            </div>
            
            <h1 className="not-found-title">Page Not Found</h1>
            
            <p className="not-found-description">
              The page you're looking for seems to have taken a bow and exited the stage. 
              Don't worry—every great performance has its intermission!
            </p>
            
            <div className="not-found-button-group">
              <IcaButton href="/" variant="primary">
                Return Home
              </IcaButton>
              <IcaButton href="/the-school" variant="outline">
                Learn About The School
              </IcaButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
