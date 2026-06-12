import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import {
  gsap,
  ScrollTrigger,
  initSmoothScroll,
  getLenis,
  startVelocityTracking,
  getVelocity,
  prefersReducedMotion,
} from './lib/motion'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import ServicePage from './pages/ServicePage'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'

// Three.js ships in its own chunk; the preloader covers the gap.
const FluidBackground = lazy(() => import('./components/FluidBackground'))

const seenPreloader = () => sessionStorage.getItem('omx-preloaded') === '1'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [revealed, setRevealed] = useState(() => !isHome || seenPreloader())
  const firstRender = useRef(true)

  useEffect(() => {
    const lenis = initSmoothScroll()
    startVelocityTracking()
    if (revealed) lenis?.start()

    // Route anchor clicks through Lenis: native hash jumps teleport the page,
    // which strands hover-bound UI (cursor states, floating previews).
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      if (hash.length < 2) return
      const lenis = getLenis()
      const target = document.querySelector(hash)
      if (!lenis || !target) return
      e.preventDefault()
      lenis.scrollTo(target, { duration: 1.6 })
    }
    document.addEventListener('click', onAnchorClick)

    // Velocity skew: everything tagged [data-skew] shears slightly with
    // scroll momentum, then settles.
    let tick = null
    if (!prefersReducedMotion()) {
      const proxies = []
      const collect = () => {
        document.querySelectorAll('[data-skew]').forEach((el) => {
          if (el.dataset.skewBound) return
          el.dataset.skewBound = '1'
          proxies.push(gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3.out' }))
        })
      }
      collect()
      const mo = new MutationObserver(collect)
      mo.observe(document.body, { childList: true, subtree: true })
      tick = () => {
        const skew = gsap.utils.clamp(-4, 4, getVelocity() * 6)
        proxies.forEach((to) => to(skew))
      }
      gsap.ticker.add(tick)
      return () => {
        document.removeEventListener('click', onAnchorClick)
        gsap.ticker.remove(tick)
        mo.disconnect()
      }
    }
    return () => document.removeEventListener('click', onAnchorClick)
  }, [])

  // Route change: jump to top (unless navigating to an in-page hash) and
  // rebuild scroll measurements for the new layout.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!location.hash) {
      getLenis()?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 60)
    return () => clearTimeout(t)
  }, [location.pathname])

  const handlePreloaderDone = useCallback(() => {
    sessionStorage.setItem('omx-preloaded', '1')
    setRevealed(true)
    getLenis()?.start()
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <FluidBackground />
      </Suspense>
      <Nav revealed={revealed} />
      <main>
        <Routes>
          <Route path="/" element={<Home revealed={revealed} />} />
          <Route path="/realizacje/:slug" element={<CaseStudy />} />
          <Route path="/cennik" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/polityka-prywatnosci" element={<Privacy />} />
          <Route path="/:slug" element={<ServicePage />} />
        </Routes>
      </main>
      <Cursor />
      {!revealed && <Preloader onComplete={handlePreloaderDone} />}
    </>
  )
}
