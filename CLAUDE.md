# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NorCal EVs (norcalevs.org) is the website for Northern California's cross-brand EV community — a registered nonprofit connecting EV owners, enthusiasts, and the EV-curious across all brands. It uses a dark glassmorphic design with animated gradients, particle effects, and scroll-triggered reveal animations. See `BRAND_GUIDELINES.md` for voice, color, and language rules. The `NorCal EVs Playbook v1` PDF is the authoritative source for organizational identity, messaging, and operations.

## Build & Serve

```bash
bundle install           # First-time dependency setup
bundle exec jekyll serve # Local dev server at http://localhost:4000
bundle exec jekyll serve --livereload  # With auto-reload
JEKYLL_ENV=production bundle exec jekyll build  # Production build to _site/
```

Jekyll 3.9 with Ruby 2.6+. No test suite.

## Deployment

Push to `main` deploys automatically via GitHub Pages. The `CNAME` file maps the custom domain — do not modify it.

## Architecture

### Data-Driven Content

Site content is driven by YAML data files in `_data/`:
- `navigation.yml` — main nav links and the Social dropdown submenu
- `social.yml` — social platform cards rendered on the homepage (emoji icons, not Font Awesome)
- `stats.yml` — community stats counters (currently not rendered on homepage)

To add/remove nav items or social links, edit these data files rather than templates.

### Layout Chain

`default.html` → wraps all pages. Includes animated background (`div.animated-bg`, `div.particles`), header, footer, and `scripts.html`.

`home.html` → extends `default`. Contains hero, about cards, Heylo events embed, and social grid. Content sections use `.reveal` class for scroll-triggered fade-in.

`page.html` → extends `default`. Used for `membership.md` and `leaders.md`.

### CSS Architecture

Two CSS systems coexist:
- **`styles.css`** (root) — the original monolithic stylesheet (navbar, hero, sections, responsive)
- **`assets/css/`** — modular refactor: `variables.css` (design tokens), `base.css`, `components.css`, `animations.css`, `main.css` (imports all)

`_includes/head.html` determines which stylesheets are loaded. Check there when debugging style issues.

### Design Tokens

Brand colors and spacing are defined as CSS custom properties in `assets/css/variables.css`:
- Primary: `#00ff88` (electric green), Secondary: `#0088ff` (blue)
- Dark background: `#0a0e27`
- Glassmorphic effects: semi-transparent whites with `backdrop-filter: blur()`

### JavaScript

All JS is inline in `_includes/scripts.html` — no build step, no external JS dependencies. Handles:
- Particle generation (50 floating dots)
- Navbar scroll effect (`.scrolled` class at 50px)
- Mobile hamburger menu toggle
- Dropdown menu for Social nav
- Smooth scroll for anchor links
- Scroll reveal animations (`.reveal` → `.active`)

### Analytics

Uses Tinylytics (`tinylytics.app`), loaded via script tag in `scripts.html`.

### Events

Heylo event feed is embedded via their JS widget in `home.html` with a hardcoded API key and community ID. This is a third-party embed, not a Jekyll collection (the `_events` collection in `_config.yml` is configured but unused).

## Content Pages

Pages use Markdown with YAML front matter. The homepage (`index.md`) has minimal content — the `home.html` layout handles all sections. Content pages (`membership.md`, `leaders.md`) use the `page` layout.

## Key Conventions

- Dark theme throughout — all new sections should use dark backgrounds with light text
- Glassmorphic card style: semi-transparent backgrounds, blur, subtle borders
- Scroll animations: add `.reveal` class to new sections for automatic fade-in
- Social links use emoji icons (not Font Awesome), defined in `_data/social.yml`
- Version tracked in `_config.yml` as `version:` field (format: `YYYY.WW`)

## Voice & Language (from Playbook)

- **Tagline:** "Driven by Community. If it plugs in, it belongs here."
- **Positioning:** "Northern California's cross-brand EV community"
- Use "community" not "organization" or "club". Use "members" not "users" or "followers". Use "join us" not "sign up". Use "Northern California" not "Bay Area" (unless location-specific).
- **Never use:** "revolution", "disrupting", "game-changing", "premier", "EV lifestyle", "tribe", excessive exclamation marks
- Tone: clear, warm, modern, confident, inclusive. Like a friend who knows EVs, not a brand trying to sound like a community.

## Legacy Files

The `includes/` directory (without underscore) at the project root contains old `header.html` and `footer.html` from a pre-Jekyll era. The active includes are in `_includes/`.
