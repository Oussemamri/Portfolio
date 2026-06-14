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

## Architecture

**React SPA (Create React App)** with two routes:
- `/` — Home page (all portfolio sections on one page)
- `/contact` — Standalone contact page

### Navigation model

The Header uses anchor links (`#skills`, `#experience`, etc.) and `scrollToElement()` from [src/utils/helpers.js](src/utils/helpers.js) — **not** React Router navigation. All sections live on the Home page and are targeted by `id` attributes. The header offset constant (80px) is in that same file.

### Section loading

[src/pages/Home.js](src/pages/Home.js) lazy-loads every section component (`React.lazy`) and wraps each in `<ScrollReveal>` for entrance animations. `ScrollReveal` uses an `IntersectionObserver` hook ([src/hooks/useScrollReveal.js](src/hooks/useScrollReveal.js)) to trigger a one-shot CSS transition when the section enters the viewport.

### Theming

`useTheme` ([src/hooks/useTheme.js](src/hooks/useTheme.js)) persists `light`/`dark` to `localStorage` and toggles the `body.dark` class. All colors are CSS custom properties defined in [src/assets/styles/global.css](src/assets/styles/global.css) — every component CSS file consumes `var(--primary-color)`, `var(--bg-color)`, etc. rather than hardcoded values.

### Backend & API

All frontend API calls use `REACT_APP_API_URL` (defaults to `https://api.oussemaamri.com/api`). Two services hit the backend:

- **ChatWidget** ([src/components/ChatWidget/ChatWidget.js](src/components/ChatWidget/ChatWidget.js)) — `POST /api/chat` → AWS Lambda → Groq Llama
- **Contact form** ([src/components/Contact.js](src/components/Contact.js)) — uses EmailJS directly from the browser (no backend call); the `REACT_APP_EMAILJS_*` env vars must be set for it to work.

The backend lives in `backend/lambda/index.js` (Node.js 20, arm64, zero npm runtime deps). It is **not** in this repo's npm workspace — it is deployed independently via the CI pipeline or manually with `aws lambda update-function-code`.

### CI/CD

[.github/workflows/deploy-aws.yml](.github/workflows/deploy-aws.yml) runs on push to `main`:
1. Builds the React app and syncs to S3 (`frontend.portfolio`, `eu-north-1`), then invalidates CloudFront.
2. Zips `backend/lambda/` and deploys to the `portfolio-chatbot-api` Lambda function.

Required GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `CLOUDFRONT_DISTRIBUTION_ID`, `REACT_APP_EMAILJS_*`, `REACT_APP_CONTACT_EMAIL`.

### Environment variables

See [.env.example](.env.example) for all frontend vars. Copy to `.env.local` for local development — CRA only exposes vars prefixed with `REACT_APP_`.

## Planned work

See [.claude/instructions.md](.claude/instructions.md) for the full phased plan to convert from single-page anchor navigation to multi-page React Router routing (Skills, Services, Experience, Work, About each become dedicated routes).
