import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion, isTouch } from '../lib/motion'
import { CASE_STUDIES } from '../data/content'

export default function Work() {
  const trackRef = useRef(null)
  const draggedRef = useRef(false)
  const reduced = useRef(
    typeof window !== 'undefined' && prefersReducedMotion()
  ).current

  // Infinite carousel: drifts slowly on its own, pauses on hover, can be
  // dragged, accelerates with scroll momentum. No pinning, no hijacked scroll.
  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    let x = 0
    const speed = { current: 0, target: 1 }
    const drag = { active: false, startX: 0, lastX: 0, moved: 0 }

    const onDown = (e) => {
      drag.active = true
      drag.startX = drag.lastX = e.clientX
      drag.moved = 0
      speed.target = 0
    }
    const onMove = (e) => {
      if (!drag.active) return
      const dx = e.clientX - drag.lastX
      drag.lastX = e.clientX
      drag.moved += Math.abs(dx)
      x += dx
      if (drag.moved > 8) draggedRef.current = true
    }
    const onUp = () => {
      drag.active = false
      // Let the click event (fired right after pointerup) read the flag,
      // then clear it.
      setTimeout(() => (draggedRef.current = false), 0)
    }
    track.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)

    const tick = (_, deltaMs) => {
      const frames = deltaMs * 0.06
      // Steady autoplay, fully decoupled from page scroll. :hover is queried
      // per-frame — enter/leave events go stale when the page scrolls under
      // a stationary cursor and would freeze the carousel.
      speed.target = drag.active || track.matches(':hover') ? 0 : 1
      speed.current += (speed.target - speed.current) * 0.05
      x -= 0.7 * speed.current * frames
      const half = track.scrollWidth / 2
      if (half > 0) {
        if (-x >= half) x += half
        if (x > 0) x -= half
      }
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      track.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [reduced])

  // A drag should not count as a click on the case-study link.
  const guardClick = (e) => {
    if (draggedRef.current) e.preventDefault()
  }

  const cursorAttrs = isTouch() ? {} : { 'data-cursor': 'ZOBACZ' }
  const copies = reduced ? [0] : [0, 1]

  return (
    <section className="work" id="work">
      <div className="work-header">
        <span className="section-label">( WYBRANE REALIZACJE )</span>
        <span className="work-count">PRZECIĄGNIJ LUB KLIKNIJ PROJEKT</span>
      </div>
      <div className="work-viewport">
        <div ref={trackRef} className="work-track">
          {copies.map((copy) => (
            <Fragment key={copy}>
              {CASE_STUDIES.map((p, i) => (
                <article
                  key={`${copy}-${p.slug}`}
                  className="work-item"
                  aria-hidden={copy > 0 ? 'true' : undefined}
                >
                  <Link
                    to={`/realizacje/${p.slug}`}
                    className="work-link"
                    tabIndex={copy > 0 ? -1 : undefined}
                    onClick={guardClick}
                    draggable="false"
                    {...cursorAttrs}
                  >
                    <div className="work-media">
                      <img src={p.img} alt={copy > 0 ? '' : `${p.name} — ${p.client}`} loading={copy > 0 || i > 1 ? 'lazy' : 'eager'} draggable="false" />
                    </div>
                    <div className="work-meta">
                      <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="work-title">{p.name}</h3>
                      <p className="work-info">
                        <span>{p.client}</span>
                        <span>{p.tags}</span>
                        <span className="accent">{p.result}</span>
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
              <Link
                to="/#contact"
                className="work-endcap"
                aria-hidden={copy > 0 ? 'true' : undefined}
                tabIndex={copy > 0 ? -1 : undefined}
                onClick={guardClick}
                draggable="false"
                data-cursor
              >
                <p>
                  TWÓJ PROJEKT<br />MOŻE BYĆ<br /><span className="accent">NASTĘPNY →</span>
                </p>
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
