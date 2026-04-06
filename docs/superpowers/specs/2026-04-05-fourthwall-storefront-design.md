# NorCal EVs Storefront – Design Spec

## Overview

Add a `/store` page to norcalevs.org that displays NorCal EVs merchandise from a dedicated Fourthwall shop, with a full cart experience and checkout redirect. All data is fetched client-side from the Fourthwall Storefront API — no server-side code or build tool changes.

## Fourthwall Configuration

- **Shop domain:** `norcalevs-shop.fourthwall.com`
- **Storefront token:** `ptkn_d9dfa9b2-94b6-4832-aa87-fba88c7065df`
- **Collection:** `all` (standalone store, no filtering needed)
- **Checkout URL:** `https://norcalevs-shop.fourthwall.com/checkout/?cartCurrency=USD&cartId={id}`
- **API base:** `https://storefront-api.fourthwall.com/v1/`

## Current Products

| Product | Slug | Price | Variants |
|---------|------|-------|----------|
| NorCal EVs Logo Sticker | norcal-evs-logo-sticker | $5 | 1 (no options) |
| NorCal EVs FlexFit Hat | norcal-evs-flexfit-hat | $32 | 2 colors × 2 sizes |
| NorCal EVs Club T-Shirt | norcal-evs-club-t-shirt | $28–$36 | 8 colors × sizes XS–5XL |

Products are fetched dynamically — new products added in Fourthwall appear automatically.

## Architecture

### Files to Create

- `store.md` — Store page using `page` layout with `page_class: "store-page"`
- `assets/js/store.js` — All store logic (product grid, modal, cart, API calls)

### Files to Modify

- `_config.yml` — Add `fourthwall_token` and `fourthwall_checkout_domain` site variables
- `_data/navigation.yml` — Add "Store" nav link
- `_includes/header.html` — Add cart icon with badge to nav (visible on all pages)
- `_includes/head.html` — Conditionally load `store.js` on the store page
- `_includes/scripts.html` — Add lightweight global cart-icon script (badge count + drawer open)
- `assets/css/components.css` — Add store page, modal, cart drawer, and loading state styles

### Data Flow

1. **Page load** → `GET /v1/collections/all/products?storefront_token=TOKEN&size=50` → render product grid
2. **Click product card** → Open modal with product data from already-fetched response (no extra API call)
3. **Select variant** → Color swatches filter available sizes, swap product images (from variant `images` array), update displayed price
4. **Add to Cart** → `POST /v1/carts` (if no cart exists) or `POST /v1/carts/{cartId}/items` → store `cartId` in `localStorage` → update nav badge count
5. **Open cart drawer** → `GET /v1/carts/{cartId}` → render items, quantities, totals
6. **Change quantity** → `PUT /v1/carts/{cartId}/items` → re-fetch and re-render cart
7. **Remove item** → `DELETE /v1/carts/{cartId}/items/{itemId}` → re-fetch and re-render cart
8. **Checkout** → redirect to `https://norcalevs-shop.fourthwall.com/checkout/?cartCurrency=USD&cartId={cartId}`

### State Management

- `localStorage.cartId` — persists cart across page refreshes and navigation
- In-memory product cache — fetched once on store page load, used for modal rendering
- In-memory cart item count — synced to nav badge on all pages

### Token Handling

Storefront token stored in `_config.yml` as a site variable and output into a `data-token` attribute on the store container. It's a public, read-only token — safe for client-side use.

## UI Components

### Product Grid (`/store` page)

- Page hero: eyebrow "Community Gear", title "Store", description
- Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
- Cards match existing `.wwd-card` pattern: product image, name, price, hover lift + teal top bar animation
- Images use `object-fit: contain` with warm gray background to show full product without cropping
- Multi-color products show swatch dots below price
- Products with `state.type === "SOLD_OUT"` get a "Sold Out" badge overlay

### Product Modal

- Centered overlay with max-width ~640px
- Main image area with `object-fit: contain` + warm gray background
- Thumbnail row for products with multiple images (clickable to swap main image)
- Product name, price (updates dynamically based on selected variant)
- Color picker: circular swatches from variant `attributes.color.swatch` — clicking swaps main image to that color's variant images
- Size picker: pill buttons from variant `attributes.size.name` — filtered by selected color; grayed out if `stock.inStock === 0`
- Quantity stepper (−/+, min 1, max 10)
- "Add to Cart" button (primary green) — shows loading spinner, then "Added!" confirmation
- Close: X button, backdrop click, Escape key
- For simple products (sticker): no color/size pickers, just quantity + Add to Cart

### Cart Drawer

- Slides in from the right, semi-transparent backdrop
- Header: "Your Cart" + close button
- Item list: product thumbnail, name, variant info (color · size), quantity stepper, unit price, remove button
- Footer: subtotal + "Checkout" button (primary green) + note "You'll complete your purchase on our secure checkout page"
- Empty state: "Your cart is empty" message with link to store
- Close: X button, backdrop click, Escape key

### Nav Cart Icon

- Cart/bag icon in header nav, near the "Join Us" button
- Teal badge with item count (hidden when cart is empty)
- Clicking opens cart drawer from any page
- Lightweight global script handles badge count + drawer toggle; full cart logic loads only on `/store`

## Error Handling

- **Product fetch failure:** Friendly message "Unable to load products right now" + retry button + fallback link to `norcalevs-shop.fourthwall.com`
- **Cart API errors:** Brief toast notification, don't break UI
- **Stale cart:** If `GET /v1/carts/{id}` returns 404, clear `localStorage.cartId` and create a new cart on next add
- **Network timeout:** 10-second timeout on all API calls

## Loading States

- Product grid: skeleton placeholder cards with shimmer animation while API loads
- "Add to Cart" button: loading spinner while API responds, then brief "Added!" text with checkmark

## Accessibility

- Modal and drawer trap focus while open
- Escape key closes both
- All interactive elements keyboard navigable
- `role="dialog"`, `aria-label`, `aria-expanded`, `aria-controls` on modal/drawer
- Color swatches have `title` attributes with color names
- `prefers-reduced-motion` respected (consistent with existing `animations.css`)

## Design Tokens

All new styles use existing CSS custom properties from `variables.css`:
- Primary green `#2B542F` for buttons and prices
- Teal `#3A9AAF` for accents, hover states, cart badge, selected swatches
- Surface `#FBFBF8` for card/modal/drawer backgrounds
- Border `rgba(43,84,47,0.14)` for card borders
- Typography: Raleway headings, Source Sans 3 body

## Mockup Reference

Interactive mockup at `.superpowers/brainstorm/35907-1775436598/content/store-mockup-v2.html` — shows product grid, modal with variant selection, and cart drawer with sample items.
