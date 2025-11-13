'use client';

interface PolicyProps {
  title?: string;
  text?: string;
}

export default function NondiscriminatoryPolicy({
  title = 'Nondiscriminatory Policy',
  text = "Illinois Conservatory for the Arts employs staff and admits students of any race, color, national origin, ethnic origin, gender, religion, and sexual orientation to all the rights, privileges, programs, and activities generally accorded or made available to students at the school. It doesn't discriminate on the basis of race, color, national origin, and ethnic origin, gender, religion, and sexual orientation in administration of its educational policies, admission policies, scholarship and loan programs, and other school-administered programs.",
}: PolicyProps) {
  return (
    <section
      id="ica-nondiscriminatory-policy"
      className="font-normal bg-[var(--ica-green-deep)] py-[var(--global-padding-desktop)] text-center flex flex-col items-center justify-center [contain:layout_style_paint] max-md:py-[var(--global-padding-mobile)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none"
      aria-labelledby="policy-heading"
    >
      <div className="max-w-[1280px] mx-auto px-8 w-full max-md:px-4">
        <div className="max-w-[920px] mx-auto bg-[rgba(255,255,255,0.06)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.15)] p-[clamp(20px,4vw,40px)] [box-shadow:0_1px_0_rgba(0,0,0,0.25)_inset,0_0_0_1px_rgba(255,255,255,0.06)] [-webkit-backdrop-filter:blur(12px)]">
          <h2 
            id="policy-heading" 
            className="!text-[var(--ica-bg)] !font-[500] !mb-2 !text-[23px] tracking-[1px] uppercase"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {title}
          </h2>
          <p 
            className="!text-[var(--ica-bg)] !m-0 !text-[clamp(15px,4vw,17px)] !leading-[1.65] !font-normal !text-center"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
