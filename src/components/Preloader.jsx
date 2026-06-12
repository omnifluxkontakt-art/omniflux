import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { splitChars } from '../lib/split'

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const wordRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const reduced = prefersReducedMotion()

    if (reduced) {
      const t = setTimeout(() => {
        gsap.to(root, { autoAlpha: 0, duration: 0.5, onComplete })
      }, 400)
      return () => clearTimeout(t)
    }

    const chars = splitChars(wordRef.current, { mask: true })
    const counter = { value: 0 }
    const tl = gsap.timeline()

    tl.set(chars, { yPercent: 110 })
      .to(chars, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.07,
      })
      .to(
        counter,
        {
          value: 100,
          duration: 2.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
          },
        },
        0.2
      )
      // The split: letters exit through their masks, the seam line flashes,
      // then the two halves slide apart.
      .to(chars, { yPercent: -110, duration: 0.55, ease: 'power3.in', stagger: 0.035 }, '+=0.15')
      .to(counterRef.current, { autoAlpha: 0, duration: 0.3 }, '<')
      .set(root, { background: 'transparent' })
      .to('.preloader-seam', { scaleX: 1, duration: 0.45, ease: 'power3.inOut' })
      .to('.preloader-half--top', { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, '+=0.08')
      .to('.preloader-half--bottom', { yPercent: 100, duration: 1.0, ease: 'power4.inOut' }, '<')
      .to('.preloader-seam', { autoAlpha: 0, duration: 0.3 }, '<+=0.4')
      .call(onComplete, [], '<+=0.25')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader-half preloader-half--top"></div>
      <div className="preloader-half preloader-half--bottom"></div>
      <div className="preloader-seam"></div>
      <div className="preloader-content">
        <h1 ref={wordRef} className="preloader-word">OMNIFLUX</h1>
      </div>
      <div ref={counterRef} className="preloader-counter">000</div>
    </div>
  )
}
