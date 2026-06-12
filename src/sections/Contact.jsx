import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { splitChars } from '../lib/split'
import ContactForm from '../components/ContactForm'
import { CONTACT, SERVICES_PAGES } from '../data/content'

export default function Contact() {
  const headlineRef = useRef(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const chars = []
    headlineRef.current.querySelectorAll('.contact-line').forEach((line) => {
      splitChars(line, { mask: true }).forEach((c) => chars.push(c))
    })
    if (reduced) return

    gsap.set(chars, { yPercent: 110 })
    const tween = gsap.to(chars, {
      yPercent: 0,
      ease: 'power4.out',
      duration: 1.1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: headlineRef.current,
        start: 'top 75%',
        once: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="contact" id="contact">
      <span className="section-label">( NOWE PROJEKTY — {CONTACT.spots.toUpperCase()} )</span>
      <h2 ref={headlineRef} className="contact-headline">
        <span className="contact-line">ZACZNIJMY</span>
        <span className="contact-line contact-line--accent">WSPÓŁPRACĘ</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-form-col">
          <ContactForm />
        </div>
        <div className="contact-info-col">
          <p className="contact-personal">
            Twoje zapytanie trafia prosto do osoby, która poprowadzi projekt —
            nie do handlowca ani skrzynki „biuro@".
          </p>
          <a href={`mailto:${CONTACT.email}`} className="contact-email" data-magnetic="0.2" data-cursor>
            {CONTACT.email}
          </a>
          <a href={CONTACT.phoneHref} className="contact-phone" data-cursor>
            {CONTACT.phone}
          </a>
          <span className="contact-note">
            Wolisz rozmowę? Zadzwoń w dni robocze 9–17 albo napisz, o której oddzwonić.
          </span>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-col">
          <span className="footer-head">STUDIO</span>
          <a href="#work" className="footer-link" data-cursor>Realizacje</a>
          <a href="#services" className="footer-link" data-cursor>Oferta</a>
          <Link to="/cennik" className="footer-link" data-cursor>Cennik</Link>
          <Link to="/blog" className="footer-link" data-cursor>Blog</Link>
        </div>
        <div className="footer-col">
          <span className="footer-head">USŁUGI</span>
          {SERVICES_PAGES.map((s) => (
            <Link key={s.slug} to={`/${s.slug}`} className="footer-link" data-cursor>
              {s.name.charAt(0) + s.name.slice(1).toLowerCase()}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <span className="footer-head">SOCIAL</span>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link" data-cursor>Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-link" data-cursor>Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link" data-cursor>LinkedIn</a>
        </div>
        <div className="footer-col footer-col--right">
          <span className="footer-head">OMNIFLUX® {new Date().getFullYear()}</span>
          <Link to="/polityka-prywatnosci" className="footer-link" data-cursor>Polityka prywatności</Link>
          <span className="footer-note">Tworzone z obsesją w Krakowie</span>
          <span className="footer-note">50.0647° N, 19.9450° E</span>
        </div>
      </footer>
    </section>
  )
}
