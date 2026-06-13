import { Link } from 'react-router-dom'
import SafeImage from './SafeImage'
import ScrollReveal from './ScrollReveal'
import { siteImages } from '../data/images'
import './IndustriesHero.css'

const stats = [
  { value: '8+', label: 'Target sectors' },
  { value: '5', label: 'Revenue categories' },
  { value: 'EM', label: 'Core markets' },
]

export default function IndustriesHero() {
  return (
    <section className="industries-hero">
      <div className="industries-hero__mesh" aria-hidden="true" />
      <div className="container">
        <ScrollReveal className="industries-hero__intro">
          <span className="eyebrow">Markets & industries</span>
          <h1 className="industries-hero__title">
            Where operational strength meets strategic opportunity
          </h1>
          <p className="industries-hero__lead">
            Proven consulting demand across emerging markets — aligned with sectors that need
            positioning, growth systems, and expansion clarity.
          </p>
        </ScrollReveal>

        <div className="industries-hero__visual">
          <div className="industries-hero__bento">
            {siteImages.industries.map((item, i) => (
              <ScrollReveal
                key={item.label}
                delay={80 + i * 60}
                className={`industries-hero__tile industries-hero__tile--${i + 1}`}
              >
                <figure>
                  <SafeImage src={item.src} alt={item.alt} />
                  <figcaption>{item.label}</figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={160} className="industries-hero__stats-wrap">
            <ul className="industries-hero__stats">
              {stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Link to="/contact" className="btn btn--primary industries-hero__cta">
              Discuss your sector
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
