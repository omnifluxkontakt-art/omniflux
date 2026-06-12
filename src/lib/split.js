// Minimal SplitText replacement: wraps chars/words/lines in spans.

export function splitChars(el, { mask = false } = {}) {
  const text = el.textContent
  el.textContent = ''
  el.setAttribute('aria-label', text)
  const chars = []
  for (const ch of text) {
    const span = document.createElement('span')
    span.className = 'char'
    span.setAttribute('aria-hidden', 'true')
    span.textContent = ch === ' ' ? ' ' : ch
    if (mask) {
      const wrap = document.createElement('span')
      wrap.className = 'char-mask'
      wrap.setAttribute('aria-hidden', 'true')
      wrap.appendChild(span)
      el.appendChild(wrap)
    } else {
      el.appendChild(span)
    }
    chars.push(span)
  }
  return chars
}

export function splitWords(el) {
  const text = el.textContent.trim()
  el.textContent = ''
  el.setAttribute('aria-label', text)
  const words = []
  text.split(/\s+/).forEach((w, i, arr) => {
    const span = document.createElement('span')
    span.className = 'word'
    span.setAttribute('aria-hidden', 'true')
    span.textContent = w
    el.appendChild(span)
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '))
    words.push(span)
  })
  return words
}

// Wraps each line of a multi-line headline (already split by <br> markers
// supplied as an array of strings) in mask + inner spans.
export function buildMaskedLines(el, lines) {
  el.textContent = ''
  el.setAttribute('aria-label', lines.join(' '))
  return lines.map((line) => {
    const mask = document.createElement('span')
    mask.className = 'line-mask'
    mask.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('span')
    inner.className = 'line-inner'
    inner.innerHTML = line
    mask.appendChild(inner)
    el.appendChild(mask)
    return inner
  })
}
