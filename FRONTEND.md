# AstroVeda — Frontend Documentation

> **Living document.** Har naya frontend feature yahan add karte jao. Ye file
> akela padh ke koi bhi (AI ya insaan) poora frontend samajh sakta hai.
>
> Backend docs alag file mein hain: `../backend/BACKEND.md`

---

## 1. Overview

AstroVeda ka **web frontend** — ek Vedic-astrology portal (AstroSage jaisa):
animated cosmic homepage, free-kundli form, daily horoscope, astrologers,
panchang, aur **user authentication** (login/register).

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (TypeScript nahi — sab `.js`)
- **UI:** Tailwind CSS v4 + custom design-system classes
- **Icons:** Material UI icons (`@mui/icons-material`)
- **Fonts:** astro_swap brand webfonts (self-hosted `@font-face`, `/public/fonts/astro_swap`)
- **State:** React Context (auth)
- **Default port:** `3000`, backend API `:5000`

---

## 2. Tech stack & key decisions

| Cheez | Choice | Kyun |
|-------|--------|------|
| Styling | **Tailwind classes** (inline `style` nahi) | User preference; consistency |
| Icons | **MUI icon components** (emoji nahi, jahan possible) | User preference |
| Fonts | **self-hosted `@font-face`** (astro_swap, local files) | brand fonts; no external fetch, no offline hang |
| Dev compiler | **webpack** (`next dev --webpack`) | Is machine pe Turbopack MUI/Emotion ko ~70s le raha tha; webpack fast |
| Auth token | **localStorage** | Simple starter; baad mein httpOnly cookie pe ja sakte hain |

> ⚠️ **Dev server:** `npm run dev` webpack use karta hai. Turbopack ke liye `npm run dev:turbo`.

---

## 3. Folder structure

```
astrology-frontend/          # repo root = Next.js app (flattened, no nested folder)
├── .env.local               # NEXT_PUBLIC_API_URL=http://localhost:5000
├── jsconfig.json            # "@/*" → "./src/*" import alias
├── next.config.mjs
├── postcss.config.mjs       # Tailwind v4 plugin
├── eslint.config.mjs
├── public/                  # static svgs
└── src/
    ├── app/                 # App Router — pages + layout
    │   ├── layout.js        # Root layout: fonts, background, providers, header/footer
    │   ├── page.js          # Homepage (assembles all sections)
    │   ├── globals.css      # Design system: tokens, helper classes, animations
    │   ├── about/page.js
    │   ├── contact/page.js
    │   ├── disclaimer/page.js
    │   ├── login/page.js     # → <AuthForm mode="login" />
    │   └── register/page.js  # → <AuthForm mode="register" />
    ├── components/          # UI building blocks (details below)
    ├── context/
    │   └── AuthContext.js   # Auth provider + useAuth() hook
    └── lib/
        ├── api.js           # Backend API client (register/login/me)
        ├── data.js          # Static content (zodiac, services, astrologers, navLinks)
        └── wikipedia.js     # getWikiSummary() — placeholder content for service pages
```

### Components (`src/components/`)

| File | Type | Kaam |
|------|------|------|
| `StarfieldBackground.js` | client | Canvas animated night-sky: twinkling parallax stars, constellation lines, shooting stars, cursor/auto sway. Mobile-hardened. |
| `ThemeRegistry.js` | client | MUI + Emotion SSR cache + dark theme provider |
| `Header.js` | client | Sticky nav, logo, hamburger (mobile), **auth-aware** (Sign in / user + logout) |
| `Footer.js` | server | Link columns + socials |
| `Hero.js` | client | Headline + **free-kundli form** (birth date → moon sign) |
| `ServicesGrid.js` | server | 8 service cards (kundli, matching, horoscope…) |
| `ZodiacGrid.js` | client | 12 signs; sign tap → daily reading + love/career/health bars |
| `Astrologers.js` | server | Marquee of astrologer cards (online status, rate) |
| `Panchang.js` | server | Aaj ka panchang (tithi, nakshatra, muhurat…) |
| `CtaBanner.js` | server | App-download CTA |
| `SectionHeading.js` | server | Reusable eyebrow + title + subtitle |
| `PageHero.js` | server | Inner-page hero band (breadcrumb + title) |
| `AuthForm.js` | client | Shared login/register form (`mode` prop); uses `useAuth` + redirects |
| `ContactForm.js` | client | Contact page form (demo, no backend yet) |
| `InfoPage.js` | server (async) | Reusable service page; fetches Wikipedia placeholder content |

---

## 4. Routing / pages

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.js` | Homepage — Hero, Services, Zodiac, Astrologers, Panchang, CTA |
| `/about` | `app/about/page.js` | Story, values, stats |
| `/contact` | `app/contact/page.js` | Channels + contact form |
| `/disclaimer` | `app/disclaimer/page.js` | Legal disclaimer |
| `/login` | `app/login/page.js` | `<AuthForm mode="login" />` |
| `/register` | `app/register/page.js` | `<AuthForm mode="register" />` |
| `/kundli` | `app/kundli/page.js` | **Free Kundli** — login-gated; shows chart + AI prediction |
| `/horoscope` `/kundli-matching` `/tarot` `/numerology` `/lal-kitab` `/palmistry` `/gemstones` | `app/<name>/page.js` | Service pages — `<InfoPage>` with **Wikipedia** placeholder content (temp) |
| `/panchang` | `app/panchang/page.js` | Live `<Panchang>` + Wikipedia info |
| `/careers` | `app/careers/page.js` | Static careers listing |
| `/pricing` | `app/pricing/page.js` | Subscription plans (free/silver/gold/platinum) from `/api/plans` |

> Header/Footer mein kuch links (`/kundli`, `/horoscope`, `/panchang`…) abhi
> **placeholder** hain — pages baad mein banenge.

---

## 5. Design system (`globals.css`)

**Theme:** deep maroon-plum background + **crimson/ember** accent + violet.
CSS variables `:root` mein hain; Tailwind v4 `@theme inline` unhe utility banata hai.

> 📝 Accent tokens ka naam abhi bhi `--gold-*` hai (stability ke liye) par values
> **red** hain. Poora theme re-color karne ke liye sirf `globals.css` ke top ke
> tokens badlo — sab Tailwind utilities (`text-gold-400`, `btn-gold`, etc.) apne aap update.

Key tokens: `--night-900..600` (bg ramp), `--gold-400/500/600` (accent = red ramp),
`--violet-*`, `--rose-500`, `--ink` / `--ink-dim` (text).

**Typography:** `--font-base` (global size knob, default `100%`=16px — rem scales from it),
`--leading-body` (1.6, comfortable reading), `--leading-heading` (1.2). Font-family via
`--font-poppins` (body = `astro_swap_text_regular`) / `--font-playfair`
(headings = `astro_swap_headline_regular`), self-hosted `@font-face` in `globals.css`.

Helper classes: `.container-x`, `.glass`, `.card-hover`, `.btn-gold`, `.gold-text`, `.font-display`.

Animations (hand-tuned keyframes): `spin-slow`/`spin-reverse`, `float-y`, `fade-up`,
`glow-pulse`, `marquee`, `nebula` drift. Sab `prefers-reduced-motion` respect karti hain.

---

## 6. Authentication integration

Flow: `AuthForm` → `useAuth()` → `api.js` → backend → token localStorage → header updates.

- **`lib/api.js`** — `apiRegister`, `apiLogin`, `apiMe`, `apiPredictBasic(token)`,
  `apiPredictHistory(token)`, `apiPanchang(params)` (public), `apiChart(payload)` (public,
  compute-only), `apiPlans()`, `apiCreateOrder(token,payload)`, `apiVerifyPayment(token,payload)`.
  Base URL `NEXT_PUBLIC_API_URL`.
- **`lib/payment.js`** — `startPayment({kind,itemId,token,user})`: create order → Razorpay
  checkout (script loaded on demand) → verify. Returns credits/subscription. Used by
  `/pricing` (plans) and `/kundli` paywall (packs).
  `ApiError` class status + field-errors carry karti hai. Network fail pe friendly message.
- **`context/AuthContext.js`** — `AuthProvider` (layout mein wrapped). State: `user`,
  `token`, `loading`. Mount pe localStorage se token restore karke `/me` se verify karta hai.
  Exposes: `login(email, pw)`, `register(payload)`, `logout()`.
  Hook: `useAuth()`.
- **`components/AuthForm.js`** — dono modes; success pe `/` redirect; server field-errors
  inputs ke neeche dikhata hai. **Register form birth details bhi leta hai:** name, email,
  phone, password, gender, date of birth, time of birth (optional), place of birth —
  taaki signup ke turant baad basic prediction ban sake. Payload:
  `{ name, email, password, phone, gender, dateOfBirth, timeOfBirth, placeOfBirth }`.
- **`Header.js`** — logged-out → "Sign in"; logged-in → naam chip + logout (desktop + mobile).

Token key: `localStorage["astroveda_token"]`.

---

## 7. Environment variables

| Var | Default | Kaam |
|-----|---------|------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Backend base URL (browser mein expose hota hai) |

`.env.local` mein set hai. `NEXT_PUBLIC_` prefix zaroori hai (browser tak pahunchne ke liye).

---

## 8. Run karna

```bash
cd astrology-frontend   # repo root = Next.js app (flattened)
npm install          # pehli baar
npm run dev          # webpack dev server → http://localhost:3000
# turbopack chahiye: npm run dev:turbo
npm run build && npm start   # production
```

> ⚠️ **Backend bhi chalu hona chahiye** (`:5000`) warna login/register kaam nahi karega.
> Login page graceful error dikhata hai agar API na mile.

---

## 9. Features — status

| Feature | Status | Notes |
|---------|--------|-------|
| Animated cosmic background | ✅ Done | Canvas, mobile-optimized |
| Homepage (hero, services, zodiac, astrologers, panchang, CTA) | ✅ Done | |
| Free-kundli form (homepage Hero) | ✅ Done | **Real-time** — `POST /api/chart` se actual Moon/Sun/Lagna/nakshatra (login nahi chahiye) |
| Daily horoscope (12 signs) | ✅ Done | Deterministic demo readings |
| About / Contact / Disclaimer pages | ✅ Done | Tailwind + MUI icons |
| Red/crimson theme | ✅ Done | Token-based |
| Responsive + mobile hamburger | ✅ Done | |
| **Login / Register (API-integrated)** | ✅ Done | JWT, AuthContext, header state |
| **Register captures birth details + phone** | ✅ Done | gender, DOB, time, place, phone → basic prediction base |
| **Free Kundli page (`/kundli`)** | ✅ Done | login-gated; real chart + AI prediction, history-first (cost-aware), regenerate |
| **Free-3 limit + paywall** | ✅ Done | 3 free kundlis; 402 pe paywall card (₹100=10, pack "coming soon") |
| **Subscription plans page (`/pricing`)** | ✅ Done | plans + **live Razorpay subscribe** |
| **Payments (Razorpay)** | ✅ Done | pack buy (paywall) + plan subscribe (pricing); verify → credits/subscription; `refreshUser()` |
| Print/PDF · talk-to-pandit | ⏳ Planned | see PROJECT_PLAN monetization |
| **Panchang — real-time** | ✅ Done | homepage fetches live `/api/panchang` (was hardcoded) |
| Real astrology calculations | ⏳ Planned | Abhi frontend demo logic |
| Service sub-pages (horoscope, matching, panchang, tarot, numerology, lal-kitab, palmistry, gemstones, careers) | ✅ Done | **Wikipedia** placeholder content (`InfoPage`) — apni API se replace hoga |
| Protected pages / user dashboard | ⏳ Planned | "My Kundli", saved charts |
| Talk-to-astrologer (chat/call) | ⏳ Planned | |
| Forgot password UI | ⏳ Planned | backend ready hone pe |

---

## 10. Roadmap notes

- Backend ke naye endpoints aayein to `lib/api.js` mein client functions add karo,
  aur (agar auth chahiye) `useAuth()` se token bhejo.
- Naya page → `src/app/<route>/page.js`. MUI icon use karne se pehle check karlo ki
  wo icon is version mein exist karta hai (kuch outline variants missing hain, e.g.
  `Person` hai par `PersonOutline` nahi).
- Har feature ke baad ye doc update karo.

---

_Last updated: is doc ko har feature ke saath update karna hai._
