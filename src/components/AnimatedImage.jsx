import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { imageFallback } from '../data/images'
import './AnimatedImage.css'

export default function AnimatedImage({
  src,
  alt,
  variant = 'reveal',
  floatDelay = 0,
  className = '',
  caption,
}) {
  const [ref, inView] = useInView({ threshold: 0.05, rootMargin: '0px 0px -24px 0px' })
  const [imgSrc, setImgSrc] = useState(src)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setFailed(false)
  }, [src])

  function handleError() {
    if (!failed && imgSrc !== imageFallback) {
      setFailed(true)
      setImgSrc(imageFallback)
    }
  }

  return (
    <figure
      ref={ref}
      className={`anim-img anim-img--${variant} ${inView ? 'anim-img--in' : ''} ${className}`.trim()}
      style={{ '--float-delay': `${floatDelay}s` }}
    >
      <div className="anim-img__frame">
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={handleError}
        />
        <span className="anim-img__shine" aria-hidden="true" />
        <span className="anim-img__ring" aria-hidden="true" />
      </div>
      {caption && <figcaption className="anim-img__caption">{caption}</figcaption>}
    </figure>
  )
}
