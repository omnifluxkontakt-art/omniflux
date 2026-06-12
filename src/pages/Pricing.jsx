import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRICING, CONTACT } from '../data/content'
import { setMeta } from '../lib/seo'

export default function Pricing() {
  useEffect(() => {
    setMeta({
      title: 'Cennik stron internetowych — przejrzyste widełki | Omniflux',
      description:
        'Ile kosztuje strona internetowa w Omniflux? Przejrzyste widełki cenowe: strona wizytówkowa, firmowa, sklep. Bez gwiazdek i ukrytych kosztów. Wycena w 24 h.',
      path: '/cennik',
    })
  }, [])

  return (
    <article className="page page-pricing">
      <header className="page-hero">
        <span className="section-label">( CENNIK )</span>
        <h1 className="page-title">Przejrzyste widełki. Zero gwiazdek.</h1>
        <p className="page-lead">
          Każdy projekt wyceniamy indywidualnie, ale nie lubimy gry w chowanego — poniżej widełki,
          od których zaczynamy rozmowę. Dokładną kwotę dostaniesz po krótkim briefie, bezpłatnie i w 24 h.
        </p>
      </header>

      <div className="pricing-grid">
        {PRICING.map((p) => (
          <section key={p.name} className={`price-card${p.featured ? ' is-featured' : ''}`}>
            {p.badge && <span className="price-badge">{p.badge}</span>}
            <h2>{p.name}</h2>
            <p className="price-value">{p.price}</p>
            <p className="price-desc">{p.desc}</p>
            <ul className="price-features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link to="/#contact" className="price-cta" data-cursor>
              ZAPYTAJ O TEN PAKIET →
            </Link>
          </section>
        ))}
      </div>

      <p className="pricing-note">
        Google Ads, SEO i social media rozliczamy miesięcznie — stawka zależy od zakresu i budżetu
        reklamowego. <Link to="/#contact" data-cursor>Napisz</Link> albo zadzwoń{' '}
        <a href={CONTACT.phoneHref} data-cursor>{CONTACT.phone}</a>, a policzymy to dla Twojej skali.
      </p>
    </article>
  )
}
