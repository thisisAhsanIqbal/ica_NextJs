import Hero from './components/homepage/Hero';
import ArtsAreas from './components/homepage/ArtsAreas';
import School from './components/homepage/School';
import Impact from './components/homepage/Impact';
import History from './components/homepage/History';
import Events from './components/homepage/Events';
import Studio from './components/homepage/Studio';
import Testimonials from './components/homepage/Testimonials';
import PastFacultySection from './components/homepage/PastFacultySection';
import NondiscriminatoryPolicy from './components/homepage/NondiscriminatoryPolicy';

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
        headline="High-level arts <em>meets</em><br />high-achieving academics."
        subhead="Illinois Conservatory for the Arts is a non-profit educational institution in the Western suburbs of Chicago."
        paragraph="ICA is committed to providing high-level arts programming while engaging students in a comprehensive academic education. We believe that creativity and the quest for innovation fosters individuality–allowing the holistic development of each student."
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
        headline="The Pilot Program for ICA's K–12 day school is launching Fall 2026."
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
      <Impact
        title="IMPACT"
        headline="IMPACT IS OUR WEEK-LONG INTENSIVE PROGRAM OFFERED DURING SUMMER & WINTER BREAKS FOR MIDDLE AND HIGH SCHOOL STUDENTS."
        paragraphs={[
          'IMPACT brings top professional artists-from Broadway, TV & Film, the Dance Community, and beyond-to work with students on growing their skills. The week includes a trip to see a show in Chicago and wraps up with a showcase and reception for family and friends.',
          'WINTER • Dec 27-Dec 30, 2025 • On Sale Now',
          'SUMMER • 2026 Dates • Coming Soon'
        ]}
        ctaButtons={[
          {
            label: 'WINTER',
            url: '/impact/winter'
          },
          {
            label: 'SUMMER',
            url: '/impact/summer'
          }
        ]}
        additionalSession={{
          text: 'DANCE • December 30, 2025 • On Sale Now',
          cta: {
            label: 'LEARN MORE',
            url: '/impact/dance'
          }
        }}
        logoSrc="/asserts/home/Icon IMPACT Cream.png"
        logoAlt="IMPACT Logo"
        slides={[
          {
            src: '/asserts/home/impact/impact.webp',
            alt: 'IMPACT program at Illinois Conservatory for the Arts',
            width: 550,
            height: 630
          },
          {
            src: '/asserts/home/impact/JJ-NIEMANN.webp',
            alt: 'JJ Niemann at IMPACT program',
            width: 550,
            height: 630
          },
          {
            src: '/asserts/home/impact/JUDITH-FRANKLIN.webp',
            alt: 'Judith Franklin at IMPACT program',
            width: 550,
            height: 630
          },
          {
            src: '/asserts/home/impact/JUSTIN-PRESCOTT-2.webp',
            alt: 'Justin Prescott at IMPACT program',
            width: 550,
            height: 630
          },
          {
            src: '/asserts/home/impact/TAYLOR-LOUDERMAN.webp',
            alt: 'Taylor Louderman at IMPACT program',
            width: 550,
            height: 630
          }
        ]}
      />
      <Studio
        title="The Studio"
        subtitle="The Studio offers evening & weekend classes in Music, Dance, and Theatre for adolescents and teens."
        paragraph="There are two 12-week sessions that take place throughout the year."
        highlight="Registration for The Studio is now open!"
        primaryButton={{
          label: 'Learn More',
          url: '/studio/',
          'aria-label': 'Learn more about The Studio evening and weekend classes'
        }}
        secondaryButton={{
          label: 'Register Now',
          url: 'https://register.ilconservatory.org/studio'
        }}
        logoSrc="/asserts/home/Icon The Studio Cream.png"
        logoAlt="The Studio Logo"
        slides={[
          {
            src: '/asserts/home/studio/TheSchool-2.webp',
            alt: 'The Studio at Illinois Conservatory for the Arts'
          },
          {
            src: '/asserts/home/studio/TheStudiobyImpact-1.webp',
            alt: 'The Studio by IMPACT program'
          },
          {
            src: '/asserts/home/studio/TheStudiobyImpact-2.webp',
            alt: 'The Studio by IMPACT program'
          },
          {
            src: '/asserts/home/studio/TheStudiobyImpact-3.webp',
            alt: 'The Studio by IMPACT program'
          },
          {
            src: '/asserts/home/studio/TheStudiobyImpact-4.webp',
            alt: 'The Studio by IMPACT program'
          }
        ]}
      />
      <Events
        title="Events"
        subtitle="ICA hosts exciting, star-studded events throughout the year."
        paragraph="Illinois Conservatory for the Arts is committed to community engagement, outreach, and fundraising. Events include concerts, workshops, and community outings."
        primaryButton={{
          label: 'See our upcoming events',
          url: '/event/',
          'aria-label': 'Learn more about ICA events and performances'
        }}
        slides={[
          {
            src: '/asserts/home/events/AcademyoftheartsEvent-1.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          },
          {
            src: '/asserts/home/events/AcademyoftheartsEvent.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          },
          {
            src: '/asserts/home/events/impact-event-1 (1).webp',
            alt: 'IMPACT event at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          },
          {
            src: '/asserts/home/events/impact-event.webp',
            alt: 'IMPACT event at Illinois Conservatory for the Arts',
            width: 530,
            height: 450
          }
        ]}
      />
      <History
        title="Our History"
        subtitle="ICA is the dream of three educators who have seen the positive impact of an arts-integrated education on overall academics."
        paragraph="With their combined decades in arts education, our founders recognize that young artists often learn differently because they are multifaceted. ICA believes that fostering creativity in all areas of their school experience benefits a creatively-driven child, whether they aim for a profession in the arts or land in a fulfilling career outside of the arts."
        primaryButton={{
          label: 'Meet the team',
          url: '/team/'
        }}
        slides={[
          {
            src: '/asserts/home/history/AcademyoftheartsEvent-1.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 800,
            height: 600
          },
          {
            src: '/asserts/home/history/AcademyoftheartsEvent-108-min-scaled-1.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 800,
            height: 600
          },
          {
            src: '/asserts/home/history/AcademyoftheartsEvent-92-scaled-e1749433263961.webp',
            alt: 'Academy of the Arts event at Illinois Conservatory for the Arts',
            width: 800,
            height: 600
          }
        ]}
      />
      <PastFacultySection />
      <Testimonials
        typingWords={[
          'empowers students',
          'nurtures creativity',
          'fosters excellence',
          'inspires achievement'
        ]}
        reviews={[
          {
            image: '/asserts/home/testimonials/Emmy.webp',
            text: 'Being part of ICA has opened so many doors for me and helped me discover my passion.'
          },
          {
            image: '/asserts/home/testimonials/Sammy.webp',
            text: 'The quality of instruction and the opportunities provided here are unmatched.'
          },
          {
            image: '/asserts/home/testimonials/Giovanni.webp',
            text: 'The teachers here truly care about your success and push you to be your best.'
          },
          {
            image: '/asserts/home/testimonials/Rogan.webp',
            text: 'ICA has given me the confidence and skills to pursue my dreams in the arts.'
          },
          {
            image: '/asserts/home/testimonials/Layla.webp',
            text: 'ICA provides the perfect balance between artistic expression and academic excellence.'
          }
        ]}
        twoColumnQuotesSections={[
          [
            {
              text: 'Working with professionals who\'ve done what I dream of doing was inspiring. ICA is a place where you feel supported and part of an amazing artistic community.',
              highlights: ['ICA is a place where you feel supported', 'amazing artistic community'],
              name: 'ALLY',
              role: 'STUDENT',
              avatar: '/asserts/home/testimonials/ally.webp',
              isParent: false
            },
            {
              text: 'My child joined ICA at a vulnerable time in her life and this program truly helped her gain self-confidence, overcome obstacles, become more self-aware, and find skills inside her that she never thought she would have.',
              highlights: ['gain self-confidence', 'become more self-aware'],
              name: 'ANDREEA',
              role: 'PARENT',
              avatar: '/asserts/home/testimonials/Amira.webp',
              isParent: true
            }
          ],
          [
            {
              text: 'ICA offers programming unlike anything in the Western Suburbs. I didn\'t realize that [my daughter] could work with so many high-profile professionals right in our area.',
              highlights: ['unlike anything in the', 'Western Suburbs'],
              name: 'CAROLINA',
              role: 'PARENT',
              avatar: '/asserts/home/testimonials/Amira.webp',
              isParent: true
            },
            {
              text: 'IMPACT really improved my confidence in how I act, sing, and dance. I\'ve made so many great friends and it just feels like one big family. It is my dream to come to the school at ICA.',
              highlights: ['It is', 'my dream to come to the school at ICA.'],
              name: 'AMIRA',
              role: 'STUDENT',
              avatar: '/asserts/home/testimonials/Amira.webp',
              isParent: false
            }
          ]
        ]}
        spotlightQuotes={[
          {
            text: 'ICA gave me the tools to grow as an artist and the confidence to enjoy creating theater. The welcoming community here is like no other.',
            name: 'LEON',
            role: 'STUDENT',
            avatar: '/asserts/home/testimonials/Leon-student.webp'
          },
          {
            text: 'ICA gave me the confidence to try new things and learn from amazing teachers. I wouldn\'t have had this opportunity without the scholarship, and it\'s changed my life.',
            name: 'NICOLAS',
            role: 'STUDENT',
            avatar: '/asserts/home/testimonials/Nicolas-student.webp'
          }
        ]}
      />
      <NondiscriminatoryPolicy />
    </>
  )
}

