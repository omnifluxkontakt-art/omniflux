// Centralna treść serwisu. Wszystko, co sprzedażowe, edytuje się tutaj.

// Prefixes public/ asset paths with the deploy base (GitHub Pages serves
// the site from a subdirectory).
export const asset = (p) => import.meta.env.BASE_URL.replace(/\/$/, '') + p

export const CONTACT = {
  email: 'kontakt@omniflux.pl',
  phone: '+48 533 002 025',
  phoneHref: 'tel:+48533002025',
  city: 'Kraków',
  spots: '2 wolne miejsca',
}

export const STATS = [
  { value: '24 h', label: 'maksymalny czas odpowiedzi' },
  { value: '100%', label: 'projektów bez podwykonawców' },
  { value: '4 etapy', label: 'przejrzystego procesu' },
  { value: '0 zł', label: 'za wycenę i konsultację' },
]

// TODO(Omniflux): podmień na prawdziwe cytaty od klientów — te są przykładowe
// i czekają na Wasze autoryzowane opinie.
export const TESTIMONIALS = [
  {
    quote:
      'Strona miała po prostu być — a okazało się, że pacjenci zaczęli mówić, że umówili się, bo „wszystko było jasne". Tego się nie spodziewaliśmy.',
    author: 'Flanders Medical',
    role: 'klinika fizjoterapii, Warszawa',
  },
  {
    quote:
      'Rozumieli klimat marki od pierwszej rozmowy. Sklep wygląda jak nasza biżuteria: ciemno, precyzyjnie i bez kompromisów.',
    author: 'ObscuraCult',
    role: 'dark jewelry, e-commerce',
  },
  {
    quote:
      'Kontakt bezpośredni, zero przepychania przez „opiekunów klienta". Zmiany wchodziły tego samego dnia.',
    author: 'Krakowski Kumpir',
    role: 'gastronomia, Kraków',
  },
]

export const FAQ = [
  {
    q: 'Ile kosztuje strona internetowa?',
    a: 'Prosta strona firmowa to zwykle kilka tysięcy złotych, rozbudowane serwisy i sklepy — odpowiednio więcej. Dokładną kwotę poznasz po krótkiej rozmowie o zakresie: wycena jest bezpłatna, konkretna i ważna 30 dni. Orientacyjne widełki znajdziesz w cenniku.',
  },
  {
    q: 'Jak długo trwa realizacja?',
    a: 'Strona wizytówkowa: 2–3 tygodnie. Strona firmowa z treściami: 3–6 tygodni. Sklep lub aplikacja: od 6 tygodni. Termin ustalamy przed startem i trzymamy się go — dlatego przyjmujemy ograniczoną liczbę projektów naraz.',
  },
  {
    q: 'Mam już stronę — czy musicie budować od zera?',
    a: 'Nie zawsze. Zaczynamy od bezpłatnego audytu obecnej strony: czasem wystarczy przebudowa treści i optymalizacja, czasem taniej i lepiej wychodzi nowa strona. Dostaniesz jasną rekomendację z uzasadnieniem, bez naciągania.',
  },
  {
    q: 'Co z hostingiem, domeną i opieką po wdrożeniu?',
    a: 'Pomagamy ogarnąć wszystko: domenę, szybki hosting, certyfikat SSL, pocztę. Po wdrożeniu możesz zostać z nami w modelu opieki (aktualizacje, kopie zapasowe, drobne zmiany) albo przejąć stronę w całości — kod i dostępy są Twoje.',
  },
  {
    q: 'Jak wyglądają płatności?',
    a: 'Etapami: zaliczka na start, reszta po akceptacji kolejnych etapów. Nie płacisz wszystkiego z góry i na każdym etapie widzisz, za co płacisz. Wystawiamy faktury.',
  },
  {
    q: 'Po czym poznam, że to działa?',
    a: 'Przed startem ustalamy mierzalny cel (zapytania, rezerwacje, sprzedaż), a po wdrożeniu konfigurujemy analitykę i raportujemy wyniki. Mierzymy efekty, nie kliknięcia — to nasza dewiza.',
  },
]

export const CASE_STUDIES = [
  {
    slug: 'flanders-medical',
    name: 'FLANDERS MEDICAL',
    client: 'Klinika fizjoterapii',
    tags: 'Strona WWW / Rezerwacje online',
    result: 'Pacjent umawia wizytę w 60 sekund',
    img: asset('/work/flanders.webp'),
    intro:
      'Fizjoterapia, osteopatia i podologia na Saskiej Kępie w Warszawie. Klinika z holistycznym podejściem do trudnych przypadków potrzebowała strony, która buduje zaufanie i skraca drogę pacjenta do gabinetu.',
    challenge:
      'Pacjenci trafiali do kliniki głównie z polecenia. Strona miała przekonać tych, którzy klinikę dopiero poznają: wyjaśnić metody pracy, pokazać zespół i — przede wszystkim — maksymalnie uprościć umówienie wizyty.',
    solution: [
      'Architektura treści zbudowana wokół problemów pacjenta (ból, uraz, rehabilitacja), nie wokół struktury firmy.',
      'Rezerwacja online dostępna z każdego miejsca strony — pacjent umawia wizytę w około 60 sekund.',
      'Spokojna, medyczna estetyka z naciskiem na zdjęcia gabinetu i zespołu — zaufanie buduje się wizualnie.',
      'Optymalizacja pod lokalne frazy (fizjoterapia Saska Kępa / Warszawa) i szybkość ładowania.',
    ],
    scope: ['Strona WWW', 'Rezerwacje online', 'SEO lokalne', 'Copywriting'],
  },
  {
    slug: 'obscuracult',
    name: 'OBSCURACULT',
    client: 'Dark jewelry',
    tags: 'E-commerce / Branding',
    result: 'Sklep, który buduje kult marki',
    img: asset('/work/obscuracult.webp'),
    intro:
      'Marka biżuterii o mrocznej, wyrazistej estetyce. Sklep internetowy miał nie tylko sprzedawać, ale przede wszystkim budować świat marki, do którego klienci chcą wracać.',
    challenge:
      'Biżuteria z charakterem przyciąga społeczność, nie przypadkowych kupujących. Generyczny szablon sklepu zabiłby to, co w marce najcenniejsze — klimat. Sklep musiał wyglądać jak przedłużenie produktu.',
    solution: [
      'Ciemny, fotograficzny design podporządkowany produktom — biżuteria gra pierwszą rolę na każdym ekranie.',
      'Dopracowane karty produktów: makrofotografia, wymiary, materiały, historie projektów.',
      'Płynna ścieżka zakupowa bez rozpraszaczy — od wejścia do płatności w kilku krokach.',
      'Fundament pod kampanie: piksele reklamowe, newsletter i struktura pod SEO kategorii.',
    ],
    scope: ['E-commerce', 'Branding', 'Art direction', 'Wdrożenie płatności'],
  },
  {
    slug: 'krakowski-kumpir',
    name: 'KRAKOWSKI KUMPIR',
    client: 'Gastronomia',
    tags: 'Strona WWW / Menu online',
    result: 'Menu, które samo zaprasza do stolika',
    img: asset('/work/kumpir.webp'),
    intro:
      'Krakowski lokal z pieczonymi ziemniakami w roli głównej. Strona miała robić jedno: sprawiać, że po jej obejrzeniu jesteś głodny i wiesz, gdzie iść.',
    challenge:
      'W gastronomii strona przegrywa z Instagramem i mapami Google, jeśli nie odpowiada błyskawicznie na trzy pytania: co serwujecie, ile to kosztuje i jak do was trafić. Każda sekunda szukania to stracony gość.',
    solution: [
      'Menu online jako serce strony — czytelne na telefonie, łatwe do aktualizacji, z cenami zawsze na bieżąco.',
      'Apetyczna fotografia i ciepła kolorystyka — strona ma smakować.',
      'Lokalizacja, godziny otwarcia i kontakt widoczne od razu, bez szukania.',
      'Połączenie z wizytówką Google i mapami — spójność tam, gdzie goście naprawdę szukają.',
    ],
    scope: ['Strona WWW', 'Menu online', 'SEO lokalne', 'Fotografia produktowa'],
  },
]

export const SERVICES_PAGES = [
  {
    slug: 'strony-internetowe',
    name: 'STRONY WWW',
    title: 'Strony internetowe Kraków — szybkie strony, które sprzedają | Omniflux',
    metaDescription:
      'Projektujemy i kodujemy strony internetowe, które realnie sprzedają: szybkie, widoczne w Google, dopasowane do Twojej marki. Web studio z Krakowa. Bezpłatna wycena w 24 h.',
    h1: 'Strony internetowe, które sprzedają',
    lead:
      'Strona firmowa to nie wizytówka do odhaczenia — to Twój najlepszy handlowiec, pracujący 24/7. Projektujemy ją pod jeden cel: żeby odwiedzający stawał się klientem.',
    points: [
      {
        h: 'Projekt pod konwersję, nie pod szablon',
        p: 'Zaczynamy od Twojego celu sprzedażowego i ścieżki klienta. Układ, treść i wezwania do działania projektujemy tak, by prowadziły do zapytania — a nie tylko ładnie wyglądały.',
      },
      {
        h: 'Szybkość, którą czuć (i którą lubi Google)',
        p: 'Kodujemy ręcznie, bez ociężałych szablonów. Strona ładuje się błyskawicznie na telefonie, a szybkość to dziś jeden z czynników pozycji w wyszukiwarce.',
      },
      {
        h: 'Treści, które sprzedają',
        p: 'Pomagamy napisać teksty językiem korzyści: co klient zyskuje, dlaczego Ty, co ma zrobić dalej. Bez korporacyjnej waty.',
      },
      {
        h: 'Własność bez gwiazdek',
        p: 'Kod, domena i dostępy są Twoje. Możesz zostać z nami w modelu opieki albo zabrać wszystko — bez uwięzienia u wykonawcy.',
      },
    ],
    cta: 'Wyceń swoją stronę',
  },
  {
    slug: 'google-ads',
    name: 'GOOGLE ADS',
    title: 'Google Ads Kraków — kampanie, które przynoszą klientów | Omniflux',
    metaDescription:
      'Kampanie Google Ads nastawione na konkretne zapytania i mierzalne wyniki: klienci gotowi do zakupu, przejrzyste raporty, bez przepalania budżetu. Bezpłatna konsultacja.',
    h1: 'Google Ads, które przynoszą klientów — nie kliknięcia',
    lead:
      'Reklama w Google działa wtedy, gdy trafia w ludzi, którzy właśnie szukają Twojej usługi. Ustawiamy kampanie na konkretne zapytania i rozliczamy się z wyników, które widać w kasie.',
    points: [
      {
        h: 'Słowa kluczowe z intencją zakupu',
        p: 'Nie płacisz za ciekawskich. Budujemy kampanie wokół fraz, które wpisuje klient gotowy do działania — i wycinamy te, które przepalają budżet.',
      },
      {
        h: 'Strona docelowa, która domyka',
        p: 'Najlepsza kampania przegra ze słabą stroną. Jako studio robimy obie rzeczy — reklamę i miejsce, do którego prowadzi — więc całość gra razem.',
      },
      {
        h: 'Mierzalność od pierwszego dnia',
        p: 'Konfigurujemy śledzenie konwersji: wiesz, ile kosztuje Cię zapytanie i co dokładnie przynosi pieniądze. Raport rozumiesz bez słownika.',
      },
      {
        h: 'Budżet pod kontrolą',
        p: 'Zaczynamy rozsądnie, skalujemy to, co działa. Żadnych umów na rok z karą za wyjście.',
      },
    ],
    cta: 'Zapytaj o kampanię',
  },
  {
    slug: 'seo',
    name: 'SEO',
    title: 'SEO Kraków — pozycjonowanie, które sprzedaje 24/7 | Omniflux',
    metaDescription:
      'Pozycjonowanie stron: techniczna optymalizacja, treści i widoczność lokalna. Organiczny ruch, który pracuje na Ciebie długo po zakończeniu kampanii. Bezpłatny audyt.',
    h1: 'SEO — widoczność, która sprzedaje 24/7',
    lead:
      'Pozycja w Google to aktywo: budujesz ją raz, a pracuje na Ciebie latami — bez płacenia za każde kliknięcie. Robimy SEO, które zaczyna się od technikaliów, a kończy na treściach, których ludzie naprawdę szukają.',
    points: [
      {
        h: 'Fundament techniczny',
        p: 'Szybkość, struktura, indeksowanie, dane strukturalne — rzeczy niewidoczne dla oka, bez których treści nie mają szans. To sprawdzamy i naprawiamy najpierw.',
      },
      {
        h: 'Treści pod realne zapytania',
        p: 'Analizujemy, czego szukają Twoi klienci, i budujemy strony oraz artykuły, które na to odpowiadają. Każda podstrona to osobna szansa na ruch.',
      },
      {
        h: 'SEO lokalne',
        p: 'Wizytówka Google, opinie, spójność danych — dla firm usługowych lokalna widoczność to często najszybszy zwrot z SEO.',
      },
      {
        h: 'Raport, który mówi ludzkim językiem',
        p: 'Pozycje, ruch, zapytania — co miesiąc widzisz, co rośnie i co z tego wynika dla biznesu.',
      },
    ],
    cta: 'Zamów bezpłatny audyt',
  },
  {
    slug: 'social-media',
    name: 'SOCIAL MEDIA',
    title: 'Social media i content — treści budujące zaufanie | Omniflux',
    metaDescription:
      'Prowadzenie social mediów i tworzenie treści, które budują rozpoznawalność i zaufanie do marki: strategia, grafika, copywriting, spójność z Twoją stroną.',
    h1: 'Social media, które budują zaufanie do marki',
    lead:
      'Klient zanim kupi, sprawdza: stronę, profil, opinie. Dbamy o to, żeby wszędzie zastał tę samą, dopracowaną markę — i treści, które dają mu powód, by Cię zapamiętać.',
    points: [
      {
        h: 'Strategia zamiast wrzutek',
        p: 'Ustalamy, do kogo mówisz, o czym i po co. Każdy post ma zadanie: budować zasięg, zaufanie albo sprzedaż.',
      },
      {
        h: 'Spójność z marką',
        p: 'Grafiki i język wprost z Twojej identyfikacji — profil wygląda jak firma, nie jak szablon z banku grafik.',
      },
      {
        h: 'Treści, które się czyta',
        p: 'Piszemy po ludzku: konkretnie, z charakterem, bez marketingowego bełkotu.',
      },
      {
        h: 'Połączenie ze sprzedażą',
        p: 'Social media prowadzą na stronę, strona domyka. Spinamy całą ścieżkę i mierzymy, co działa.',
      },
    ],
    cta: 'Porozmawiajmy o treściach',
  },
]

// TODO(Omniflux): dostosuj widełki do swojego cennika — to punkt wyjścia.
export const PRICING = [
  {
    name: 'Strona wizytówkowa',
    price: 'od 2 900 zł',
    desc: 'Dla firm, które potrzebują profesjonalnej obecności w sieci — szybko i konkretnie.',
    features: [
      'do 5 podstron',
      'projekt indywidualny (bez szablonu)',
      'wersja mobilna i szybkość 90+',
      'podstawowe SEO i analityka',
      'instruktaż obsługi',
    ],
  },
  {
    name: 'Strona firmowa',
    price: 'od 5 900 zł',
    featured: true,
    badge: 'Najczęściej wybierane',
    desc: 'Dla firm, które chcą, by strona aktywnie sprzedawała: treści, SEO i ścieżka klienta.',
    features: [
      'architektura treści pod sprzedaż',
      'copywriting językiem korzyści',
      'SEO: struktura + frazy lokalne',
      'formularze i śledzenie konwersji',
      'blog / aktualności',
      '30 dni opieki po starcie gratis',
    ],
  },
  {
    name: 'Sklep / projekt indywidualny',
    price: 'wycena indywidualna',
    desc: 'E-commerce, aplikacje webowe, nietypowe integracje — wyceniamy po rozmowie o zakresie.',
    features: [
      'e-commerce z płatnościami',
      'integracje (rezerwacje, CRM, API)',
      'animacje i WebGL na zamówienie',
      'stała opieka rozwojowa',
    ],
  },
]

export const POSTS = [
  {
    slug: 'ile-kosztuje-strona-internetowa-2026',
    title: 'Ile kosztuje strona internetowa w 2026 roku? Konkretnie, bez „to zależy"',
    metaDescription:
      'Ile naprawdę kosztuje strona internetowa w 2026? Realne widełki cen, z czego wynika cena i jak nie przepłacić — wyjaśniamy bez marketingowej mgły.',
    date: '2026-06-12',
    excerpt:
      'Najczęstsze pytanie, jakie słyszymy — i najrzadziej uczciwie opisane w internecie. Rozkładamy cenę strony na czynniki pierwsze: co kosztuje, dlaczego i kiedy taniej znaczy drożej.',
    body: [
      {
        h: 'Krótka odpowiedź',
        p: 'Prosta strona wizytówkowa: zwykle 2–5 tys. zł. Strona firmowa z treściami i SEO: 5–15 tys. zł. Sklep internetowy: od ok. 8 tys. zł wzwyż. Wszystko poniżej tych widełek zazwyczaj oznacza szablon, brak treści i brak optymalizacji — czyli stronę, która jest, ale nie pracuje.',
      },
      {
        h: 'Z czego właściwie składa się cena?',
        p: 'Strona to co najmniej cztery zawody: projektant (układ i wygląd), copywriter (treści, które sprzedają), programista (szybki, poprawny kod) i specjalista SEO (widoczność). W taniej ofercie te role „gra" jedna osoba i gotowy szablon — i to widać w wynikach.',
      },
      {
        h: 'Kiedy taniej znaczy drożej',
        p: 'Strona za 1 500 zł, która nie generuje żadnych zapytań, jest droższa niż strona za 8 000 zł, która przynosi dwóch klientów miesięcznie. Licz koszt strony razem z jej efektem — to jedyna uczciwa matematyka.',
      },
      {
        h: 'O co zapytać wykonawcę przed podpisaniem umowy',
        p: 'Czy strona będzie moja (kod, domena, dostępy)? Co dokładnie wchodzi w cenę — treści, SEO, analityka? Jak mierzony będzie efekt? Ile kosztuje opieka po wdrożeniu? Jasne odpowiedzi na te cztery pytania mówią o wykonawcy więcej niż portfolio.',
      },
      {
        h: 'Ile to kosztuje u nas',
        p: 'Nasze widełki znajdziesz w cenniku — a dokładną kwotę po krótkiej rozmowie o Twoim celu. Wycena jest bezpłatna, konkretna i ważna 30 dni.',
      },
    ],
  },
]
