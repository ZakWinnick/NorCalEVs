# NorCal EVs Website

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue)](https://norcalevs.org)
[![Jekyll](https://img.shields.io/badge/Built%20with-Jekyll%203.9-red)](https://jekyllrb.com/)
[![Version](https://img.shields.io/badge/Version-2025.35-green)](CHANGELOG.md)

> Northern California's premier electric vehicle enthusiast community website

## About

The NorCal EVs website serves as the digital hub for Northern California's thriving electric vehicle community. Built with Jekyll and deployed on GitHub Pages, it features a modern glassmorphic design, comprehensive membership information, and seamless integration with our community platforms.

**Live Site:** [https://norcalevs.org](https://norcalevs.org)

## Features

### Design & User Experience
- Modern glassmorphic design with animated gradients
- Fully responsive mobile-first layout
- Dark theme optimized for the EV community aesthetic
- Smooth scroll animations and interactive hover effects
- Font Awesome icons throughout
- Accessible navigation with ARIA labels

### Technical Architecture
- Static site generation with Jekyll 3.9
- Modular CSS architecture for maintainability
- Optimized assets (147KB logo down from 2.1MB)
- SEO optimized with meta tags and structured data
- Automatic sitemap generation
- RSS feed support

### Content Management
- Easy-to-edit Markdown content
- Reusable components via Jekyll includes
- Data-driven navigation and social links
- Flexible layout system
- Front matter for page configuration

### Performance
- Fast page load times (<2s)
- CDN delivery via GitHub Pages
- Optimized images and assets
- Minimal JavaScript footprint
- Excellent Lighthouse scores

### Integrations
- Heylo event management embed
- Social media links (Instagram, X/Twitter, Facebook, YouTube)
- Google Analytics ready (if configured)
- Open Graph and Twitter Card metadata

## Technology Stack

- **Static Site Generator:** Jekyll 3.9.0
- **Language:** Ruby 2.6+
- **CSS:** Modular CSS with custom properties
- **Icons:** Font Awesome 6.x
- **Hosting:** GitHub Pages
- **Domain:** Custom domain (norcalevs.org)
- **Build Tool:** Bundler
- **Version Control:** Git/GitHub

## Quick Start

### Prerequisites

- Ruby 2.6 or higher
- Bundler 1.17+ or 2.x
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/NorCalEVs.git
cd NorCalEVs

# Install dependencies
bundle install --path vendor/bundle

# Serve locally
bundle exec jekyll serve

# Open in browser
# Visit http://localhost:4000
```

### Making Changes

1. Edit content in `.md` files
2. Modify layouts in `_layouts/`
3. Update styles in `assets/css/`
4. Test locally with `bundle exec jekyll serve`
5. Commit and push to deploy

## Project Structure

```
NorCalEVs/
├── _config.yml              # Site configuration
├── _data/                   # Data files
│   ├── leaders.yml          # Club leaders data
│   ├── navigation.yml       # Main navigation
│   └── social.yml           # Social media links
├── _includes/               # Reusable components
│   ├── header.html          # Site header with navigation
│   ├── footer.html          # Site footer
│   ├── head.html            # HTML head with meta tags
│   └── social-links.html    # Social media link component
├── _layouts/                # Page templates
│   ├── default.html         # Base template
│   ├── home.html            # Homepage template
│   └── page.html            # Standard page template
├── assets/                  # Static assets
│   ├── css/                 # Stylesheets
│   │   ├── base.css         # Base styles
│   │   ├── components.css   # Component styles
│   │   ├── layout.css       # Layout styles
│   │   └── responsive.css   # Media queries
│   ├── images/              # Image assets
│   │   └── logo-optimized.png
│   └── js/                  # JavaScript files
├── index.md                 # Homepage content
├── membership.md            # Membership information
├── leaders.md               # Club leaders page
├── DEPLOYMENT.md            # Deployment documentation
├── CHANGELOG.md             # Version history
└── README.md                # This file
```

## Documentation

Comprehensive documentation is available:

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment and development guide
  - Local setup instructions
  - GitHub Pages deployment
  - Custom domain configuration
  - Content management
  - Troubleshooting

- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes
  - Feature additions
  - Bug fixes
  - Performance improvements

- **[assets/ASSET_OPTIMIZATION_REPORT.md](assets/ASSET_OPTIMIZATION_REPORT.md)** - Asset optimization details

## Common Tasks

### Update Site Content

```bash
# Edit the homepage
vim index.md

# Edit membership page
vim membership.md

# Edit leaders page
vim leaders.md
```

### Add a New Page

```bash
# Create new page
touch new-page.md

# Add front matter and content
cat > new-page.md << 'EOF'
---
layout: page
title: "New Page"
description: "Page description"
---

# New Page Content
EOF

# Add to navigation in _data/navigation.yml
```

### Update Styles

```bash
# Edit base styles
vim assets/css/base.css

# Edit component styles
vim assets/css/components.css

# Test changes
bundle exec jekyll serve --livereload
```

### Update Social Links

```bash
# Edit social links data
vim _data/social.yml

# Format:
# - name: Platform Name
#   url: https://...
#   icon: fa-icon-name
```

## Deployment

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Pages will build and deploy within 1-2 minutes.

### Manual Build

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Output is in _site/ directory
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions.

## Contributing

We welcome contributions to improve the NorCal EVs website!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow existing code style
   - Test thoroughly locally
   - Update documentation if needed
4. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues

### Contribution Guidelines

- Maintain the existing design language
- Keep mobile responsiveness in mind
- Optimize any new assets (images, etc.)
- Test on multiple browsers/devices
- Update documentation for significant changes
- Follow semantic versioning for version numbers

### Code Style

- **HTML:** Use semantic HTML5 elements
- **CSS:** Follow BEM naming convention where applicable
- **Markdown:** Use proper heading hierarchy
- **YAML:** Consistent indentation (2 spaces)

## Browser Support

The site is tested and supported on:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

Current performance metrics:
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s
- **Total Page Size:** <500KB
- **Lighthouse Score:** 90+

## SEO Features

- Semantic HTML structure
- Meta descriptions on all pages
- Open Graph tags for social sharing
- Twitter Card metadata
- JSON-LD structured data (Organization schema)
- Automatic sitemap generation
- Robots.txt configuration
- Optimized page titles

## License

Copyright 2025 NorCal EVs. All rights reserved.

The code for this website is available for reference and educational purposes. Please contact us before reusing significant portions of the design or code.

## Contact & Community

- **Website:** [https://norcalevs.org](https://norcalevs.org)
- **Email:** contact@norcalevs.org
- **Heylo:** [https://heylo.group/norcalevs](https://heylo.group/norcalevs)
- **Instagram:** [@norcalevs](https://instagram.com/norcalevs)
- **X/Twitter:** [@norcalevs](https://x.com/norcalevs)
- **Facebook:** [NorCal EVs Group](https://www.facebook.com/groups/norcalevs/)
- **YouTube:** [@norcalevs](https://youtube.com/@norcalevs)

## Support

For technical issues or questions:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) documentation
2. Search existing [GitHub Issues](https://github.com/yourusername/NorCalEVs/issues)
3. Create a new issue with detailed information
4. Contact the development team at contact@norcalevs.org

## Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Community platform by [Heylo](https://heylo.group/)

## Roadmap

Future enhancements under consideration:
- [ ] Events calendar integration
- [ ] Member directory (optional opt-in)
- [ ] Photo gallery from events
- [ ] Blog/news section
- [ ] Resources page (charging maps, EV guides)
- [ ] Dark/light theme toggle
- [ ] Advanced search functionality

See [GitHub Issues](https://github.com/yourusername/NorCalEVs/issues) for active development tasks.

---

**Version 2025.35** | Built with passion for electric vehicles and community | [View Changelog](CHANGELOG.md)
