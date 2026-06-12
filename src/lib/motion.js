import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () =>
  window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window

export const isLowPower = () =>
  (navigator.hardwareConcurrency || 8) <= 4 ||
  (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
  isTouch()

let lenis = null

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  lenis.stop()
  return lenis
}

export const getLenis = () => lenis

// Normalized scroll velocity (-1..1-ish), smoothed. Drives skew, marquee, RGB shift.
const vel = { current: 0, target: 0 }
let velTicking = false

export function startVelocityTracking() {
  if (velTicking) return
  velTicking = true
  gsap.ticker.add(() => {
    const raw = lenis ? lenis.velocity : 0
    vel.target = gsap.utils.clamp(-1, 1, raw / 60)
    vel.current += (vel.target - vel.current) * 0.12
  })
}

export const getVelocity = () => vel.current

export { gsap, ScrollTrigger }
