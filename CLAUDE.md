# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NorCal EVs website - Jekyll-based static site for Northern California's electric vehicle enthusiast community. Hosted on GitHub Pages at norcalevs.org.

## Build & Development Commands

```bash
# Install dependencies
bundle install --path vendor/bundle

# Local development server (http://localhost:4000)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

Deployment is automatic via GitHub Pages on push to `main` branch.

## Architecture

### Layout System
- `_layouts/default.html` - Base template
- `_layouts/home.html` - Homepage template
- `_layouts/page.html` - Standard page template
- `_includes/header.html`, `footer.html` - Reusable components
- `_includes/scripts.html` - JavaScript includes

### Content Pages
- `index.md` - Homepage content
- `membership.md` - Membership information
- `leaders.md` - Club leaders page

### Data Files
Located in `_data/`:
- `social.yml` - Social media links
- `stats.yml` - Community statistics

### CSS Architecture
Modular CSS in `assets/css/`:
- `variables.css` - CSS custom properties (colors, spacing)
- `base.css` - Base styles and resets
- `main.css` - Main stylesheet
- `animations.css` - Animation definitions

### Design System
- Modern glassmorphic design with animated gradients
- Dark theme optimized
- Mobile-first responsive layout
- Font Awesome 6.x icons

## Brand Colors

CSS variables defined in `assets/css/variables.css`. Dark mode uses `prefers-color-scheme` media queries.

## Key Integrations

- **Heylo**: Event management embed (heylo.group/norcalevs)
- **Tinylytics**: Analytics
- **Font Awesome**: Icons via CDN

## Social Links

- @norcalevs (Instagram, X/Twitter, YouTube)
- Facebook Group: facebook.com/groups/norcalevs
- Heylo: heylo.group/norcalevs
- Email: contact@norcalevs.org

## Dependencies

- Jekyll 3.9 (via github-pages gem)
- jekyll-feed, jekyll-seo-tag, jekyll-sitemap plugins
- Font Awesome (CDN)
