import { Link } from 'react-router-dom'

const SERVICES = [
  {
    slug: 'strony-internetowe',
    name: 'STRONY WWW',
    detail: 'Szybkie, nowoczesne, projektowane pod Twój cel sprzedażowy — nie pod szablon',
  },
  {
    slug: 'google-ads',
    name: 'GOOGLE ADS',
    detail: 'Kampanie na konkretne zapytania — klienci gotowi do zakupu, mierzalne wyniki',
  },
  {
    slug: 'seo',
    name: 'SEO',
    detail: 'Widoczność w Google, która sprzedaje 24/7 — bez budżetu reklamowego',
  },
  {
    slug: 'social-media',
    name: 'SOCIAL MEDIA',
    detail: 'Treści, które budują rozpoznawalność i zaufanie do Twojej marki',
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <span className="section-label">( OFERTA )</span>
      <ul className="services-list">
        {SERVICES.map((s, i) => (
          <li key={s.slug}>
            <Link to={`/${s.slug}`} className="service-row" data-cursor="WIĘCEJ">
              <span className="service-index">0{i + 1}</span>
              <span className="service-name">
                <span className="service-name-base">{s.name}</span>
                <span className="service-name-sweep" aria-hidden="true">{s.name}</span>
              </span>
              <span className="service-detail">{s.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
