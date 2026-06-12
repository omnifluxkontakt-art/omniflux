import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion, isTouch } from '../lib/motion'
import { buildMaskedLines, splitChars } from '../lib/split'

const LINES = ['TWORZYMY', 'STRONY, KTÓRE', '<em>sprzedają</em>']

export default function Hero({ revealed }) {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const lineInners = buildMaskedLines(headlineRef.current, LINES)

    if (reduced) {
      gsap.set(lineInners, { yPercent: 0 })
      gsap.set(['.hero-tagline', '.hero-scroll', '.hero-badge'], { autoAlpha: 1 })
      return
    }

    gsap.set(lineInners, { yPercent: 110 })
    gsap.set(['.hero-tagline', '.hero-scroll', '.hero-badge'], { autoAlpha: 0, y: 24 })

    // Scroll choreography: headline scales down + drifts up as the next
    // section pushes in.
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    st.to(innerRef.current, { scale: 0.88, yPercent: -18, autoAlpha: 0.25, ease: 'none' })

    return () => {
      st.scrollTrigger?.kill()
      st.kill()
    }
  }, [])

  // Intro reveal once the preloader splits open.
  useEffect(() => {
    if (!revealed || prefersReducedMotion()) return
    const lineInners = headlineRef.current.querySelectorAll('.line-inner')
    const tl = gsap.timeline()
    tl.to(lineInners, {
      yPercent: 0,
      duration: 1.3,
      ease: 'power4.out',
      stagger: 0.14,
      delay: 0.1,
    })
      .to('.hero-badge', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=1.0')
      .to('.hero-tagline', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .to('.hero-scroll', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .call(setupKineticType)
    return () => tl.kill()
  }, [revealed])

  // Kinetic typography: letters repel from the cursor.
  const setupKineticType = () => {
    if (isTouch() || prefersReducedMotion()) return
    const headline = headlineRef.current
    const letters = []
    headline.querySelectorAll('.line-inner').forEach((inner) => {
      // Re-split each revealed line into chars (skip if already done).
      if (inner.dataset.kinetic) return
      inner.dataset.kinetic = '1'
      const em = inner.querySelector('em')
      const target = em || inner
      splitChars(target).forEach((c) => letters.push(c))
    })

    const quick = letters.map((c) => ({
      el: c,
      x: gsap.quickTo(c, 'x', { duration: 0.6, ease: 'power3.out' }),
      y: gsap.quickTo(c, 'y', { duration: 0.6, ease: 'power3.out' }),
    }))

    let bounds = []
    const measure = () => {
      bounds = quick.map(({ el }) => {
        const r = el.getBoundingClientRect()
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
      })
    }
    measure()
    window.addEventListener('resize', measure)

    const RADIUS = 160
    const onMove = (e) => {
      for (let i = 0; i < quick.length; i++) {
        const b = bounds[i]
        const dx = b.cx - e.clientX
        const dy = b.cy - e.clientY
        const dist = Math.hypot(dx, dy)
        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * 26
          quick[i].x((dx / (dist || 1)) * force)
          quick[i].y((dy / (dist || 1)) * force)
        } else {
          quick[i].x(0)
          quick[i].y(0)
        }
      }
    }
    headline.closest('section').addEventListener('pointermove', onMove, { passive: true })
  }

  return (
    <section ref={sectionRef} className="hero" id="top">
      <div ref={innerRef} className="hero-inner">
        <a href="#contact" className="hero-badge" data-cursor>
          <span className="hero-badge-dot" aria-hidden="true"></span>
          PRZYJMUJEMY PROJEKTY — 2 WOLNE MIEJSCA
        </a>
        <h2 ref={headlineRef} className="hero-headline" data-skew>
          TWORZYMY STRONY, KTÓRE sprzedają
        </h2>
        <p className="hero-tagline">
          Web studio z Krakowa. Projektujemy i kodujemy strony, kampanie
          i&nbsp;SEO, które skalują Twój biznes — mierzymy efekty,
          nie&nbsp;kliknięcia.
        </p>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-dot"></span>
        <span>PRZEWIŃ</span>
      </div>
    </section>
  )
}
