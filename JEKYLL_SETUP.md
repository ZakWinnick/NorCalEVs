# Jekyll Setup for NorCalEVs

This document provides an overview of the Jekyll structure created for the NorCalEVs website to enable GitHub Pages deployment.

## Directory Structure

```
NorCalEVs/
├── _config.yml                 # Jekyll configuration
├── Gemfile                      # Ruby gem dependencies
├── .gitignore                   # Jekyll-specific gitignore
│
├── _layouts/                    # Page templates
│   ├── default.html            # Base layout with HTML structure
│   ├── home.html               # Homepage layout
│   └── page.html               # Generic page layout
│
├── _includes/                   # Reusable components
│   ├── head.html               # Meta tags, CSS links, SEO
│   ├── header.html             # Navigation bar
│   ├── footer.html             # Footer content
│   └── scripts.html            # JavaScript includes
│
├── _data/                       # Data files (YAML)
│   ├── navigation.yml          # Navigation menu items
│   ├── social.yml              # Social media links
│   └── stats.yml               # Homepage statistics
│
├── _sass/                       # Sass/SCSS files (optional)
│
└── assets/                      # Static assets
    ├── css/
    │   └── main.css            # Main stylesheet
    ├── js/                     # JavaScript files
    └── images/                 # Image files

```

## Configuration Details

### _config.yml
- **Site Title**: NorCal EVs
- **URL**: https://norcalevs.org
- **Baseurl**: "" (empty for root domain)
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- **Version**: 2025.35

### Gemfile
Includes:
- Jekyll 4.3+
- GitHub Pages gem
- SEO, feed, and sitemap plugins
- Cross-platform compatibility gems

## Getting Started

### 1. Install Dependencies

```bash
# Install Ruby (if not already installed)
# macOS: Ruby comes pre-installed, but you may want to use rbenv or rvm

# Install Bundler
gem install bundler

# Install Jekyll and dependencies
cd /Users/zakwinnick/Documents/GitHub/NorCalEVs
bundle install
```

### 2. Local Development

```bash
# Run Jekyll locally
bundle exec jekyll serve

# Or with live reload
bundle exec jekyll serve --livereload

# Access at: http://localhost:4000
```

### 3. Build Site

```bash
# Build static files to _site/ directory
bundle exec jekyll build
```

## GitHub Pages Deployment

### Automatic Deployment
1. Push changes to the `main` branch
2. GitHub Pages will automatically build and deploy
3. Site will be available at https://norcalevs.org

### GitHub Pages Settings
1. Go to repository Settings > Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Custom domain: norcalevs.org (if configured)

## Data Files

### navigation.yml
Defines the main navigation menu structure including the Social dropdown.

### social.yml
Contains social media platform information:
- Name
- URL
- Icon (emoji)
- Description

### stats.yml
Homepage statistics displayed in the stats section:
- Active Members: 200+
- Monthly Events: 2+
- EV Brands: 10+
- Electric Future: 100%

## Layouts

### default.html
Base template containing:
- HTML structure
- Head include (meta tags, CSS)
- Header include (navigation)
- Main content area
- Footer include
- Scripts include

### home.html
Homepage-specific layout with:
- Hero section with logo and CTAs
- Stats section
- About section
- Events calendar
- Social connect section

### page.html
Generic page layout for:
- Membership page
- Leaders page
- Other content pages

## Includes

### head.html
- Meta tags (charset, viewport)
- SEO metadata (title, description, keywords)
- Open Graph tags (Facebook)
- Twitter Card tags
- Favicon link
- CSS stylesheet link
- Jekyll SEO plugin
- Structured data (JSON-LD)

### header.html
- Fixed navigation bar
- Logo and site title
- Navigation menu from navigation.yml
- Dropdown menu for social links
- Mobile hamburger menu toggle

### footer.html
- Footer links (Privacy, Terms, Contact, Changelog)
- Copyright notice
- Site version

### scripts.html
- Analytics (Tinylytics)
- Navigation scroll effects
- Mobile menu toggle
- Dropdown menu functionality
- Smooth scrolling
- Scroll reveal animations
- Particle generation

## Styling

### main.css
Complete stylesheet including:
- CSS custom properties (variables)
- Reset and base styles
- Animated background
- Floating particles
- Navigation styles
- Hero section
- Stats section
- About cards
- Events section
- Social cards
- Footer
- Mobile responsive styles
- Animations and transitions

## Next Steps

### Converting Existing Pages
To convert existing HTML pages to use Jekyll layouts:

1. **For the homepage (index.html)**:
   - Add front matter:
     ```yaml
     ---
     layout: home
     ---
     ```
   - Remove duplicate HTML (head, header, footer)
   - Keep only page-specific content

2. **For other pages (membership, leaders)**:
   - Add front matter:
     ```yaml
     ---
     layout: page
     title: Page Title
     description: Page description
     ---
     ```
   - Remove duplicate HTML structure
   - Keep only page content

### Example Front Matter

**Homepage:**
```yaml
---
layout: home
---
```

**Generic Page:**
```yaml
---
layout: page
title: Membership
description: Join our growing community of EV enthusiasts
---
```

## Troubleshooting

### Common Issues

1. **Jekyll not found**
   ```bash
   gem install jekyll bundler
   ```

2. **Bundle install fails**
   ```bash
   bundle update
   ```

3. **Port already in use**
   ```bash
   bundle exec jekyll serve --port 4001
   ```

4. **Changes not showing**
   - Clear browser cache
   - Check _config.yml is not cached (requires restart)
   - Rebuild: `bundle exec jekyll build --force`

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Jekyll SEO Tag](https://github.com/jekyll/jekyll-seo-tag)

## Maintenance

### Updating Content

- **Navigation**: Edit `_data/navigation.yml`
- **Social Links**: Edit `_data/social.yml`
- **Stats**: Edit `_data/stats.yml`
- **Site Config**: Edit `_config.yml`

### Version Updates
Update version number in `_config.yml` and it will automatically appear in the footer.

## Notes

- The original `index.html`, `index-old.html`, and `index-current.html` are excluded from Jekyll build
- `styles-old.css` is also excluded
- All styles have been consolidated into `assets/css/main.css`
- The site uses Liquid templating for dynamic content
- Front matter is required for Jekyll to process files
