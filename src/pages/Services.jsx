import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import AnimatedImage from '../components/AnimatedImage'
import ScrollReveal from '../components/ScrollReveal'
import { siteImages } from '../data/images'
import { services, processSteps } from '../data/content'
import './Services.css'

export default function Services() {
  return (
    <>
      <PageHero
        variant="cinematic"
        eyebrow="Our services"
        title="High-value consulting, focused execution"
        lead="We begin with a limited set of services to maintain quality — each designed to create measurable outcomes and long-term partnership opportunities."
        image={siteImages.pageHero.services}
        imageAlt="Consulting team in strategy session"
      />

      <section className="section services-list">
        <div className="container">
          {services.map((service, index) => {
            const img = siteImages.services[service.id]
            const reverse = index % 2 === 1

            return (
              <ScrollReveal key={service.id} delay={index * 60}>
                <article
                  id={service.id}
                  className={`service-detail ${reverse ? 'service-detail--reverse' : ''}`}
                >
                  {img && (
                    <AnimatedImage
                      src={img.src}
                      alt={img.alt}
                      variant={index % 2 === 0 ? 'float' : 'ken-burns'}
                      floatDelay={index * 0.4}
                      className="service-detail__media"
                    />
                  )}
                  <div className="service-detail__content">
                    <div className="service-detail__header">
                      <span className="service-detail__num">{service.number}</span>
                      <div>
                        <h2>{service.title}</h2>
                        <p className="service-detail__purpose">{service.purpose}</p>
                      </div>
                    </div>
                    <div className="service-detail__body">
                      <div>
                        <h3>Includes</h3>
                        <ul>
                          {service.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="service-detail__outcome">
                        <h3>Outcome</h3>
                        <p>{service.outcome}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <section className="section service-model">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Service model</span>
            <h2 className="section-title">Our engagement process</h2>
            <p className="section-lead">
              We diagnose before we strategize, strategize before we execute, and execute with scale
              in mind.
            </p>
          </ScrollReveal>
          <div className="service-model__flow">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 80}>
                <div className="service-model__step">
                  <strong>{step.label}</strong>
                  <span>{step.desc}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="service-model__note">
            Service 1 — Growth & Market Positioning Audit — is our recommended entry point and
            creates natural pathways to ongoing retainers.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Request a service consultation
          </Link>
        </div>
      </section>
    </>
  )
}
