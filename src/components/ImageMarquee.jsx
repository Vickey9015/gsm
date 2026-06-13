import SafeImage from './SafeImage'
import './ImageMarquee.css'

export default function ImageMarquee({ items }) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee" aria-label="Industries we serve">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <figure key={`${item.label}-${i}`} className="marquee__item">
            <SafeImage src={item.src} alt={item.alt} />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
