import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CASE_STUDIES, CONTACT } from '../data/content'
import { setMeta } from '../lib/seo'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const cs = CASE_STUDIES.find((c) => c.slug === slug)

  useEffect(() => {
    if (!cs) return
    setMeta({
      title: `${cs.name} — case study | Omniflux`,
      description: cs.intro,
      path: `/realizacje/${cs.slug}`,
    })
  }, [cs])

  if (!cs) return <NotFound />

  const others = CASE_STUDIES.filter((c) => c.slug !== slug)

  return (
    <article className="page page-case">
      <header className="page-hero">
        <span className="section-label">( CASE STUDY — {cs.client.toUpperCase()} )</span>
        <h1 className="page-title">{cs.name}</h1>
        <p className="page-lead">{cs.intro}</p>
        <ul className="case-scope" aria-label="Zakres prac">
          {cs.scope.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </header>

      <div className="case-media">
        <img src={cs.img} width={cs.w} height={cs.h} alt={`${cs.name} — ${cs.client}`} draggable="false" />
      </div>

      <div className="case-body">
        <section className="case-block">
          <h2>Wyzwanie</h2>
          <p>{cs.challenge}</p>
        </section>
        <section className="case-block">
          <h2>Co zrobiliśmy</h2>
          <ul className="case-list">
            {cs.solution.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section className="case-block case-result">
          <h2>Efekt</h2>
          <p className="case-result-line accent">{cs.result}</p>
        </section>
      </div>

      <aside className="case-next">
        <span className="section-label">( ZOBACZ TEŻ )</span>
        <div className="case-next-links">
          {others.map((o) => (
            <Link key={o.slug} to={`/realizacje/${o.slug}`} className="case-next-link" data-cursor>
              {o.name} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </aside>

      <section className="page-cta">
        <h2>Chcesz podobnego efektu u siebie?</h2>
        <p>Opowiedz nam o swoim projekcie — wycena jest bezpłatna i konkretna.</p>
        <Link to="/#contact" className="btn-accent" data-magnetic="0.25" data-cursor>
          BEZPŁATNA WYCENA →
        </Link>
        <span className="page-cta-alt">
          albo napisz: <a href={`mailto:${CONTACT.email}`} data-cursor>{CONTACT.email}</a>
        </span>
      </section>
    </article>
  )
}
