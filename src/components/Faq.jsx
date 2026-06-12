import { useEffect, useState } from 'react'
import { FAQ } from '../data/content'
import { setJsonLd, removeJsonLd } from '../lib/seo'

export default function Faq() {
  const [open, setOpen] = useState(0)

  useEffect(() => {
    setJsonLd('faq-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    return () => removeJsonLd('faq-jsonld')
  }, [])

  return (
    <section className="faq" id="faq">
      <span className="section-label">( PYTANIA I ODPOWIEDZI )</span>
      <div className="faq-list">
        {FAQ.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
              <button
                className="faq-q"
                data-cursor
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '—' : '+'}</span>
              </button>
              <div className="faq-a" hidden={!isOpen}>
                <p>{f.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
