# OMNIFLUX® — Studio Portfolio

Award-style portfolio site for Omniflux, a Polish web-development studio.
Direction: **Violet Current** — near-black base `#0a0a0a`, off-white `#ece9e2`,
electric violet `#8b5cf6`, Space Grotesk display + Instrument Serif italic.

## Run

```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Architecture

| Layer | File | Role |
|-------|------|------|
| Scroll engine | `src/lib/motion.js` | Lenis singleton wired into GSAP ScrollTrigger, shared scroll-velocity signal |
| WebGL atmosphere | `src/components/FluidBackground.jsx` | Fullscreen domain-warped fbm shader (Three.js), cursor distortion, scroll-driven intensity curve (hero high → calm → contact crescendo) |
| Cursor | `src/components/Cursor.jsx` | Spring-lag dot + ring, `data-cursor="VIEW"` labels, `data-magnetic` element pull |
| Preloader | `src/components/Preloader.jsx` | Letter mask reveal, 0→100 counter, horizontal seam split |
| Sections | `src/sections/*` | Hero (kinetic type), Manifesto (word stagger + scramble), Work (pinned horizontal gallery, velocity RGB-shift), Services (accent sweep + floating preview), Studio (velocity marquee, broken grid, mask-wipe portraits), Contact (scroll letter reveal, magnetic email) |

## Performance & accessibility

- Three.js is code-split and lazy-loaded; initial JS ≈ 104 kB gzip.
- Shader renders at reduced internal resolution; 30 fps cap + smaller buffer
  on low-power/touch devices.
- All animation is transform/opacity (plus hover-only filters).
- `prefers-reduced-motion`: native scroll, static background frame, instant
  preloader, vertical work list, no kinetic/skew effects.
- Touch devices: no custom cursor, no magnetism, no letter repel — the
  horizontal gallery and reveals remain.

## Content

Copy is Polish, conversion-focused, based on the real offer from omniflux.pl:
services (Strony WWW, Google Ads, SEO, Social media), real projects (Flanders
Medical, ObscuraCult, Krakowski Kumpir), 4-step process, real contact
(kontakt@omniflux.pl, +48 533 002 025, Kraków) and the "2 wolne miejsca"
scarcity hook in the hero badge and contact label.

Project visuals (`public/work/*.svg`) and process graphics (`public/proces/*.svg`)
are generated SVG placeholders — swap for real screenshots/photography
(keep ~16:10 for work media, 3:4 for process cards).
