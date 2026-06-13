import { useState } from 'react'
import { imageFallback } from '../data/images'

/** Plain img with fallback — for marquee, backgrounds, category cards */
export default function SafeImage({ src, alt = '', className = '', ...props }) {
  const [imgSrc, setImgSrc] = useState(src)

  function handleError() {
    if (imgSrc !== imageFallback) {
      setImgSrc(imageFallback)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={handleError}
      {...props}
    />
  )
}
