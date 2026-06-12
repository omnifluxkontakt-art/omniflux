import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { POSTS } from '../data/content'
import { setMeta } from '../lib/seo'

export default function Blog() {
  useEffect(() => {
    setMeta({
      title: 'Blog — strony, SEO i marketing bez ściemy | Omniflux',
      description:
        'Piszemy o stronach internetowych, SEO i reklamie tak, jak rozmawiamy z klientami: konkretnie i bez marketingowej mgły.',
      path: '/blog',
    })
  }, [])

  return (
    <article className="page page-blog">
      <header className="page-hero">
        <span className="section-label">( BLOG )</span>
        <h1 className="page-title">Konkrety, nie content.</h1>
        <p className="page-lead">
          Odpowiadamy na pytania, które klienci naprawdę zadają — zanim je zadadzą.
        </p>
      </header>

      <div className="post-list">
        {POSTS.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="post-item" data-cursor>
            <time dateTime={p.date}>{new Date(p.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <h2>{p.title}</h2>
            <p>{p.excerpt}</p>
            <span className="post-more accent">CZYTAJ →</span>
          </Link>
        ))}
      </div>
    </article>
  )
}
