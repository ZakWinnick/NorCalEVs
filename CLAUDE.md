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
- `navigation.yml`: main nav links (Home, Membership, Sponsorships, Resources, Leaders, Shop) plus a Social submenu. Items flagged `external: true` render with a small NE arrow (↗) in the nav.
- `social.yml`: social platform cards (Heylo, Bluesky, Instagram, X). Note: the redesigned footer (April 2026 spec) lists six socials including Facebook, LinkedIn, and YouTube hardcoded in `_includes/footer.html`, separate from this file. Facebook is included per spec even though the group is being sunset; LinkedIn uses a placeholder company URL.
- `sponsors.yml`: homepage sponsor logos and URLs. Optional `tier` field (1/2/3) sizes logos by sponsorship level; sponsors with no tier render in the standard grid.
- `stats.yml`: community stats (not currently rendered)

### Contact (mailto, no forms)

There are no HTML forms. The two intake points are `mailto:` CTAs, each to a purpose-matched address with a pre-filled subject and a templated body (URL-encoded `%0D%0A` line breaks) so the sender fills in structured fields:
- **Mailing list** (homepage "Stay Connected", `.signup-actions`): `info@norcalevs.org`
- **Sponsorship contact** (`/sponsorships`, `.spon-contact-actions`): `sponsors@norcalevs.org`

These addresses must exist as real inboxes/aliases. There is no Formspree or server dependency. Other contact CTAs around the site still use `contact@norcalevs.org` (resources, leaders).

### Routing through norcalevs.org

Per spec, signup links never deep-link to the Heylo join page. `join.html` (`/join`) is a thin redirect page to Heylo; membership tier CTAs and the membership intro CTA point there. Navigational "Join the Community" buttons (hero, footer) point to `/membership`. Event links to Heylo are fine and stay direct.

### Layout Chain

`default.html` wraps all pages and includes head, header, footer, and scripts.

`home.html` extends `default`. Section flow:
1. **Hero split**: prominent NorCal EVs logo (left), tagline headline + lede + CTAs; hero landscape photo (right). Primary CTA routes to `/membership`.
2. **About block**: single centered paragraph with 501(c)(7) mention, framed in a quiet card with a small accent divider above
3. **What We're Building**: six-pillar grid (Events & Drives, Community Meetups, EV Education, Cross-Brand Connection, Partner Collaborations, Member Community)
4. **Brand strip**: four photo tiles in a 3:2 landscape aspect (Tesla, Rivian, Lucid, Ford) with a dark-gradient overlay so the brand label stays readable. Photos live in `assets/images/community/`.
5. **Events (combined card)**: copy + Heylo calendar merged into one dark-surface card with an inset divider. Heylo script is embedded inline with hardcoded API key and community ID.
6. **Our Sponsors**: sponsor grid from `sponsors.yml` plus an "Interested in sponsoring? Learn more" link to `/sponsorships`
7. **Stay Connected**: mailing-list `mailto:info@norcalevs.org` CTA panel (centered)
8. Footer (from `_includes/footer.html`)

(The Member Fleet and Event Gallery sections, plus the `/submit-vehicle` and `/gallery` pages, were removed in June 2026.)

`page.html` extends `default`. Used for `membership.md`, `leaders.md`, `sponsorships.md`, `resources.md`, `privacy.md`, `terms.md`, and `whats-new.md` (served at `/changelog`). Supports `page_class` front matter for page-specific CSS scoping. Content pages default to a narrow column; `sponsorships-page` and `resources-page` opt into full width (alongside the existing `membership-page` / `leaders-page`).

### Membership tiers

`membership.md` renders **three** tiers in a `.tier-grid-3` (3-up on desktop, horizontal scroll on mobile via `touch-action: pan-x` to avoid the iOS vertical-capture bug): Standard Range (free), Long Range ($50/yr, Best Value), Max Pack ($500 lifetime). Every card has a CTA routing through `/join`. Above the cards, a **Launch Edition promo banner** (`.launch-promo`) offers Long Range at $30 the first year for the first 30 members. It is wrapped in `{% if launch_claimed < launch_total %}`, so once the manually maintained `launch_claimed` reaches 30 the banner drops off the page automatically (per spec). There is no visible "X of 30 claimed" counter (removed at the user's request); `launch_claimed` starts at 0 and is bumped by hand only to trigger the auto-hide.

### CSS Architecture

Four modular CSS files in `assets/css/`:

- **`variables.css`**: design tokens (colors, typography, spacing). Light and dark themes via `@media (prefers-color-scheme: dark)`. Brand green `#2B542F` and teal `#3A9AAF` in light mode; auto-lightened variants in dark mode. Three RGB tokens power the theme swap:
  - `--card-rgb` and `--ink-rgb` invert between themes (warm cream card + deep forest ink in light, deep card + cream ink in dark)
  - `--on-dark-rgb` **stays light in both themes** for use on surfaces that are always dark regardless of theme: `.events-copy`, `.footer-grid`, `.nav-join`, brand-tile overlay text
- **`base.css`**: reset, body, container, section utilities, button styles. `body` uses `overflow-x: clip` (not `hidden`) so it clips horizontal overflow without creating a scroll container. No `overflow-x: hidden` on wrapper elements below body (they relied on `max-width: 100%` instead).
- **`components.css`**: all component styles including nav, hero-split, about-block, brand-strip/brand-tile, combined events card, sponsors, membership tiers, membership funnel, leaders grids, leadership expectations, footer, mobile nav, and responsive breakpoints. The April 2026 spec additions are appended in a labeled block at the end of the file: `.building-*` (What We're Building), `.signup-*` (mailto CTA panel), `.spon-*` (Sponsorships page), `.resource-*` (Resources page), `.doc-*` (privacy/terms/changelog), `.tier-grid-3` + `.launch-promo`, and `.footer-grid-4`.
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
- **Tiers**: three tiers (April 2026 spec) in `.tier-grid-3`: Standard Range (free), Long Range ($50/yr, "Best Value" with `.tier-highlight`), Max Pack ($500 lifetime). Every card has a CTA. A `.launch-promo` banner above the cards offers Long Range at $30 the first year (first 30 members, auto-hides when full). Followed by the spec's "always free" note.
- **What Members Get**: an honest bulleted list. No partner-perk promises (per playbook: only list benefits that exist or will within 90 days).
- **All Brands Welcome** closing note

All membership/tier CTAs route through `/join` (a redirect to Heylo); **no payment provider is wired up yet**.

`sponsorships.md`, `resources.md`, `privacy.md`, `terms.md`, and `whats-new.md` (at `/changelog`) also use the `page` layout. See the April 2026 spec and the layout/contact notes above. The Sponsorships page intentionally names a tier "Premier Sponsor" (from the spec); the playbook's "never use premier" rule is about describing NorCal EVs itself, not a third-party sponsor tier label.

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
- **Membership CTAs route to Heylo (via `/join`), not a payment flow.** When dues collection goes live, wire Stripe/Memberful/etc. into the tier cards.
- **Founding member coupon** mechanics (timing, code, expiration) still need to be defined before launch.
- **Intake is by `mailto:`, not forms.** The mailing-list and sponsorship CTAs email `info@` and `sponsors@norcalevs.org` respectively. Those inboxes/aliases must exist for the CTAs to work.
- **Footer LinkedIn** points at a placeholder company URL, and **Facebook** is included per the April 2026 spec despite the group being sunset. Confirm or update both.
- **Resources and changelog are starting points.** New EV Owner's Guide and NorCal Drive Routes are "coming soon"; the public changelog (`whats-new.md`) is hand-curated.

## Legacy Files

The `includes/` directory (without underscore) at the project root contains old `header.html` and `footer.html` from a pre-Jekyll era. The active includes are in `_includes/`. Do not edit the legacy directory.
