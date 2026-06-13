import { Link } from 'react-router-dom'
import ImageStack from '../components/ImageStack'
import SafeImage from '../components/SafeImage'
import ImageMarquee from '../components/ImageMarquee'
import AnimatedImage from '../components/AnimatedImage'
import ScrollReveal from '../components/ScrollReveal'
import { siteImages } from '../data/images'
import {
  focusAreas,
  clientStrengths,
  clientStruggles,
  philosophy,
  processSteps,
} from '../data/content'
import './Home.css'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__mesh" aria-hidden="true" />
        <div className="container hero__layout">
          <div className="hero__inner">
            <span className="eyebrow hero__eyebrow">Strategic Growth Consultancy</span>
            <h1 className="hero__title">
              Engineer growth.
              <br />
              <span className="hero__accent">Lead your market.</span>
            </h1>
            <p className="hero__lead">
              GSM helps businesses move from fragmented growth to structured market leadership —
              through positioning, strategy, and disciplined execution. We are not a traditional
              marketing agency.
            </p>
            <div className="hero__actions">
              <Link to="/services" className="btn btn--primary">
                Explore our services
              </Link>
              <Link to="/about" className="btn btn--outline">
                Our philosophy
              </Link>
            </div>
            <ul className="hero__tags">
              {focusAreas.map((item, i) => (
                <li key={item} style={{ animationDelay: `${i * 0.08}s` }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ScrollReveal direction="right" className="hero__visual-wrap">
            <ImageStack variant="hero" images={[siteImages.hero.main, siteImages.hero.accent]} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section problem">
        <div className="container problem__layout">
          <ScrollReveal className="problem__copy">
            <span className="eyebrow">What we solve</span>
            <h2 className="section-title">Strong businesses. Unstructured growth.</h2>
            <p className="section-lead">
              Many companies in emerging markets already have great products and operations — but
              struggle to convert opportunity into market leadership.
            </p>
            <div className="problem__grid">
              <div className="problem__card problem__card--positive">
                <h3>They already have</h3>
                <ul>
                  {clientStrengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="problem__card problem__card--gap">
                <h3>They struggle with</h3>
                <ul>
                  {clientStruggles.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="problem__closing">
              We solve these gaps through strategic consulting and execution support — so growth
              aligns with discipline, not hype.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={120}>
            <AnimatedImage
              src={siteImages.problem.src}
              alt={siteImages.problem.alt}
              variant="ken-burns"
              className="problem__image"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section philosophy-preview">
        <div className="container">
          <div className="philosophy-preview__top">
            <ScrollReveal className="philosophy-preview__intro">
              <span className="eyebrow">Our philosophy</span>
              <h2 className="section-title">Built for operators, not transactions</h2>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={100}>
              <AnimatedImage
                src={siteImages.philosophy.src}
                alt={siteImages.philosophy.alt}
                variant="reveal"
                className="philosophy-preview__banner anim-img--wide"
              />
            </ScrollReveal>
          </div>
          <div className="philosophy-preview__grid">
            {philosophy.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <article className="philosophy-card">
                  <h3>{item.title}</h3>
                  <p className="philosophy-card__summary">{item.summary}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <Link to="/about" className="philosophy-preview__link">
            Read our full story →
          </Link>
        </div>
      </section>

      <section className="section process">
        <div className="process__bg-wrap" aria-hidden="true">
          <SafeImage
            src={siteImages.process.src}
            alt=""
            className="process__bg-img"
          />
          <div className="process__overlay" />
        </div>
        <div className="container process__content">
          <ScrollReveal>
            <span className="eyebrow">How we work</span>
            <h2 className="section-title">Diagnose → Strategize → Execute → Scale</h2>
            <p className="section-lead process__lead">
              We do not blindly sell execution. We understand the business first, then build
              structured growth systems.
            </p>
          </ScrollReveal>
          <div className="process__steps">
            {processSteps.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 80}>
                <div className="process__step">
                  <span className="process__num">{item.step}</span>
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                  {i < processSteps.length - 1 && (
                    <span className="process__arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section industries-preview">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Industries</span>
            <h2 className="section-title">Sectors we know best</h2>
            <p className="section-lead">
              Manufacturing, hospitality, healthcare, and more — where operational strength meets
              strategic opportunity.
            </p>
          </ScrollReveal>
          <ImageMarquee items={siteImages.industries} />
          <Link to="/industries" className="industries-preview__link">
            Explore all industries →
          </Link>
        </div>
      </section>

      <section className="section cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready to structure your growth?</h2>
            <p>
              Start with a Growth & Market Positioning Audit — our entry point to long-term
              strategic partnership.
            </p>
          </div>
          <Link to="/contact" className="btn btn--primary">
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  )
}
