// Katakana + digits — the Matrix rain alphabet.
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789#$%'

// Scrambles element text, resolving letters left to right.
export function scramble(el, { duration = 800 } = {}) {
  const original = el.dataset.text || el.textContent
  el.dataset.text = original
  const start = performance.now()
  let raf

  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration)
    const resolved = Math.floor(p * original.length)
    let out = ''
    for (let i = 0; i < original.length; i++) {
      if (original[i] === ' ') out += ' '
      else if (i < resolved) out += original[i]
      else out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
    }
    el.textContent = out
    if (p < 1) raf = requestAnimationFrame(tick)
    else el.textContent = original
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}
