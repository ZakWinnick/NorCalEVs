# NorCal EVs Full Site Redesign

Date: 2026-07-11
Status: Design direction approved, awaiting written specification review

## Summary

Redesign the full NorCal EVs website around the approved Community Poster direction. The new system should feel bold, youthful, event-oriented, and distinctly NorCal EVs while remaining refined and easy to scan.

This is a visual and editorial redesign of the existing site. It does not add sections, routes, features, or integrations. Existing page structures remain recognizable. The redesign reduces text density through stronger hierarchy, tighter copy, deliberate typography, photography, and more varied spacing.

## Approved Direction

The approved visual direction is Community Poster, refined.

Key characteristics:

- Bold uppercase display typography
- Centered NorCal EVs logo as the homepage hero anchor
- Northern California and EV photography used as structural content
- Firm grid lines and flat color fields
- Electric teal used for emphasis and primary actions
- Warm cream and deep green surfaces retained from the current palette
- Short, direct copy with strong visual hierarchy
- No scrolling banner
- No decorative gradients, glass effects, or rounded card grids
- Refined composition rather than deliberately chaotic poster styling

The homepage establishes the expressive brand system. Interior pages use the same typography, colors, grids, and image treatment with more restraint so information stays clear.

## Goals

- Make the site immediately recognizable as NorCal EVs.
- Reduce the impression of excessive copy without removing important information.
- Make each page easier to scan on desktop and mobile.
- Preserve the existing information architecture and section order.
- Preserve the current light and dark theme behavior.
- Preserve all required third-party integrations.
- Improve consistency across homepage and interior pages.
- Keep the design warm, inclusive, and community-led rather than corporate.

## Non-Goals

- No new pages.
- No new homepage or interior-page sections.
- No new interactive features.
- No new event system.
- No new newsletter provider or custom newsletter form.
- No new sponsor management system.
- No manual theme switcher.
- No change to the deployment platform or Astro architecture.
- No publication or deployment without a separate explicit instruction.

## Preserved Technical Structure

The existing Astro 6 static-site architecture remains in place:

- `src/pages/*.astro` continues to define routes.
- `src/layouts/BaseLayout.astro` remains the shared document wrapper.
- `src/components/Nav.astro` and `src/components/Footer.astro` remain shared site components.
- `src/data/navigation.ts`, `src/data/sponsors.ts`, and `src/data/social.ts` remain the data sources for repeated content.
- `src/styles/global.css` remains the shared style entry point unless implementation shows that focused component files would materially improve maintainability.
- Existing semantic theme tokens remain the basis for light and dark modes.

## Required Integrations

### Heylo Events

The existing Heylo event embed remains the only live event source on the homepage.

Preserve:

- The external Heylo script.
- The current API key and community identifier wiring.
- The loading state.
- The MutationObserver fallback behavior.
- The fallback link to the community calendar.
- Direct event links where allowed by the existing site rules.

The redesign may change the visual frame around the embed but not replace, remove, or interfere with the embed.

### MailerLite Newsletter

Preserve:

- The current MailerLite universal script in the shared layout.
- The existing embedded form identifier.
- The homepage newsletter section.
- MailerLite form submission behavior, validation, consent, and anti-bot controls.

The redesign may style the surrounding section and compatible form surfaces, but it must not replace the MailerLite form with a custom form.

### Sponsors

Preserve:

- The homepage sponsors section.
- Sponsor data from `src/data/sponsors.ts`.
- Sponsor links and logo variants.
- Light and dark logo behavior.
- Touch-friendly behavior where hover is unavailable.

## Global Design System

### Color and Theme

Keep the existing NorCal EVs color family and automatic system-reactive light and dark modes.

Core roles:

- Deep green-black for dark page surfaces and major bands.
- Warm cream for light page surfaces.
- Electric teal for primary actions, key phrases, section labels, and selected states.
- Brand green for secondary emphasis in light mode.
- Tinted neutrals for secondary copy and rules.

All production styling uses semantic CSS variables. Raw colors are limited to documented theme definitions or third-party integration fixes.

Dark mode and light mode must feel like intentional versions of the same design, not a simple color inversion.

### Typography

The redesign uses a two-level typographic voice:

- Large, tightly spaced uppercase display type for page statements and major section headings.
- Compact mono labels for section names, numbering, metadata, and small utility text.
- Clear sentence-case body text at readable sizes and line lengths.

Body copy should stay within roughly 65 to 75 characters per line. Type scale and spacing must create the hierarchy, not repeated boxes or decorative effects.

### Layout

- Use full-width bands where they create meaningful pacing.
- Use grid rules to organize related information.
- Avoid wrapping every section in cards.
- Use generous empty space around major statements.
- Use photography as part of the layout, not as decorative thumbnails.
- Keep the overall page structure recognizable from the current site.
- Do not introduce scrolling marquees or auto-moving decorative content.

### Photography

Use the existing Northern California and EV image assets during implementation.

Treatment:

- Darken hero photography enough for reliable text contrast.
- Use restrained saturation or grayscale where it supports the poster language.
- Preserve meaningful crop areas at desktop and mobile breakpoints.
- Do not place the logo over visually busy areas without sufficient overlay contrast.
- Do not introduce outside photography unless separately approved.

### Navigation and Footer

Navigation keeps its existing destinations and join action. The desktop treatment is compact and disciplined. Mobile navigation keeps the existing behavior and must remain keyboard accessible.

The footer keeps the existing brand, navigation, social links, contact details, legal links, and copyright information. It uses the same deep surface and teal emphasis as the rest of the site.

## Homepage

Keep the existing section order:

1. Hero
2. About
3. What We're Building
4. Cross-brand image strip
5. Upcoming Events
6. Sponsors
7. Newsletter
8. Footer

### Hero

- Center the NorCal EVs logo prominently over the Northern California hero image.
- Use a symmetrical, composed layout.
- Pair the logo with one compact positioning label, one strong display statement, one short supporting line, and the two existing actions.
- Do not use a scrolling banner.
- Maintain strong contrast and responsive cropping.

The final hero wording may refine the approved mockup language during implementation, but it must preserve the current positioning and tagline intent.

### About

Retain the current About content and purpose. Present it as one large, compact statement rather than a dense paragraph block. Emphasize the cross-brand community idea.

### What We're Building

Retain all six existing pillars. Present them in a structured grid with shorter descriptions. Numbering remains a useful organizing device. The visual system should make the titles scannable before the supporting copy is read.

### Cross-Brand Image Strip

Retain the existing four brand images and cross-brand message. Use a full-width image row with concise labels. Any hover treatment must have an equivalent touch behavior.

### Upcoming Events

Retain the explanatory copy, live Heylo embed, view-all link, loading state, and fallback. Give the integration a clear frame without making it look like an unrelated widget.

### Sponsors

Retain the current heading, sponsor entries, and sponsorship link. Use logo treatment and spacing that respect individual sponsor artwork. Avoid oversized empty cards.

### Newsletter

Retain the existing MailerLite form and purpose. Use the teal band as a strong closing action. Keep supporting copy minimal so the form remains the focus.

## Interior Page System

The approved Membership design establishes the interior-page system:

- Compact shared navigation
- Strong page hero with a large typographic statement
- An image or brand-mark panel where appropriate
- Clear section labels and large headings
- Grid-based lists and comparisons
- Full-width closing bands where they already exist
- Shortened copy without removing required meaning

Interior pages share the same design language but should not be mechanically identical. Page-specific content determines whether imagery, tier grids, resource grids, or text layouts take priority.

## Page Treatment

### Membership

Keep the existing order:

1. Membership introduction and actions
2. Five-step path
3. Launch Edition promotion
4. Three membership tiers
5. Membership context statement
6. Member benefits
7. All Brands Welcome closing section

Use the approved membership mockup as the primary interior-page reference. Pricing and availability must be verified before publication.

### Sponsorships

Keep the existing order:

1. Sponsorship introduction
2. Audience overview
3. Annual sponsorship tiers
4. Event sponsorship options
5. Growth or launch-pricing note
6. Contact section

Use a compact comparison system for tiers. Preserve all current benefits and the existing email action. Verify tiers, prices, benefits, sponsor claims, and contact details before publication.

### Resources

Keep the existing introduction, resource list, and closing contribution section. Make resource status and destination immediately scannable. Preserve coming-soon states and external link behavior.

### Leaders

Keep the existing introduction, board section, community leadership roles, expectations, and closing invitation. Use strong role labels and shorter descriptions. Verify all names, roles, and public contact links before publication.

### Privacy and Terms

Keep all current legal sections and wording unless separately approved. Use restrained document styling with readable line length, clear heading hierarchy, and minimal decorative treatment.

### Changelog

Keep all current entries and structure. Present entries as a readable timeline or ruled list without adding filtering, search, or other functionality.

### Join Redirect

Keep the existing redirect destination and fallback link. Visual changes should be minimal and consistent with the shared theme. Do not expose a new direct Heylo URL in general public copy.

### 404

Keep the existing purpose and actions. Apply the shared page hero and button styling without adding content or features.

## Content Reduction Rules

The redesign may edit website copy for brevity while preserving meaning.

Rules:

- Remove repeated explanations when the same point is already communicated by a heading or nearby section.
- Prefer one strong sentence over a heading followed by a restatement.
- Keep tier benefits, legal content, integration instructions, and material qualifiers intact.
- Preserve the official positioning, tagline intent, and inclusive cross-brand message.
- Use warm, clear, community-led language.
- Use no em dashes and no hashtags.
- Do not use prohibited brand language from `BRAND_GUIDELINES.md` and `CLAUDE.md`.
- Do not make new legal, membership, leadership, event, or partner claims.

## Responsive Behavior

The redesign must work across desktop, tablet, and mobile.

- Desktop layouts may use split heroes, multi-column grids, and full-width image rows.
- Tablet layouts should reduce columns before text becomes cramped.
- Mobile layouts stack content in reading order and keep actions easy to reach.
- Hero logo size and image crop must adapt without obscuring the subject.
- Tier comparisons become stacked cards or ruled sections on smaller screens.
- Sponsor logos remain legible without relying on hover.
- Navigation, MailerLite, and Heylo content must not overflow the viewport.

## Accessibility

- Maintain semantic headings and landmarks.
- Preserve the existing skip link.
- Maintain visible keyboard focus states.
- Ensure navigation menus are keyboard operable.
- Maintain sufficient text and control contrast in both themes.
- Keep buttons and links distinguishable without color alone.
- Provide useful alternative text for meaningful images.
- Respect reduced-motion preferences.
- Do not add auto-moving content.

## Error and Fallback Behavior

- Preserve the Heylo loading and fallback states.
- Preserve MailerLite validation and submission feedback.
- Preserve the Join redirect fallback link.
- Preserve the 404 route.
- Ensure missing sponsor dark variants still render acceptably.
- Ensure pages remain usable if remote fonts or third-party scripts load slowly.

## Verification

Before implementation is considered complete:

1. Run `npm run check`.
2. Run `npm run build`.
3. Inspect every route at desktop and mobile widths.
4. Inspect homepage and representative interior pages in light and dark modes.
5. Verify the Heylo widget loads and the fallback still works.
6. Verify the MailerLite form loads and retains submission behavior.
7. Verify sponsor logos and links in both themes and on touch-sized layouts.
8. Verify navigation, dropdown, mobile menu, and join actions.
9. Check keyboard navigation and visible focus states.
10. Check for horizontal overflow.
11. Check production copy for prohibited language, em dashes, and accidental new claims.
12. Confirm that no page, section, or feature was added.

## Acceptance Criteria

- The entire existing site uses the approved Community Poster visual system.
- The homepage logo is centered in the hero.
- There is no scrolling banner.
- The current color family and automatic light and dark modes are preserved.
- Every current route remains available.
- Every current page keeps its basic section structure.
- No new section or feature is introduced.
- Homepage text density is visibly reduced.
- Interior pages are easier to scan without losing material information.
- The Heylo calendar code and fallback remain functional.
- The MailerLite newsletter form remains functional.
- The homepage sponsors block remains functional.
- Desktop and mobile layouts are visually coherent and accessible.
- The production build succeeds.
- Deployment occurs only after explicit approval.
