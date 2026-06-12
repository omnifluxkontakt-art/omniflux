import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getLenis } from '../lib/motion'
import { CONTACT, SERVICES_PAGES, CASE_STUDIES } from '../data/content'

export default function Nav({ revealed }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.documentElement.classList.add('menu-open')
    } else {
      // Don't restart Lenis while the preloader still owns the scroll.
      if (revealed !== false) lenis?.start()
      document.documentElement.classList.remove('menu-open')
    }
  }, [open, revealed])

  return (
    <>
      <header className={`nav${revealed === false ? '' : ' is-visible'}`}>
        <Link to="/" className="nav-logo" data-magnetic="0.25" data-cursor>
          OMNIFLUX<sup>®</sup>
        </Link>
        <span className="nav-meta">WEB STUDIO — KRAKÓW, PL</span>
        <div className="nav-right">
          <Link to="/#contact" className="nav-cta" data-magnetic="0.35" data-cursor>
            BEZPŁATNA WYCENA
          </Link>
          <button
            className="nav-burger"
            data-magnetic="0.3"
            data-cursor
            aria-expanded={open}
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? 'ZAMKNIJ' : 'MENU'}
          </button>
        </div>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="menu-inner">
          <div className="menu-col menu-col--main">
            <span className="menu-head">MENU</span>
            <Link to="/" className="menu-link" data-cursor>Start</Link>
            <Link to="/#work" className="menu-link" data-cursor>Realizacje</Link>
            <Link to="/cennik" className="menu-link" data-cursor>Cennik</Link>
            <Link to="/blog" className="menu-link" data-cursor>Blog</Link>
            <Link to="/#contact" className="menu-link menu-link--accent" data-cursor>Kontakt</Link>
          </div>
          <div className="menu-col">
            <span className="menu-head">USŁUGI</span>
            {SERVICES_PAGES.map((s) => (
              <Link key={s.slug} to={`/${s.slug}`} className="menu-sublink" data-cursor>
                {s.name}
              </Link>
            ))}
          </div>
          <div className="menu-col">
            <span className="menu-head">CASE STUDIES</span>
            {CASE_STUDIES.map((c) => (
              <Link key={c.slug} to={`/realizacje/${c.slug}`} className="menu-sublink" data-cursor>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="menu-foot">
          <a href={`mailto:${CONTACT.email}`} data-cursor>{CONTACT.email}</a>
          <a href={CONTACT.phoneHref} data-cursor>{CONTACT.phone}</a>
          <span>{CONTACT.city}, PL</span>
        </div>
      </div>
    </>
  )
}
