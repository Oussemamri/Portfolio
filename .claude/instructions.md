# Multi-Page Navigation — Implementation Instructions

Convert the portfolio from single-page anchor navigation to a proper multi-page React Router site where each navbar item (Skills, Services, Experience, Work, About) routes to its own dedicated page.

---

## Current state (before changes)

- All sections live on one page (`/`) as anchor targets (`#skills`, `#experience`, etc.)
- Header uses `href="#..."` anchors + `scrollToElement()` util for in-page scroll
- React Router only handles `/` (Home) and `/contact`
- Section components are self-contained in `src/components/` with their own CSS

---

## What must NOT change

- All existing section components (`Skills.js`, `Projects.js`, `Experience.js`, etc.) — do not rewrite content
- All CSS files and design tokens (`--primary-color`, `--bg-color`, etc. in `global.css`)
- `ChatWidget` and `Footer` — remain global in `App.js`
- `useTheme`, `ScrollReveal`, `useScrollReveal` hooks — keep using them
- `usePageTransition` parallax — it only targets `.hero`, which stays on `/`

---

## Phase 1 — Routing layer

**Files:** `src/App.js`, `src/components/Header.js`

- Add routes in `App.js` for: `/skills`, `/services`, `/experience`, `/work`, `/about`, `/languages`
- Replace all `href="#..."` anchors in `Header.js` with React Router `<Link to="...">` components
- Remove the `scrollToElement` import from Header — it is no longer used for nav
- `Chat with AI` button stays as-is (opens `ChatWidget`, no route)
- `/contact` route already exists — leave it untouched
- Mobile hamburger: update `onClick` on each `<Link>` to call `setMenuOpen(false)` so the menu closes on navigation

---

## Phase 2 — Shared page shell

**File to create:** `src/components/common/PageShell.js` (+ paired CSS)

A reusable wrapper that every section page uses. Props: `title`, `subtitle`, `children`.

Structure:
```
<div class="page-shell">
  <div class="page-shell-banner">        ← full-width dark banner (same bg as header: #282c34)
    <h1>{title}</h1>                      ← large section title
    <p>{subtitle}</p>                     ← short descriptor line
    <div class="page-shell-accent" />    ← colored underline bar (var(--primary-color))
  </div>
  <div class="page-shell-content">
    {children}                            ← existing section component slots in here
  </div>
</div>
```

Design rules for the banner:
- Background: `var(--header-bg)` (matches the site header — dark, consistent)
- Title color: white
- Subtitle color: `var(--secondary-color)` (light blue)
- Accent bar: 60px wide, 3px tall, `var(--primary-color)`, centered
- Padding: `5rem 2rem` vertically, same rhythm as existing `section` padding
- Add a subtle fade-in animation on mount (`@keyframes fadeInDown`) — reuse the same pattern as `ScrollReveal`

---

## Phase 3 — Individual page files

**Files to create:** `src/pages/SkillsPage.js`, `ServicesPage.js`, `ExperiencePage.js`, `WorkPage.js`, `AboutPage.js`, `LanguagesPage.js`

Each page file is a thin wrapper — no new logic, just composition:

```js
// Example: src/pages/SkillsPage.js
import React from 'react';
import PageShell from '../components/common/PageShell';
import Skills from '../components/Skills';

const SkillsPage = () => (
  <PageShell title="Technical Stack" subtitle="Technologies and tools I work with">
    <Skills />
  </PageShell>
);

export default SkillsPage;
```

Subtitles for each page:
- Skills → "Technologies and tools I work with"
- Services → "What I can build for you"
- Experience → "Where I've worked and what I've shipped"
- Work → "Projects I've designed and developed"
- About → "A bit about who I am"
- Languages → "Human languages I speak"

Keep `React.lazy` + `Suspense` in `App.js` for code-splitting per route (same pattern already used in `Home.js`).

---

## Phase 4 — Home page rework

**File:** `src/pages/Home.js`

Remove all lazy-loaded section components from Home. Home becomes: **Hero + overview grid only.**

Below the `<Hero />`, add an `<OverviewGrid />` section (can be inlined in Home.js or extracted to `src/components/OverviewGrid.js`).

Overview grid: 6 cards in a responsive CSS grid (3 columns on desktop, 2 on tablet, 1 on mobile). Each card:
- Icon (from `react-icons`)
- Section title
- One-line description
- `<Link to="/skills">` wrapping the whole card

Card data:

| Route | Icon | Title | Description |
|-------|------|-------|-------------|
| `/skills` | `FaCode` | Technical Stack | React, Node.js, TypeScript & more |
| `/services` | `FaBriefcase` | Services | What I can build for you |
| `/experience` | `FaHistory` | Experience | Companies and roles |
| `/work` | `FaFolderOpen` | Work | Projects I've shipped |
| `/about` | `FaUser` | About | Who I am |
| `/languages` | `FaGlobe` | Languages | Languages I speak |

Card hover: lift effect (`translateY(-4px)`, `box-shadow`) using existing `.btn:hover` pattern. Use `var(--card-bg)`, `var(--border-color)`, `var(--primary-color)` — no new color values.

Update `Hero.js`: change the "Contact me" button's `href="#contact"` to a React Router `<Link to="/contact">` and the scroll-down indicator's `onClick` to scroll to `#overview` (the new grid section id) instead of `#skills`.

---

## Phase 5 — Navigation active state & transitions

**File:** `src/components/Header.js`

Active link highlighting:
- Import `useLocation` from `react-router-dom`
- Compare `location.pathname` to each link's `to` prop
- Add class `nav-link active` when matched; style it in `header.css` with `color: var(--primary-color)` and a 2px bottom border

Page transition:
- Add a CSS class `page-enter` on the `page-shell` root div that triggers a `fadeInUp` animation (opacity 0→1, translateY 20px→0, ~400ms ease-out)
- This is purely CSS — no JS animation library needed

---

## Implementation order

Execute phases strictly in order. Each phase must be fully working before starting the next:

1. Routing layer → test that clicking nav links changes the URL
2. PageShell component → test it renders standalone with dummy content
3. Individual page files → test each route renders the correct section
4. Home rework → test the overview grid links navigate correctly
5. Nav active state → test it highlights the correct link on each route

---

## Design consistency checklist

Before marking any phase done, verify:
- [ ] Dark/light theme toggle still works on every new page
- [ ] Mobile hamburger menu closes on navigation
- [ ] `ChatWidget` is accessible from every page
- [ ] No hardcoded color values — only CSS variables
- [ ] `ScrollReveal` entrance animations still work inside section components
- [ ] `PageShell` banner looks correct in both light and dark themes
