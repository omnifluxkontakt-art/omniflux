import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { scramble } from '../lib/scramble'

// Words marked with * get the accent + scramble treatment.
const STATEMENT =
  'Jesteśmy Omniflux. Tworzymy cyfrowe produkty, które *skalują* Twój biznes: strony szybkie jak myśl, widoczne w *Google* i zaprojektowane pod *konwersję*. Zero szablonów. Każdy piksel pracuje na Twoją sprzedaż.'

export default function Manifesto() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const reduced = prefersReducedMotion()

    // Build word spans, flagging accent words.
    const words = []
    el.textContent = ''
    el.setAttribute('aria-label', STATEMENT.replaceAll('*', ''))
    STATEMENT.split(/\s+/).forEach((raw, i, arr) => {
      const accent = raw.includes('*')
      const clean = raw.replaceAll('*', '')
      const span = document.createElement('span')
      span.className = accent ? 'word word--accent' : 'word'
      span.setAttribute('aria-hidden', 'true')
      span.textContent = clean
      el.appendChild(span)
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '))
      words.push(span)
    })

    if (reduced) return

    gsap.set(words, { autoAlpha: 0, y: 30 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.045,
          onStart: () => {
            words.forEach((w, i) => {
              if (w.classList.contains('word--accent')) {
                setTimeout(() => scramble(w, { duration: 700 }), i * 45 + 150)
              }
            })
          },
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section className="manifesto">
      <span className="section-label">( MANIFEST )</span>
      <p ref={ref} className="manifesto-text" data-skew></p>
    </section>
  )
}
