import { useState } from 'react'
import { CONTACT } from '../data/content'

const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`

const TOPICS = ['Strona internetowa', 'Sklep internetowy', 'Google Ads', 'SEO', 'Social media', 'Coś innego']
const BUDGETS = ['do 3 000 zł', '3 000 – 6 000 zł', '6 000 – 12 000 zł', 'powyżej 12 000 zł', 'jeszcze nie wiem']

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (data._gotcha) return // honeypot
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Wycena: ${data.topic} — ${data.name}`,
          _template: 'table',
          ...data,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <p className="form-done-head">Dziękujemy — brief doleciał.</p>
        <p>Odezwiemy się w ciągu 24 h z konkretną wyceną albo pytaniami doprecyzowującymi.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="form-field">
          <span>Imię / firma</span>
          <input name="name" type="text" required maxLength="120" placeholder="np. Anna / Studio XYZ" />
        </label>
        <label className="form-field">
          <span>E-mail lub telefon</span>
          <input name="contact" type="text" required maxLength="120" placeholder="gdzie mamy odpisać?" />
        </label>
      </div>
      <div className="form-row">
        <label className="form-field">
          <span>Czego potrzebujesz?</span>
          <select name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span>Orientacyjny budżet</span>
          <select name="budget" defaultValue={BUDGETS[4]}>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="form-field">
        <span>Kilka słów o projekcie (opcjonalnie)</span>
        <textarea name="message" rows="4" maxLength="2000" placeholder="Co ma się wydarzyć? Masz stronę? Termin?" />
      </label>
      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="form-hp" aria-hidden="true" />
      <div className="form-actions">
        <button type="submit" className="form-submit" data-magnetic="0.25" data-cursor disabled={status === 'sending'}>
          {status === 'sending' ? 'WYSYŁANIE…' : 'WYŚLIJ I ODBIERZ WYCENĘ →'}
        </button>
        <span className="form-note">Bezpłatnie i bez zobowiązań. Odpowiadamy w 24 h.</span>
      </div>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Coś poszło nie tak. Napisz bezpośrednio: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> albo zadzwoń{' '}
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
        </p>
      )}
    </form>
  )
}
