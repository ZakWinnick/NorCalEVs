# NorCal EVs Website Redesign — Design Spec

## Context

NorCal EVs has a Community Playbook v1 that defines the organization's identity, voice, and structure. The current website uses a glassmorphic dark theme with particles and animated gradients that feels generic and AI-generated. The redesign aims to make the site feel premium, distinctive, and conversion-oriented while aligning with the playbook's community-first voice.

The Rangeway Pages site (`../rangeway-pages`) was used as a design reference for premium feel — generous spacing, Raleway + Source Sans 3 typography, subtle animations, confident whitespace.

## Design Decisions

### Visual Direction
- **System-reactive light/dark mode** via `prefers-color-scheme` — no manual toggle needed
- **Dark mode**: Deep navy background (`#0e0e1c`), surfaces at `#161628`
- **Light mode**: Warm off-white (`#faf9f7`), white surfaces
- **No particles, no animated gradients, no glow effects** — premium comes from spacing and typography, not effects

### Color Palette

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--green` | `#00e67a` | `#00e67a` | Primary accent, CTAs, eyebrows, frequency labels |
| `--green-dim` | `rgba(0,230,122,0.12)` | `rgba(0,180,90,0.08)` | Icon backgrounds, check backgrounds |
| `--bg` | `#0e0e1c` | `#faf9f7` | Page background |
| `--surface` | `#161628` | `#ffffff` | Cards, elevated sections |
| `--text` | `#d8d8dc` | `#2a2a3a` | Primary text |
| `--text-muted` | `rgba(216,216,220,0.65)` | `rgba(42,42,58,0.65)` | Body text, descriptions |
| `--text-faint` | `rgba(216,216,220,0.35)` | `rgba(42,42,58,0.4)` | Brand strip, lowest-priority text |
| `--border` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.08)` | Dividers, card borders |

### Typography

- **Headings**: Raleway (Google Fonts) — weights 400, 600, 700, 800
- **Body**: Source Sans 3 (Google Fonts) — weights 300, 400, 600

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Hero H1 | Raleway | `clamp(44px, 7vw, 76px)` | 800 |
| Section H2 | Raleway | `clamp(28px, 4vw, 40px)` | 700 |
| Card H3 | Raleway | 20px | 700 |
| Eyebrow | Source Sans 3 | 12-13px | 600, uppercase, 3px letter-spacing |
| Body | Source Sans 3 | 15-17px | 400 |
| Frequency labels | Source Sans 3 | 12px | 600, uppercase, green |
| Nav links | Source Sans 3 | 15px | 400 |
| Buttons | Source Sans 3 | 16px | 600 |

### Spacing

- Section padding: 120px (desktop), 80px (tablet), 64px (mobile)
- Container max-width: 1100px
- Card border-radius: 14px
- Button border-radius: 8px
- Card gap: 24px
- Grid gap (join section): 80px

### Components

**Buttons:**
- Primary: green background (`--green`), dark text, 16px 36px padding, 8px radius, translateY(-1px) hover with green shadow
- Ghost: transparent, `--border` outline, muted text, hover darkens border

**Cards (What We Do):**
- Surface background, 1px border, 14px radius
- Photo header (180px height, object-fit cover)
- Text body with 28px padding
- Hover: translateY(-3px), green border tint, shadow, 3px green top accent line animates in via scaleX

**Join checklist card:**
- Surface background, 14px radius, 40px padding, shadow
- Green uppercase title
- List items with green checkmark badges in rounded squares
- Items separated by border-bottom

**Brand strip:**
- Centered row of EV brand names in uppercase Raleway
- Faint text, hover to muted
- Bordered top and bottom

### Animations
- Card hover: translateY(-3px), 0.3s ease
- Button hover: translateY(-1px), 0.3s ease
- Top accent line on cards: scaleX(0) to scaleX(1), 0.4s ease
- `prefers-reduced-motion`: all animations/transitions disabled

### Accessibility
- `prefers-reduced-motion` support (all motion disabled)
- `prefers-color-scheme` reactive (no manual toggle)
- Semantic HTML throughout
- Sufficient text contrast in both modes (body text at 65% min opacity)

---

## Page Structure

### Homepage

1. **Navigation** — Logo (36px) + "NorCal EVs" wordmark left, text links + green "Join Us" button right. Hidden on mobile (hamburger TBD).
2. **Hero** — Centered. Logo (140px) → eyebrow ("Northern California's Cross-Brand EV Community") → H1 ("Driven by Community.") → subtitle → two CTAs (primary: "Join Us on Heylo", ghost: "View Events")
3. **Hero image** — Full-width landscape photo below hero, 400px height, 16px radius, 1px border
4. **Brand strip** — Static row of EV brand names (Tesla, Rivian, Ford, Lucid, Hyundai, Kia, BMW, Mercedes, Polestar, Chevrolet)
5. **What We Do** — Eyebrow + H2 + description, then 3-column card grid (Meetups, Drives, Learn & Share). Each card has photo header + text + frequency label.
6. **Upcoming Events** — Alternate background surface. Eyebrow + H2 left, "View all on Heylo →" link right. Heylo embed widget below.
7. **Photo break** — Two-up image grid (EV-related + NorCal landscape), 280px height each
8. **Join section** — Two-column split. Left: eyebrow + H2 ("Come as you are.") + body text + primary CTA. Right: checklist card with "What You Get" items.
9. **Footer** — Left: brand name + italic tagline. Right: two link columns (Community: Events/Membership/Leaders, Connect: Heylo/Instagram/Facebook/X). Copyright bar below.

### Membership Page

- Same design system (nav, footer, typography, spacing)
- Hero section with page title
- Content section with current free membership info
- Hidden/commented tier cards section ready to activate:
  - Individual ($50/yr)
  - Family ($90/yr)
  - Founding Member ($45 first year)
  - Lifetime ($1,000)
- Benefits list
- CTA to Heylo

### Leaders Page

- Same design system
- Hero section with page title
- Board of Directors section (President, VP, Secretary, Treasurer)
- Community Leadership Team section (Events Lead, Communications Lead, Membership Lead, Partnerships Lead, Regional Leads)
- Get Involved CTA

---

## Images

- Stock photos from Unsplash as placeholders
- Hero image: NorCal mountain/landscape
- Card images: casual gathering, scenic road, workshop/event
- Photo break: EV charging, NorCal coastline
- All images to be replaced with real community photos as they become available

## Technology

- **Stack**: Jekyll 3.9 on GitHub Pages (no change)
- **CSS**: Complete rewrite — modular files under `assets/css/`, CSS custom properties for theming
- **Fonts**: Google Fonts (Raleway + Source Sans 3)
- **Icons**: Font Awesome 6.x retained for nav social icons
- **JS**: Minimal vanilla JS — mobile menu toggle, navbar scroll effect, scroll-triggered fade-in animations
- **Legacy cleanup**: Remove `styles.css` (root), remove `assets/css/main.css` duplication

## Files to Create/Modify

**New/Rewrite:**
- `assets/css/variables.css` — complete rewrite with new design tokens + light/dark mode
- `assets/css/base.css` — rewrite (reset, body, container, section spacing)
- `assets/css/components.css` — rewrite (nav, hero, cards, buttons, brand strip, events, join, footer)
- `assets/css/animations.css` — rewrite (card hovers, reduced-motion, fade-in on scroll)
- `_layouts/home.html` — rewrite with new section structure
- `_layouts/page.html` — update to match new design system
- `_includes/head.html` — update font imports, remove old stylesheet refs
- `_includes/header.html` — update nav structure (logo + wordmark)
- `_includes/footer.html` — rewrite with columned layout
- `_includes/scripts.html` — simplify JS (remove particles, keep nav/menu/reveal)
- `membership.md` — update with hidden tier structure
- `leaders.md` — already updated, may need minor styling tweaks

**Delete:**
- `styles.css` (root) — legacy light theme, no longer used
- `assets/css/main.css` — duplicated content from other files

**Keep unchanged:**
- `_config.yml` — already updated
- `_data/navigation.yml` — structure is fine
- `_data/social.yml` — already updated
- `CNAME` — never touch
- `index.md` — minimal, layout handles content

## Verification

1. `bundle exec jekyll serve` (requires Ruby 3.x via rbenv)
2. Check homepage in both light and dark mode (toggle OS appearance)
3. Check membership and leaders pages match design system
4. Verify Heylo embed still loads and functions
5. Test mobile responsive at 768px and 375px breakpoints
6. Verify `prefers-reduced-motion` disables all animations
7. Check nav logo renders at correct size in both nav and hero
8. Grep for any remaining banned language ("revolution", "premier", etc.)
9. Lighthouse audit: target 90+ performance, accessibility, SEO
