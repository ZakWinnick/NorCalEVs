# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

NorCal EVs (norcalevs.org) is the website for Northern California's cross-brand EV community — a registered nonprofit connecting EV owners, enthusiasts, and the EV-curious across all brands. The `NorCal EVs Playbook v1` PDF is the authoritative source for organizational identity, messaging, and operations. See `BRAND_GUIDELINES.md` for voice, color, and language rules.

## Build & Serve

```bash
bundle install           # First-time dependency setup (requires Ruby 3.x via rbenv)
bundle exec jekyll serve # Local dev server at http://localhost:4000
bundle exec jekyll serve --livereload  # With auto-reload
JEKYLL_ENV=production bundle exec jekyll build  # Production build to _site/
```

Jekyll 3.9 with Ruby 3.x (installed via rbenv at `~/.rbenv/versions/3.1.6`). The system Ruby (2.6) is too old — use `eval "$(rbenv init -)" && rbenv local 3.1.6` before running bundle commands. No test suite.

## Deployment

Push to `main` deploys automatically via GitHub Pages. The `CNAME` file maps the custom domain — do not modify it.

## Architecture

### Data-Driven Content

Site content is driven by YAML data files in `_data/`:
- `navigation.yml` — main nav links and the Social dropdown submenu
- `social.yml` — social platform cards (Heylo, Facebook, Instagram, X)
- `stats.yml` — community stats (currently not rendered on homepage)

### Layout Chain

`default.html` → wraps all pages. Includes head, header, footer, and scripts.

`home.html` → extends `default`. Contains: hero (logo + tagline + CTAs) → hero image → brand strip → What We Do cards → Heylo events embed → photo break → join section.

`page.html` → extends `default`. Used for `membership.md` and `leaders.md`. Supports `page_class` front matter for page-specific CSS scoping (e.g., `membership-page`, `leaders-page`).

### CSS Architecture

Four modular CSS files in `assets/css/`:
- `variables.css` — design tokens (colors, typography, spacing). Single light theme with brand green `#2B542F` and teal `#3A9AAF`.
- `base.css` — reset, body, container, section utilities, button styles
- `components.css` — all component styles (nav, hero, cards, brand strip, events, join, footer, page layouts, membership/leaders custom sections, mobile nav, tier cards)
- `animations.css` — scroll reveal (`.reveal` → `.active`), `prefers-reduced-motion` support

### Design Tokens

Brand colors defined as CSS custom properties in `variables.css`:
- Primary Green: `#2B542F`, Teal: `#3A9AAF`
- Background: `#F3F3EE`, Surface: `#FBFBF8`
- Text: `#1E2420`, muted at 68% opacity, faint at 42%
- Typography: Raleway (headings), Source Sans 3 (body) via Google Fonts

### JavaScript

All JS is inline in `_includes/scripts.html` — no build step, no external JS dependencies. Handles:
- Navbar scroll effect (`.scrolled` class at 50px)
- Mobile hamburger menu toggle with accessibility (Escape key, click-outside, resize close, aria-expanded)
- Scroll reveal via IntersectionObserver (`.reveal` → `.active` at 15% threshold)
- Heylo embed fallback (shows link to Heylo if widget fails to load after 3.5s)

### Analytics

Tinylytics (`tinylytics.app`), loaded via script tag in `head.html`.

### Events

Heylo event feed embedded via their JS widget in `home.html` with a hardcoded API key and community ID. A MutationObserver watches for content and shows a fallback CTA if the widget doesn't populate.

## Content Pages

The homepage (`index.md`) has minimal front matter — the `home.html` layout handles all sections. Inner pages (`membership.md`, `leaders.md`) use the `page` layout with custom HTML sections and page-specific CSS classes.

Membership page has commented-out tier cards (Individual $50/yr, Family $90/yr, Founding Member $45, Lifetime $1,000) ready to uncomment when pricing goes live.

## Voice & Language (from Playbook)

- **Tagline:** "Driven by Community. If it plugs in, it belongs here."
- **Positioning:** "Northern California's cross-brand EV community"
- Use "community" not "organization" or "club". Use "members" not "users" or "followers". Use "join us" not "sign up". Use "Northern California" not "Bay Area" (unless location-specific).
- **Never use:** "revolution", "disrupting", "game-changing", "premier", "EV lifestyle", "tribe", excessive exclamation marks
- Tone: clear, warm, modern, confident, inclusive. Like a friend who knows EVs, not a brand trying to sound like a community.

## Legacy Files

The `includes/` directory (without underscore) at the project root contains old `header.html` and `footer.html` from a pre-Jekyll era. The active includes are in `_includes/`.
