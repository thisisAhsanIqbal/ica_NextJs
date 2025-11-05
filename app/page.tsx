import Hero from './components/Hero';
import ArtsAreas from './components/ArtsAreas';
import School from './components/School';

export default function Home() {
  const artsAreasData = {
    heading: 'Arts Areas',
    items: [
      {
        iconSrc: '/asserts/home/Icon Music.png',
        iconAlt: 'Performing Arts icon',
        title: 'Performing Arts',
        subs: ['Dance', 'Music', 'Theatre'],
      },
      {
        iconSrc: '/asserts/home/Icon Art.png',
        iconAlt: 'Visual Arts icon',
        title: 'Visual Arts',
        subs: ['Drawing', 'Painting', 'Ceramics & Sculpture'],
      },
      {
        iconSrc: '/asserts/home/Icon Media.png',
        iconAlt: 'Media Arts icon',
        title: 'Media Arts',
        subs: ['Graphic Design', 'Animation', 'Photo & Video'],
      },
      {
        iconSrc: '/asserts/home/Icon Lightbulb.png',
        iconAlt: 'Arts Business icon',
        title: 'Arts Business',
        subs: ['Entrepreneurship', 'Finance', 'Marketing'],
      },
    ],
  };

  return (
    <>
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
      <ArtsAreas {...artsAreasData} />
      <School
        title="The School"
        headline="High-level arts meets high-achieving academics"
        paragraphs={[
          'Illinois Conservatory for the Arts is a non-profit educational institution dedicated to providing exceptional arts education and programming.',
          'ICA is committed to providing high-level arts programming that integrates seamlessly with rigorous academic standards. Our mission is to nurture artistic excellence while fostering academic achievement.'
        ]}
        cta={{
          label: 'Learn More',
          url: '/the-school'
        }}
        logoSrc="/asserts/home/Icon The Studio Cream.png"
        logoAlt="The Studio icon"
        slides={[
          {
            src: '/asserts/home/The-School-1.webp',
            alt: 'The School at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          },
          {
            src: '/asserts/home/The-School-2.webp',
            alt: 'The School at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          },
          {
            src: '/asserts/home/AOTA-NEHAMASHOTSbranding.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          }
        ]}
      />
    </>
  )
}

