const SITE = 'https://omniflux.pl'

// Per-route document meta. SPA-level SEO: titles, descriptions, canonical.
export function setMeta({ title, description, path = '/' }) {
  document.title = title
  const ensure = (selector, create) => {
    let el = document.head.querySelector(selector)
    if (!el) {
      el = create()
      document.head.appendChild(el)
    }
    return el
  }
  const desc = ensure('meta[name="description"]', () => {
    const m = document.createElement('meta')
    m.setAttribute('name', 'description')
    return m
  })
  desc.setAttribute('content', description)

  const canonical = ensure('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  })
  canonical.setAttribute('href', SITE + path)

  const og = (prop, content) => {
    const el = ensure(`meta[property="${prop}"]`, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', prop)
      return m
    })
    el.setAttribute('content', content)
  }
  og('og:title', title)
  og('og:description', description)
  og('og:url', SITE + path)
  og('og:type', 'website')
}

// Injects (or replaces) a JSON-LD block by id.
export function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function removeJsonLd(id) {
  document.getElementById(id)?.remove()
}
