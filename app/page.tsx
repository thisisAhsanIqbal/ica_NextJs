import Hero from './components/Hero';

export default function Home() {
  return (
    <main>
      <Hero
        headline="High-level arts <em>meets</em> high-achieving academics."
        subhead="Illinois Conservatory for the Arts is a non-profit educational institution dedicated to providing exceptional arts education and programming."
        paragraph="ICA is committed to providing high-level arts programming that integrates seamlessly with rigorous academic standards. Our mission is to nurture artistic excellence while fostering academic achievement."
        primaryButton={{
          label: 'Learn More',
          url: '/the-school'
        }}
        secondaryButton={{
          label: 'Donate Today'
        }}
        tertiaryButton={{
          label: 'Stay Connected with ICA!'
        }}
        heroImages={[
          {
            src: '/asserts/home/High-level-arts-meets-high-achieving-academics.webp',
            alt: 'High-level arts meets high-achieving academics at Illinois Conservatory for the Arts',
            width: 1100,
            height: 650
          },
          {
            src: '/asserts/home/AcademyoftheartsEvent.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 1100,
            height: 650
          },
          {
            src: '/asserts/home/dance-1.webp',
            alt: 'Dance performance at Illinois Conservatory for the Arts',
            width: 1100,
            height: 650
          },
          {
            src: '/asserts/home/impact-lyrics.webp',
            alt: 'IMPACT program showcasing lyrics and musical theater at Illinois Conservatory for the Arts',
            width: 1100,
            height: 650
          },
          {
            src: '/asserts/home/ica-team.webp',
            alt: 'ICA team members at Illinois Conservatory for the Arts',
            width: 1100,
            height: 650
          }
        ]}
      />
    </main>
  )
}

