import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion, isTouch } from '../lib/motion'
import { CASE_STUDIES } from '../data/content'

export default function Work() {
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  // Cards reveal as they scroll into view — no carousel, no clipping.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const cards = gridRef.current.querySelectorAll('.work-card')
    const t1 = gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
      }
    )
    const t2 = gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
      }
    )
    return () => {
      t1.scrollTrigger?.kill()
      t1.kill()
      t2.scrollTrigger?.kill()
      t2.kill()
    }
  }, [])

  const cursorAttrs = isTouch() ? {} : { 'data-cursor': 'ZOBACZ' }

  return (
    <section className="work" id="work">
      <div className="work-header">
        <span className="section-label">( WYBRANE REALIZACJE )</span>
        <span className="work-count">{String(CASE_STUDIES.length).padStart(2, '0')} PROJEKTY</span>
      </div>

      <div ref={gridRef} className="work-grid">
        {CASE_STUDIES.map((p, i) => (
          <Link key={p.slug} to={`/realizacje/${p.slug}`} className="work-card" {...cursorAttrs}>
            <div className="work-card-media">
              <img
                src={p.img}
                width={p.w}
                height={p.h}
                alt={`${p.name} — ${p.client}`}
                loading={i > 1 ? 'lazy' : 'eager'}
                draggable="false"
              />
              <span className="work-card-tag" aria-hidden="true">ZOBACZ →</span>
            </div>
            <span className="work-card-index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="work-card-title">{p.name}</h3>
            <div className="work-card-meta">
              <span>{p.client}</span>
              <span className="sep" aria-hidden="true">·</span>
              <span>{p.tags}</span>
              <span className="work-card-result">{p.result}</span>
            </div>
          </Link>
        ))}
      </div>

      <Link ref={ctaRef} to="/#contact" className="work-cta" data-cursor>
        <p>Twój projekt może być następny.</p>
        <span className="work-cta-arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
