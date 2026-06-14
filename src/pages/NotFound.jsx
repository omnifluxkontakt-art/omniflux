import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../data/content'
import { setMeta } from '../lib/seo'

export default function NotFound() {
  useEffect(() => {
    setMeta({
      title: 'Nie znaleziono strony (404) | Omniflux',
      description: 'Ta strona nie istnieje lub została przeniesiona.',
      path: '/404',
    })
  }, [])

  return (
    <article className="page page-legal notfound">
      <header className="page-hero">
        <span className="section-label">( BŁĄD 404 )</span>
        <h1 className="page-title">Tej strony nie ma.</h1>
        <p className="page-lead">
          Link mógł się zmienić albo strona została przeniesiona. Wróćmy na właściwe tory.
        </p>
      </header>

      <section className="page-cta">
        <h2>Zacznijmy od początku</h2>
        <p>Wróć na stronę główną albo napisz do nas — chętnie pomożemy.</p>
        <Link to="/" className="btn-accent" data-magnetic="0.25" data-cursor>
          WRÓĆ NA START →
        </Link>
        <span className="page-cta-alt">
          albo napisz: <a href={`mailto:${CONTACT.email}`} data-cursor>{CONTACT.email}</a>
        </span>
      </section>
    </article>
  )
}
