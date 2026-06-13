import { useInView } from '../hooks/useInView'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
}) {
  const [ref, inView] = useInView()
  const dirClass = direction === 'up' ? '' : ` reveal--${direction}`

  return (
    <Tag
      ref={ref}
      className={`reveal${dirClass} ${inView ? 'reveal--visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
