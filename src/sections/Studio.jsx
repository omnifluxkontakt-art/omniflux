import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, getVelocity } from '../lib/motion'
import { asset } from '../data/content'

const PROCESS = [
  {
    id: '01',
    name: '01 — Zrozumienie',
    role: 'Poznajemy Twój biznes, klientów i to, co ma się realnie wydarzyć',
  },
  {
    id: '02',
    name: '02 — Strategia',
    role: 'Plan na mierzalny efekt: struktura, treść, ścieżka klienta',
  },
  {
    id: '03',
    name: '03 — Wdrożenie',
    role: 'Design i kod w jednych rękach — bez podwykonawców, w stałym kontakcie',
  },
  {
    id: '04',
    name: '04 — Rozwój',
    role: 'Mierzymy, optymalizujemy, skalujemy — strona pracuje, my też',
  },
]

const MARQUEE = 'ZROZUMIENIE — STRATEGIA — WDROŻENIE — ROZWÓJ — KRAKÓW — OMNIFLUX — '

export default function Studio() {
  const marqueeRef = useRef(null)
  const gridRef = useRef(null)

  // Mask-wipe portraits in as they enter the viewport, staggered.
  useEffect(() => {
    const cards = gridRef.current.querySelectorAll('.team-card')
    if (prefersReducedMotion()) {
      cards.forEach((c) => c.classList.add('in-view'))
      return
    }
    let seen = 0
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          setTimeout(() => el.classList.add('in-view'), (seen++ % 2) * 140)
          io.unobserve(el)
        })
      },
      { threshold: 0.3 }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const inner = marqueeRef.current
    let x = 0
    const half = () => inner.scrollWidth / 2

    const tick = (_, delta) => {
      // Base drift + scroll-velocity boost; direction follows scroll.
      const v = getVelocity()
      const speed = 0.9 + Math.abs(v) * 2.2
      const dir = v < -0.02 ? 1 : -1
      x += dir * speed * delta * 0.06
      const h = half()
      if (x <= -h) x += h
      if (x > 0) x -= h
      inner.style.transform = `translateX(${x.toFixed(2)}px)`
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <section className="studio" id="studio">
      <div className="marquee" aria-hidden="true">
        <div ref={marqueeRef} className="marquee-inner">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>
      <span className="section-label">( JAK DZIAŁAMY )</span>
      <div ref={gridRef} className="team-grid">
        {PROCESS.map((m, i) => (
          <figure key={m.id} className={`team-card team-card--${i + 1}`} data-cursor>
            <div className="team-portrait">
              <img src={asset(`/proces/${m.id}.svg`)} alt={m.name} loading="lazy" draggable="false" />
            </div>
            <figcaption>
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
