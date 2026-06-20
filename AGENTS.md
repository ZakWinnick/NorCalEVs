# AGENTS.md

Guidance for AI coding agents working in this repository. The authoritative, fuller version is `CLAUDE.md`; read it first. This file is a short mirror.

## Project

NorCal EVs (norcalevs.org), the website for Northern California's cross-brand EV community, a registered 501(c)(7) nonprofit. `BRAND_GUIDELINES.md` and the Playbook (on the user's Synology) govern voice and identity.

## Stack

Astro 6 static site, plain CSS, no Tailwind, no Ruby (migrated from Jekyll in June 2026). Only the Heylo events widget is dynamic.

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # -> dist/
```

Deploy: push to `main` runs `.github/workflows/deploy.yml` (build + publish `dist/` to GitHub Pages). `public/CNAME` maps the domain.

## Layout

- `src/pages/*.astro` : routes
- `src/layouts/BaseLayout.astro` : head + Nav + slot + Footer
- `src/components/{Nav,Footer}.astro`
- `src/data/{navigation,sponsors,social}.ts` : imported and mapped
- `src/styles/global.css` : all styling, semantic tokens, light/dark themes

## Rules

- **No em dashes** anywhere (copy, code, comments). Use commas/colons/periods/parentheses.
- Design language is "Modern Electric": high-contrast, mono spec labels, hairline grids, one electric-teal accent. Use semantic CSS tokens, never raw hex, so new surfaces theme automatically.
- NorCal EVs has its own bespoke identity; never make it resemble other workspace sites.
- Voice: "community" not "club/organization", "members" not "users", "join us" not "sign up". Never use "revolution", "disrupting", "game-changing", "premier" (as a descriptor), "EV lifestyle", "tribe".
- Contact is via `mailto:` (no forms): `info@`, `sponsors@`, `contact@norcalevs.org`. Signup routes through `/join` (Heylo redirect).
