# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NorCal EVs (norcalevs.org) is the website for Northern California's cross-brand EV community. As of April 2026 the org is officially a registered **501(c)(7) nonprofit social club**. The `NorCal EVs Playbook v1` PDF (on the user's Synology at `/Users/zakwinnick/Library/CloudStorage/SynologyDrive-Vandenberg/NorCal EVs/Playbook/`) is the authoritative source for organizational identity, messaging, tiers, and operations. See `BRAND_GUIDELINES.md` for voice, color, and language rules.

**Standing editorial rule:** Never use em dashes (`—`) anywhere in copy, code comments, or CSS comments. Use commas, colons, periods, or parentheses instead.

## Build & Serve

```bash
bundle install           # First-time dependency setup (requires Ruby 3.x via rbenv)
bundle exec jekyll serve # Local dev server at http://localhost:4000
bundle exec jekyll serve --livereload  # With auto-reload
JEKYLL_ENV=production bundle exec jekyll build  # Production build to _site/
```

Jekyll 3.9 with Ruby 3.3.11 via rbenv. Project pins the version in `.ruby-version`, which rbenv honors automatically. System Ruby (2.6) is too old.

First-time setup on a fresh machine:

```bash
rbenv install 3.3.11        # or whatever matches .ruby-version
gem install bundler -v 4.0.9  # version bundled with Gemfile.lock
bundle install              # installs gems to ./vendor/bundle (gitignored)
```

The project was previously pinned to Ruby 3.1.6, but 3.1 reached EOL in March 2026 and ruby-build's newer install logic (20260327+) ships 3.1.x without the `socket` stdlib module, which breaks Bundler and Jekyll. 3.3.11 is the active LTS track and installs cleanly.

No test suite.

## Deployment

Push to `main` deploys automatically via GitHub Pages. The `CNAME` file maps the custom domain: do not modify it.

## Architecture

### Data-Driven Content

Site content is driven by YAML data files in `_data/`:
- `navigation.yml`: main nav links plus a Social submenu. Items flagged `external: true` render with a small NE arrow (↗) in the nav.
- `social.yml`: social platform cards (Heylo, Bluesky, Instagram, X). Facebook was removed site-wide in April 2026; the group is being sunset.
- `sponsors.yml`: partner/sponsor logos and URLs
- `stats.yml`: community stats (not currently rendered)

### Layout Chain

`default.html` wraps all pages and includes head, header, footer, and scripts.

`home.html` extends `default`. Section flow:
1. **Hero split**: prominent NorCal EVs logo (left), tagline headline + lede + CTAs; hero landscape photo (right)
2. **About block**: single centered paragraph with 501(c)(7) mention, framed in a quiet card with a small accent divider above
3. **Brand strip**: four photo tiles in a 3:2 landscape aspect (Tesla, Rivian, Lucid, Ford) with a dark-gradient overlay so the brand label stays readable. Photos live in `assets/images/community/`.
4. **Events (combined card)**: copy + Heylo calendar merged into one dark-surface card with an inset divider. Heylo script is embedded inline with hardcoded API key and community ID.
5. **Community Partners**: sponsor grid from `sponsors.yml`
6. Footer (from `_includes/footer.html`)

The homepage is intentionally quiet: **2 total "Join the Community" buttons** (hero + footer). An earlier 3-step "Get Involved" band and a compact social chip row were removed during the redesign; socials already appear in header and footer.

`page.html` extends `default`. Used for `membership.md` and `leaders.md`. Supports `page_class` front matter for page-specific CSS scoping (e.g., `membership-page`, `leaders-page`).

### CSS Architecture

Four modular CSS files in `assets/css/`:

- **`variables.css`**: design tokens (colors, typography, spacing). Light and dark themes via `@media (prefers-color-scheme: dark)`. Brand green `#2B542F` and teal `#3A9AAF` in light mode; auto-lightened variants in dark mode. Three RGB tokens power the theme swap:
  - `--card-rgb` and `--ink-rgb` invert between themes (warm cream card + deep forest ink in light, deep card + cream ink in dark)
  - `--on-dark-rgb` **stays light in both themes** for use on surfaces that are always dark regardless of theme: `.events-copy`, `.footer-grid`, `.nav-join`, brand-tile overlay text
- **`base.css`**: reset, body, container, section utilities, button styles. `body` uses `overflow-x: clip` (not `hidden`) so it clips horizontal overflow without creating a scroll container. No `overflow-x: hidden` on wrapper elements below body (they relied on `max-width: 100%` instead).
- **`components.css`**: all component styles including nav, hero-split, about-block, brand-strip/brand-tile, combined events card, sponsors, membership tiers, membership funnel, leaders grids, leadership expectations, footer, mobile nav, and responsive breakpoints.
- **`animations.css`**: scroll reveal (`.reveal` → `.active`), `prefers-reduced-motion` support.

### Theme-color meta tags

`_includes/head.html` carries `<meta name="theme-color">` tags with both `light` and `dark` variants so browser chrome matches the page theme.

### Mobile Scroll Performance (important, hard-won)

This site has been through several rounds of scroll-stuck debugging on iOS Safari. The fixes that stuck:

1. **No `scroll-behavior: smooth`** on `html`. Smooth scroll fights user wheel/touch input during anchor-link jumps.
2. **No fixed + blurred pseudo-elements** on `body`. The old decorative radial blurs at `body::before` / `body::after` forced GPU repaint on every scroll frame. They're permanently `display: none`.
3. **No `overflow-x: hidden`** on `html`, `main`, `footer`, `.section`, or any wrapper. That property implicitly creates a scroll container on iOS; nested containers interrupt touch-scroll chaining. Replaced with `overflow-x: clip` on body only.
4. **Sticky nav does not change appearance on mobile scroll.** The `.scrolled` class is a no-op under 960px (same background/border/shadow as default) so the compositor stays idle during scroll. `backdrop-filter` is also removed on mobile for the same reason.
5. **Scroll listener is idempotent and rAF-throttled.** `syncNavScroll` tracks prior state and only touches the DOM on threshold crossings.
6. **Heylo feed is not a horizontal scroll container on mobile.** `overflow-x: auto` was capturing vertical finger drags on iOS; desktop keeps the horizontal scroller via a `@media (min-width: 769px)` block.
7. **Brand tile images use `loading="lazy" decoding="async"`** so their decode work doesn't block the main thread.

If scroll issues return, those are the things to check first.

### JavaScript

All JS is inline in `_includes/scripts.html`. No build step, no external JS dependencies. Handles:
- Year stamp in footer
- Navbar scroll effect (`.scrolled` class; idempotent + rAF-throttled; desktop-only visual change)
- Mobile hamburger menu toggle with accessibility (Escape key, click-outside, resize close, `aria-expanded`, `body.menu-open` to lock scroll)
- Scroll reveal via IntersectionObserver (`.reveal` → `.active` at 16% threshold)
- Heylo embed fallback (MutationObserver watches for content; shows static CTA after 3.5s if widget doesn't populate)

### Analytics

Tinylytics (`tinylytics.app`), loaded via deferred script tag in `head.html`.

### Events

Heylo event feed embedded via their JS widget in `home.html` with a hardcoded API key and community ID. The widget injects its own DOM (with its own white event cards) into `#heylo-event-feed`. To keep text readable in both themes without forcing dark text that disappears in dark mode, `.events-embed` resets `color` to `var(--text)` which cascades theme-appropriate text into the widget.

## Content Pages

The homepage (`index.md`) has minimal front matter; the `home.html` layout handles all sections.

`membership.md` uses the `page` layout with these sections:
- **Intro card** (501(c)(7) mention + "first event is always free" pill + two CTAs)
- **How It Works**: the playbook's **5-step funnel** rail (Discover → Learn → Join → Attend → Stay). On desktop it's a 5-col horizontal rail with a connecting gradient line; on mobile it becomes a vertical stack where each step is a 2-col grid (numbered dot on the left spanning both rows, label on top, description below).
- **Tiers**: four live tiers per the playbook: Base Model (free), Standard Range ($5/mo), Long Range ($50/yr, marked "Best Value" with `.tier-highlight`), Max Pack ($500 lifetime). Followed by a founding-member coupon note in a dashed-border callout.
- **What Members Get**: an honest bulleted list. No partner-perk promises (per playbook: only list benefits that exist or will within 90 days).
- **All Brands Welcome** closing note

All CTAs still point to Heylo; **no payment provider is wired up yet**.

`leaders.md` uses the `page` layout with these sections:
- **Intro card** with 501(c)(7) mention
- **Board of Directors**: Executive Director (not "President"), Vice President, Secretary, Treasurer. Brief intro line notes the board handles governance/finances/legal and meets quarterly.
- **Community Leadership Team**: Events Lead, Communications Lead, Membership Lead, Partnerships Lead, Regional Leads
- **Leadership Expectations**: the playbook's 6 bullets as a 2-col list (not cards), via `.leadership-expectations`
- **Get Involved** closing note with contact CTAs

## Voice & Language (from Playbook)

- **Tagline:** "Driven by Community. If it plugs in, it belongs here."
- **Positioning:** "Northern California's cross-brand EV community"
- Use "community" not "organization" or "club". Use "members" not "users" or "followers". Use "join us" not "sign up". Use "Northern California" not "Bay Area" (unless location-specific).
- **Never use:** "revolution", "disrupting", "game-changing", "premier", "EV lifestyle", "tribe", excessive exclamation marks
- **No em dashes anywhere** (see top of this file)
- Tone: clear, warm, modern, confident, inclusive. Like a friend who knows EVs, not a brand trying to sound like a community.

## Known Open Items

- **Brand tile photos are manufacturer press/editorial placeholders.** Swap for real member/event photography when available, per the playbook's "real over polished" principle.
- **Membership CTAs route to Heylo, not a payment flow.** When dues collection goes live, wire Stripe/Memberful/etc. into the tier cards.
- **Founding member coupon** mechanics (timing, code, expiration) still need to be defined before launch.

## Legacy Files

The `includes/` directory (without underscore) at the project root contains old `header.html` and `footer.html` from a pre-Jekyll era. The active includes are in `_includes/`. Do not edit the legacy directory.
