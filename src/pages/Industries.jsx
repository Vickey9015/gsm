import { Link } from 'react-router-dom'
import IndustriesHero from '../components/IndustriesHero'
import ScrollReveal from '../components/ScrollReveal'
import { provenCategories, industries } from '../data/content'
import './Industries.css'

const sectorIcons = {
  Manufacturing: 'M',
  Hospitality: 'H',
  'Industrial businesses': 'I',
  Healthcare: 'HC',
  'Real estate': 'RE',
  'Professional services': 'PS',
  'Trade & export companies': 'TX',
  'SMEs expanding digitally': 'SME',
}

export default function Industries() {
  return (
    <>
      <IndustriesHero />

      <section className="section industries-demand">
        <div className="container">
          <div className="industries-demand__head">
            <ScrollReveal>
              <span className="eyebrow">Proven categories</span>
              <h2 className="section-title">Consulting that already earns</h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="industries-demand__note">
                High-margin work across growth, entry, positioning, and acquisition — not commodity
                execution.
              </p>
            </ScrollReveal>
          </div>
          <ol className="industries-timeline">
            {provenCategories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 60}>
                <li className="industries-timeline__item">
                  <span className="industries-timeline__step" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="industries-timeline__body">
                    <h3>{cat.title}</h3>
                    <ul>
                      {cat.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section industries-sectors">
        <div className="container">
          <ScrollReveal className="industries-sectors__head">
            <span className="eyebrow">Target industries</span>
            <h2 className="section-title">Sectors we partner with most</h2>
            <p className="section-lead">
              Strong operations, weak positioning, and unstructured growth — the pattern we solve
              repeatedly.
            </p>
          </ScrollReveal>
          <div className="industries-sectors__grid">
            {industries.map((name, i) => (
              <ScrollReveal key={name} delay={(i % 6) * 45}>
                <article
                  className={`sector-card ${i < 4 ? 'sector-card--featured' : ''}`}
                >
                  <span className="sector-card__icon" aria-hidden="true">
                    {sectorIcons[name] || name.slice(0, 2)}
                  </span>
                  <h3>{name}</h3>
                  {i === 0 && (
                    <p className="sector-card__hint">Highest demand</p>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section industries-why">
        <div className="container industries-why__layout">
          <ScrollReveal className="industries-why__copy">
            <span className="eyebrow">Why these industries</span>
            <h2 className="section-title">Emerging markets need strategy, not noise</h2>
            <p>
              Manufacturing, hospitality, healthcare, trade, and professional services frequently
              need market entry support, brand positioning, and acquisition systems — not generic
              social media execution.
            </p>
            <p>
              Foreign investors, manufacturers, hospitality groups, and export businesses entering
              African and Middle Eastern markets especially benefit from feasibility studies and
              go-to-market strategy.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={100} className="industries-why__actions">
            <div className="industries-why__card">
              <p className="industries-why__card-label">Recommended start</p>
              <h3>Growth & Market Positioning Audit</h3>
              <p>Identify bottlenecks before scaling spend or entering new markets.</p>
              <Link to="/services" className="btn btn--outline">
                View services
              </Link>
              <Link to="/contact" className="btn btn--primary">
                Book a consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
