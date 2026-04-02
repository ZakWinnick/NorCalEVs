# NorCal EVs Brand Guidelines

Official brand reference for NorCal EVs — Northern California's cross-brand EV community.

---

## Logo

### Primary Logo
The NorCal EVs logo is the primary visual identifier for the brand. It is a circular emblem featuring the community name and iconography.

### Logo Files
| File | Size | Use Case |
|------|------|----------|
| `assets/images/logo-original.png` | Full resolution (2.1MB) | Print, large format |
| `assets/images/logo-800.png` | 800px wide | Hero sections, featured placements |
| `assets/images/logo-400.png` | 400px wide | Standard web use, cards |
| `assets/images/logo-200.png` | 200px wide | Navigation bar, thumbnails |
| `NOR_CAL_EV_LOGO.png` | Root directory | Social sharing / Open Graph image |

### Logo Usage Rules
- **Works on both dark and light backgrounds.** The site uses system-reactive light/dark mode.
- **Maintain clear space** around the logo equal to at least the height of the "N" in "NorCal."
- **Do not stretch, distort, or rotate** the logo.
- **Do not place the logo on busy or low-contrast backgrounds** without a darkened overlay.
- **Drop shadow effect:** When displayed prominently (hero sections), apply: `drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))`.
- **Do not add borders, outlines, or additional effects** beyond the approved drop shadow.

### Favicon
Favicon variants are provided in `assets/images/` at 16px, 32px, 64px, 192px, and 512px. The root `favicon.ico` is used for browser tabs.

---

## Color Palette

### Brand Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary Green** | `#2B542F` | 43, 84, 47 | Primary brand color. CTAs, accents, eyebrow labels, hover states. Represents sustainability and community. |
| **Secondary Blue/Teal** | `#3A9AAF` | 58, 154, 175 | Secondary brand color. Used for accents and complementary highlights. Represents technology and innovation. |
| **White** | `#FFFFFF` | 255, 255, 255 | Text on dark backgrounds, clean surfaces in light mode. |

### Theme Colors (System-Reactive)

The site automatically switches between dark and light mode based on the user's OS preference via `prefers-color-scheme`.

**Dark Mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0e0e1c` | Page background |
| `--surface` | `#161628` | Cards, elevated sections |
| `--text` | `#d8d8dc` | Primary text |
| `--text-muted` | `rgba(216, 216, 220, 0.65)` | Body text, descriptions |
| `--text-faint` | `rgba(216, 216, 220, 0.35)` | Lowest-priority text |
| `--border` | `rgba(255, 255, 255, 0.06)` | Dividers, card borders |

**Light Mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#faf9f7` | Page background (warm off-white) |
| `--surface` | `#ffffff` | Cards, elevated sections |
| `--text` | `#2a2a3a` | Primary text |
| `--text-muted` | `rgba(42, 42, 58, 0.65)` | Body text, descriptions |
| `--text-faint` | `rgba(42, 42, 58, 0.4)` | Lowest-priority text |
| `--border` | `rgba(0, 0, 0, 0.08)` | Dividers, card borders |

### Shadow

| Token | Value | Usage |
|-------|-------|-------|
| **Shadow (dark mode)** | `0 24px 64px rgba(0, 0, 0, 0.25)` | Cards, join checklist |
| **Shadow (light mode)** | `0 24px 64px rgba(0, 0, 0, 0.06)` | Cards, join checklist |
| **Button hover** | `0 12px 32px rgba(43, 84, 47, 0.2)` | Primary button hover |

### Colors to Avoid
- Do not use the old electric green (`#00ff88`) or electric blue (`#0088ff`) — these have been replaced.
- Do not introduce new brand colors without updating the CSS custom properties in `variables.css`.

---

## Typography

### Font Families
- **Headings:** Raleway (Google Fonts) — weights 400, 600, 700, 800
- **Body:** Source Sans 3 (Google Fonts) — weights 300, 400, 600

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| **Hero H1** | Raleway | `clamp(44px, 7vw, 76px)` | 800 |
| **Section H2** | Raleway | `clamp(28px, 4vw, 40px)` | 700 |
| **Card H3** | Raleway | 20px | 700 |
| **Eyebrow** | Source Sans 3 | 12-13px | 600, uppercase, 3px letter-spacing |
| **Body Text** | Source Sans 3 | 15-17px | 400 |
| **Navigation** | Source Sans 3 | 15px | 400 |
| **Buttons** | Source Sans 3 | 16px | 600 |

### Line Height
- Body text: `1.7`
- Card content: `1.8`

---

## Iconography

### Navigation Social Icons
The navbar social icons use **Font Awesome 6.x** (loaded via CDN):
- Instagram: `fa-brands fa-instagram`
- Facebook: `fa-brands fa-facebook`
- X/Twitter: `fa-brands fa-x-twitter`

Displayed inline in the nav bar (16px, muted text color, green on hover). On mobile, they appear as a row at the bottom of the hamburger menu (22px, separated by a border-top).

---

## Voice & Language

NorCal EVs should sound like a friend who knows a lot about EVs and genuinely wants you to come hang out. Confident but not loud. Knowledgeable but not preachy. Welcoming but not desperate.

### Voice Attributes
- **Clear** — Say what you mean. No jargon, no filler.
- **Warm** — This is a community, not a company. Human, approachable, genuinely inviting.
- **Modern** — Current without chasing trends. No outdated slang, no corporate buzzwords.
- **Confident** — NorCal EVs knows what it is. No overselling or hype.
- **Inclusive** — Every EV owner and every curious person is welcome, regardless of brand, budget, or experience level.

### Official Tagline
**"Driven by Community. If it plugs in, it belongs here."**

The first half speaks to identity. The second half speaks to inclusivity. Use in full where space allows; either half can stand alone in tighter spaces (social bios, merch).

### How NorCal EVs Sounds

| Context | Sounds Like | Doesn't Sound Like |
|---------|-------------|---------------------|
| Event announcement | "Join us Saturday at Oxbow Market — all EVs welcome, coffee's on us." | "Don't miss this EPIC gathering of EV enthusiasts!!!" |
| Social post | "First drive of the year. Twelve cars, three brands, one great road." | "We're THRILLED to announce our latest community activation event!" |
| Website copy | "No brand requirements. Just good people and good drives." | "Join the revolution and be part of the movement!" |
| New member | "Welcome in — what do you drive?" | "We're so excited to have another member join our amazing community!" |

### Language Guide

| Use | Instead Of |
|-----|------------|
| "community" | "organization" |
| "members" | "users" or "followers" |
| "drive" or "meetup" | "activation" or "experience" |
| "all EVs" or "every brand" | "multi-brand" or "OEM-agnostic" |
| "Northern California" or "NorCal" | "the Bay Area" (unless referring to a specific Bay Area location) |
| "join us" | "sign up" |
| "connect" | "network" |

### Language to Avoid
- "Revolution" / "Join the revolution" — overused, doesn't feel authentic
- "Disrupting" / "game-changing" — startup language, not community language
- "EV lifestyle" — vague
- "Tribe" — dated and culturally loaded
- "Content creator" language — NorCal EVs is not a media brand
- "Premier" — corporate-sounding
- Excessive exclamation marks or ALL CAPS enthusiasm
- Any language that implies you need to already be an EV expert to belong

### Messaging Hierarchy
When describing NorCal EVs, lead with these ideas in this order:
1. **What it is** — a cross-brand EV community in Northern California
2. **Who it's for** — EV owners, enthusiasts, and the EV-curious across all brands
3. **What it does** — events, drives, meetups, education, connection
4. **Why it matters** — the EV community is stronger when it's not fragmented by brand

---

## UI Components

### Buttons
- **Primary:** Green background (`--green`), dark text, 8px radius, `translateY(-1px)` hover with green shadow
- **Ghost:** Transparent, border outline, muted text, hover darkens border

### Cards
- Surface background (`--surface`), 1px border (`--border`), 14px radius
- Hover: `translateY(-3px)`, green border tint, shadow, 3px green top accent line animates in
- Photo header variant for "What We Do" cards (180px height, `object-fit: cover`)

### Navigation
- Fixed position, transparent at top, solid `--bg` background after scrolling 50px
- Logo (36px) + wordmark left, text links + social icons + green "Join Us" button right
- Mobile: hamburger menu, full-screen slide-in from right, social icons as row at bottom

### Scroll Animations
- Sections fade up (24px translate, 0.8s ease) when entering viewport
- Applied via `.reveal` class, triggered by IntersectionObserver at 15% threshold
- Stagger delay on sibling reveals (100ms between children)
- All animations disabled when `prefers-reduced-motion: reduce`

---

## Photography

### Hero Image
The hero background uses a mountain landscape photograph (darkened to 30% brightness) representing Northern California's natural scenery. When selecting hero imagery:
- Prefer Northern California landscapes (mountains, coast, redwoods)
- Apply `filter: brightness(0.3)` so content remains readable
- Ensure the image works at full viewport height
- A local copy is available at `assets/images/hero-background.jpg`

---

## Social Media Presence

| Platform | Handle | URL |
|----------|--------|-----|
| Heylo (primary hub) | norcalevs | https://heylo.group/norcalevs |
| Facebook Group | norcalevs | https://www.facebook.com/groups/norcalevs/ |
| Instagram | @norcalevs | https://instagram.com/norcalevs |
| X / Twitter | @NorCalEVs | https://x.com/norcalevs |

### Social Sharing Image
The Open Graph / Twitter Card image is `NOR_CAL_EV_LOGO.png` in the repository root.

---

## Domain & Contact

- **Website:** https://norcalevs.org
- **Email:** contact@norcalevs.org

---

*Version: 2025.35 — Last updated from website codebase analysis*
