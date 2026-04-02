# NorCal EVs Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the NorCal EVs website with a premium, system-reactive light/dark theme inspired by Rangeway Pages, replacing the current glassmorphic particle-heavy design.

**Architecture:** Complete CSS rewrite using CSS custom properties with `prefers-color-scheme` media queries for automatic light/dark switching. Jekyll templates rewritten to match the approved v5 mockup at `.superpowers/brainstorm/15416-1775141584/content/homepage-v5.html`. Same Jekyll 3.9 stack, GitHub Pages deployment.

**Tech Stack:** Jekyll 3.9, CSS custom properties, Google Fonts (Raleway + Source Sans 3), Font Awesome 6.x, vanilla JS, Heylo embed widget.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `assets/css/variables.css` | Rewrite | Design tokens + light/dark mode via `prefers-color-scheme` |
| `assets/css/base.css` | Rewrite | Reset, body, container, section spacing |
| `assets/css/components.css` | Rewrite | Nav, hero, cards, buttons, brand strip, events, join, footer |
| `assets/css/animations.css` | Rewrite | Hover transitions, scroll reveal, reduced-motion |
| `assets/css/main.css` | Delete | Duplicated content, no longer needed |
| `styles.css` (root) | Delete | Legacy light theme, no longer used |
| `_includes/head.html` | Rewrite | Google Fonts imports, new stylesheet refs |
| `_includes/header.html` | Rewrite | Logo + wordmark nav, mobile hamburger |
| `_includes/footer.html` | Rewrite | Columned layout with link sections |
| `_includes/scripts.html` | Rewrite | Remove particles, keep nav/menu/reveal |
| `_layouts/default.html` | Modify | Remove particle divs, clean up body |
| `_layouts/home.html` | Rewrite | All homepage sections from v5 mockup |
| `_layouts/page.html` | Rewrite | Redesigned inner page template |
| `membership.md` | Modify | Add hidden tier card structure |
| `leaders.md` | No change | Content already updated |
| `index.md` | No change | Minimal, layout handles content |

---

### Task 1: CSS Design Tokens

**Files:**
- Rewrite: `assets/css/variables.css`

- [ ] **Step 1: Rewrite variables.css with new design tokens**

```css
/**
 * CSS Custom Properties
 * NorCal EVs — Premium Redesign
 * System-reactive light/dark mode
 */

:root {
    /* Brand */
    --green: #00e67a;
    --green-dim: rgba(0, 230, 122, 0.12);

    /* Surfaces */
    --bg: #0e0e1c;
    --surface: #161628;

    /* Text */
    --text: #d8d8dc;
    --text-muted: rgba(216, 216, 220, 0.65);
    --text-faint: rgba(216, 216, 220, 0.35);

    /* Chrome */
    --border: rgba(255, 255, 255, 0.06);
    --shadow: 0 24px 64px rgba(0, 0, 0, 0.25);

    /* Typography */
    --heading: 'Raleway', sans-serif;
    --body: 'Source Sans 3', sans-serif;

    /* Layout */
    --section-pad: 120px;
    --container: 1100px;
}

@media (prefers-color-scheme: light) {
    :root {
        --bg: #faf9f7;
        --surface: #ffffff;
        --text: #2a2a3a;
        --text-muted: rgba(42, 42, 58, 0.65);
        --text-faint: rgba(42, 42, 58, 0.4);
        --border: rgba(0, 0, 0, 0.08);
        --shadow: 0 24px 64px rgba(0, 0, 0, 0.06);
        --green-dim: rgba(0, 180, 90, 0.08);
    }
}

@media (max-width: 1024px) {
    :root { --section-pad: 80px; }
}

@media (max-width: 768px) {
    :root { --section-pad: 64px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/variables.css
git commit -m "feat: rewrite CSS design tokens with light/dark mode support"
```

---

### Task 2: Base Styles

**Files:**
- Rewrite: `assets/css/base.css`

- [ ] **Step 1: Rewrite base.css**

```css
/**
 * Base Styles & Resets
 * NorCal EVs
 */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

.section {
    max-width: var(--container);
    margin: 0 auto;
    padding: var(--section-pad) 40px;
}

.eyebrow {
    font-family: var(--body);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--green);
    margin-bottom: 16px;
}

.section-title {
    font-family: var(--heading);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.8px;
    margin-bottom: 20px;
    line-height: 1.15;
}

.section-desc {
    font-size: 17px;
    color: var(--text-muted);
    max-width: 480px;
    line-height: 1.7;
}

.btn {
    font-family: var(--body);
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: inline-block;
}

.btn-primary {
    background: var(--green);
    color: #0e0e1c;
    padding: 16px 36px;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 32px rgba(0, 230, 122, 0.2);
}

.btn-ghost {
    color: var(--text-muted);
    padding: 16px 36px;
    border: 1.5px solid var(--border);
}

.btn-ghost:hover {
    color: var(--text);
    border-color: rgba(255, 255, 255, 0.15);
}

@media (prefers-color-scheme: light) {
    .btn-ghost:hover { border-color: rgba(0, 0, 0, 0.2); }
}

@media (max-width: 768px) {
    .section { padding: var(--section-pad) 24px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/base.css
git commit -m "feat: rewrite base styles with button and section utilities"
```

---

### Task 3: Component Styles

**Files:**
- Rewrite: `assets/css/components.css`

- [ ] **Step 1: Rewrite components.css**

Copy the complete CSS for nav, hero, hero-image, brand-strip, wwd (what we do), events, photo-break, join, footer, and responsive sections directly from the v5 mockup file at `.superpowers/brainstorm/15416-1775141584/content/homepage-v5.html` (lines 66–526). Exclude the `:root` variables (already in variables.css), the reset/body/btn rules (already in base.css), and the `@media (prefers-reduced-motion)` rule (goes in animations.css).

The component sections to extract are:
- NAV (lines 66–117): `nav`, `.nav-brand`, `.nav-logo`, `.nav-right`, `.nav-join`
- HERO (lines 119–193): `.hero`, `.hero-logo`, `.hero-eyebrow`, `.hero h1`, `.hero-sub`, `.hero-ctas`
- HERO IMAGE (lines 195–208): `.hero-image`
- BRAND STRIP (lines 210–234): `.brand-strip`, `.brand-strip-inner`, `.brand-strip span`
- WHAT WE DO (lines 266–326): `.wwd-header`, `.wwd-grid`, `.wwd-card`, `.wwd-card::before`, `.wwd-card-img`, `.wwd-card-body`, `.wwd-card h3`, `.wwd-card p`, `.wwd-freq`
- EVENTS (lines 328–361): `.events-bg`, `.events-header`, `.events-link`, `.events-embed`
- PHOTO BREAK (lines 363–379): `.photo-break`
- JOIN (lines 381–440): `.join`, `.join-title`, `.join-body`, `.join-card`, `.join-card-title`, `.join-list`, `.join-check`
- FOOTER (lines 442–494): `footer`, `.footer-brand`, `.footer-tagline`, `.footer-right`, `.footer-col`, `.footer-copy`
- PAGE LAYOUT: Add new styles for inner pages:

```css
/* ─── PAGE LAYOUT (Membership, Leaders) ─── */
.page-hero {
    max-width: var(--container);
    margin: 0 auto;
    padding: 100px 40px 60px;
    text-align: center;
}

.page-hero h1 {
    font-family: var(--heading);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    letter-spacing: -1.5px;
    margin-bottom: 16px;
}

.page-hero p {
    font-size: 18px;
    color: var(--text-muted);
    max-width: 500px;
    margin: 0 auto;
}

.page-content {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 40px 120px;
}

.page-content h2 {
    font-family: var(--heading);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-top: 48px;
    margin-bottom: 16px;
    color: var(--green);
}

.page-content h3 {
    font-family: var(--heading);
    font-size: 20px;
    font-weight: 700;
    margin-top: 32px;
    margin-bottom: 12px;
}

.page-content p {
    color: var(--text-muted);
    margin-bottom: 16px;
    line-height: 1.8;
}

.page-content ul, .page-content ol {
    color: var(--text-muted);
    margin-left: 24px;
    margin-bottom: 20px;
    line-height: 1.8;
}

.page-content li {
    margin-bottom: 6px;
}

.page-content a {
    color: var(--green);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
}

.page-content a:hover {
    border-bottom-color: var(--green);
}

/* ─── MEMBERSHIP TIER CARDS (hidden until pricing is live) ─── */
.tier-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin: 32px 0;
}

.tier-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 32px;
}

.tier-card h4 {
    font-family: var(--heading);
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
}

.tier-price {
    font-size: 14px;
    color: var(--green);
    font-weight: 600;
    margin-bottom: 16px;
}

.tier-card ul {
    list-style: none;
    margin: 0;
}

.tier-card li {
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
    color: var(--text-muted);
}

.tier-card li:last-child {
    border-bottom: none;
}

@media (max-width: 768px) {
    .tier-grid { grid-template-columns: 1fr; }
    .page-hero { padding: 80px 24px 40px; }
    .page-content { padding: 0 24px 64px; }
}
```

- RESPONSIVE (lines 496–519): All `@media (max-width: 768px)` rules for components

- [ ] **Step 2: Commit**

```bash
git add assets/css/components.css
git commit -m "feat: rewrite component styles for premium redesign"
```

---

### Task 4: Animations

**Files:**
- Rewrite: `assets/css/animations.css`

- [ ] **Step 1: Rewrite animations.css**

```css
/**
 * Animations
 * NorCal EVs
 */

/* Scroll reveal — elements fade up when entering viewport */
.reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}

/* Stagger delay for sibling reveals */
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .reveal {
        opacity: 1;
        transform: none;
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/animations.css
git commit -m "feat: rewrite animations with scroll reveal and reduced-motion support"
```

---

### Task 5: Delete Legacy CSS

**Files:**
- Delete: `styles.css` (root)
- Delete: `assets/css/main.css`

- [ ] **Step 1: Delete legacy files**

```bash
git rm styles.css
git rm assets/css/main.css
```

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: remove legacy CSS files (styles.css, main.css)"
```

---

### Task 6: Head Include (fonts + stylesheets)

**Files:**
- Rewrite: `_includes/head.html`

- [ ] **Step 1: Rewrite head.html**

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

{% if page.title %}
<title>{{ page.title }} | {{ site.title }}</title>
{% else %}
<title>{{ site.title }} | Northern California's Cross-Brand EV Community</title>
{% endif %}

{% if page.description %}
<meta name="description" content="{{ page.description }}" />
{% else %}
<meta name="description" content="{{ site.description }}" />
{% endif %}
<meta name="keywords" content="Electric Vehicles, EV Community, Northern California EVs, NorCal EVs, Cross-Brand EV, Tesla, Rivian, Lucid, Ford, Hyundai, Kia, EV Meetups, EV Drives, NorCal EV Events" />
<meta name="author" content="{{ site.author }}" />

<!-- Open Graph -->
<meta property="og:title" content="{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}" />
<meta property="og:description" content="{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}" />
<meta property="og:image" content="{{ site.url }}{{ site.logo }}" />
<meta property="og:url" content="{{ site.url }}{{ page.url }}" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}" />
<meta name="twitter:description" content="{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}" />
<meta name="twitter:image" content="{{ site.url }}{{ site.logo }}" />

<!-- Favicon -->
<link rel="icon" href="{{ site.baseurl }}/favicon.ico" type="image/x-icon" />

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- Stylesheets -->
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/variables.css" />
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/base.css" />
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/animations.css" />
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/components.css" />

<!-- SEO Plugin -->
{% seo %}

<!-- Structured Data (JSON-LD) -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "{{ site.title }}",
    "url": "{{ site.url }}",
    "logo": "{{ site.url }}{{ site.logo }}",
    "sameAs": [
        {% for link in site.social.links %}"{{ link }}"{% unless forloop.last %},{% endunless %}{% endfor %}
    ],
    "description": "{{ site.description }}"
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/head.html
git commit -m "feat: update head with Raleway + Source Sans 3 fonts, remove old stylesheet refs"
```

---

### Task 7: Header Include (nav)

**Files:**
- Rewrite: `_includes/header.html`

- [ ] **Step 1: Rewrite header.html**

```html
<nav>
    <a href="{{ site.baseurl }}/" class="nav-brand">
        <img src="{{ site.baseurl }}/assets/images/logo-200.png"
             alt="{{ site.title }}"
             class="nav-logo"
             loading="eager" />
        {{ site.title }}
    </a>
    <button class="nav-toggle" aria-label="Toggle navigation">
        <span class="hamburger"></span>
        <span class="hamburger"></span>
        <span class="hamburger"></span>
    </button>
    <ul class="nav-right">
        {% for item in site.data.navigation %}
            {% if item.submenu %}
            <li class="dropdown">
                <button class="nav-link dropdown-toggle" aria-expanded="false">{{ item.title }}</button>
                <ul class="dropdown-menu">
                    {% for subitem in item.submenu %}
                    <li><a href="{{ subitem.url }}" {% if subitem.external %}target="_blank" rel="noopener noreferrer"{% endif %}>{{ subitem.title }}</a></li>
                    {% endfor %}
                </ul>
            </li>
            {% else %}
            <li><a href="{{ site.baseurl }}{{ item.url }}">{{ item.title }}</a></li>
            {% endif %}
        {% endfor %}
        <li><a href="https://heylo.group/norcalevs" class="nav-join" target="_blank" rel="noopener noreferrer">Join Us</a></li>
    </ul>
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/header.html
git commit -m "feat: redesigned nav with logo wordmark and join CTA"
```

---

### Task 8: Footer Include

**Files:**
- Rewrite: `_includes/footer.html`

- [ ] **Step 1: Rewrite footer.html**

```html
<footer>
    <div>
        <div class="footer-brand">{{ site.title }}</div>
        <div class="footer-tagline">If it plugs in, it belongs here.</div>
    </div>
    <div class="footer-right">
        <div class="footer-col">
            <h4>Community</h4>
            <a href="{{ site.baseurl }}/events">Events</a>
            <a href="{{ site.baseurl }}/membership">Membership</a>
            <a href="{{ site.baseurl }}/leaders">Leaders</a>
        </div>
        <div class="footer-col">
            <h4>Connect</h4>
            {% for social in site.data.social %}
            <a href="{{ social.url }}" target="_blank" rel="noopener noreferrer">{{ social.name }}</a>
            {% endfor %}
        </div>
    </div>
</footer>
<div class="footer-copy">&copy; <span id="year"></span> {{ site.title }}. Driven by Community.</div>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/footer.html
git commit -m "feat: redesigned footer with columned layout"
```

---

### Task 9: Scripts Include

**Files:**
- Rewrite: `_includes/scripts.html`

- [ ] **Step 1: Rewrite scripts.html**

```html
<!-- Analytics -->
<script src="https://tinylytics.app/embed/RJmqUry1W4AZBPb6SbJM.js" defer></script>

<script>
    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-right');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/scripts.html
git commit -m "feat: simplified scripts — IntersectionObserver reveal, no particles"
```

---

### Task 10: Default Layout

**Files:**
- Modify: `_layouts/default.html`

- [ ] **Step 1: Rewrite default.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    {% include head.html %}
</head>
<body>
    {% include header.html %}

    <main>
        {{ content }}
    </main>

    {% include footer.html %}
    {% include scripts.html %}
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/default.html
git commit -m "feat: clean default layout — no particle divs"
```

---

### Task 11: Homepage Layout

**Files:**
- Rewrite: `_layouts/home.html`

- [ ] **Step 1: Rewrite home.html**

```html
---
layout: default
---

<!-- Hero -->
<section class="hero">
    <img src="{{ site.baseurl }}/assets/images/logo-400.png"
         srcset="{{ site.baseurl }}/assets/images/logo-200.png 200w, {{ site.baseurl }}/assets/images/logo-400.png 400w"
         sizes="140px"
         alt="{{ site.title }}"
         class="hero-logo"
         loading="eager" />
    <div class="hero-eyebrow">Northern California's Cross-Brand EV Community</div>
    <h1>Driven by<br>Community.</h1>
    <p class="hero-sub">If it plugs in, it belongs here. No brand requirements, no experience needed &mdash; just good people and good drives.</p>
    <div class="hero-ctas">
        <a href="https://heylo.group/norcalevs" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Join Us on Heylo</a>
        <a href="#events" class="btn btn-ghost">View Events</a>
    </div>
</section>

<!-- Hero Image -->
<div class="hero-image">
    <img src="{{ site.baseurl }}/assets/images/hero-background.jpg" alt="Northern California landscape">
</div>

<!-- Brand Strip -->
<div class="brand-strip">
    <div class="brand-strip-inner">
        <span>Tesla</span>
        <span>Rivian</span>
        <span>Ford</span>
        <span>Lucid</span>
        <span>Hyundai</span>
        <span>Kia</span>
        <span>BMW</span>
        <span>Mercedes</span>
        <span>Polestar</span>
        <span>Chevrolet</span>
    </div>
</div>

<!-- What We Do -->
<section class="section reveal">
    <div class="wwd-header">
        <div class="eyebrow">What We Do</div>
        <h2 class="section-title">Events are why we exist.</h2>
        <p class="section-desc">Everything else &mdash; the website, social media, partnerships &mdash; exists to support getting people together in person.</p>
    </div>
    <div class="wwd-grid">
        <div class="wwd-card reveal">
            <img class="wwd-card-img" src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80" alt="People gathering at a casual meetup" loading="lazy">
            <div class="wwd-card-body">
                <h3>Meetups</h3>
                <p>Coffee shops, breweries, parks. Show up, meet people, talk cars. No agenda, no pressure.</p>
                <div class="wwd-freq">Monthly</div>
            </div>
        </div>
        <div class="wwd-card reveal">
            <img class="wwd-card-img" src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80" alt="Scenic Northern California road" loading="lazy">
            <div class="wwd-card-body">
                <h3>Drives</h3>
                <p>Scenic group drives on NorCal's best roads &mdash; coast, wine country, mountains.</p>
                <div class="wwd-freq">Every 4&ndash;6 Weeks</div>
            </div>
        </div>
        <div class="wwd-card reveal">
            <img class="wwd-card-img" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" alt="Workshop and learning event" loading="lazy">
            <div class="wwd-card-body">
                <h3>Learn &amp; Share</h3>
                <p>Home charging, road trip planning, mods. Members teaching members.</p>
                <div class="wwd-freq">Quarterly</div>
            </div>
        </div>
    </div>
</section>

<!-- Events -->
<div class="events-bg" id="events">
    <section class="section reveal">
        <div class="events-header">
            <div>
                <div class="eyebrow">Upcoming</div>
                <h2 class="section-title">What's Coming Up</h2>
            </div>
            <a href="https://heylo.group/norcalevs" class="events-link" target="_blank" rel="noopener noreferrer">View all on Heylo &rarr;</a>
        </div>
        <div class="events-embed">
            <div data-api-key="c5ad21d3-a523-40f1-a13b-8847cf0e27c6"
                 data-community-id="c7893068-9bd1-4f37-b713-e6907a3ebf60"
                 id="heylo-event-feed"></div>
            <script src="https://www.heylo.com/embedded-events.min.js"></script>
        </div>
    </section>
</div>

<!-- Photo Break -->
<div class="photo-break-wrapper reveal">
    <div class="photo-break">
        <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80" alt="Electric vehicle charging" loading="lazy">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" alt="Northern California coastline" loading="lazy">
    </div>
</div>

<!-- Join -->
<section class="section reveal">
    <div class="join">
        <div>
            <div class="eyebrow">Get Involved</div>
            <h2 class="join-title">Come as<br>you are.</h2>
            <p class="join-body">NorCal EVs is free to join. Show up to an event, meet some people, see if it's your thing. No commitment, no sales pitch.</p>
            <a href="https://heylo.group/norcalevs" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Join Us on Heylo</a>
        </div>
        <div class="join-card">
            <div class="join-card-title">What You Get</div>
            <ul class="join-list">
                <li><span class="join-check">&#10003;</span> All EV brands welcome</li>
                <li><span class="join-check">&#10003;</span> EV-curious? You belong too</li>
                <li><span class="join-check">&#10003;</span> Events across Northern California</li>
                <li><span class="join-check">&#10003;</span> Community on Heylo</li>
                <li><span class="join-check">&#10003;</span> No brand loyalty required</li>
            </ul>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/home.html
git commit -m "feat: redesigned homepage with premium layout"
```

---

### Task 12: Page Layout (Inner Pages)

**Files:**
- Rewrite: `_layouts/page.html`

- [ ] **Step 1: Rewrite page.html**

```html
---
layout: default
---

<section class="page-hero">
    <div class="eyebrow">{{ site.title }}</div>
    <h1>{{ page.title }}</h1>
    {% if page.description %}
    <p>{{ page.description }}</p>
    {% endif %}
</section>

<div class="page-content">
    {{ content }}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/page.html
git commit -m "feat: redesigned inner page layout"
```

---

### Task 13: Membership Page with Hidden Tiers

**Files:**
- Modify: `membership.md`

- [ ] **Step 1: Rewrite membership.md with hidden tier structure**

```markdown
---
layout: page
title: "Membership"
description: "Join Northern California's cross-brand EV community"
---

## Join Us

NorCal EVs is open to anyone in Northern California who owns, leases, or is interested in electric vehicles. No specific brand, model, or ownership status is required. If you're EV-curious — thinking about going electric — you're welcome here too.

### How to Join

1. **Join our Heylo community** — [heylo.group/norcalevs](https://heylo.group/norcalevs)
2. **Follow us on social media** — Stay connected on [Instagram](https://instagram.com/norcalevs), [Facebook](https://www.facebook.com/groups/norcalevs/), and [X](https://x.com/norcalevs)
3. **Come to an event** — Check out our upcoming meetups and drives

### What You Get

- Access to all NorCal EVs events and drives
- Membership in the Heylo community — event coordination, discussion, and announcements
- Connection with EV owners across all brands and experience levels

### All Brands Welcome

Whether you drive a Tesla, Rivian, Ford, Lucid, Hyundai, Kia, BMW, Mercedes, Volkswagen, or any other EV — you belong here. NorCal EVs is cross-brand by design. The community is bigger than any one manufacturer, and the best conversations happen when the whole ecosystem is in the room.

### Get Started

Ready to connect? Head over to [Heylo](https://heylo.group/norcalevs) and introduce yourself. Or just show up to the next event — no commitment required.

<!--
MEMBERSHIP TIERS — Uncomment when pricing goes live

<div class="tier-grid">
<div class="tier-card">
<h4>Individual</h4>
<div class="tier-price">$50 / year</div>
<ul>
<li>Full event access and Heylo community</li>
<li>Member communications and newsletter</li>
<li>Voting rights on community decisions</li>
</ul>
</div>
<div class="tier-card">
<h4>Family</h4>
<div class="tier-price">$90 / year</div>
<ul>
<li>Covers two adults and children under 17</li>
<li>Same benefits as individual for all members</li>
</ul>
</div>
<div class="tier-card">
<h4>Founding Member</h4>
<div class="tier-price">$45 first year (limited)</div>
<ul>
<li>Available first 6 months only</li>
<li>Renews at $50/year after first year</li>
<li>Recognition on website and in Heylo</li>
<li>Early input on community direction</li>
</ul>
</div>
<div class="tier-card">
<h4>Lifetime</h4>
<div class="tier-price">$1,000 one-time</div>
<ul>
<li>All individual benefits in perpetuity</li>
<li>Lifetime recognition on website and Heylo</li>
</ul>
</div>
</div>
-->
```

- [ ] **Step 2: Commit**

```bash
git add membership.md
git commit -m "feat: membership page with hidden tier card structure"
```

---

### Task 14: Add photo-break-wrapper style and final CSS tweaks

**Files:**
- Modify: `assets/css/components.css`

- [ ] **Step 1: Add photo-break-wrapper to components.css**

Add this after the `.photo-break img` rules:

```css
.photo-break-wrapper {
    padding-top: 80px;
}

@media (max-width: 768px) {
    .photo-break-wrapper { padding-top: 48px; }
}
```

Also add mobile nav styles to the `@media (max-width: 768px)` block:

```css
.nav-toggle {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
}

.hamburger {
    width: 28px;
    height: 3px;
    background: var(--text);
    border-radius: 3px;
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .nav-toggle { display: flex; }

    .nav-right {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: var(--bg);
        flex-direction: column;
        padding: 32px 24px;
        transition: right 0.3s ease;
        list-style: none;
        gap: 8px;
        border-top: 1px solid var(--border);
    }

    .nav-right.active {
        right: 0;
    }

    .nav-right a {
        font-size: 18px;
        padding: 12px 0;
        display: block;
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/components.css
git commit -m "feat: add mobile nav, photo-break-wrapper styles"
```

---

### Task 15: Verification

- [ ] **Step 1: Start local server**

```bash
eval "$(rbenv init -)" && rbenv local 3.1.6 && bundle install && bundle exec jekyll serve
```

Open `http://localhost:4000` in browser.

- [ ] **Step 2: Visual check — dark mode**

Toggle OS to dark appearance. Verify:
- Nav shows logo + wordmark + links + green "Join Us" button
- Hero shows large logo, eyebrow, headline, subtitle, two CTAs
- Hero image renders full-width with rounded corners
- Brand strip shows all EV brands
- What We Do cards have photos, text, frequency labels
- Events section shows Heylo embed
- Photo break shows two images
- Join section has split layout with checklist card
- Footer has columned links
- All text is readable

- [ ] **Step 3: Visual check — light mode**

Toggle OS to light appearance. Verify same layout with light backgrounds, dark text.

- [ ] **Step 4: Visual check — inner pages**

Navigate to `/membership` and `/leaders`. Verify:
- Page hero with eyebrow, title, description
- Content renders with proper typography
- Links are green with hover underline
- Footer matches homepage

- [ ] **Step 5: Mobile check**

Resize browser to 375px wide. Verify:
- Hamburger menu appears, nav links hidden
- Hamburger toggle opens/closes menu
- Cards stack to single column
- Join section stacks vertically
- Footer stacks vertically
- All text remains readable

- [ ] **Step 6: Grep for banned language**

```bash
grep -ri "revolution\|premier\|sign up" --include="*.html" --include="*.md" --include="*.yml" | grep -v "BRAND_GUIDELINES\|README\|CHANGELOG\|node_modules\|vendor\|\.superpowers"
```

Expected: No matches in active site files.

- [ ] **Step 7: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: verification cleanup"
```
