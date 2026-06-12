import { useEffect } from 'react'
import { CONTACT } from '../data/content'
import { setMeta } from '../lib/seo'

const SECTIONS = [
  {
    h: '1. Administrator danych',
    p: `Administratorem danych osobowych jest Omniflux z siedzibą w Krakowie (kontakt: ${CONTACT.email}, ${CONTACT.phone}). [TODO: uzupełnij pełną nazwę firmy, adres i NIP.]`,
  },
  {
    h: '2. Jakie dane przetwarzamy i po co',
    p: 'Przetwarzamy dane podane w formularzu kontaktowym (imię lub nazwa firmy, e-mail lub telefon, treść wiadomości) wyłącznie w celu odpowiedzi na zapytanie i przygotowania wyceny — na podstawie art. 6 ust. 1 lit. b i f RODO.',
  },
  {
    h: '3. Jak długo przechowujemy dane',
    p: 'Dane z formularza przechowujemy przez okres prowadzenia korespondencji, a w przypadku nawiązania współpracy — przez czas jej trwania i okres wymagany przepisami (np. podatkowymi).',
  },
  {
    h: '4. Komu możemy przekazać dane',
    p: 'Dane mogą być przetwarzane przez dostawców usług technicznych niezbędnych do działania strony i poczty (hosting, obsługa formularza). Nie sprzedajemy danych i nie przekazujemy ich w celach marketingowych podmiotom trzecim.',
  },
  {
    h: '5. Pliki cookies',
    p: 'Strona używa wyłącznie niezbędnych technicznie mechanizmów przechowywania danych. Jeśli włączymy narzędzia analityczne, zapytamy o zgodę zanim zostaną uruchomione.',
  },
  {
    h: '6. Twoje prawa',
    p: `Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz wniesienia skargi do Prezesa UODO. W sprawach danych napisz: ${CONTACT.email}.`,
  },
]

export default function Privacy() {
  useEffect(() => {
    setMeta({
      title: 'Polityka prywatności | Omniflux',
      description: 'Polityka prywatności serwisu omniflux.pl — jakie dane przetwarzamy, po co i jakie masz prawa.',
      path: '/polityka-prywatnosci',
    })
  }, [])

  return (
    <article className="page page-legal">
      <header className="page-hero">
        <span className="section-label">( FORMALNOŚCI )</span>
        <h1 className="page-title">Polityka prywatności</h1>
      </header>
      <div className="post-body">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
