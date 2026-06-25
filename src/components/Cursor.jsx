import { useEffect, useRef } from 'react'
import { gsap, isTouch, prefersReducedMotion } from '../lib/motion'

export default function Cursor() {
  const layerRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (isTouch()) return
    const reduced = prefersReducedMotion()
    const layer = layerRef.current
    const dot = dotRef.current
    const ring = ringRef.current

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (e) => {
      layer.classList.add('is-ready')
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // Fade the cursor out when the pointer leaves the window so it doesn't
    // stick at an edge; it returns on the next move.
    const onLeave = () => layer.classList.remove('is-ready')
    document.addEventListener('mouseleave', onLeave)

    // Hover states: any [data-cursor] ancestor sets the mode.
    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const mode = target.dataset.cursor
        ring.classList.add('is-active')
        if (mode && mode !== 'true') {
          labelRef.current.textContent = mode
          ring.classList.add('has-label')
        }
      } else {
        ring.classList.remove('is-active', 'has-label')
      }
    }
    window.addEventListener('pointerover', onOver, { passive: true })

    // Hide the native cursor only AFTER the listeners are live, so a failure
    // during setup can never strand the user with an invisible cursor.
    document.documentElement.classList.add('has-custom-cursor')

    // Magnetic elements.
    const magnets = []
    const bindMagnets = () => {
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        if (el.dataset.magneticBound) return
        el.dataset.magneticBound = '1'
        const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
        const strength = parseFloat(el.dataset.magnetic) || 0.35
        const move = (e) => {
          if (reduced) return
          const r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * strength)
          yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('pointermove', move, { passive: true })
        el.addEventListener('pointerleave', leave, { passive: true })
        magnets.push({ el, move, leave })
      })
    }
    bindMagnets()
    const mo = new MutationObserver(bindMagnets)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      mo.disconnect()
      magnets.forEach(({ el, move, leave }) => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
        delete el.dataset.magneticBound
      })
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label"></span>
      </div>
      <div ref={dotRef} className="cursor-dot"></div>
    </div>
  )
}
