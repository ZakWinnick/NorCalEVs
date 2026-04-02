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
- **Always use on dark backgrounds.** The logo is designed for the dark navy (#0a0e27) brand background.
- **Maintain clear space** around the logo equal to at least the height of the "N" in "NorCal."
- **Do not stretch, distort, or rotate** the logo.
- **Do not place the logo on busy or low-contrast backgrounds** without a darkened overlay.
- **Drop shadow effect:** When displayed prominently (hero sections), apply a green glow: `drop-shadow(0 10px 40px rgba(0, 255, 136, 0.3))`.
- **Do not add borders, outlines, or additional effects** beyond the approved drop shadow.

### Favicon
Favicon variants are provided in `assets/images/` at 16px, 32px, 64px, 192px, and 512px. The root `favicon.ico` is used for browser tabs.

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Electric Green** | `#00ff88` | 0, 255, 136 | Primary brand color. CTAs, accents, highlights, hover states. Represents energy and sustainability. |
| **Electric Blue** | `#0088ff` | 0, 136, 255 | Secondary brand color. Used alongside green in gradients. Represents technology and innovation. |
| **Deep Navy** | `#0a0e27` | 10, 14, 39 | Background color. The foundation of the dark theme. |
| **White** | `#ffffff` | 255, 255, 255 | Primary text color and highlights. |

### Brand Gradient
The signature NorCal EVs gradient combines Electric Green and Electric Blue:
```
linear-gradient(135deg, #00ff88, #0088ff)
```
Used for: headings, primary buttons, icon backgrounds, accent lines, and stat counters. This gradient is the most recognizable visual element of the brand after the logo.

### Glassmorphic Effects

| Token | Value | Usage |
|-------|-------|-------|
| **Glass Surface** | `rgba(255, 255, 255, 0.05)` | Card backgrounds, navbar, translucent panels |
| **Glass Border** | `rgba(255, 255, 255, 0.1)` | Subtle borders on cards and containers |
| **Scrolled Navbar** | `rgba(10, 14, 39, 0.95)` | Navbar after scrolling |
| **Footer** | `rgba(10, 14, 39, 0.95)` | Footer background |

### Animated Background Gradient
The page background is a slow-shifting gradient that creates subtle depth:
```
linear-gradient(135deg, #0a0e27 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #0a0e27 100%)
```

### Shadow & Glow

| Token | Value | Usage |
|-------|-------|-------|
| **Green Glow (small)** | `0 10px 30px rgba(0, 255, 136, 0.3)` | Primary buttons, logo |
| **Green Glow (medium)** | `0 15px 40px rgba(0, 255, 136, 0.4)` | Hover states |
| **Dark Shadow** | `0 20px 60px rgba(0, 0, 0, 0.3)` | Containers, event embed |
| **Card Hover Glow** | `0 15px 40px rgba(0, 255, 136, 0.15)` | Card hover states |

### Colors to Avoid
- Do not use the legacy light theme colors (`#ffffff` background, `#333` text, `#0066cc` links) for new content. These exist only in the legacy `styles.css` and are being phased out.
- Do not introduce new brand colors without updating the CSS custom properties in `variables.css`.

---

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```
System fonts are used for fast loading and native platform feel. No external font files are required.

### Type Scale

| Element | Size | Weight | Style |
|---------|------|--------|-------|
| **Hero H1** | `clamp(2.5rem, 5vw, 4rem)` | 900 (Black) | Gradient text, tight letter-spacing (-1px) |
| **Section H2** | `clamp(2rem, 4vw, 3rem)` | Bold | Gradient text |
| **Card H3** | `1.4rem` | Bold | White |
| **Body Text** | `1rem` (base) | 400 (Regular) | `rgba(255, 255, 255, 0.7)` — slightly muted |
| **Hero Tagline** | `1.3rem` | 300 (Light) | `rgba(255, 255, 255, 0.9)` |
| **Stat Numbers** | `3rem` | 900 (Black) | Gradient text |
| **Stat Labels** | `1.1rem` | 400 | `rgba(255, 255, 255, 0.7)` |
| **Navigation** | Inherited | 500 (Medium) | White |
| **Footer** | Inherited | 400 | `rgba(255, 255, 255, 0.5)` |

### Gradient Text Treatment
Important headings (H1, H2, stat numbers) use the brand gradient as text fill:
```css
background: linear-gradient(135deg, #00ff88, #0088ff);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

### Line Height
- Body text: `1.6`
- Card content: `1.8`

---

## Iconography

### Header Navigation Icons
The navbar social icons use **Font Awesome 6.x** (loaded via CDN):
- X/Twitter: `fa-brands fa-x-twitter`
- Instagram: `fa-brands fa-instagram`
- Facebook: `fa-brands fa-facebook`

These are displayed in circular glassmorphic containers (36px diameter) that glow green on hover.

### Homepage Social Cards
The social cards on the homepage use **emoji icons** (not Font Awesome):
- Heylo: `📱`
- Facebook: `👥`
- Instagram: `📸`
- X/Twitter: `💬`

### Section Icons
About section cards use emoji in gradient-filled rounded squares (60px):
- Community: `⚡`
- Events: `🚗`
- Sustainability: `🌱`

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
- **Primary CTA:** Pill-shaped (50px radius), gradient fill, green glow shadow. Dark text on gradient background.
- **Secondary CTA:** Pill-shaped, transparent with glass border. White text, turns green on hover.

### Cards
- Glassmorphic: `rgba(255, 255, 255, 0.05)` background with `rgba(255, 255, 255, 0.1)` border
- Rounded corners: `20px`
- Hover: lift up 5-10px, border turns green, subtle green glow
- Accent line: 3px gradient bar appears at top on hover

### Navigation
- Fixed position, glassmorphic with `backdrop-filter: blur(20px)`
- Solidifies to near-opaque (`rgba(10, 14, 39, 0.95)`) on scroll
- Link hover: gradient underline animates from left to right
- Social icons in circular glass containers (hidden on mobile)

### Scroll Animations
- Sections fade in from below (30px translate, 0.8s ease) when scrolled into view
- Applied via `.reveal` class, triggered by IntersectionObserver-style JS

### Particles
- 50 floating dots in Electric Green, 30% opacity
- Drift upward continuously (20s cycle)
- Purely decorative background effect

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
