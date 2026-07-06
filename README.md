# Oussema Amri — Portfolio

Personal portfolio website with an AI chat assistant and contact form.

**Live site:** [oussemaamri.com](https://oussemaamri.com)

## Overview

A multi-page React application deployed on Vercel:

- **Frontend** — React SPA (Create React App) with dedicated routes for Work, Skills, Experience, Services, About, Languages, and Contact
- **AI chatbot** — Vercel serverless function (`api/chat.js`) calling Groq's Llama 3.3 70B, with the system prompt grounded in my background
- **Contact form** — EmailJS, sent directly from the browser

```text
oussemaamri.com (Vercel)
  ├── /            → React SPA (all routes rewritten to index.html)
  └── /api/chat    → Serverless function → Groq API
```

## Features

- Multi-page portfolio with React Router v6 and per-section entrance animations
- AI assistant that answers questions about my experience and skills
- Project cards with live screenshots, demo links, and category filtering
- Contact form with EmailJS integration and copy-to-clipboard email
- Optimized WebP images, long-lived CDN caching, security headers
- Automatic deployment on every push to `main` via Vercel's GitHub integration

## Tech Stack

| Layer    | Technologies                                        |
| -------- | --------------------------------------------------- |
| Frontend | React 18, React Router v6, Framer Motion, Axios     |
| Backend  | Vercel Serverless Functions (Node.js)               |
| AI       | Groq API (Llama 3.3 70B)                            |
| Email    | EmailJS                                             |
| Hosting  | Vercel (CDN, HTTPS, preview deployments)            |

## Local Development

```bash
npm ci
```

Create `.env.local` from `.env.example` and fill in your EmailJS values:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_CONTACT_EMAIL=your-email@example.com
```

Then:

```bash
npm start            # dev server on localhost:3000
npm run lint         # ESLint
npm run build        # production build (CI treats warnings as errors)
```

## Deployment

Every push to `main` triggers a Vercel production deployment. Configuration lives in [vercel.json](vercel.json):

- SPA rewrites (all non-`/api` routes serve `index.html`)
- Immutable caching for hashed static assets, daily revalidation for images
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)

Environment variables (`GROQ_API_KEY`, `REACT_APP_EMAILJS_*`) are managed in the Vercel dashboard — no secrets live in this repository.

## Project Structure

```text
api/            Vercel serverless functions (chat, health)
public/         Static assets, sitemap, robots.txt
src/
  components/   UI components (Hero, Projects, ChatWidget, ...)
  pages/        Route-level pages
  hooks/        useTheme, useScrollReveal, ...
  services/     API client
  assets/       Styles and images
```

## License

MIT
