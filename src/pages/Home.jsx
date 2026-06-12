import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis, ScrollTrigger } from '../lib/motion'
import { setMeta } from '../lib/seo'
import Hero from '../sections/Hero'
import Manifesto from '../sections/Manifesto'
import Work from '../sections/Work'
import Testimonials from '../components/Testimonials'
import Services from '../sections/Services'
import Studio from '../sections/Studio'
import Faq from '../components/Faq'
import Contact from '../sections/Contact'

export default function Home({ revealed }) {
  const location = useLocation()

  useEffect(() => {
    setMeta({
      title: 'Omniflux® — Strony, które sprzedają | Web studio Kraków',
      description:
        'Web studio z Krakowa. Tworzymy szybkie strony, kampanie Google Ads i SEO, które realnie skalują Twój biznes. Bezpłatna wycena w 24 h.',
      path: '/',
    })
  }, [])

  // Smooth-scroll to #hash targets (also when arriving from a subpage).
  useEffect(() => {
    if (!location.hash || !revealed) return
    const target = document.querySelector(location.hash)
    if (!target) return
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(target, { duration: 1.4 })
      else target.scrollIntoView()
    }, 120)
    return () => clearTimeout(t)
  }, [location, revealed])

  return (
    <>
      <Hero revealed={revealed} />
      <Manifesto />
      <Work />
      <Testimonials />
      <Services />
      <Studio />
      <Faq />
      <Contact />
    </>
  )
}
