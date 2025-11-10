# NorCal EVs Assets Directory

This directory contains all optimized assets for the NorCalEVs website.

## Directory Structure

```
assets/
├── css/                          # Stylesheets
├── js/                           # JavaScript files
├── images/                       # Optimized images
│   ├── favicon-16x16.png        # Browser tab icon (16x16)
│   ├── favicon-32x32.png        # Browser tab icon (32x32)
│   ├── favicon-64x64.png        # High-DPI browser icon (64x64)
│   ├── favicon-192x192.png      # Android home screen (192x192)
│   ├── favicon-512x512.png      # iOS/Android splash (512x512)
│   ├── hero-background.jpg      # Hero section background image
│   ├── logo-200.png             # Logo for navigation/mobile (200x200)
│   ├── logo-400.png             # Logo for small screens (400x400)
│   ├── logo-800.png             # Logo for desktop (800x800)
│   └── logo-original.png        # Original logo backup (2400x2400)
└── ASSET_OPTIMIZATION_REPORT.md # Detailed optimization documentation
```

## Image Assets

### Logo Files
- **logo-200.png** (38KB) - Navigation bar, mobile devices
- **logo-400.png** (110KB) - Hero section on mobile/tablets
- **logo-800.png** (413KB) - Hero section on desktop
- **logo-original.png** (2.1MB) - Archive/backup only

### Favicon Files
Complete favicon set for all devices and platforms:
- 16x16, 32x32, 64x64 for browser tabs
- 192x192 for Android home screens
- 512x512 for iOS and Android splash screens

### Background Images
- **hero-background.jpg** (629KB) - Hero section background image (1920x1280)

## Usage

### Responsive Logo Implementation
```html
<img src="assets/images/logo-400.png"
     srcset="assets/images/logo-200.png 200w,
             assets/images/logo-400.png 400w,
             assets/images/logo-800.png 800w"
     sizes="(max-width: 768px) 90vw, 280px"
     alt="NorCal EVs" />
```

### Favicon Implementation
```html
<link rel="icon" href="assets/images/favicon-32x32.png" type="image/png" sizes="32x32" />
<link rel="icon" href="assets/images/favicon-16x16.png" type="image/png" sizes="16x16" />
<link rel="apple-touch-icon" href="assets/images/favicon-192x192.png" sizes="192x192" />
<link rel="icon" href="assets/images/favicon-512x512.png" type="image/png" sizes="512x512" />
```

## Optimization Details

- **Total files created:** 10 optimized assets
- **Average file size reduction:** 80-98% depending on usage
- **Format:** PNG for logos/favicons, JPEG for photos
- **Optimization tool:** macOS sips (lossless compression)

For complete optimization details, see [ASSET_OPTIMIZATION_REPORT.md](ASSET_OPTIMIZATION_REPORT.md)

## Performance Benefits

- 98% smaller logo on mobile devices (2.1MB → 38KB)
- 94% smaller logo on tablets (2.1MB → 110KB)
- 80% smaller logo on desktop (2.1MB → 413KB)
- Local hero background (eliminates external HTTP request)
- Responsive image delivery (right-sized images for each device)

## Maintenance

### Adding New Assets
1. Place source files in appropriate subdirectory
2. Optimize images using sips or similar tools
3. Update relevant HTML/CSS files
4. Document changes in ASSET_OPTIMIZATION_REPORT.md

### Quality Standards
- Logo files: PNG format, lossless compression
- Photo files: JPEG format, progressive encoding, 85% quality
- Favicon files: PNG format, exact pixel dimensions
- All images: Descriptive alt text, proper dimensions
