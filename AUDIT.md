# Portfolio Website — Full Audit & Roadmap

**Audited:** June 2026
**Scope:** `oussemaamri.com` — React (CRA) SPA, multi-page routing, AWS S3 + CloudFront + Lambda chatbot.
**Method:** Full codebase review + research into 2026 developer-portfolio trends and what recruiters scan for (sources at the end).

---

## TL;DR — Priorities

| Priority | Item | Why it matters |
|----------|------|----------------|
| 🔴 **P0** | SPA routes 404 on direct visit / refresh | A recruiter opening `oussemaamri.com/work` directly currently gets an error page. Breaks the multi-page work we just shipped. |
| 🔴 **P0** | Dark mode is built but not wired up | `useTheme` is never called; `body.dark` is never set. Every `body.dark` CSS rule is dead code. The toggle button doesn't exist. |
| 🟠 **P1** | Projects have no visuals or live demos | Recruiters spend <30s and want to *click and see something work*. Flat text cards with `link: '#'` lose them. |
| 🟠 **P1** | Oversized images in repo & deploy | `my_photo.png` is **5.5 MB**, `oussema.png` 1.3 MB, `logo_app.png` 574 KB. Hurts load time and Lighthouse. |
| 🟠 **P1** | No per-route SEO / social meta | All routes share one `<title>`. Sharing `/work` on LinkedIn shows the generic home preview. |
| 🟡 **P2** | Inconsistent design language | New sections use Syne/DM-Mono + dark editorial style; older ones (About, Experience, Projects) still use the old look. |
| 🟡 **P2** | No social proof, case studies, or resume prominence | 2026 portfolios lead with testimonials + structured case studies. |
| 🟢 **P3** | Zero automated tests | CI runs `npm test --passWithNoTests` — nothing is actually verified. |

---

## 1. Critical bugs (fix first)

### 1.1 — Client-side routes break on direct access 🔴
**Problem:** The app uses `BrowserRouter`. Routes like `/skills`, `/work`, `/about` only work when navigated to *from within* the app. A direct visit or page refresh asks CloudFront/S3 for an object at that path, which doesn't exist → **403/404 error page**, not the app.

There is no catch-all `<Route path="*">` and no CloudFront custom-error rewrite in the repo.

**Fix (two parts):**
1. **CloudFront**: Add Custom Error Responses mapping **403 → `/index.html` (200)** and **404 → `/index.html` (200)**. (Console: Distribution → Error Pages, or via IaC.) This is the standard SPA fix and is required for the routing to work in production.
2. **App**: Add a catch-all route + a real 404 page:
   ```jsx
   <Route path="*" element={<NotFound />} />
   ```

> Verify after deploy by visiting `oussemaamri.com/work` in a fresh tab.

### 1.2 — Dark mode never activates 🔴
**Problem:** [src/hooks/useTheme.js](src/hooks/useTheme.js) exists and toggles `body.dark`, but **nothing imports or calls it**. There is no toggle button in [Header.js](src/components/Header.js) (the old `theme-toggle` markup was dropped in the multi-page refactor; only its CSS remains). Result: the site is permanently light, and all the `body.dark { … }` rules across `Skills.css`, `OverviewGrid.css`, `global.css`, etc. are unreachable.

**Fix:** Mount `useTheme` once (in `App` or `Header`), render a sun/moon toggle in the header, and on first load respect `prefers-color-scheme` before falling back to `localStorage`. Then sweep the older component CSS to make sure each one has dark-theme coverage.

### 1.3 — Dead demo links 🟠
Several entries in [Projects.js](src/components/Projects.js) have `link: '#'`. Either point them at a live deployment / video, or drop the "live" affordance so it doesn't look broken.

---

## 2. What recruiters scan for (and what's missing)

Research is consistent: recruiters give a portfolio **under 30 seconds** on the first pass. They look for — in order — a clear *who/what*, **projects they can click and see working**, a **skills overview with recognizable icons**, prominent **GitHub/LinkedIn**, and a **dead-simple way to make contact**.

Current state against that checklist:

| Recruiter need | Status | Gap |
|----------------|--------|-----|
| Clear identity in 5s | ✅ Hero is strong | — |
| Skills with badges/icons | ✅ Just redesigned with brand icons | — |
| GitHub/LinkedIn prominent | ⚠️ Only in hero + bare footer | Add to nav or a sticky social rail |
| Projects you can *see* | ❌ Text-only, no images, dead links | **Biggest content gap** |
| Case-study depth (problem→role→tech→result) | ❌ Flat descriptions | Add structured project pages |
| Easy contact | ✅ Form + copy-email | — |
| Resume/CV download | ⚠️ Only in hero | Surface in nav + footer + contact |
| Social proof / testimonials | ❌ None | Add 2–3 quotes (managers, colleagues) |

---

## 3. Trends to borrow from 2026 portfolios

From the curated 2026 roundups (Muzli, Colorlib, Envato, sitebuilderreport):

- **Textured minimalism + dark editorial layouts** — we've started this with the new Skills/Companies sections; finish the system across the whole site.
- **Project case studies over galleries** — each flagship project gets its own page: the problem, your role, stack, decisions, and outcome. Short 30–90s demo clips/GIFs beat screenshots.
- **Purposeful motion** — smooth section transitions, subtle parallax, scroll-reveal (we have `ScrollReveal` + `usePageTransition` already; extend, don't over-add).
- **Micro-interactions** — hover states that surprise (we added these to cards; keep them consistent).
- **Social proof front-and-center** — testimonials carry credibility recruiters trust more than self-reported metrics.
- **Accessibility as baseline** — WCAG contrast, keyboard nav, `prefers-reduced-motion`. This is now table-stakes, not a nice-to-have.

---

## 4. Design consistency

The site currently has **two visual languages**:
- **New:** Skills + Companies — Syne display font, DM Mono labels, dark editorial panels, per-item accent colors, watermark numbers.
- **Old:** About, Experience, Projects, Languages, Contact — Poppins, lighter cards, the original look.

**Recommendation:** Adopt the new system as the canonical design language and migrate the remaining sections to it:
- Shared section header pattern (`// eyebrow` + Syne title + accent rule) — extract a `<SectionHeader>` component so it's defined once.
- Consistent card treatment (border, radius, hover lift, accent glow).
- One spacing scale and one type scale in `global.css` as CSS variables.

---

## 5. Specific component notes

- **Footer** ([Footer.js](src/components/Footer.js)) — very bare (copyright + 2 links). Add: quick nav, email, CV download, "built with React/AWS" note, back-to-top.
- **Projects** ([Projects.js](src/components/Projects.js)) — add thumbnails, live + repo links, tech badges (reuse the skills icon set), and a "Featured" highlight for the top 2–3.
- **Experience** ([Experience.js](src/components/Experience.js)) — strong content; restyle into a visual timeline matching the new system.
- **Contact** ([Contact.js](src/components/Contact.js)) — solid. Consider adding response-time expectation + availability badge ("Open to opportunities").
- **No scroll-to-top button** on long home page — add one.
- **ChatWidget** — good differentiator; surface it more (e.g., a one-line hint "Ask my AI about my experience").

---

## 6. Technical / performance / quality

- **Images:** Convert `my_photo.png` (5.5 MB) usage entirely to the existing 220 KB `.webp`; remove the giant PNGs from `public/` and `src/assets`. Compress `logo_app.png`. Add explicit `width/height` everywhere to avoid layout shift (mostly done).
- **SEO per route:** Add `react-helmet-async` to set unique `<title>` + `<meta description>` + OG tags per page. Add a real `sitemap.xml` covering the new routes (current one predates them).
- **Tests:** Add a smoke test per route (renders without crashing) and a Header navigation test. CI already runs `npm test` — give it something to check.
- **Accessibility:** Honor `prefers-reduced-motion` (gate the parallax/scroll-reveal); audit contrast on muted DM-Mono text on dark panels; ensure all interactive cards are real `<a>`/`<button>` (mostly true) and keyboard-focusable with visible focus rings.
- **Analytics:** No analytics detected. Add privacy-friendly analytics (Plausible/Umami) to learn what recruiters actually click.

---

## 7. Suggested roadmap (phased)

**Phase A — Fix what's broken (P0)**
1. CloudFront SPA error-response rewrite + `<Route path="*">` 404 page.
2. Wire up dark mode (mount `useTheme`, add header toggle, respect `prefers-color-scheme`).
3. Fix/remove dead project links.

**Phase B — Recruiter essentials (P1)**
4. Project visuals + live/repo links + tech badges; promote 2–3 featured projects.
5. Image optimization pass (webp everywhere, drop the 5.5 MB PNG).
6. Per-route SEO meta (`react-helmet-async`) + updated sitemap.
7. CV download in nav + footer.

**Phase C — Stand out (P2)**
8. Migrate remaining sections to the new design system; extract `<SectionHeader>`.
9. Add testimonials/social-proof section.
10. Build 1–2 full case-study project pages (problem → role → stack → outcome, with a short demo clip).
11. Footer rebuild + scroll-to-top.

**Phase D — Polish (P3)**
12. Accessibility pass (`prefers-reduced-motion`, contrast, focus states).
13. Add route smoke tests.
14. Add privacy-friendly analytics.

---

## 8. Skills/tools that would help (per your request)

I currently have **`frontend-design`** (used for the redesigns) and general code tools. To execute this audit well, these additional capabilities would help — worth adding to the available skill set:

- **Accessibility / WCAG audit skill** — to systematically check contrast, ARIA, keyboard nav (no dedicated skill available now; doing it manually).
- **Lighthouse / performance audit skill** — to measure load, image, and Core Web Vitals impact against real numbers rather than estimates.
- **Playwright/browser-driving** — to visually screenshot each page and verify the routing/dark-mode fixes in a real browser. *(Blocked earlier: Chromium wasn't installed and the install was declined. Approving `npx playwright install chromium` would unblock visual verification.)*
- **SEO audit skill** — structured meta/OG/sitemap/structured-data checks.

If you want, I can proceed with **Phase A** immediately — those are the two genuine bugs (routing + dark mode) and are quick, high-impact fixes.

---

## Sources

- [100 Best Designer Portfolio Websites of 2026 — Muzli](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Portfolio design trends for 2026 — Envato](https://elements.envato.com/learn/portfolio-trends)
- [19 Best Portfolio Design Trends (2026) — Colorlib](https://colorlib.com/wp/portfolio-design-trends/)
- [21 Best Developer Portfolio Websites (2026) — Colorlib](https://colorlib.com/wp/developer-portfolios/)
- [Web Developer & Designer Portfolios: 25 Examples (2026) — SiteBuilderReport](https://www.sitebuilderreport.com/inspiration/web-developer-designer-portfolios)
- [How to Build a Software Engineer Portfolio That'll Land Interviews — Arc.dev](https://arc.dev/talent-blog/software-engineer-portfolio/)
- [What Recruiters Look for in a Full Stack Developer Portfolio — Medium](https://medium.com/@sharetonschool/what-recruiters-look-for-in-a-full-stack-developer-portfolio-0d699b616cf3)
- [Portfolio Case Study Examples Guide 2026 — InfluenceFlow](https://influenceflow.io/resources/portfolio-case-study-examples-the-complete-2026-guide-for-creative-professionals/)
- [Top 8 Developer Portfolio Websites to Inspire You in 2026 — Gola](https://www.gola.supply/blog/developer-portfolio-websites)
