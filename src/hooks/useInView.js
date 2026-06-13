import { useEffect, useRef, useState } from 'react'

function isInViewport(el, rootMargin = '0px 0px -48px 0px') {
  const rect = el.getBoundingClientRect()
  const margin = parseInt(rootMargin.split(' ')[2] || '0', 10) || 0
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh - margin && rect.bottom > 0
}

export function useInView({ threshold = 0.08, rootMargin = '0px 0px -48px 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (isInViewport(el, rootMargin)) {
      setInView(true)
      if (once) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
