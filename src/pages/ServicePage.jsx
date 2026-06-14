import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SERVICES_PAGES, CONTACT } from '../data/content'
import { setMeta } from '../lib/seo'
import NotFound from './NotFound'

export default function ServicePage() {
  const { slug } = useParams()
  const svc = SERVICES_PAGES.find((s) => s.slug === slug)

  useEffect(() => {
    if (!svc) return
    setMeta({ title: svc.title, description: svc.metaDescription, path: `/${svc.slug}` })
  }, [svc])

  if (!svc) return <NotFound />

  const others = SERVICES_PAGES.filter((s) => s.slug !== slug)

  return (
    <article className="page page-service">
      <header className="page-hero">
        <span className="section-label">( OFERTA — {svc.name} )</span>
        <h1 className="page-title">{svc.h1}</h1>
        <p className="page-lead">{svc.lead}</p>
      </header>

      <div className="service-points">
        {svc.points.map((pt, i) => (
          <section key={pt.h} className="service-point">
            <span className="service-point-index">0{i + 1}</span>
            <h2>{pt.h}</h2>
            <p>{pt.p}</p>
          </section>
        ))}
      </div>

      <section className="page-cta">
        <h2>Brzmi jak to, czego szukasz?</h2>
        <p>Napisz dwa zdania o swoim biznesie — wrócimy z konkretem w 24 h.</p>
        <Link to="/#contact" className="btn-accent" data-magnetic="0.25" data-cursor>
          {svc.cta.toUpperCase()} →
        </Link>
        <span className="page-cta-alt">
          albo zadzwoń: <a href={CONTACT.phoneHref} data-cursor>{CONTACT.phone}</a>
        </span>
      </section>

      <aside className="case-next">
        <span className="section-label">( POZOSTAŁE USŁUGI )</span>
        <div className="case-next-links">
          {others.map((o) => (
            <Link key={o.slug} to={`/${o.slug}`} className="case-next-link" data-cursor>
              {o.name} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </aside>
    </article>
  )
}
