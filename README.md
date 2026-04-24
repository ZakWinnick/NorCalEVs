# NorCal EVs

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue)](https://norcalevs.org)
[![Jekyll](https://img.shields.io/badge/Built%20with-Jekyll%203.9-red)](https://jekyllrb.com/)

> Northern California's cross-brand EV community. If it plugs in, it belongs here.

**Live Site:** [norcalevs.org](https://norcalevs.org)

## About

NorCal EVs is a registered nonprofit connecting EV owners, enthusiasts, and the EV-curious across all brands in Northern California. The website serves as the front door: explaining what NorCal EVs is, making joining easy, and building credibility.

## Tech Stack

- **Static Site Generator:** Jekyll 3.9
- **Hosting:** GitHub Pages (push to `main` to deploy)
- **Typography:** Raleway + Source Sans 3 (Google Fonts)
- **Icons:** Font Awesome 6.x
- **Events:** Heylo embedded event feed
- **Analytics:** Tinylytics
- **Domain:** norcalevs.org (via CNAME)

## Local Development

```bash
# Requires Ruby 3.x (use rbenv if system Ruby is older)
bundle install
bundle exec jekyll serve
# Open http://localhost:4000
```

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.md` + `_layouts/home.html` | Hero, brand strip, event types, Heylo embed, join CTA |
| Membership | `membership.md` | How to join, benefits, hidden tier cards for future pricing |
| Leaders | `leaders.md` | Board of Directors, Community Leadership Team, get involved |

## Brand

- **Colors:** Primary Green `#2B542F`, Secondary Teal `#3A9AAF`, White `#FFFFFF`
- **Voice:** Clear, warm, confident, inclusive. See `BRAND_GUIDELINES.md` for full details.
- **Tagline:** "Driven by Community. If it plugs in, it belongs here."

## Community

- **Website:** [norcalevs.org](https://norcalevs.org)
- **Heylo:** [heylo.group/norcalevs](https://heylo.group/norcalevs)
- **Instagram:** [@norcalevs](https://instagram.com/norcalevs)
- **X:** [@norcalevs](https://x.com/norcalevs)

## License

Copyright 2025-2026 NorCal EVs. All rights reserved.
