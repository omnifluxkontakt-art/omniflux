import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { TESTIMONIALS, STATS } from '../data/content'

export default function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const cards = ref.current.querySelectorAll('.t-card, .stat')
    gsap.set(cards, { autoAlpha: 0, y: 36 })
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 78%',
      once: true,
      onEnter: () =>
        gsap.to(cards, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
    })
    return () => st.kill()
  }, [])

  return (
    <section ref={ref} className="testimonials" id="opinie">
      <span className="section-label">( CO MÓWIĄ KLIENCI )</span>
      <div className="t-grid">
        {TESTIMONIALS.map((t) => (
          <figure key={t.author} className="t-card">
            <blockquote>„{t.quote}"</blockquote>
            <figcaption>
              <span className="t-author">{t.author}</span>
              <span className="t-role">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
