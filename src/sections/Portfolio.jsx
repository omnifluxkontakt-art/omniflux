import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { PORTFOLIO } from '../data/content'

export default function Portfolio() {
  const gridRef = useRef(null)

  // Cards reveal as they scroll into view.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const cards = gridRef.current.querySelectorAll('.work-card')
    const t = gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
      }
    )
    return () => {
      t.scrollTrigger?.kill()
      t.kill()
    }
  }, [])

  return (
    <section className="work" id="portfolio">
      <div className="work-header">
        <span className="section-label">( WYBRANE REALIZACJE )</span>
        <span className="work-count">{String(PORTFOLIO.length).padStart(2, '0')} PROJEKTÓW</span>
      </div>

      <div ref={gridRef} className="work-grid">
        {PORTFOLIO.map((p, i) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
            data-cursor="OTWÓRZ"
          >
            <div className="work-card-media">
              <img
                src={p.img}
                width={p.w}
                height={p.h}
                alt={`${p.name} — ${p.category}`}
                loading={i > 2 ? 'lazy' : 'eager'}
                draggable="false"
              />
              <span className="work-card-tag" aria-hidden="true">OTWÓRZ ↗</span>
            </div>
            <span className="work-card-index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="work-card-title">{p.name}</h3>
            <div className="work-card-meta">
              <span>{p.category}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
