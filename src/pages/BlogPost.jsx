import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { POSTS } from '../data/content'
import { setMeta, setJsonLd, removeJsonLd } from '../lib/seo'

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)

  useEffect(() => {
    if (!post) return
    setMeta({
      title: `${post.title} | Omniflux`,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
    })
    setJsonLd('post-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      author: { '@type': 'Organization', name: 'Omniflux' },
    })
    return () => removeJsonLd('post-jsonld')
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <article className="page page-post">
      <header className="page-hero">
        <span className="section-label">( BLOG )</span>
        <h1 className="page-title page-title--post">{post.title}</h1>
        <time dateTime={post.date} className="post-date">
          {new Date(post.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </header>

      <div className="post-body">
        {post.body.map((b) => (
          <section key={b.h}>
            <h2>{b.h}</h2>
            <p>{b.p}</p>
          </section>
        ))}
      </div>

      <section className="page-cta">
        <h2>Wolisz policzyć to dla swojego projektu?</h2>
        <p>Bezpłatna, konkretna wycena w 24 h — bez zobowiązań.</p>
        <Link to="/#contact" className="btn-accent" data-magnetic="0.25" data-cursor>
          WYCEŃ SWÓJ PROJEKT →
        </Link>
      </section>
    </article>
  )
}
