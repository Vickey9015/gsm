import AnimatedImage from './AnimatedImage'
import SafeImage from './SafeImage'
import ScrollReveal from './ScrollReveal'
import './PageHero.css'

/**
 * Page hero variants:
 * - editorial: About — framed image, highlights, accent typography
 * - cinematic: Services — full-bleed background + panel
 * - mosaic: Industries — copy + 2×2 industry image grid
 * - card: Contact — split card layout
 * - split: fallback
 */
export default function PageHero({
  variant = 'split',
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  highlights = [],
  mosaicImages = [],
  visual,
  children,
}) {
  const baseClass = `page-hero page-hero--${variant}`

  const copy = (
    <>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="page-hero__title">{title}</h1>
      {lead && <p className="page-hero__lead">{lead}</p>}
      {children}
    </>
  )

  if (variant === 'editorial') {
    return (
      <section className={baseClass}>
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container page-hero__editorial-grid">
          <ScrollReveal className="page-hero__editorial-content">
            <div className="page-hero__rule" aria-hidden="true" />
            {copy}
            {highlights.length > 0 && (
              <ul className="page-hero__highlights">
                {highlights.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </ScrollReveal>
          {(visual || image) && (
            <ScrollReveal direction="right" delay={100} className="page-hero__editorial-visual">
              <div className={`page-hero__frame${visual ? ' page-hero__frame--graphic' : ''}`}>
                {visual || (
                  <AnimatedImage
                    src={image}
                    alt={imageAlt || ''}
                    variant="reveal"
                    className="page-hero__editorial-img"
                  />
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'mosaic') {
    return (
      <section className={baseClass}>
        <div className="page-hero__mosaic-glow" aria-hidden="true" />
        <div className="container page-hero__mosaic-grid">
          <ScrollReveal className="page-hero__mosaic-content">
            {copy}
            {highlights.length > 0 && (
              <ul className="page-hero__highlights page-hero__highlights--inline">
                {highlights.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </ScrollReveal>
          <ScrollReveal direction="right" delay={80} className="page-hero__mosaic-gallery">
            {mosaicImages.length > 0 ? (
              <div className="page-hero__mosaic-tiles">
                {mosaicImages.map((item, i) => (
                  <figure
                    key={item.label}
                    className={`page-hero__mosaic-tile page-hero__mosaic-tile--${i + 1}`}
                  >
                    <SafeImage src={item.src} alt={item.alt} />
                    <figcaption>{item.label}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              image && (
                <AnimatedImage
                  src={image}
                  alt={imageAlt || ''}
                  variant="reveal"
                  className="page-hero__mosaic-fallback"
                />
              )
            )}
          </ScrollReveal>
        </div>
      </section>
    )
  }

  if (variant === 'cinematic') {
    return (
      <section className={baseClass}>
        {image && (
          <div className="page-hero__backdrop" aria-hidden="true">
            <SafeImage src={image} alt="" />
          </div>
        )}
        <div className="page-hero__scrim" aria-hidden="true" />
        <div className="container">
          <ScrollReveal className="page-hero__panel">{copy}</ScrollReveal>
        </div>
      </section>
    )
  }

  if (variant === 'banner') {
    return (
      <section className={baseClass}>
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <ScrollReveal className="page-hero__banner-copy">{copy}</ScrollReveal>
          {image && (
            <ScrollReveal delay={100} className="page-hero__banner-media">
              <AnimatedImage
                src={image}
                alt={imageAlt || ''}
                variant="ken-burns"
                className="page-hero__banner-img anim-img--wide"
              />
            </ScrollReveal>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'card') {
    return (
      <section className={baseClass}>
        <div className="container">
          <div className="page-hero__card-shell">
            {image && (
              <ScrollReveal direction="left" className="page-hero__card-media">
                <AnimatedImage
                  src={image}
                  alt={imageAlt || ''}
                  variant="reveal"
                  className="page-hero__card-img"
                />
              </ScrollReveal>
            )}
            <ScrollReveal direction="right" delay={80} className="page-hero__card-body">
              {copy}
            </ScrollReveal>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={baseClass}>
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container page-hero__layout">
        <ScrollReveal className="page-hero__content">{copy}</ScrollReveal>
        {image && (
          <ScrollReveal direction="right" delay={80} className="page-hero__visual">
            <AnimatedImage
              src={image}
              alt={imageAlt || ''}
              variant="reveal"
              className="page-hero__img"
            />
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
