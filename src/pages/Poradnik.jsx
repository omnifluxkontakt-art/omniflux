import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { splitChars } from '../lib/split'
import { CONTACT } from '../data/content'
import { setMeta } from '../lib/seo'

const STEPS = [
  {
    letter: 'A',
    title: 'Adres w Google',
    sub: 'Google Business Profile to Twoja wizytówka nr 1',
    why: { stat: '46%', note: 'wyszukiwań w Google\nto wyszukiwania lokalne' },
    points: [
      'Uzupełnij 100% profilu — godziny, opis, kategorie, zdjęcia',
      'Dodaj min. 5 aktualnych zdjęć: wnętrze, produkty, zespół',
      'Odpowiadaj na każdą opinię — pozytywną i negatywną',
      'Proś zadowolonych klientów o opinię zaraz po zakończeniu usługi',
      'Dodawaj posty z aktualnościami lub promocjami min. raz w miesiącu',
    ],
  },
  {
    letter: 'B',
    title: 'Blog i świeżość treści',
    sub: 'Google nagradza strony, które żyją',
    why: { stat: '4×', note: 'więcej szans na\nindeksowanie przy świeżych treściach' },
    points: [
      'Aktualizuj treści na stronie min. raz na kwartał',
      'Dodaj wpis blogowy lub aktualność min. raz w miesiącu',
      'Pisz o tym, czego szukają Twoi klienci — pytania, porady, problemy',
      'Używaj słów kluczowych naturalnie w tytule i nagłówkach',
      'Długość wpisu: min. 600–800 słów, żeby Google brał go poważnie',
    ],
  },
  {
    letter: 'C',
    title: 'Core Web Vitals — szybkość i mobile',
    sub: 'Powolna strona = stracony klient',
    why: { stat: '3 s', note: 'maksymalny czas\nładowania — powyżej tego klient odchodzi' },
    points: [
      'Sprawdź szybkość na pagespeed.web.dev — cel: zielone wyniki',
      '60%+ ruchu to telefony — testuj stronę na mobile co miesiąc',
      'Optymalizuj zdjęcia przed wgraniem: max 300 KB, format WebP',
      'Nie instaluj zbędnych wtyczek/widgetów — każdy spowalnia stronę',
      'Strona powinna ładować się poniżej 3 sekund na zwykłym łączu',
    ],
  },
  {
    letter: 'D',
    title: 'Dystrybucja i obecność online',
    sub: 'Im więcej miejsc mówi o Twojej stronie, tym lepiej',
    why: null,
    points: [
      'Dodaj stronę do lokalnych katalogów: Panorama Firm, Zumi, Targeo',
      'Upewnij się, że Nazwa, Adres i Telefon są identyczne wszędzie',
      'Połącz social media ze stroną (Instagram, Facebook, LinkedIn)',
      'Szukaj udziału w lokalnych artykułach lub blogach branżowych',
      'Zarejestruj się w Google Search Console (bezpłatne narzędzie)',
    ],
  },
  {
    letter: 'E',
    title: 'Efekty w liczbach',
    sub: 'Nie zarządzaj tym, czego nie mierzysz',
    why: null,
    points: [
      'Google Analytics 4 — ile osób wchodzi, skąd i co robią',
      'Google Search Console — na jakie frazy wyświetla się strona',
      'Śledź co miesiąc: sesje, czas na stronie, współczynnik odrzuceń',
      'Ustal cel (np. 50 wizyt tygodniowo z Google) i monitoruj postępy',
      'Pytaj nowych klientów: „Skąd się o nas dowiedziałeś?"',
    ],
  },
  {
    letter: 'F',
    title: 'Feedback i opinie',
    sub: 'Opinie sprzedają bardziej niż reklamy',
    why: { stat: '10+', note: 'opinii to próg\nwidoczności w Mapach Google' },
    points: [
      'Proś o opinię w Google każdego zadowolonego klienta',
      'Odpowiadaj na opinie w ciągu 24–48 godzin',
      'Dodawaj pozytywne opinie jako testimoniale na stronie',
      'Reaguj konstruktywnie na negatywne — to pokazuje profesjonalizm',
      'Cel: min. 10 opinii z oceną 4.5+, żeby być widocznym w Mapach',
    ],
  },
]

const SCHEDULE = [
  {
    period: 'Tygodniowo',
    time: 'ok. 15 min',
    items: [
      'Sprawdź wiadomości i formularze',
      'Odpowiedz na nowe opinie',
      '1 post w social media z linkiem do strony',
    ],
  },
  {
    period: 'Miesięcznie',
    time: '1–2 h',
    items: [
      'Dodaj wpis blogowy lub aktualność',
      'Sprawdź statystyki Google Analytics',
      'Dodaj nowe zdjęcia do Google Moja Firma',
      'Sprawdź działanie linków i formularzy',
    ],
  },
  {
    period: 'Kwartalnie',
    time: '2–4 h',
    items: [
      'Przejrzyj treści — czy są aktualne?',
      'Sprawdź PageSpeed i wyniki Search Console',
      'Zaktualizuj ofertę i cennik',
      'Planuj treści na kolejny kwartał',
    ],
  },
]

export default function Poradnik() {
  const heroRef   = useRef(null)
  const stepsRef  = useRef([])
  const schedRef  = useRef(null)
  const closingRef = useRef(null)

  useEffect(() => {
    setMeta({
      title: 'ABC Widoczności Twojej Strony — Poradnik Klienta | Omniflux',
      description: 'Praktyczny przewodnik dla klientów Omniflux: jak dbać o stronę, żeby przyciągała więcej klientów z Google.',
      path: '/poradnik-klienta',
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return

    // Hero headline char reveal
    const titleEl = heroRef.current?.querySelector('.guide-hero-title')
    if (titleEl) {
      const chars = splitChars(titleEl, { mask: true })
      gsap.set(chars, { yPercent: 110 })
      gsap.to(chars, {
        yPercent: 0,
        ease: 'power4.out',
        duration: 1.1,
        stagger: 0.025,
        delay: 0.2,
      })
    }

    // Subtitle + badge fade
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.guide-hero-sub, .guide-hero-badge'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15, delay: 0.6 }
    )

    // Each step card reveals on scroll
    stepsRef.current.forEach((el) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      )
      // Letter parallax
      const letter = el.querySelector('.guide-step-letter')
      if (letter) {
        gsap.to(letter, {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        })
      }
    })

    // Schedule cards stagger
    if (schedRef.current) {
      const cards = schedRef.current.querySelectorAll('.guide-sched-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: schedRef.current, start: 'top 78%', once: true },
        }
      )
    }

    // Closing fade
    if (closingRef.current) {
      gsap.fromTo(
        closingRef.current.querySelectorAll('.guide-close-line'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: closingRef.current, start: 'top 80%', once: true },
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <article className="guide">

      {/* ── Hero ── */}
      <section className="guide-hero" ref={heroRef}>
        <span className="section-label">( PORADNIK KLIENTA OMNIFLUX )</span>
        <h1 className="guide-hero-title" data-skew>
          ABC Widoczności Twojej Strony
        </h1>
        <p className="guide-hero-sub">
          Jak sprawić, żeby Twoja strona przyciągała klientów — krok po kroku.
        </p>
        <div className="guide-hero-badge">
          Strona to narzędzie, nie trofeum. Samo posiadanie to dopiero&nbsp;start.
        </div>
      </section>

      {/* ── Steps A–F ── */}
      <section className="guide-steps">
        {STEPS.map((step, i) => (
          <div
            key={step.letter}
            className="guide-step"
            ref={(el) => (stepsRef.current[i] = el)}
          >
            <span className="guide-step-letter" aria-hidden="true">{step.letter}</span>

            <div className="guide-step-left">
              <span className="guide-step-index">0{i + 1} / 06</span>
              <h2 className="guide-step-title">{step.title}</h2>
              <p className="guide-step-sub">{step.sub}</p>
              {step.why && (
                <div className="guide-step-stat">
                  <span className="guide-step-stat-num">{step.why.stat}</span>
                  <span className="guide-step-stat-note">{step.why.note}</span>
                </div>
              )}
            </div>

            <ul className="guide-step-points">
              {step.points.map((pt) => (
                <li key={pt}>
                  <span className="guide-step-dash" aria-hidden="true">—</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── Schedule ── */}
      <section className="guide-schedule" ref={schedRef}>
        <span className="section-label">( PLAN DZIAŁANIA )</span>
        <h2 className="guide-sched-title">Twój harmonogram<br />dbania o stronę</h2>
        <div className="guide-sched-grid">
          {SCHEDULE.map((col) => (
            <div className="guide-sched-card" key={col.period}>
              <header className="guide-sched-head">
                <span className="guide-sched-period">{col.period}</span>
                <span className="guide-sched-time">{col.time}</span>
              </header>
              <ul className="guide-sched-list">
                {col.items.map((it) => (
                  <li key={it}>
                    <span aria-hidden="true">—</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="guide-close" ref={closingRef}>
        <p className="guide-close-line">Masz pytania?</p>
        <p className="guide-close-line guide-close-accent">Jesteśmy tu dla Ciebie.</p>
        <p className="guide-close-line guide-close-body">
          Omniflux nie kończy pracy na oddaniu projektu. Jeśli potrzebujesz
          aktualizacji, konsultacji SEO, nowych podstron lub kampanii — odezwij
          się. Reagujemy w ciągu 24&nbsp;godzin.
        </p>
        <div className="guide-close-contacts guide-close-line">
          <a href={`mailto:${CONTACT.email}`} className="guide-close-link">{CONTACT.email}</a>
          <span className="guide-close-sep">·</span>
          <a href={CONTACT.phoneHref} className="guide-close-link">{CONTACT.phone}</a>
          <span className="guide-close-sep">·</span>
          <Link to="/" className="guide-close-link">omniflux.pl</Link>
        </div>
      </section>

    </article>
  )
}
