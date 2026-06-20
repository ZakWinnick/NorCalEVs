# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NorCal EVs (norcalevs.org) is the website for Northern California's cross-brand EV community. The org is a registered **501(c)(7) nonprofit social club**. The `NorCal EVs Playbook v1` PDF (on the user's Synology at `/Users/zakwinnick/Library/CloudStorage/SynologyDrive-Vandenberg/NorCal EVs/Playbook/`) is the authoritative source for organizational identity, messaging, tiers, and operations. See `BRAND_GUIDELINES.md` for voice and language rules.

**Standing editorial rule:** Never use em dashes (`—`) anywhere in copy, code comments, or CSS comments. Use commas, colons, periods, or parentheses instead.

**Visual identity:** NorCal EVs has its own bespoke identity and must not visually resemble any other site in this workspace (Rangeway, Wyld Wandering, etc.). The current design language is "Modern Electric" (see below).

## Stack

This is an **Astro 6 static site** (plain CSS, no Tailwind, no UI framework). It was migrated from Jekyll in June 2026. There is no Ruby toolchain anymore. The only dynamic content is the client-side Heylo events widget; everything else is static HTML generated at build time.

```bash
npm install     # first-time dependency setup
npm run dev     # local dev server at http://localhost:4321
npm run build   # static build to dist/
npm run preview # serve the production build locally
```

No test suite.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`: it runs `npm ci && npm run build` and publishes `dist/` to **GitHub Pages** via `upload-pages-artifact` + `deploy-pages`. The repo's GitHub Pages source must be set to **GitHub Actions** (not "Deploy from branch").

`public/CNAME` maps the custom domain `norcalevs.org` (Astro copies it into `dist/`). Do not remove it. `package-lock.json` is committed because `npm ci` needs it.

## Architecture

### Directory layout (`src/`)

- `pages/` : one `.astro` file per route. `index.astro` (home), `membership`, `sponsorships`, `resources`, `leaders`, `privacy`, `terms`, `changelog`, `join` (Heylo redirect), `404`.
- `layouts/BaseLayout.astro` : the single page wrapper. Owns `<head>` (title/description/OG/canonical, theme-color meta, favicons, Google Fonts, Tinylytics analytics, the no-flash theme script) and composes `Nav` + `<slot/>` + `Footer`.
- `components/` : `Nav.astro` (data-driven links, dropdown, mobile menu, theme toggle) and `Footer.astro`.
- `data/` : TypeScript data modules imported and mapped in components. `navigation.ts`, `sponsors.ts`, `social.ts`. (Ported from the old Jekyll `_data/*.yml`.)
- `styles/global.css` : all styling. Imported once in `BaseLayout`. Semantic CSS custom properties drive both themes; component styles follow.

Homepage sections are written inline in `index.astro` (hero, about, what-we're-building, brand strip, events, sponsors, stay-connected). Content pages use shared style primitives from `global.css` (`.page-head`, `.tile-grid`, `.tiers`, `.funnel`, `.list-check`, `.doc`, `.band-cta`).

### Design language: "Modern Electric"

High-contrast, precise, engineered. Defined entirely by tokens + components in `src/styles/global.css`:

- **Type:** `Archivo` (tight grotesque) for headings/body, `IBM Plex Mono` for kickers, index numbers, and spec labels (the mono layer is the "instrument" signal). No Space Grotesk, no Inter.
- **Color:** semantic tokens (`--bg`, `--fg`, `--card`, `--band`, `--line`, etc.) with a single electric-teal accent (`--volt`), a brightened pull from the logo's teal. Flat fills, no gradients, no glass, no soft shadows.
- **Structure:** strict hairline grids (1px rules) instead of rounded floating cards; sharp `--radius` (3px); high-contrast dark "bands" (`.about`, `.brand-strip-section`, footer) alternating with light sections.
- **Kickers:** `.kicker` = mono uppercase label with a short `--volt` tick (use `.on-dark` on dark bands). Not the old dash-eyebrow.

### Theming (light/dark)

`global.css` defines light tokens on `:root` and dark tokens on `:root[data-theme="dark"]`, plus a `@media (prefers-color-scheme: dark)` block for `:root:not([data-theme="light"])` so the site follows the OS by default. The nav theme toggle (`.nav-theme` in `Nav.astro`) flips `data-theme` and persists to `localStorage`. An inline script in `BaseLayout`'s `<head>` applies the saved theme before paint to avoid a flash. New surfaces should use semantic tokens (never raw hex) so they theme automatically.

### Integrations

- **Events:** Heylo widget embedded in `index.astro` with hardcoded `data-api-key` and `data-community-id`, plus a `MutationObserver` fallback that shows a static CTA after 3.5s if the widget does not populate.
- **Analytics:** Tinylytics, deferred script in `BaseLayout` `<head>`.

### Contact (mailto, no forms)

There are no HTML forms. Intake is via `mailto:` CTAs with prefilled subject/body (URL-encoded):
- Mailing list (homepage "Stay Connected"): `info@norcalevs.org`
- Sponsorship (`/sponsorships`): `sponsors@norcalevs.org`
- Resources / general: `contact@norcalevs.org`

These addresses must exist as real inboxes/aliases.

### Routing through norcalevs.org

Signup links route through `/join` (a thin redirect to the Heylo join page), never deep-linking to Heylo directly. Membership/tier CTAs point to `/join`; navigational "Join the Community" buttons point to `/membership`. Event links to Heylo stay direct.

## Content notes

- **Membership** (`/membership`): three tiers (Standard Range free, Long Range $50/yr "Best Value", Max Pack $500 lifetime), a 5-step funnel, and a Launch Edition promo. The promo is gated by `launchClaimed < launchTotal` in the page frontmatter; bump `launchClaimed` by hand to 30 to auto-hide it (no payment backend yet).
- **Sponsorships** (`/sponsorships`): four annual tiers named after EV charging levels: Plug-In ($250), Level 2 ($500), Fast Charge ($1,500), Supercharger ($3,000+, featured), plus a la carte event add-ons. "Premier logo placement" describes a benefit and is allowed; the "never use premier" rule is only about describing NorCal EVs itself.
- All membership/tier CTAs route to Heylo via `/join`. No payment provider is wired up yet.

## Voice & Language (from Playbook)

- **Tagline:** "Driven by Community. If it plugs in, it belongs here."
- **Positioning:** "Northern California's cross-brand EV community"
- Use "community" not "organization" or "club". Use "members" not "users". Use "join us" not "sign up". Use "Northern California" not "Bay Area" (unless location-specific).
- **Never use:** "revolution", "disrupting", "game-changing", "premier" (as a descriptor of NorCal EVs), "EV lifestyle", "tribe", excessive exclamation marks.
- **No em dashes anywhere** (see top of this file).
- Tone: clear, warm, modern, confident, inclusive.

## Known open items

- Membership/sponsorship CTAs route to Heylo, not a payment flow. Wire Stripe/Memberful when dues collection goes live.
- Brand-tile and hero photos are manufacturer/editorial placeholders. Swap for real member/event photography when available.
- Privacy and Terms are placeholder drafts. Resources lists two "coming soon" items.
- Dark-mode sponsor logos use a blanket CSS invert (fine for monochrome marks, can look off on full-color logos). Refine per-logo as real sponsor art lands.
- No sitemap is generated yet (consider `@astrojs/sitemap` if SEO needs it).
