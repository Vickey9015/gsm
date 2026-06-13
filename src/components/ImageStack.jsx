import AnimatedImage from './AnimatedImage'
import './ImageStack.css'

export default function ImageStack({ images, variant }) {
  const [main, accent] = images

  return (
    <div className={`image-stack${variant ? ` image-stack--${variant}` : ''}`}>
      <AnimatedImage
        src={main.src}
        alt={main.alt}
        variant="float"
        floatDelay={0}
        className="image-stack__main"
      />
      {accent && (
        <AnimatedImage
          src={accent.src}
          alt={accent.alt}
          variant="float"
          floatDelay={0.8}
          className="image-stack__accent"
        />
      )}
      <span className="image-stack__badge">Growth engineered</span>
    </div>
  )
}
