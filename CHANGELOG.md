# Changelog

All notable changes to the NorCal EVs website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2025.35] - 2025-11-10

### Major: Jekyll Migration & Complete Site Modernization

This release represents a complete modernization of the NorCal EVs website, transitioning from a static HTML site to a full Jekyll-based architecture with a modern glassmorphic design system.

### Added

#### Jekyll Infrastructure
- Migrated entire site to Jekyll 3.9.0 static site generator
- Created modular layout system with `default.html`, `home.html`, and `page.html` templates
- Implemented Jekyll includes for reusable components (header, footer, head, social-links)
- Added `_data` directory structure for content management:
  - `navigation.yml` - Site navigation configuration
  - `social.yml` - Social media links configuration
  - `leaders.yml` - Club leadership information
- Created `_config.yml` with comprehensive site configuration
- Added Gemfile with Jekyll dependencies and plugins
- Implemented automatic sitemap generation via jekyll-sitemap plugin
- Added RSS feed support via jekyll-feed plugin
- Integrated jekyll-seo-tag for enhanced SEO

#### Design System
- Implemented modern glassmorphic design system across all pages
- Created animated gradient background with smooth color transitions
- Added CSS custom properties (variables) for consistent theming
- Designed component-based CSS architecture:
  - `base.css` - Typography, colors, and foundational styles
  - `layout.css` - Grid and layout utilities
  - `components.css` - Reusable component styles
  - `glassmorphic.css` - Glassmorphic effect utilities
  - `animations.css` - Keyframe animations and transitions
  - `navigation.css` - Navigation-specific styles
  - `responsive.css` - Mobile and tablet breakpoints
- Implemented smooth scroll animations with Intersection Observer
- Added hover effects and transitions throughout
- Created dark theme optimized for EV community aesthetic

#### Pages & Content
- Converted homepage to Markdown with Jekyll front matter
- Created dedicated Membership page with comprehensive information
- Created dedicated Leaders page with leadership profiles
- Implemented proper page layouts with consistent structure
- Added page-specific descriptions for SEO

#### Features
- Integrated Font Awesome 6.x for icon system
- Added social media icon links in header
- Implemented mobile-responsive hamburger menu
- Created sticky navigation with scroll effects
- Added footer with social links and copyright
- Implemented Heylo event widget integration
- Added meta tags for Open Graph and Twitter Cards
- Included JSON-LD structured data for Organization schema

#### Documentation
- Created comprehensive DEPLOYMENT.md with:
  - System requirements
  - Local development setup
  - Build and deployment instructions
  - GitHub Pages configuration
  - Custom domain setup guide
  - Content management guide
  - Troubleshooting section
- Created detailed README.md with:
  - Project overview and features
  - Quick start guide
  - Technology stack details
  - Contributing guidelines
  - Project structure documentation
- Created CHANGELOG.md for version tracking
- Added assets/ASSET_OPTIMIZATION_REPORT.md documenting image optimization

### Changed

#### Asset Optimization
- Optimized logo from 2.1MB to 147KB (93% reduction)
  - Created logo-optimized.png with proper compression
  - Maintained visual quality while dramatically reducing size
- Organized all images into `/assets/images/` directory
- Structured CSS files in `/assets/css/` directory
- Created `/assets/js/` directory for future JavaScript

#### File Structure
- Moved old backup files to `/archive/` directory:
  - `index-old.html` (legacy homepage)
  - `index-current.html` (backup)
  - `styles-old.css` (old stylesheet)
- Reorganized site structure to follow Jekyll conventions
- Updated `.gitignore` to exclude build artifacts and archive
- Removed inline styles in favor of modular CSS files

#### Configuration
- Updated `_config.yml` to exclude deprecated files from build
- Configured proper URL structure with `baseurl` setting
- Set up permalink structure for clean URLs
- Added site metadata for SEO and social sharing

### Improved

#### Performance
- Reduced total page size through asset optimization
- Implemented efficient CSS loading strategy
- Minimized HTTP requests through asset consolidation
- Optimized images for web delivery
- Enabled browser caching through GitHub Pages

#### SEO & Accessibility
- Enhanced semantic HTML structure throughout
- Added comprehensive meta tags on all pages
- Implemented proper heading hierarchy (h1-h6)
- Added ARIA labels for navigation elements
- Included alt text for all images
- Created descriptive page titles and descriptions

#### Mobile Experience
- Implemented mobile-first responsive design
- Created touch-friendly navigation menu
- Optimized layouts for small screens
- Enhanced readability on mobile devices
- Improved button and link target sizes

#### Developer Experience
- Established clear project structure
- Created reusable components and layouts
- Documented all major features and configurations
- Simplified content editing through Markdown
- Enabled local development with live reload

### Technical Details

#### Dependencies
```ruby
Jekyll 3.9.0
kramdown-parser-gfm
jekyll-feed
jekyll-seo-tag
jekyll-sitemap
webrick ~> 1.8
```

#### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari and Chrome Mobile

#### Performance Metrics
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Total Page Size: <500KB
- Lighthouse Score: 90+

### Deployment
- Site deployed to GitHub Pages
- Custom domain configured: norcalevs.org
- HTTPS enabled with automatic certificate renewal
- Automatic builds on push to main branch

### Breaking Changes
- Migrated from static HTML to Jekyll (site structure completely changed)
- Old URLs may need redirects if external links exist
- Requires Ruby and Bundler for local development

### Migration Notes
For developers updating from the old site:
1. Install Ruby 2.6+ and Bundler
2. Run `bundle install --path vendor/bundle`
3. Use `bundle exec jekyll serve` instead of opening HTML files
4. Content is now in Markdown files, not HTML
5. Styles are modular in `/assets/css/` directory

---

## [2025.15] - 2025-08-27

### Initial Release

#### Added
- Initial landing page design and deployment
- Hero section with full background image and centered logo
- Responsive CTA and heading: "Driven by Community"
- Main sections: About, Events, Connect
- Heylo events widget integration
- Social media buttons (Heylo, Facebook, Instagram, X)
- Mobile-friendly layout with flexbox

#### Navigation
- Top navigation bar with logo and menu items
- Fully responsive hamburger menu for mobile
- Dropdown menu under "Social" with tap-to-open behavior
- Outside-click handling to close menus
- Sticky navbar with blur and shadow on scroll

#### SEO Foundation
- Full SEO meta tags (title, description, keywords)
- Open Graph metadata for social sharing
- Twitter Card integration
- JSON-LD structured data (Organization schema)
- Created robots.txt with sitemap reference
- Generated sitemap.xml with all pages

#### Pages
- Homepage with hero and main sections
- `/leaders/` page with basic structure
- `/membership/` page with basic structure
- Shared global styles via `/styles.css`
- Consistent SEO meta tags across all pages

#### Technical
- Pure CSS animations
- Responsive design breakpoints
- Touch-optimized for mobile devices
- Cross-browser compatible

#### Bug Fixes
- Fixed dropdown menu staying open issue
- Fixed mobile nav menu not closing when tapping outside
- Ensured dropdown closes on link click
- Improved font styling for Social dropdown toggle

---

## Version Numbering

This project uses a date-based versioning scheme:
- **Format:** YYYY.WW (Year.Week)
- **Example:** 2025.35 = Week 35 of 2025
- Major updates increment the week number
- Minor updates and hotfixes use the current week

---

## Future Roadmap

### Planned Features
- [ ] Events calendar with filtering
- [ ] Member directory (opt-in)
- [ ] Photo gallery from community events
- [ ] Blog/news section for announcements
- [ ] Resources page (charging maps, EV guides)
- [ ] Dark/light theme toggle
- [ ] Advanced search functionality
- [ ] Email newsletter signup
- [ ] Event RSVP integration

### Potential Improvements
- [ ] Progressive Web App (PWA) capabilities
- [ ] Offline support with service workers
- [ ] WebP image format with fallbacks
- [ ] Lazy loading for images
- [ ] Advanced analytics integration
- [ ] A/B testing framework
- [ ] Internationalization (i18n) support
- [ ] Comments system for blog posts

---

## Contributing

To contribute to this project:
1. Read the [README.md](README.md) for setup instructions
2. Review the [DEPLOYMENT.md](DEPLOYMENT.md) for development guidelines
3. Create a feature branch for your changes
4. Submit a pull request with clear description
5. Update this CHANGELOG.md with your changes

---

## Links

- **Live Site:** [https://norcalevs.org](https://norcalevs.org)
- **Repository:** [GitHub](https://github.com/yourusername/NorCalEVs)
- **Documentation:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/NorCalEVs/issues)

---

*This changelog is maintained according to [Keep a Changelog](https://keepachangelog.com/) principles.*
