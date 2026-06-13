import { useState } from 'react'
import PageHero from '../components/PageHero'
import AnimatedImage from '../components/AnimatedImage'
import ScrollReveal from '../components/ScrollReveal'
import { siteImages } from '../data/images'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    service: 'audit',
    message: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        variant="card"
        eyebrow="Contact"
        title="Start a strategic conversation"
        lead="We build long-term partnerships — not one-off transactions. Share your business context and we will respond with focus and clarity."
        image={siteImages.pageHero.contact}
        imageAlt="Professional consultation meeting"
      />

      <section className="section contact-section">
        <div className="container contact__grid">
          <ScrollReveal className="contact__aside">
            <AnimatedImage
              src={siteImages.contact.src}
              alt={siteImages.contact.alt}
              variant="float"
              floatDelay={0.5}
              className="contact__photo"
            />
            <div className="contact__info">
              <h2>How we engage</h2>
              <p>
                Most partnerships begin with our Growth & Market Positioning Audit — a structured
                entry point that reveals bottlenecks and opens the door to ongoing strategy work.
              </p>
              <ul className="contact__points">
                <li>Strategic advisors, not vendor deliverables</li>
                <li>Focused on emerging markets & expansion</li>
                <li>Diagnose before we execute</li>
              </ul>
              <div className="contact__process">
                <span>Our process</span>
                <p>Diagnose → Strategize → Execute → Scale</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <div className="contact__form-wrap">
              {submitted ? (
                <div className="contact__success">
                  <h3>Thank you</h3>
                  <p>
                    Your message has been received. We will review your inquiry and respond shortly.
                    (Connect this form to your email or CRM when you go live.)
                  </p>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Business name"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="service">Service of interest</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="audit">Growth & Market Positioning Audit</option>
                      <option value="strategy">Business Growth Strategy</option>
                      <option value="market-entry">Market Entry & Feasibility</option>
                      <option value="brand">Strategic Brand Positioning</option>
                      <option value="general">General inquiry</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label htmlFor="message">Tell us about your business</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Industry, growth goals, markets you serve..."
                    />
                  </div>
                  <button type="submit" className="btn btn--primary contact__submit">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
