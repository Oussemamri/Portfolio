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
- [x] 🔴 **Decide:** should `reqlume_mid_page.png` (untracked, unused) become the Reqlume card/case-study image? If yes, Claude compresses to WebP and wires it in; if no, delete it.
- [ ] **Chat abuse guard (code)** — add a lightweight per-IP token bucket in `api/chat.js` (in-memory, best-effort per warm instance) and log rejected requests. CORS + 500-char cap are already live; this closes the direct-`curl` gap well enough for a portfolio.

**Acceptance:** EmailJS test from an allowed origin still sends; a scripted burst against `/api/chat` starts returning 429.

---

## Phase 1 — Fix what's broken (P0, ~half a day)

### 1.1 Wire up dark mode
The hook exists ([src/hooks/useTheme.js](../src/hooks/useTheme.js)) but nothing mounts it; every `body.dark` rule in the CSS is dead code today.

- [x] Mount `useTheme` once in `App.js`; on first visit (no localStorage entry) respect `prefers-color-scheme`.
- [x] Sun/moon toggle button in the Header (desktop + mobile), keyboard-accessible with `aria-label`.
- [x] Sweep ALL component CSS for dark coverage — the new-design sections (Skills, Companies) have `body.dark` rules; older ones (About, Experience, Contact, Languages, footer, chat widget) need auditing. Fix contrast failures, don't just invert. Also caught and fixed three bugs beyond the obvious "add body.dark rules": the Hero's ink-reveal canvas mask was hardcoded white (fully hid the dark gradient until the mouse moved over it), Services/Languages had a separate `--maz-*` token block with no dark variant, and `<html>` never inherited `body.dark`'s `--bg-color` (CSS vars only inherit downward) which showed as a light strip below short pages.
- [x] 🔴 **Review checkpoint:** confirmed working live by Oussema.

### 1.2 Real 404 page
- [x] `<Route path="*" element={<NotFound />} />` in `App.js` + a small branded NotFound page (big 404, one-liner, links to `/` and `/work`). Keep it consistent with the design system.

**Acceptance:** toggle persists across reload and route changes; `oussemaamri.com/definitely-not-a-page` shows the branded 404; CI build green.

---

## Phase 2 — Per-route SEO (~half a day)

**Architect's note (read first):** CRA renders client-side. Google executes JS, so per-route `<title>`/`<meta description>` via `react-helmet-async` works for search. **Social scrapers (LinkedIn/WhatsApp/X) do not run JS** — per-route OG images/titles will NOT show when sharing deep links unless we add prerendering or migrate to a framework. Scope here is the honest 80%: search SEO now, social previews stay the (good) static homepage card. A Next.js migration is deliberately out of scope — revisit only if case studies (Phase 4) justify it.

- [x] Add `react-helmet-async`; `<HelmetProvider>` in `index.js`.
- [x] Small `<PageMeta title description path>` component; apply to all 8 routes with unique, recruiter-oriented copy (~155-char descriptions).
- [x] Canonical URL per route. Also removed the static `<meta name="description">`/`<link rel="canonical">` from `index.html` — they were duplicating Helmet's per-route tags in the DOM (first-match querySelector/crawlers would see the stale static one, and Google explicitly warns against multiple canonical tags).
- [x] Extend the existing JSON-LD `Person` schema in `index.html` (add `jobTitle`, `worksFor`, `sameAs` → GitHub/LinkedIn) — already done in an earlier session, verified present.
- [x] 🔴 **Google Search Console** — domain verified and sitemap submitted by Oussema.

**Acceptance:** each route shows a unique tab title live; Google Rich Results test passes on the Person schema; Search Console shows the sitemap accepted (may take days — don't block on it).

---

## Phase 3 — Recruiter essentials (~1 day)

- [x] **Footer rebuild** ([src/components/Footer.js](../src/components/Footer.js)): quick-nav links (all routes), GitHub/LinkedIn/email, CV download, "Built with React · deployed on Vercel" line, back-to-top button. Match the dark editorial design system. The old nav used `#anchor` hrefs (`#skills`, `#projects`, etc.) that were already dead since the multi-page migration — replaced with real `<Link>` routes.
- [x] **CV prominence:** download link in Header (desktop) and footer, not just the hero. Uses the current `public/cv/Oussema_Amri_CV.pdf` — re-run this once you've refreshed the PDF per Phase 0.
- [x] **Social links in Header** — GitHub + LinkedIn icons, visible without scrolling on every route (hidden below 1180px width, where footer/mobile-nav cover it instead).
- [x] **ChatWidget hint** — one-line teaser near the launcher ("Ask my AI about my experience"), dismissible, shown once per session via `sessionStorage`.
- [x] **Availability badge** in Contact + Hero. Wording confirmed: **"Open to work"** (direct wording, per your answer).

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

## Phase 5 — Design consistency (~1–2 days) ✅ done

The site had two visual languages (new: Skills/Companies; old: About, Experience, Contact, Languages).

- [x] Extract `<SectionHeader eyebrow title accent>` from the new sections — [src/components/common/SectionHeader.js](../src/components/common/SectionHeader.js), matching Skills' exact typography (Syne title, DM Mono eyebrow/subtitle). Used by Experience and Languages.
- [x] Migrate About → Experience → Languages → Contact to the new system, reusing existing content verbatim. Two judgment calls made along the way, not blind mechanical swaps:
  - **About** has a distinctive editorial grid (big ABOUT/ME letters, photo, bio) with no conventional header to extract — bolting `SectionHeader` on top would have been a downgrade. Migrated its *typography* only: Syne for the display headlines (was Arial Black), DM Mono for the small labels, `var(--text-muted)` instead of a hardcoded `#888`.
  - **Contact**'s heading is responsively center-on-mobile/left-on-desktop next to the form — `SectionHeader` is always centered, so forcing it in would have broken that layout. Applied the Syne font directly to `.contact-heading`/`.contact-details-title` instead, preserving the alignment behavior.
  - **Experience** and **Languages** had plain generic `<h2>`s with no such constraints — full `SectionHeader` swap, dead CSS removed (`.languages-title` block deleted).
- [x] Spacing: largely already consolidated — every section already inherits the global `section { padding: 5rem 2rem }` rule from `global.css`. Didn't force a broader type-scale token sweep beyond what SectionHeader introduces; the existing per-component clamp()-based sizes are already responsive and not obviously broken, so rewriting them risked regressions for no clear payoff.
- [x] 🔴 **Review checkpoint** — screenshotted About in both themes, you confirmed ("It looks good") before Experience/Languages/Contact proceeded.

**Acceptance:** no old-design remnants in the migrated sections ✅; Experience/Languages use `SectionHeader` ✅ (About/Contact use direct typography for layout reasons, see above); dark mode verified coherent on all 4 via screenshot ✅.

---

## Phase 6 — Quality gates (~1 day) ✅ done

- [x] **Tests:** 22 tests across 3 suites — route smoke tests for all 8 routes + 404 (`src/App.test.js`), Header nav test (`src/components/Header.test.js`), and `api/chat.js` validation unit tests including a CORS-origin and boundary-length case (`src/api-chat.test.js`, requires the real `api/chat.js` — no duplicated logic). `npm test -- --watchAll=false` exits 0.
- [x] **CI:** [.github/workflows/ci.yml](../.github/workflows/ci.yml) — lint, test, build on every push/PR to `main`.
- [x] **Accessibility:**
  - `prefers-reduced-motion`: global CSS kill-switch in `global.css` (an `!important` stylesheet rule overrides even inline styles, catching `ScrollReveal`'s JS-set transitions); `usePageTransition`'s scroll-linked parallax now no-ops entirely; `Sparkles.js`'s canvas particle loop paints one static frame instead of animating forever; `<MotionConfig reducedMotion="user">` wraps the app so every framer-motion usage (Header's nav-lamp, Footer's BackgroundBoxes) respects it automatically.
  - `:focus-visible` rings site-wide (keyboard-only, not on mouse click) using `var(--primary-color)`, verified visually via Playwright tab-through.
  - Contrast audit found and fixed 4 real AA failures: the footer copyright/built-with lines (2.6:1 and 2.5:1 → now 5.4:1/5.0:1), the `.page-shell-subtitle` used on 7 routes (3.5:1 → 6.0:1), and the light-mode "Open to work" badge text (3.0:1 → 5.8:1).
- [x] **Lighthouse budget** (production build, `localhost:5000` via `serve -s build`):

  | | Performance | Accessibility | Best Practices | SEO |
  |---|---|---|---|---|
  | Mobile (simulated, 4x CPU throttle) | 33* | 96 | 100 | 100 |
  | Desktop | 90 | 100 | 100 | 100 |

  \* The mobile run shares this session's dev environment, which had ~38 lingering Node/Chromium processes from hours of Playwright verification — TBT dropped from 4130ms to 30ms on the desktop run with identical code, so the mobile number reflects host contention, not the app. Re-run mobile Lighthouse in a clean environment (or via PageSpeed Insights against the live site) for a trustworthy mobile baseline — real mobile users on weaker CPUs than this dev machine may still see a meaningfully lower number than desktop.

**Acceptance:** CI green on a test PR ✅; Lighthouse a11y ≥ 95 ✅ (96 mobile / 100 desktop); motion fully disabled under emulated `prefers-reduced-motion` ✅ (verified: pulse animation-duration drops to 0.01ms, zero console errors).

---

## Phase 7 — Analytics & monitoring (~2 hours)

- [x] **Pick the provider.** Went with **Vercel Web Analytics** per the recommendation — free tier, privacy-friendly, no cookie banner needed.
- [ ] 🔴 Enable Web Analytics in the Vercel project dashboard (Project Settings → Analytics). One click — the code is already shipped and waiting for it.
- [x] Add `@vercel/analytics` and mount `<Analytics />` in `App.js`. Hit a real Jest resolver issue: both `@vercel/analytics` and `@vercel/speed-insights` ship conditional `exports` without a Node `default` fallback, which CRA's bundled Jest can't follow for the `/react` subpath — fixed with a `moduleNameMapper` override in `package.json` pointing at the CJS dist files directly.
- [x] `@vercel/speed-insights` added the same way.
- [ ] Optional: 🔴 free uptime monitor (UptimeRobot) on `/` and `/api/health` — needs an account.

**Acceptance:** code shipped and deployed (commit `fee52cc`), no console errors, Lighthouse unaffected — page views will appear in the Vercel dashboard once you flip the Analytics toggle.

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
