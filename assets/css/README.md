# NorCal EVs CSS Architecture

This directory contains the modular CSS stylesheets for the NorCal EVs website.

## File Structure

### Core Stylesheets (Load in Order)
1. **variables.css** (1.1 KB, 49 lines)
   - CSS custom properties and design tokens
   - Colors, spacing, typography, transitions
   - Single source of truth for design values
   - **Load first** - Required by all other files

2. **base.css** (1.9 KB, 86 lines)
   - CSS resets and normalization
   - Global element styles (body, html)
   - Background animations
   - Container and utility classes
   - **Load second** - Foundation layer

3. **animations.css** (1.4 KB, 68 lines)
   - All keyframe animations
   - Gradient shifts, float effects, pulses
   - Shimmer and fade transitions
   - **Load third** - Animation library

4. **components.css** (12 KB, 564 lines)
   - Navigation and menu components
   - Hero section styles
   - Cards, buttons, forms
   - Stats, footer, and layout sections
   - Responsive media queries
   - **Load fourth** - Main component library

## Usage

### In HTML
```html
<head>
    <!-- Stylesheets - Load in this order -->
    <link rel="stylesheet" href="assets/css/variables.css" />
    <link rel="stylesheet" href="assets/css/base.css" />
    <link rel="stylesheet" href="assets/css/animations.css" />
    <link rel="stylesheet" href="assets/css/components.css" />
</head>
```

### Total Size
- **Combined:** ~16.4 KB unminified
- **Lines:** ~767 lines of CSS
- **Previous:** ~700 lines inline in HTML

## Benefits of This Architecture

### Maintainability
- Change colors in `variables.css` to update entire site
- Animations separated for easy modification
- Components clearly organized and documented

### Performance
- Browser can cache individual files
- Update one file without invalidating all caches
- Parallel downloads with HTTP/2

### Scalability
- Easy to add new components
- Clear structure for team collaboration
- Can add page-specific stylesheets without conflict

### Developer Experience
- Clear separation of concerns
- Easy to find and modify specific styles
- Git diffs show exactly what changed

## Migration from Inline Styles

The CSS in this directory was extracted from index.html (lines 29-694) and organized into logical modules. All styles have been preserved exactly, only reorganized for better structure.

### Changes Made
- ✅ Extracted 665 lines of CSS from index.html
- ✅ Organized into 4 modular files
- ✅ Reduced index.html from 969 to 321 lines (66% smaller)
- ✅ Added CSS custom properties for easy theming
- ✅ Documented design system
- ✅ Maintained all functionality and appearance

### What's Next
1. Test index.html with extracted stylesheets
2. Apply same architecture to membership/leaders pages
3. Create unified design system across all pages
4. Consider minification for production

## Design System

For comprehensive design system documentation, see:
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Full design tokens, component specs, and unification plan

### Quick Reference

#### Colors
```css
--primary: #00ff88;      /* Electric Green */
--secondary: #0088ff;    /* Electric Blue */
--dark: #0a0e27;        /* Deep Navy */
--light: #ffffff;       /* White */
```

#### Spacing
```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 2rem;     /* 32px */
--spacing-lg: 4rem;     /* 64px */
--spacing-xl: 6rem;     /* 96px */
```

#### Transitions
```css
--transition-fast: 0.3s ease;
--transition-medium: 0.4s ease;
--transition-slow: 0.8s ease;
```

## Browser Support

- Chrome/Edge: Latest + 2 versions
- Firefox: Latest + 2 versions
- Safari: Latest + 2 versions
- Mobile: iOS 12+, Android 8+

### CSS Features Used
- CSS Custom Properties (CSS Variables)
- CSS Grid & Flexbox
- Backdrop Filter (with fallbacks)
- CSS Animations & Keyframes
- Media Queries
- Pseudo-elements

## Contributing

When adding new styles:
1. Add design tokens to `variables.css` first
2. Use existing variables instead of hardcoding values
3. Place animations in `animations.css`
4. Add components to `components.css` with clear comments
5. Maintain mobile-first responsive approach
6. Test across all major browsers

## Notes

- All measurements use `rem` for accessibility
- Colors use CSS custom properties for easy theming
- Animations use `transform` and `opacity` for performance
- Glassmorphic effects require backdrop-filter support
- Fallbacks provided where needed
