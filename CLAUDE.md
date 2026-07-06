# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (localhost:3000)
npm run build      # Production build → build/
npm test           # Run tests (add -- --watchAll=false for CI)
npm run lint       # ESLint over src/
npm run format     # Prettier over src/**/*.{js,jsx,css,json}
```

**Important:** Vercel builds with `CI=true`, which makes CRA treat every warning (ESLint, autoprefixer) as a hard build error. Verify with `CI=true npx react-scripts build` before pushing.

## Architecture

**Multi-page React SPA (Create React App)** with React Router v6 routes defined in [src/App.js](src/App.js): `/`, `/skills`, `/services`, `/experience`, `/work`, `/about`, `/languages`, `/contact`. The Header ([src/components/Header.js](src/components/Header.js)) uses `<Link>` navigation.

### Section loading

[src/pages/Home.js](src/pages/Home.js) lazy-loads every section component (`React.lazy`) and wraps each in `<ScrollReveal>` for entrance animations. `ScrollReveal` uses an `IntersectionObserver` hook ([src/hooks/useScrollReveal.js](src/hooks/useScrollReveal.js)) to trigger a one-shot CSS transition when the section enters the viewport.

### Theming

`useTheme` ([src/hooks/useTheme.js](src/hooks/useTheme.js)) persists `light`/`dark` to `localStorage` and toggles the `body.dark` class. All colors are CSS custom properties defined in [src/assets/styles/global.css](src/assets/styles/global.css) — every component CSS file consumes `var(--primary-color)`, `var(--bg-color)`, etc. rather than hardcoded values. Note: no theme toggle is currently rendered anywhere, so the site is effectively light-only.

### Backend & API

The backend is **Vercel serverless functions** in [api/](api/):

- **ChatWidget** ([src/components/ChatWidget/ChatWidget.js](src/components/ChatWidget/ChatWidget.js)) — `POST /api/chat` ([api/chat.js](api/chat.js)) → Groq Llama 3.3 70B. Needs the `GROQ_API_KEY` env var (set in the Vercel dashboard). CORS is restricted to the portfolio's own origins; messages are capped at 500 chars.
- **Contact form** ([src/components/Contact.js](src/components/Contact.js)) — uses EmailJS directly from the browser (no backend call); the `REACT_APP_EMAILJS_*` env vars must be set for it to work. If sends fail with `412 Gmail_API: Invalid grant`, reconnect the Gmail service in the EmailJS dashboard.

`REACT_APP_API_URL` should stay **unset** in production — the code falls back to `/api` (same origin). The old `backend/lambda/` directory is the retired AWS Lambda implementation, kept for reference only.

### Deployment

Vercel's GitHub integration deploys every push to `main` — there is no GitHub Actions workflow. [vercel.json](vercel.json) holds SPA rewrites (non-`/api` routes → `index.html`), cache headers (immutable `/static/*`, daily-revalidate images), and security headers. Runtime/build env vars (`GROQ_API_KEY`, `REACT_APP_EMAILJS_*`) live in the Vercel dashboard, not in this repo.

### Environment variables

See [.env.example](.env.example) for all frontend vars. Copy to `.env.local` for local development — CRA only exposes vars prefixed with `REACT_APP_`.

## Known gaps (see AUDIT.md)

Dark-mode toggle is unwired, there is no catch-all 404 route, no per-route SEO meta, and no automated tests.
