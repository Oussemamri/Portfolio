# Portfolio Roadmap — Remaining Audit Items

**Created:** 2026-07-07 · Supersedes the completed multi-page-navigation plan.
**Source:** [AUDIT.md](../AUDIT.md) scorecard + July 2026 security review.
**Goal:** close every open audit item so the site and repo read as professional to recruiters.

Legend: `[ ]` open · `[x]` done · 🔴 **YOUR ACTION** = requires Oussema (dashboard access, content, or a decision Claude must not make alone). Everything unmarked, Claude can execute autonomously.

---

## Ground rules (apply to every phase)

1. **Build gate:** `CI=true npx react-scripts build` must pass locally before any push — Vercel fails the deploy on any warning.
2. **Deploy gate:** after each push, confirm the Vercel deployment succeeds (`gh api repos/Oussemamri/Portfolio/deployments` → latest status) and spot-check the change live on oussemaamri.com.
3. **Design tokens only:** all colors via the CSS custom properties in `global.css` — never hardcoded values. Dark mode (Phase 1) depends on this discipline.
4. **No secrets in the repo.** Env vars live in the Vercel dashboard. The repo is public.
5. One phase per commit (or a small series); commit messages follow the existing `feat:/fix:/perf:/docs:` convention.

---

## Phase 0 — Ten-minute protections (mostly yours)

- [ ] 🔴 **EmailJS domain allowlist** — dashboard.emailjs.com → Account → Security → allow only `oussemaamri.com` (+ `www`). Your public key is visible in the bundle by design; this stops strangers from burning your 200-email quota from other sites.
- [ ] 🔴 **CV freshness** — `uptaed_cv.tex` in the project root looks newer than the deployed `public/cv/Oussema_Amri_CV.pdf`. Compile and replace the PDF if it's the newer version, and rename/move the `.tex` out of the repo folder (typo'd filename, and LaTeX source doesn't belong in the site repo).
- [ ] 🔴 **Decide:** should `reqlume_mid_page.png` (untracked, unused) become the Reqlume card/case-study image? If yes, Claude compresses to WebP and wires it in; if no, delete it.
- [ ] **Chat abuse guard (code)** — add a lightweight per-IP token bucket in `api/chat.js` (in-memory, best-effort per warm instance) and log rejected requests. CORS + 500-char cap are already live; this closes the direct-`curl` gap well enough for a portfolio.

**Acceptance:** EmailJS test from an allowed origin still sends; a scripted burst against `/api/chat` starts returning 429.

---

## Phase 1 — Fix what's broken (P0, ~half a day)

### 1.1 Wire up dark mode
The hook exists ([src/hooks/useTheme.js](../src/hooks/useTheme.js)) but nothing mounts it; every `body.dark` rule in the CSS is dead code today.

- [ ] Mount `useTheme` once in `App.js`; on first visit (no localStorage entry) respect `prefers-color-scheme`.
- [ ] Sun/moon toggle button in the Header (desktop + mobile), keyboard-accessible with `aria-label`.
- [ ] Sweep ALL component CSS for dark coverage — the new-design sections (Skills, Companies) have `body.dark` rules; older ones (About, Experience, Contact, Languages, footer, chat widget) need auditing. Fix contrast failures, don't just invert.
- [ ] 🔴 **Review checkpoint:** before pushing, Claude screenshots every route in dark mode (or runs the dev server for you) — you approve the palette. Dark mode ships site-wide or not at all; a half-dark site looks worse than none.

### 1.2 Real 404 page
- [ ] `<Route path="*" element={<NotFound />} />` in `App.js` + a small branded NotFound page (big 404, one-liner, links to `/` and `/work`). Keep it consistent with the design system.

**Acceptance:** toggle persists across reload and route changes; `oussemaamri.com/definitely-not-a-page` shows the branded 404; CI build green.

---

## Phase 2 — Per-route SEO (~half a day)

**Architect's note (read first):** CRA renders client-side. Google executes JS, so per-route `<title>`/`<meta description>` via `react-helmet-async` works for search. **Social scrapers (LinkedIn/WhatsApp/X) do not run JS** — per-route OG images/titles will NOT show when sharing deep links unless we add prerendering or migrate to a framework. Scope here is the honest 80%: search SEO now, social previews stay the (good) static homepage card. A Next.js migration is deliberately out of scope — revisit only if case studies (Phase 4) justify it.

- [ ] Add `react-helmet-async`; `<HelmetProvider>` in `index.js`.
- [ ] Small `<PageMeta title description path>` component; apply to all 8 routes with unique, recruiter-oriented copy (~155-char descriptions).
- [ ] Canonical URL per route.
- [ ] Extend the existing JSON-LD `Person` schema in `index.html` (add `jobTitle`, `worksFor`, `sameAs` → GitHub/LinkedIn).
- [ ] 🔴 **Google Search Console** — verify the domain (DNS TXT or HTML file — Claude prepares whichever you pick) and submit `sitemap.xml`. Needs your Google account.

**Acceptance:** each route shows a unique tab title live; Google Rich Results test passes on the Person schema; Search Console shows the sitemap accepted (may take days — don't block on it).

---

## Phase 3 — Recruiter essentials (~1 day)

- [ ] **Footer rebuild** ([src/components/Footer.js](../src/components/Footer.js)): quick-nav links (all routes), GitHub/LinkedIn/email, CV download, "Built with React · deployed on Vercel" line, back-to-top button. Match the dark editorial design system.
- [ ] **CV prominence:** download link in Header (desktop) and footer, not just the hero. Use the refreshed PDF from Phase 0.
- [ ] **Social links in Header** — GitHub + LinkedIn icons, visible without scrolling on every route.
- [ ] **ChatWidget hint** — one-line teaser near the launcher ("Ask my AI about my experience"), dismissible, shown once per session.
- [ ] **Availability badge** in Contact + Hero ("Open to opportunities" style). 🔴 **Confirm wording and whether you want it shown at all** (you're currently at RFA — saying "open to work" publicly is your call).

**Acceptance:** from any route, a recruiter can reach GitHub, LinkedIn, CV, and contact in one click; Lighthouse a11y score doesn't regress.

---

## Phase 4 — Social proof & case studies (content-gated, ~2 days once content exists)

**This phase is blocked on your content. Code is the easy part.**

- [ ] 🔴 **Testimonials:** collect 2–3 short quotes (manager/colleague/client), each with name, role, company, and their permission to publish. Send them to Claude as plain text.
- [ ] Testimonials section on Home (and/or About) in the design system.
- [ ] 🔴 **Case-study material** for 2 flagship projects (Reqlume + one other): the problem, your specific role, key technical decisions, and one or two honest outcome statements (metrics if you have them, "shipped to X users at Y" style otherwise). Claude drafts the page structure and copy from your bullet points — you approve every claim before it ships.
- [ ] Case-study route per project (`/work/<slug>`), linked from the project cards. Screenshots optimized to WebP like everything else; a 30–60s demo GIF/clip per project if you can record one 🔴.
- [ ] Update sitemap with new routes.

**Acceptance:** project cards link to case studies; every factual claim user-approved; images pass the perf budget (no single asset > 300 KB).

---

## Phase 5 — Design consistency (~1–2 days)

The site still has two visual languages (new: Skills/Companies; old: About, Experience, Contact, Languages).

- [ ] Extract `<SectionHeader eyebrow title accent>` from the new sections — define the pattern once.
- [ ] Migrate About → Experience → Languages → Contact to the new system, **one section per commit**, reusing existing content verbatim.
- [ ] Consolidate spacing + type scale into CSS variables in `global.css`; remove per-component one-offs.
- [ ] 🔴 **Review checkpoint per migrated section** — screenshot before/after; you approve each before the next starts (cheap to steer early, expensive to redo late).

**Acceptance:** no old-design remnants; every section uses `SectionHeader`; dark mode still coherent on migrated sections.

---

## Phase 6 — Quality gates (~1 day)

- [ ] **Tests:** route smoke tests (each page renders without crashing), Header nav test, `api/chat.js` validation unit tests (missing/oversized message, method rejection). Target: `npm test -- --watchAll=false` green with real assertions.
- [ ] **CI:** minimal GitHub Action running lint + tests on PRs/pushes (Vercel only gates the build, not tests).
- [ ] **Accessibility:** global `prefers-reduced-motion` handling — gate ScrollReveal, framer-motion transitions, and the hero parallax (currently only 2 CSS files honor it); visible `:focus-visible` rings site-wide; contrast audit on muted DM-Mono text; keyboard-walk the whole site.
- [ ] **Lighthouse budget:** measure and record scores (perf/a11y/best-practices/SEO) in this file; fix anything under 90 that's cheap.

**Acceptance:** CI green on a test PR; Lighthouse a11y ≥ 95; motion fully disabled under emulated `prefers-reduced-motion`.

---

## Phase 7 — Analytics & monitoring (~2 hours)

- [ ] 🔴 **Pick the provider.** Recommendation: **Vercel Web Analytics** — free tier, privacy-friendly, no cookie banner needed, one dashboard toggle + one package. (Alternatives: Plausible = paid, Umami = self-hosting burden. Not worth it here.)
- [ ] 🔴 Enable Web Analytics in the Vercel project dashboard.
- [ ] Add `@vercel/analytics` and mount `<Analytics />` in `App.js`.
- [ ] Optional: `@vercel/speed-insights` the same way.
- [ ] Optional: 🔴 free uptime monitor (UptimeRobot) on `/` and `/api/health` — needs an account.

**Acceptance:** page views appear in the Vercel dashboard within a day; no console errors; Lighthouse unaffected.

---

## Suggested order & effort

| Phase | Effort | Blocked on you? |
|---|---|---|
| 0 — Protections | 10 min you + 1 h Claude | Mostly 🔴 |
| 1 — Dark mode + 404 | ~half day | Dark-mode review 🔴 |
| 2 — SEO | ~half day | Search Console 🔴 (non-blocking) |
| 3 — Recruiter essentials | ~1 day | Availability wording 🔴 |
| 4 — Proof & case studies | ~2 days | **Fully content-gated 🔴** |
| 5 — Design consistency | 1–2 days | Per-section review 🔴 |
| 6 — Quality gates | ~1 day | No |
| 7 — Analytics | ~2 h | Provider + toggle 🔴 |

Phases 1–3 are independent of your content and deliver the most recruiter-visible value — do them first. Start collecting Phase 4 quotes/outcomes in parallel; it has the longest lead time and the highest credibility payoff.

To execute: tell Claude *"do phase N"* — it will follow the ground rules, hit the 🔴 checkpoints, and tick the boxes in this file as items land.
