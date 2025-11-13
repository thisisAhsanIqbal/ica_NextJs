interface PolicyProps {
  title?: string;
  text?: string;
}

export default function NondiscriminatoryPolicy({
  title = 'Nondiscriminatory Policy',
  text = "Illinois Conservatory for the Arts employs staff and admits students of any race, color, national origin, ethnic origin, gender, religion, and sexual orientation to all the rights, privileges, programs, and activities generally accorded or made available to students at the school. It does not discriminate on the basis of race, color, national origin, and ethnic origin, gender, religion, and sexual orientation in administration of its educational policies, admission policies, scholarship and loan programs, and other school-administered programs.",
}: PolicyProps) {
  return (
    <section
      id="ica-nondiscriminatory-policy"
      className="relative font-normal bg-[var(--ica-green-deep)] py-[var(--global-padding-desktop)] text-center flex flex-col items-center justify-center [contain:layout_style_paint] max-md:py-[var(--global-padding-mobile)]"
      aria-labelledby="policy-heading"
    >
      {/* Ambient Background Glow - Essential for Glassmorphism to be visible */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full max-md:px-4">
        
        {/* THE GLOSSY CONTAINER */}
        <div className="relative max-w-[920px] mx-auto 
          bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.02)] 
          backdrop-blur-xl 
          rounded-2xl 
          border border-[rgba(255,255,255,0.15)] 
          shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] 
          p-[clamp(20px,4vw,40px)] 
          overflow-hidden"
        >
          {/* Top Shine/Reflection Effect */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.6)] to-transparent opacity-70" />
          <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent pointer-events-none" />

          <h2 
            id="policy-heading" 
            className="!text-[var(--ica-bg)] !font-[600] !mb-4 !text-[23px] tracking-[1px] uppercase drop-shadow-sm"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {title}
          </h2>
          <p 
            className="!text-[var(--ica-bg)] !m-0 !text-[clamp(15px,4vw,17px)] !leading-[1.75] !font-normal !text-center opacity-95 drop-shadow-sm"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}