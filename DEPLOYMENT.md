# NorCal EVs Website - Deployment Guide

## Overview

The NorCal EVs website is a modern, responsive Jekyll-based static site featuring:
- Glassmorphic design with animated gradients
- Modular CSS architecture
- Optimized assets and performance
- Full SEO optimization with structured data
- Integration with Heylo for event management
- Font Awesome icons for social links
- Mobile-first responsive design

The site is deployed to GitHub Pages and serves from the custom domain `norcalevs.org`.

**Version:** 2025.35
**Framework:** Jekyll 3.9.0
**Ruby:** 2.6.10 (compatible with 2.6+)

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Local Development Setup](#local-development-setup)
3. [Building the Site](#building-the-site)
4. [Running Locally](#running-locally)
5. [GitHub Pages Deployment](#github-pages-deployment)
6. [Custom Domain Configuration](#custom-domain-configuration)
7. [Content Management](#content-management)
8. [Adding New Pages](#adding-new-pages)
9. [Troubleshooting](#troubleshooting)
10. [Performance Optimization](#performance-optimization)

---

## System Requirements

### Required Software

- **Ruby:** Version 2.6 or higher
  - The site is tested with Ruby 2.6.10
  - Should work with Ruby 3.x (requires webrick gem)

- **Bundler:** Version 1.17+ or 2.x
  - Package manager for Ruby gems

- **Git:** For version control and deployment
  - Required for GitHub Pages deployment

### Optional Tools

- **GitHub CLI (gh):** For advanced GitHub operations
- **Node.js/npm:** If you plan to add build tools
- **ImageOptim or similar:** For optimizing images

---

## Local Development Setup

### 1. Install Ruby (if not already installed)

**macOS:**
```bash
# Using Homebrew
brew install ruby

# Or use rbenv for version management
brew install rbenv ruby-build
rbenv install 2.6.10
rbenv global 2.6.10
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install ruby-full build-essential
```

**Windows:**
- Download and install from [RubyInstaller](https://rubyinstaller.org/)
- Choose Ruby+Devkit version

### 2. Install Bundler

```bash
gem install bundler
```

### 3. Clone the Repository

```bash
git clone https://github.com/yourusername/NorCalEVs.git
cd NorCalEVs
```

### 4. Install Dependencies

```bash
# Install all gems specified in Gemfile
bundle install --path vendor/bundle
```

**Note:** The `--path vendor/bundle` flag installs gems locally to avoid conflicts with system gems. The vendor directory is already excluded in `.gitignore`.

### 5. Verify Installation

```bash
bundle exec jekyll --version
# Should output: jekyll 3.9.x
```

---

## Building the Site

### Development Build

```bash
# Build the site to _site directory
bundle exec jekyll build

# Build with drafts included
bundle exec jekyll build --drafts

# Build with verbose output for debugging
bundle exec jekyll build --verbose
```

### Production Build

```bash
# Build with production settings
JEKYLL_ENV=production bundle exec jekyll build
```

The production build:
- Minifies HTML output
- Enables all optimizations
- Uses production URLs from `_config.yml`

---

## Running Locally

### Start Development Server

```bash
# Start Jekyll development server
bundle exec jekyll serve

# The site will be available at:
# http://localhost:4000
```

### Server Options

```bash
# Serve with live reload (auto-refresh browser)
bundle exec jekyll serve --livereload

# Serve on a different port
bundle exec jekyll serve --port 4001

# Serve with drafts visible
bundle exec jekyll serve --drafts

# Serve with incremental builds (faster)
bundle exec jekyll serve --incremental

# Serve and open in browser
bundle exec jekyll serve --open-url
```

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the Jekyll server.

---

## GitHub Pages Deployment

The site is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

GitHub Pages automatically builds and deploys when you push to the main branch:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Pages will:
1. Detect the push to main branch
2. Automatically build the Jekyll site
3. Deploy to `https://yourusername.github.io/NorCalEVs`
4. Update the custom domain `norcalevs.org`

### Deployment Configuration

The deployment is configured in:
- **_config.yml:** Site settings and URLs
- **CNAME file:** (if using custom domain) Contains `norcalevs.org`
- **.gitignore:** Excludes build artifacts

### GitHub Pages Settings

In your GitHub repository settings:

1. Go to **Settings > Pages**
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. **Custom domain:** norcalevs.org
6. **Enforce HTTPS:** Enabled

---

## Custom Domain Configuration

### DNS Configuration

Configure your DNS provider (e.g., Namecheap, GoDaddy) with these records:

#### APEX Domain (@)
Add A records pointing to GitHub Pages IPs:
```
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

#### WWW Subdomain
Add a CNAME record:
```
CNAME www yourusername.github.io
```

### CNAME File

Create a `CNAME` file in the repository root:
```
norcalevs.org
```

This file tells GitHub Pages which custom domain to use.

### SSL/HTTPS

GitHub Pages automatically provisions an SSL certificate for custom domains:
1. Configure DNS as above
2. Wait for DNS propagation (up to 24 hours)
3. Enable "Enforce HTTPS" in repository settings
4. Certificate is automatically renewed

### Verifying Custom Domain

```bash
# Check DNS propagation
dig norcalevs.org +noall +answer

# Check HTTPS certificate
curl -I https://norcalevs.org
```

---

## Content Management

### Site Structure

```
NorCalEVs/
├── _config.yml          # Site configuration
├── _data/               # Data files (YAML, JSON)
│   ├── leaders.yml
│   ├── navigation.yml
│   └── social.yml
├── _includes/           # Reusable components
│   ├── header.html
│   ├── footer.html
│   ├── head.html
│   └── social-links.html
├── _layouts/            # Page templates
│   ├── default.html     # Base layout
│   ├── home.html        # Homepage layout
│   └── page.html        # Standard page layout
├── _sass/               # Sass partials
├── assets/              # Static assets
│   ├── css/             # Stylesheets
│   ├── images/          # Images
│   └── js/              # JavaScript
├── index.md             # Homepage
├── membership.md        # Membership page
├── leaders.md           # Leaders page
└── _site/               # Generated site (git-ignored)
```

### Editing Content

#### 1. Homepage Content

Edit `/index.md`:
```yaml
---
layout: home
title: Home
---
```

The homepage layout is defined in `_layouts/home.html`.

#### 2. Page Content

Edit any `.md` file in the root:
```yaml
---
layout: page
title: "Page Title"
description: "Page description for SEO"
---

# Page Heading

Your content here using Markdown.
```

#### 3. Navigation

Edit `_data/navigation.yml`:
```yaml
- name: Home
  url: /
- name: Membership
  url: /membership/
- name: Leaders
  url: /leaders/
```

#### 4. Social Links

Edit `_data/social.yml`:
```yaml
- name: Heylo
  url: https://heylo.group/norcalevs
  icon: fa-users
- name: Instagram
  url: https://instagram.com/norcalevs
  icon: fa-instagram
```

#### 5. Leaders Data

Edit `_data/leaders.yml`:
```yaml
- name: "Leader Name"
  role: "President"
  bio: "Leader bio text"
  image: "/assets/images/leaders/name.jpg"
```

### Markdown Formatting

Jekyll uses Kramdown for Markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link text](https://example.com)

![Alt text](/assets/images/photo.jpg)

- Bullet point
- Another point

1. Numbered list
2. Second item

> Blockquote

`inline code`

```bash
# Code block
command here
```
```

---

## Adding New Pages

### Step 1: Create the Page File

Create a new `.md` file in the root directory:

```bash
touch new-page.md
```

### Step 2: Add Front Matter

Edit `new-page.md`:
```yaml
---
layout: page
title: "New Page Title"
description: "Description for SEO"
permalink: /new-page/
---

# New Page

Your content here.
```

### Step 3: Add to Navigation

Edit `_data/navigation.yml`:
```yaml
- name: New Page
  url: /new-page/
```

### Step 4: Test Locally

```bash
bundle exec jekyll serve
# Visit http://localhost:4000/new-page/
```

### Step 5: Deploy

```bash
git add .
git commit -m "Add new page"
git push origin main
```

---

## Troubleshooting

### Common Issues

#### Issue: "Could not find gem 'jekyll'"

**Solution:**
```bash
bundle install
```

#### Issue: "Permission denied" when installing gems

**Solution:**
```bash
# Don't use sudo with bundler
bundle install --path vendor/bundle
```

#### Issue: Port 4000 already in use

**Solution:**
```bash
# Kill existing process
kill -9 $(lsof -ti:4000)

# Or use different port
bundle exec jekyll serve --port 4001
```

#### Issue: Changes not showing up

**Solution:**
```bash
# Clear cache and rebuild
bundle exec jekyll clean
bundle exec jekyll serve
```

#### Issue: "Liquid Exception: undefined method"

**Solution:**
- Check your liquid syntax in templates
- Ensure all variables are defined
- Use `--trace` for detailed error:
```bash
bundle exec jekyll build --trace
```

#### Issue: CSS/Images not loading

**Solution:**
- Check file paths are correct
- Verify files exist in `assets/` directory
- Clear browser cache
- Check `baseurl` in `_config.yml`

#### Issue: GitHub Pages build failing

**Solution:**
1. Check GitHub Pages build status in repository settings
2. Review error message in GitHub Actions
3. Test build locally:
   ```bash
   JEKYLL_ENV=production bundle exec jekyll build
   ```
4. Ensure all plugins are GitHub Pages compatible

### Debugging Tips

#### Enable Verbose Output
```bash
bundle exec jekyll serve --verbose
```

#### Check Configuration
```bash
bundle exec jekyll doctor
```

#### Validate HTML
```bash
bundle exec jekyll build
# Then use HTML validator on _site/ output
```

#### Test Production Build
```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

---

## Performance Optimization

### Image Optimization

1. **Compress images** before adding to `assets/images/`:
   - Use tools like ImageOptim, TinyPNG, or Squoosh
   - Target: <100KB for photos, <20KB for graphics

2. **Use appropriate formats**:
   - JPEG for photos
   - PNG for graphics with transparency
   - WebP for modern browsers (with fallback)

3. **Optimize logo**:
   ```bash
   # The logo has been optimized to 147KB (from 2.1MB)
   # See assets/ASSET_OPTIMIZATION_REPORT.md
   ```

### CSS Optimization

The site uses modular CSS architecture:
- Base styles in `assets/css/base.css`
- Component styles in separate files
- Responsive utilities in `assets/css/responsive.css`

### Caching

GitHub Pages automatically handles:
- Browser caching headers
- CDN distribution
- Gzip compression

### Monitoring Performance

Use these tools:
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **WebPageTest:** https://webpagetest.org/

Target metrics:
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Total page size: <500KB

---

## Environment Variables

### Local Development

No environment variables required for basic operation.

### Optional Variables

```bash
# Set Jekyll environment
export JEKYLL_ENV=production

# Enable detailed logging
export JEKYLL_LOG_LEVEL=debug
```

---

## Support and Resources

### Documentation

- **Jekyll Docs:** https://jekyllrb.com/docs/
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Kramdown Syntax:** https://kramdown.gettalong.org/syntax.html

### Getting Help

1. Check this deployment guide
2. Review Jekyll documentation
3. Search GitHub Issues
4. Contact the development team

### Useful Commands Reference

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean

# Update dependencies
bundle update

# Check for issues
bundle exec jekyll doctor

# Serve with live reload
bundle exec jekyll serve --livereload

# Build with drafts
bundle exec jekyll build --drafts
```

---

## Security Considerations

### Dependency Updates

```bash
# Check for outdated gems
bundle outdated

# Update all gems
bundle update

# Update specific gem
bundle update jekyll
```

### .gitignore

Ensure sensitive files are excluded:
- `.env` files
- `vendor/` directory
- `_site/` build directory
- `.bundle/` local configuration

### Content Security

- Don't commit API keys or credentials
- Use environment variables for sensitive data
- Review commits before pushing

---

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

**Current Version:** 2025.35

---

## Contact

For deployment issues or questions:
- **Email:** contact@norcalevs.org
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/NorCalEVs/issues)

---

*Last Updated: November 10, 2025*
