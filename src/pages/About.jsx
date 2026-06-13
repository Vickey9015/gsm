import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import GrowthVisual from '../components/GrowthVisual'
import AnimatedImage from '../components/AnimatedImage'
import ScrollReveal from '../components/ScrollReveal'
import { siteImages } from '../data/images'
import {
  focusAreas,
  philosophy,
  notBecome,
  weBecome,
  visionPillars,
  missionOutcomes,
} from '../data/content'
import './About.css'

const aboutHighlights = [
  { value: '5', label: 'Focus areas' },
  { value: '3', label: 'Core principles' },
  { value: '4', label: 'Key services' },
]

export default function About() {
  return (
    <>
      <PageHero
        variant="editorial"
        eyebrow="Who we are"
        title="Strategic advisors for emerging-market growth"
        lead="GSM is a strategic growth consultancy — not a traditional marketing agency. We help businesses scale through clarity, positioning, and disciplined execution."
        visual={<GrowthVisual />}
        highlights={aboutHighlights}
      >
        <Link to="/contact" className="btn btn--primary about-hero__cta">
          Partner with GSM
        </Link>
      </PageHero>

      <section className="section about-strip">
        <div className="container">
          <p className="about-strip__label">What we focus on</p>
          <ul className="about-strip__tags">
            {focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-philosophy">
        <div className="container">
          <ScrollReveal className="about-philosophy__header">
            <span className="eyebrow">Philosophy</span>
            <h2 className="section-title">Three principles that guide every engagement</h2>
            <p className="section-lead">
              Our goal is to help businesses move from fragmented growth to structured market
              leadership.
            </p>
          </ScrollReveal>
          <div className="about-philosophy__grid">
            {philosophy.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 90}>
                <article className="about-philosophy__item">
                  <span className="about-philosophy__index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p className="about-philosophy__summary">{item.summary}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section identity">
        <div className="container">
          <ScrollReveal className="identity__intro">
            <span className="eyebrow">Our identity</span>
            <h2 className="section-title">What we refuse — and what we build</h2>
          </ScrollReveal>
          <div className="identity__grid">
            <ScrollReveal direction="left">
              <div className="identity__block identity__block--avoid">
                <h3>We are not building another agency</h3>
                <ul>
                  {notBecome.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={100}>
              <div className="identity__block identity__block--aim">
                <h3>Who we become for clients</h3>
                <ul>
                  {weBecome.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section vision">
        <div className="container vision__layout">
          <ScrollReveal className="vision__copy">
            <span className="eyebrow">Long-term vision</span>
            <h2 className="section-title">Building a trusted emerging-market consultancy</h2>
            <div className="vision__pillars">
              {visionPillars.map((pillar) => (
                <div key={pillar} className="vision__pillar">
                  {pillar}
                </div>
              ))}
            </div>
            <div className="vision__mission">
              <h3>Our mission</h3>
              <p>Help businesses:</p>
              <ul>
                {missionOutcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120}>
            <AnimatedImage
              src={siteImages.about.vision.src}
              alt={siteImages.about.vision.alt}
              variant="ken-burns"
              className="vision__image"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section final-principle">
        <div className="container final-principle__inner">
          <blockquote>
            Businesses grow when strategy aligns with execution, positioning aligns with
            perception, systems align with scale, and vision aligns with discipline.
          </blockquote>
          <p>That is the foundation of GSM.</p>
          <Link to="/services" className="btn btn--outline">
            View our services
          </Link>
        </div>
      </section>
    </>
  )
}
