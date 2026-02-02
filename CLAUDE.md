# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

NorCal EVs website - Jekyll-based static site for Northern California's electric vehicle enthusiast community. Live at https://norcalevs.org, deployed via GitHub Pages.

## Development Commands

```bash
# Install dependencies
bundle install --path vendor/bundle

# Local development (http://localhost:4000)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

Deployment: Automatic via GitHub Pages on push to `main`.

## Project Structure

```
/
├── _config.yml              # Site configuration
├── _layouts/
│   ├── default.html         # Base template
│   ├── home.html            # Homepage
│   └── page.html            # Standard pages
├── _includes/
│   ├── head.html            # <head> with meta/fonts/analytics
│   ├── header.html          # Site header/nav
│   ├── footer.html          # Site footer
│   └── scripts.html         # JavaScript includes
├── _data/
│   ├── navigation.yml       # Nav menu items
│   ├── social.yml           # Social media links
│   └── stats.yml            # Community statistics
├── assets/
│   ├── css/
│   │   ├── variables.css    # CSS custom properties
│   │   ├── base.css         # Reset and base styles
│   │   ├── components.css   # Reusable components
│   │   ├── animations.css   # Animation definitions
│   │   └── main.css         # Main stylesheet (imports others)
│   └── images/              # Logos, favicons, hero
├── index.md                 # Homepage content
├── membership.md            # Membership page
├── leaders.md               # Club leaders page
├── Gemfile                  # Ruby dependencies
└── CNAME                    # Custom domain
```

## Configuration

Key settings in `_config.yml`:
- **URL**: `https://norcalevs.org`
- **Theme**: Custom (no gem theme)
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- **Permalink**: `pretty` (no .html extensions)
- **Version**: `2025.35`

## Design System

### CSS Architecture

Modular CSS with imports in `main.css`:
1. `variables.css` - Custom properties (colors, spacing, fonts)
2. `base.css` - Reset, typography, base elements
3. `components.css` - Buttons, cards, sections
4. `animations.css` - Keyframe animations

### Theme

- Modern glassmorphic design with animated gradients
- Dark theme optimized
- Mobile-first responsive layout
- `prefers-color-scheme` media query support

### Typography

- Font Awesome 6.x icons via CDN
- System font stack with fallbacks

## Data Files

### `_data/navigation.yml`
```yaml
- title: Home
  url: /
- title: Membership
  url: /membership/
```

### `_data/social.yml`
Social platform links and icons.

### `_data/stats.yml`
Community statistics displayed on homepage.

## External Integrations

| Service | Purpose | Location |
|---------|---------|----------|
| Heylo | Event management embed | heylo.group/norcalevs |
| Tinylytics | Analytics | `_includes/head.html` |
| Font Awesome | Icons | CDN in `_includes/head.html` |
| GitHub Pages | Hosting | Automatic on push |

## Adding Content

### New Page
1. Create `pagename.md` in root
2. Add front matter:
   ```yaml
   ---
   layout: page
   title: Page Title
   permalink: /pagename/
   ---
   ```

### Event Collection
Events can use `_events/` collection (configured but not populated):
```yaml
---
layout: event
title: Event Name
date: 2024-01-15
---
```

## SEO

- `jekyll-seo-tag` plugin generates meta tags
- Logo configured for social sharing: `/NOR_CAL_EV_LOGO.png`
- Twitter card: `summary_large_image`
- Sitemap auto-generated at `/sitemap.xml`

## Social Links

- @norcalevs (Instagram, X/Twitter, YouTube)
- Facebook Group: facebook.com/groups/norcalevs
- Heylo: heylo.group/norcalevs
- Email: contact@norcalevs.org
