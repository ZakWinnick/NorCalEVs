# Fourthwall Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/store` page to norcalevs.org that displays merchandise from Fourthwall, with product modals, a full cart, and checkout redirect.

**Architecture:** Client-side vanilla JS fetches products from Fourthwall's Storefront API, renders a product grid with lightbox modals, manages a cart via API with localStorage persistence, and redirects to Fourthwall's hosted checkout. A separate `store.js` file holds all store logic. Cart icon in the global nav works on every page.

**Tech Stack:** Jekyll 3.9, vanilla JS (fetch API, localStorage), CSS custom properties, Fourthwall Storefront API v1

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `_config.yml` | Add `fourthwall` config block |
| Modify | `_data/navigation.yml` | Add Store nav link |
| Modify | `_includes/header.html` | Add cart icon with badge to nav |
| Modify | `_includes/head.html` | Conditionally load `store.js` on store page |
| Modify | `_includes/scripts.html` | Add global cart badge + drawer toggle logic |
| Create | `store.md` | Store page content |
| Create | `assets/js/store.js` | Product grid, modal, cart drawer, all API calls |
| Modify | `assets/css/components.css` | Store grid, modal, drawer, loading, and responsive styles |

---

### Task 1: Config and Navigation

**Files:**
- Modify: `_config.yml:77` (append after `version` line)
- Modify: `_data/navigation.yml:7` (insert before Social)

- [ ] **Step 1: Add Fourthwall config to `_config.yml`**

Append after line 77 (`version: 2025.35`):

```yaml

# Fourthwall Storefront
fourthwall:
  token: "ptkn_d9dfa9b2-94b6-4832-aa87-fba88c7065df"
  checkout_domain: "norcalevs-shop.fourthwall.com"
  collection: "all"
```

- [ ] **Step 2: Add Store to navigation**

Insert between the Leaders entry and Social entry in `_data/navigation.yml` (after line 7, before line 9):

```yaml
- title: Store
  url: /store
```

The full file should read:
```yaml
- title: Home
  url: /

- title: Membership
  url: /membership

- title: Leaders
  url: /leaders

- title: Store
  url: /store

- title: Social
  submenu:
    - title: Heylo
      url: https://heylo.group/norcalevs
      external: true
    - title: Facebook
      url: https://www.facebook.com/groups/norcalevs/
      external: true
    - title: Instagram
      url: https://instagram.com/norcalevs
      external: true
    - title: X
      url: https://x.com/norcalevs
      external: true
```

- [ ] **Step 3: Commit**

```bash
git add _config.yml _data/navigation.yml
git commit -m "feat(store): add Fourthwall config and Store nav link"
```

---

### Task 2: Store Page and Cart Icon in Header

**Files:**
- Create: `store.md`
- Modify: `_includes/header.html:24` (insert cart icon before Join Us)
- Modify: `_includes/head.html:21` (add conditional store.js load)

- [ ] **Step 1: Create `store.md`**

```markdown
---
layout: page
title: "Store"
description: "Rep NorCal EVs with official community merchandise"
page_class: "store-page"
---

<section class="store-section" id="store-root"
  data-token="{{ site.fourthwall.token }}"
  data-checkout-domain="{{ site.fourthwall.checkout_domain }}"
  data-collection="{{ site.fourthwall.collection }}">

  <div class="store-grid" id="store-grid">
    <!-- Skeleton loading placeholders -->
    <div class="product-card skeleton"><div class="skeleton-image"></div><div class="skeleton-body"><div class="skeleton-line wide"></div><div class="skeleton-line short"></div></div></div>
    <div class="product-card skeleton"><div class="skeleton-image"></div><div class="skeleton-body"><div class="skeleton-line wide"></div><div class="skeleton-line short"></div></div></div>
    <div class="product-card skeleton"><div class="skeleton-image"></div><div class="skeleton-body"><div class="skeleton-line wide"></div><div class="skeleton-line short"></div></div></div>
  </div>

  <div class="store-error" id="store-error" hidden>
    <p>Unable to load products right now.</p>
    <button class="btn btn-ghost" id="store-retry">Try Again</button>
    <p class="store-error-fallback">Or visit our store directly at <a href="https://norcalevs-shop.fourthwall.com" target="_blank" rel="noopener noreferrer">norcalevs-shop.fourthwall.com</a></p>
  </div>
</section>

<!-- Product Modal -->
<div class="modal-backdrop" id="product-modal" role="dialog" aria-label="Product details" aria-modal="true" hidden>
  <div class="modal">
    <button class="modal-close" aria-label="Close product details">&times;</button>
    <img class="modal-image" id="modal-image" src="" alt="">
    <div class="modal-thumbnails" id="modal-thumbnails"></div>
    <div class="modal-body">
      <h2 id="modal-title"></h2>
      <div class="modal-price" id="modal-price"></div>
      <p class="modal-desc" id="modal-desc"></p>
      <div id="modal-colors" hidden>
        <div class="option-label">Color</div>
        <div class="color-options" id="modal-color-options"></div>
      </div>
      <div id="modal-sizes" hidden>
        <div class="option-label">Size</div>
        <div class="size-options" id="modal-size-options"></div>
      </div>
      <div class="modal-actions">
        <div class="qty-stepper">
          <button class="qty-btn qty-minus" aria-label="Decrease quantity">&minus;</button>
          <span class="qty-val" id="modal-qty">1</span>
          <button class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn-add-cart" id="modal-add-btn">Add to Cart</button>
      </div>
    </div>
  </div>
</div>

<!-- Cart Drawer -->
<div class="drawer-backdrop" id="drawer-backdrop" hidden></div>
<aside class="cart-drawer" id="cart-drawer" role="dialog" aria-label="Shopping cart" aria-modal="true">
  <div class="drawer-header">
    <h3>Your Cart</h3>
    <button class="drawer-close" aria-label="Close cart">&times;</button>
  </div>
  <div class="drawer-items" id="drawer-items">
    <div class="drawer-empty" id="drawer-empty">
      <p>Your cart is empty</p>
      <a href="/store" class="btn btn-ghost">Browse the Store</a>
    </div>
  </div>
  <div class="drawer-footer" id="drawer-footer" hidden>
    <div class="subtotal-row">
      <span>Subtotal</span>
      <span class="subtotal-value" id="drawer-subtotal">$0.00</span>
    </div>
    <button class="btn-checkout" id="drawer-checkout">Checkout</button>
    <div class="checkout-note">You'll complete your purchase on our secure checkout page</div>
  </div>
</aside>
```

- [ ] **Step 2: Add cart icon to header**

In `_includes/header.html`, insert a new `<li>` on line 24, right before the Join Us `<li>` on line 25. The nav-right list should end with:

```html
        <li class="nav-social-row">
            <a href="https://instagram.com/norcalevs" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/groups/norcalevs" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://x.com/norcalevs" target="_blank" rel="noopener noreferrer" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
        </li>
        <li><button class="nav-cart" id="cart-toggle" aria-label="Open cart" type="button"><i class="fa-solid fa-bag-shopping"></i><span class="cart-badge" id="cart-badge" hidden>0</span></button></li>
        <li><a href="https://heylo.group/norcalevs" class="nav-join" target="_blank" rel="noopener noreferrer">Join Us</a></li>
    </ul>
</nav>
```

- [ ] **Step 3: Conditionally load store.js**

In `_includes/head.html`, add after line 21 (after the components.css link):

```html
{% if page.page_class == "store-page" %}
<script src="{{ site.baseurl }}/assets/js/store.js" defer></script>
{% endif %}
```

- [ ] **Step 4: Commit**

```bash
git add store.md _includes/header.html _includes/head.html
git commit -m "feat(store): add store page, cart icon in nav, conditional JS load"
```

---

### Task 3: Global Cart Badge and Drawer Toggle Script

**Files:**
- Modify: `_includes/scripts.html:1` (add cart toggle logic at the top of the existing script)

- [ ] **Step 1: Add global cart logic to scripts.html**

Insert at the top of the `<script>` block (after line 1, before the year-setting code on line 3), add:

```javascript
    // Global cart icon + drawer toggle
    const cartToggle = document.getElementById('cart-toggle');
    const cartBadge = document.getElementById('cart-badge');
    const cartDrawer = document.getElementById('cart-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerClose = cartDrawer ? cartDrawer.querySelector('.drawer-close') : null;

    function openCartDrawer() {
        if (!cartDrawer || !drawerBackdrop) return;
        cartDrawer.classList.add('open');
        drawerBackdrop.hidden = false;
        document.body.classList.add('menu-open');
    }

    function closeCartDrawer() {
        if (!cartDrawer || !drawerBackdrop) return;
        cartDrawer.classList.remove('open');
        drawerBackdrop.hidden = true;
        document.body.classList.remove('menu-open');
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', openCartDrawer);
    }
    if (drawerClose) {
        drawerClose.addEventListener('click', closeCartDrawer);
    }
    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', closeCartDrawer);
    }

    // Update cart badge from localStorage
    function updateCartBadge() {
        if (!cartBadge) return;
        const count = parseInt(localStorage.getItem('ncev_cart_count') || '0', 10);
        if (count > 0) {
            cartBadge.textContent = count;
            cartBadge.hidden = false;
        } else {
            cartBadge.hidden = true;
        }
    }
    updateCartBadge();
```

Also update the existing Escape key handler (line 56-59) to also close the cart drawer:

```javascript
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (menu.classList.contains('active')) closeMenu({ returnFocus: true });
                closeCartDrawer();
            }
        });
```

- [ ] **Step 2: Commit**

```bash
git add _includes/scripts.html
git commit -m "feat(store): add global cart badge and drawer toggle logic"
```

---

### Task 4: Store CSS Styles

**Files:**
- Modify: `assets/css/components.css` (add new sections before the mobile media query, and add store responsive rules inside it)

- [ ] **Step 1: Add store styles to components.css**

Insert before the `@media (max-width: 768px)` block. Add these sections:

```css
/* ─── STORE ─── */
.store-section {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 40px var(--section-pad);
}

.store-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

/* Product cards */
.product-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.product-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow);
}

.product-card:hover .card-teal-bar {
    transform: scaleX(1);
}

.card-teal-bar {
    height: 3px;
    background: var(--teal);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.product-card-image {
    width: 100%;
    height: 280px;
    object-fit: contain;
    display: block;
    background: #f0efea;
    padding: 12px;
}

.product-card-body {
    padding: 24px;
}

.product-card-body h3 {
    font-family: var(--heading);
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.3px;
    margin-bottom: 8px;
}

.product-card-price {
    font-weight: 600;
    color: var(--green);
    font-size: 16px;
    margin-bottom: 10px;
}

.product-card-swatches {
    display: flex;
    gap: 6px;
}

.product-swatch {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--border);
}

.sold-out-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: var(--text);
    color: var(--white);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Skeleton loading */
.product-card.skeleton { pointer-events: none; }

.skeleton-image {
    width: 100%;
    height: 280px;
    background: linear-gradient(90deg, #eee 25%, #e0e0e0 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-body { padding: 24px; }

.skeleton-line {
    height: 16px;
    border-radius: 4px;
    background: linear-gradient(90deg, #eee 25%, #e0e0e0 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 10px;
}

.skeleton-line.wide { width: 80%; }
.skeleton-line.short { width: 40%; }

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Store error */
.store-error { text-align: center; padding: 64px 24px; }
.store-error p { color: var(--text-muted); margin-bottom: 16px; }
.store-error-fallback { font-size: 14px; color: var(--text-faint); }
.store-error-fallback a { color: var(--teal); }

/* ─── PRODUCT MODAL ─── */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.modal {
    background: var(--surface);
    border-radius: 16px;
    max-width: 640px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: var(--white);
    border: 1px solid var(--border);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    color: var(--text-muted);
    transition: color 0.2s;
}

.modal-close:hover { color: var(--text); }

.modal-image {
    width: 100%;
    height: 420px;
    object-fit: contain;
    border-radius: 16px 16px 0 0;
    background: #f0efea;
    padding: 16px;
}

.modal-thumbnails {
    display: flex;
    gap: 8px;
    padding: 12px 28px 0;
    overflow-x: auto;
}

.modal-thumb {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: contain;
    background: #f0efea;
    border: 2px solid transparent;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.2s;
    flex-shrink: 0;
}

.modal-thumb.active { border-color: var(--teal); opacity: 1; }

.modal-body { padding: 24px 28px 28px; }

.modal-body h2 {
    font-family: var(--heading);
    font-weight: 700;
    font-size: 26px;
    margin-bottom: 4px;
}

.modal-price {
    font-size: 20px;
    font-weight: 600;
    color: var(--green);
    margin-bottom: 16px;
}

.modal-desc {
    color: var(--text-muted);
    font-size: 15px;
    margin-bottom: 20px;
    line-height: 1.5;
}

.option-label {
    font-family: var(--heading);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.color-options { display: flex; gap: 8px; margin-bottom: 20px; }

.color-opt {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid transparent;
    transition: border-color 0.2s;
}

.color-opt.selected { border-color: var(--teal); }

.size-options { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }

.size-opt {
    padding: 8px 16px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    background: var(--white);
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--body);
    transition: all 0.2s;
}

.size-opt.selected {
    border-color: var(--green);
    background: rgba(var(--green-rgb), 0.06);
    color: var(--green);
}

.size-opt.disabled { opacity: 0.35; cursor: not-allowed; }

.modal-actions { display: flex; gap: 12px; align-items: center; }

.qty-stepper {
    display: flex;
    align-items: center;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
}

.qty-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--white);
    cursor: pointer;
    font-size: 18px;
    color: var(--text-muted);
    font-family: var(--body);
}

.qty-val {
    width: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    height: 40px;
    line-height: 40px;
}

.btn-add-cart {
    flex: 1;
    background: var(--green);
    color: var(--white);
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-family: var(--body);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-add-cart:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(var(--green-rgb), 0.2);
}

.btn-add-cart.loading { opacity: 0.7; pointer-events: none; }
.btn-add-cart.added { background: var(--teal); }

/* ─── CART DRAWER ─── */
.drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 3000;
}

.cart-drawer {
    position: fixed;
    top: 0;
    right: -420px;
    width: 400px;
    height: 100vh;
    background: var(--surface);
    z-index: 3001;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
}

.cart-drawer.open { right: 0; }

.drawer-header {
    padding: 24px 24px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.drawer-header h3 {
    font-family: var(--heading);
    font-weight: 700;
    font-size: 20px;
}

.drawer-close {
    background: none;
    border: 1px solid var(--border);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
}

.drawer-items { flex: 1; overflow-y: auto; padding: 16px 24px; }

.drawer-empty { text-align: center; padding: 40px 0; color: var(--text-muted); }
.drawer-empty .btn { margin-top: 16px; }

.cart-item {
    display: flex;
    gap: 14px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
}

.cart-item-img {
    width: 72px;
    height: 72px;
    border-radius: 10px;
    object-fit: contain;
    background: #f0efea;
    flex-shrink: 0;
}

.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name { font-weight: 600; font-size: 15px; margin-bottom: 2px; }
.cart-item-variant { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
.cart-item-bottom { display: flex; align-items: center; justify-content: space-between; }
.cart-item-price { font-weight: 600; color: var(--green); }
.cart-item-controls { display: flex; align-items: center; gap: 8px; }

.cart-item-qty {
    display: flex;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
}

.cart-qty-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: var(--white);
    cursor: pointer;
    font-size: 14px;
    color: var(--text-muted);
    font-family: var(--body);
}

.cart-qty-val {
    width: 28px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    height: 28px;
    line-height: 28px;
}

.cart-item-remove {
    background: none;
    border: none;
    color: var(--text-faint);
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    font-family: var(--body);
}

.cart-item-remove:hover { color: var(--text-muted); }

.drawer-footer {
    padding: 20px 24px 24px;
    border-top: 1px solid var(--border);
}

.subtotal-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    font-size: 16px;
    color: var(--text-muted);
}

.subtotal-value { font-weight: 700; font-size: 18px; color: var(--text); }

.btn-checkout {
    width: 100%;
    background: var(--green);
    color: var(--white);
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-family: var(--body);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-checkout:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(var(--green-rgb), 0.2);
}

.checkout-note { text-align: center; color: var(--text-faint); font-size: 12px; margin-top: 10px; }

/* ─── NAV CART ICON ─── */
.nav-cart {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 16px;
    padding: 4px;
    transition: color 0.2s;
}

.nav-cart:hover { color: var(--teal); }

.cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: var(--teal);
    color: var(--white);
    font-size: 11px;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--body);
}
```

- [ ] **Step 2: Add tablet breakpoint for store grid**

Add a new media query before the existing mobile `@media (max-width: 768px)` block:

```css
@media (max-width: 1024px) {
    .store-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Add store responsive styles inside the existing mobile media query**

Inside the existing `@media (max-width: 768px)` block, before its closing `}`, append:

```css
    .store-section { padding: 0 24px 64px; }
    .store-grid { grid-template-columns: 1fr; }
    .modal { max-width: 100%; border-radius: 12px; }
    .modal-image { height: 300px; }
    .cart-drawer { width: 100%; right: -100%; }
    .modal-actions { flex-direction: column; }
    .btn-add-cart { width: 100%; }
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/components.css
git commit -m "feat(store): add store, modal, drawer, and cart icon CSS"
```

---

### Task 5: Store JavaScript — Complete Implementation

**Files:**
- Create: `assets/js/store.js`

- [ ] **Step 1: Create `assets/js/store.js`**

Note on DOM construction: All dynamic content is built using `document.createElement` and `textContent` for text values. Product data comes from the Fourthwall Storefront API (a trusted first-party source), so constructing image `src` attributes and CSS `background` styles from API data (image URLs and hex color codes) is safe. No user-generated content is rendered.

```javascript
/**
 * NorCal EVs Store
 * Fourthwall Storefront API integration
 */
(function () {
    'use strict';

    var API_BASE = 'https://storefront-api.fourthwall.com/v1';
    var root = document.getElementById('store-root');
    if (!root) return;

    var TOKEN = root.dataset.token;
    var CHECKOUT_DOMAIN = root.dataset.checkoutDomain;
    var COLLECTION = root.dataset.collection;
    var TIMEOUT = 10000;

    var products = [];
    var cartId = localStorage.getItem('ncev_cart_id');

    // ── API helpers ──

    function apiFetch(path, options) {
        options = options || {};
        var sep = path.indexOf('?') !== -1 ? '&' : '?';
        var url = API_BASE + path + sep + 'storefront_token=' + TOKEN;
        var controller = new AbortController();
        var timer = setTimeout(function () { controller.abort(); }, TIMEOUT);
        return fetch(url, Object.assign({}, options, { signal: controller.signal }))
            .then(function (res) {
                clearTimeout(timer);
                if (!res.ok) throw new Error('API ' + res.status);
                return res.json();
            })
            .catch(function (err) {
                clearTimeout(timer);
                throw err;
            });
    }

    function fetchProducts() {
        return apiFetch('/collections/' + COLLECTION + '/products?size=50')
            .then(function (data) { return data.results || []; });
    }

    function createCart(variantId, quantity) {
        return apiFetch('/carts?currency=USD', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: [{ variantId: variantId, quantity: quantity }] }),
        }).then(function (data) {
            cartId = data.id;
            localStorage.setItem('ncev_cart_id', cartId);
            return data;
        });
    }

    function addToCart(variantId, quantity) {
        if (!cartId) return createCart(variantId, quantity);
        return apiFetch('/carts/' + cartId + '/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variantId: variantId, quantity: quantity }),
        }).catch(function (e) {
            if (e.message.indexOf('404') !== -1) return createCart(variantId, quantity);
            throw e;
        });
    }

    function getCart() {
        if (!cartId) return Promise.resolve(null);
        return apiFetch('/carts/' + cartId).catch(function (e) {
            if (e.message.indexOf('404') !== -1) {
                cartId = null;
                localStorage.removeItem('ncev_cart_id');
                return null;
            }
            throw e;
        });
    }

    function changeQuantity(variantId, quantity) {
        return apiFetch('/carts/' + cartId + '/items', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variantId: variantId, quantity: quantity }),
        });
    }

    function removeFromCart(variantId) {
        return apiFetch('/carts/' + cartId + '/items', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variantId: variantId }),
        });
    }

    // ── Utility ──

    function formatPrice(n) { return '$' + n.toFixed(2); }

    function getUniqueColors(product) {
        var seen = {};
        var result = [];
        product.variants.forEach(function (v) {
            if (v.attributes.color && !seen[v.attributes.color.name]) {
                seen[v.attributes.color.name] = true;
                result.push({
                    name: v.attributes.color.name,
                    swatch: v.attributes.color.swatch,
                    images: v.images || [],
                });
            }
        });
        return result;
    }

    function getPriceDisplay(product) {
        var prices = product.variants.map(function (v) { return v.unitPrice.value; });
        var min = Math.min.apply(null, prices);
        var max = Math.max.apply(null, prices);
        return min === max ? formatPrice(min) : 'From ' + formatPrice(min);
    }

    function getSizesForColor(product, colorName) {
        return product.variants
            .filter(function (v) { return !v.attributes.color || v.attributes.color.name === colorName; })
            .filter(function (v) { return v.attributes.size; })
            .map(function (v) {
                return {
                    name: v.attributes.size.name,
                    price: v.unitPrice.value,
                    inStock: v.stock.type === 'UNLIMITED' || (v.stock.inStock > 0),
                    variantId: v.id,
                };
            });
    }

    function getSelectedVariant() {
        if (!currentProduct) return null;
        return currentProduct.variants.find(function (v) {
            var colorMatch = !v.attributes.color || v.attributes.color.name === selectedColor;
            var sizeMatch = !v.attributes.size || v.attributes.size.name === selectedSize;
            return colorMatch && sizeMatch;
        }) || null;
    }

    // ── Grid rendering ──

    var gridEl = document.getElementById('store-grid');
    var errorEl = document.getElementById('store-error');
    var retryBtn = document.getElementById('store-retry');

    function renderGrid() {
        gridEl.textContent = '';
        products.forEach(function (product) {
            var card = document.createElement('div');
            card.className = 'product-card reveal';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'View ' + product.name);

            var isSoldOut = product.state.type === 'SOLD_OUT';

            // Teal bar
            var bar = document.createElement('div');
            bar.className = 'card-teal-bar';
            card.appendChild(bar);

            // Sold out badge
            if (isSoldOut) {
                var badge = document.createElement('div');
                badge.className = 'sold-out-badge';
                badge.textContent = 'Sold Out';
                card.appendChild(badge);
            }

            // Image
            var img = document.createElement('img');
            img.className = 'product-card-image';
            img.src = product.images[0] ? product.images[0].url : '';
            img.alt = product.name;
            img.loading = 'lazy';
            card.appendChild(img);

            // Body
            var body = document.createElement('div');
            body.className = 'product-card-body';

            var h3 = document.createElement('h3');
            h3.textContent = product.name;
            body.appendChild(h3);

            var price = document.createElement('div');
            price.className = 'product-card-price';
            price.textContent = getPriceDisplay(product);
            body.appendChild(price);

            // Swatches
            var colors = getUniqueColors(product);
            if (colors.length > 1) {
                var swatches = document.createElement('div');
                swatches.className = 'product-card-swatches';
                colors.forEach(function (c) {
                    var sw = document.createElement('div');
                    sw.className = 'product-swatch';
                    sw.style.background = c.swatch;
                    sw.title = c.name;
                    swatches.appendChild(sw);
                });
                body.appendChild(swatches);
            }

            card.appendChild(body);

            card.addEventListener('click', function () { openProductModal(product); });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProductModal(product);
                }
            });

            gridEl.appendChild(card);
        });

        // Trigger scroll reveal on new cards
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.15 });
        gridEl.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
    }

    function showError() {
        gridEl.hidden = true;
        errorEl.hidden = false;
    }

    function loadProducts() {
        fetchProducts().then(function (data) {
            products = data;
            if (products.length === 0) { showError(); return; }
            errorEl.hidden = true;
            gridEl.hidden = false;
            renderGrid();
        }).catch(function () { showError(); });
    }

    if (retryBtn) {
        retryBtn.addEventListener('click', function () {
            errorEl.hidden = true;
            gridEl.hidden = false;
            // Re-show skeletons
            gridEl.textContent = '';
            for (var i = 0; i < 3; i++) {
                var skel = document.createElement('div');
                skel.className = 'product-card skeleton';
                var skelImg = document.createElement('div');
                skelImg.className = 'skeleton-image';
                skel.appendChild(skelImg);
                var skelBody = document.createElement('div');
                skelBody.className = 'skeleton-body';
                var line1 = document.createElement('div');
                line1.className = 'skeleton-line wide';
                skelBody.appendChild(line1);
                var line2 = document.createElement('div');
                line2.className = 'skeleton-line short';
                skelBody.appendChild(line2);
                skel.appendChild(skelBody);
                gridEl.appendChild(skel);
            }
            loadProducts();
        });
    }

    // ── Product Modal ──

    var modalBackdrop = document.getElementById('product-modal');
    var modalImage = document.getElementById('modal-image');
    var modalThumbs = document.getElementById('modal-thumbnails');
    var modalTitle = document.getElementById('modal-title');
    var modalPrice = document.getElementById('modal-price');
    var modalDesc = document.getElementById('modal-desc');
    var modalColorWrap = document.getElementById('modal-colors');
    var modalColorOpts = document.getElementById('modal-color-options');
    var modalSizeWrap = document.getElementById('modal-sizes');
    var modalSizeOpts = document.getElementById('modal-size-options');
    var modalQty = document.getElementById('modal-qty');
    var modalAddBtn = document.getElementById('modal-add-btn');
    var modalCloseBtn = modalBackdrop.querySelector('.modal-close');
    var qtyMinus = modalBackdrop.querySelector('.qty-minus');
    var qtyPlus = modalBackdrop.querySelector('.qty-plus');

    var currentProduct = null;
    var selectedColor = null;
    var selectedSize = null;
    var quantity = 1;

    function updateModalPrice() {
        var variant = getSelectedVariant();
        if (variant) modalPrice.textContent = formatPrice(variant.unitPrice.value);
    }

    function renderThumbnails(images) {
        modalThumbs.textContent = '';
        if (!images || images.length <= 1) { modalThumbs.hidden = true; return; }
        modalThumbs.hidden = false;
        images.slice(0, 6).forEach(function (imgData, i) {
            var thumb = document.createElement('img');
            thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
            thumb.src = imgData.url;
            thumb.alt = 'View ' + (i + 1);
            thumb.addEventListener('click', function () {
                modalImage.src = imgData.url;
                modalThumbs.querySelectorAll('.modal-thumb').forEach(function (t) {
                    t.classList.remove('active');
                });
                thumb.classList.add('active');
            });
            modalThumbs.appendChild(thumb);
        });
    }

    function selectColorOption(product, color, el) {
        modalColorOpts.querySelectorAll('.color-opt').forEach(function (c) {
            c.classList.remove('selected');
            c.setAttribute('aria-checked', 'false');
        });
        el.classList.add('selected');
        el.setAttribute('aria-checked', 'true');
        selectedColor = color.name;
        if (color.images.length > 0) {
            modalImage.src = color.images[0].url;
            renderThumbnails(color.images);
        }
        renderSizeOptions(product, color.name);
        updateModalPrice();
    }

    function renderColorOptions(product) {
        var colors = getUniqueColors(product);
        if (colors.length <= 1) {
            modalColorWrap.hidden = true;
            selectedColor = colors.length === 1 ? colors[0].name : null;
            return;
        }
        modalColorWrap.hidden = false;
        modalColorOpts.textContent = '';
        colors.forEach(function (color, i) {
            var el = document.createElement('div');
            el.className = 'color-opt' + (i === 0 ? ' selected' : '');
            el.style.background = color.swatch;
            el.title = color.name;
            el.setAttribute('role', 'radio');
            el.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
            el.setAttribute('aria-label', color.name);
            el.setAttribute('tabindex', '0');
            el.addEventListener('click', function () { selectColorOption(product, color, el); });
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectColorOption(product, color, el);
                }
            });
            modalColorOpts.appendChild(el);
        });
        selectedColor = colors[0].name;
        if (colors[0].images.length > 0) {
            modalImage.src = colors[0].images[0].url;
            renderThumbnails(colors[0].images);
        }
    }

    function renderSizeOptions(product, colorName) {
        var sizes = getSizesForColor(product, colorName);
        if (sizes.length === 0) { modalSizeWrap.hidden = true; selectedSize = null; return; }
        modalSizeWrap.hidden = false;
        modalSizeOpts.textContent = '';
        var foundSelected = false;
        sizes.forEach(function (size) {
            var isActive = size.inStock && (size.name === selectedSize || (!foundSelected && !selectedSize));
            var el = document.createElement('div');
            el.className = 'size-opt' + (isActive ? ' selected' : '') + (!size.inStock ? ' disabled' : '');
            el.textContent = size.name;
            el.setAttribute('role', 'radio');
            el.setAttribute('aria-checked', isActive ? 'true' : 'false');
            el.setAttribute('aria-label', size.name + (!size.inStock ? ' (sold out)' : ''));
            el.setAttribute('tabindex', size.inStock ? '0' : '-1');
            if (isActive) { selectedSize = size.name; foundSelected = true; }
            if (size.inStock) {
                el.addEventListener('click', function () {
                    modalSizeOpts.querySelectorAll('.size-opt').forEach(function (s) {
                        s.classList.remove('selected');
                        s.setAttribute('aria-checked', 'false');
                    });
                    el.classList.add('selected');
                    el.setAttribute('aria-checked', 'true');
                    selectedSize = size.name;
                    updateModalPrice();
                });
            }
            modalSizeOpts.appendChild(el);
        });
        updateModalPrice();
    }

    function openProductModal(product) {
        currentProduct = product;
        selectedColor = null;
        selectedSize = null;
        quantity = 1;
        modalQty.textContent = '1';
        modalAddBtn.textContent = 'Add to Cart';
        modalAddBtn.classList.remove('loading', 'added');
        modalAddBtn.disabled = product.state.type === 'SOLD_OUT';

        modalTitle.textContent = product.name;
        modalDesc.textContent = product.description || '';
        modalImage.src = product.images[0] ? product.images[0].url : '';
        modalImage.alt = product.name;

        renderThumbnails(product.images);
        renderColorOptions(product);

        var colors = getUniqueColors(product);
        if (colors.length <= 1) {
            renderSizeOptions(product, colors.length === 1 ? colors[0].name : null);
        }

        updateModalPrice();
        modalBackdrop.hidden = false;
        document.body.classList.add('menu-open');
    }

    function closeProductModal() {
        modalBackdrop.hidden = true;
        document.body.classList.remove('menu-open');
        currentProduct = null;
    }

    modalCloseBtn.addEventListener('click', closeProductModal);
    modalBackdrop.addEventListener('click', function (e) {
        if (e.target === modalBackdrop) closeProductModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modalBackdrop.hidden) closeProductModal();
    });

    qtyMinus.addEventListener('click', function () {
        if (quantity > 1) { quantity--; modalQty.textContent = quantity; }
    });
    qtyPlus.addEventListener('click', function () {
        if (quantity < 10) { quantity++; modalQty.textContent = quantity; }
    });

    // ── Cart drawer rendering ──

    var drawerItems = document.getElementById('drawer-items');
    var drawerEmpty = document.getElementById('drawer-empty');
    var drawerFooter = document.getElementById('drawer-footer');
    var drawerSubtotal = document.getElementById('drawer-subtotal');
    var drawerCheckoutBtn = document.getElementById('drawer-checkout');

    function updateBadge(cart) {
        var count = cart && cart.items ? cart.items.reduce(function (sum, item) { return sum + item.quantity; }, 0) : 0;
        localStorage.setItem('ncev_cart_count', String(count));
        if (typeof updateCartBadge === 'function') updateCartBadge();
    }

    function renderDrawer(cart) {
        // Clear existing cart items (keep the empty message element)
        drawerItems.querySelectorAll('.cart-item').forEach(function (el) { el.remove(); });

        if (!cart || !cart.items || cart.items.length === 0) {
            drawerEmpty.hidden = false;
            drawerFooter.hidden = true;
            return;
        }

        drawerEmpty.hidden = true;
        drawerFooter.hidden = false;

        var subtotal = 0;
        cart.items.forEach(function (item) {
            var v = item.variant;
            var lineTotal = v.unitPrice.value * item.quantity;
            subtotal += lineTotal;

            var variantParts = [];
            if (v.attributes.color) variantParts.push(v.attributes.color.name);
            if (v.attributes.size) variantParts.push(v.attributes.size.name);
            var variantText = variantParts.join(' \u00B7 ') || 'Standard';

            var el = document.createElement('div');
            el.className = 'cart-item';

            var itemImg = document.createElement('img');
            itemImg.className = 'cart-item-img';
            itemImg.src = v.images && v.images[0] ? v.images[0].url : '';
            itemImg.alt = v.product.name;
            el.appendChild(itemImg);

            var info = document.createElement('div');
            info.className = 'cart-item-info';

            var nameEl = document.createElement('div');
            nameEl.className = 'cart-item-name';
            nameEl.textContent = v.product.name;
            info.appendChild(nameEl);

            var varEl = document.createElement('div');
            varEl.className = 'cart-item-variant';
            varEl.textContent = variantText;
            info.appendChild(varEl);

            var bottom = document.createElement('div');
            bottom.className = 'cart-item-bottom';

            var priceEl = document.createElement('div');
            priceEl.className = 'cart-item-price';
            priceEl.textContent = formatPrice(lineTotal);
            bottom.appendChild(priceEl);

            var controls = document.createElement('div');
            controls.className = 'cart-item-controls';

            var qtyWrap = document.createElement('div');
            qtyWrap.className = 'cart-item-qty';

            var minusBtn = document.createElement('button');
            minusBtn.className = 'cart-qty-btn';
            minusBtn.setAttribute('aria-label', 'Decrease');
            minusBtn.textContent = '\u2212';
            minusBtn.dataset.action = 'minus';
            minusBtn.dataset.variant = v.id;
            qtyWrap.appendChild(minusBtn);

            var qtyVal = document.createElement('span');
            qtyVal.className = 'cart-qty-val';
            qtyVal.textContent = item.quantity;
            qtyWrap.appendChild(qtyVal);

            var plusBtn = document.createElement('button');
            plusBtn.className = 'cart-qty-btn';
            plusBtn.setAttribute('aria-label', 'Increase');
            plusBtn.textContent = '+';
            plusBtn.dataset.action = 'plus';
            plusBtn.dataset.variant = v.id;
            qtyWrap.appendChild(plusBtn);

            controls.appendChild(qtyWrap);

            var removeBtn = document.createElement('button');
            removeBtn.className = 'cart-item-remove';
            removeBtn.textContent = 'Remove';
            removeBtn.dataset.variant = v.id;
            controls.appendChild(removeBtn);

            bottom.appendChild(controls);
            info.appendChild(bottom);
            el.appendChild(info);
            drawerItems.appendChild(el);
        });

        drawerSubtotal.textContent = formatPrice(subtotal);
    }

    // Drawer event delegation for qty and remove
    drawerItems.addEventListener('click', function (e) {
        var qtyBtn = e.target.closest('.cart-qty-btn');
        var rmBtn = e.target.closest('.cart-item-remove');

        if (qtyBtn) {
            var vid = qtyBtn.dataset.variant;
            var qtyEl = qtyBtn.parentElement.querySelector('.cart-qty-val');
            var curQty = parseInt(qtyEl.textContent, 10);
            if (qtyBtn.dataset.action === 'minus') {
                if (curQty <= 1) return;
                curQty--;
            } else {
                if (curQty >= 10) return;
                curQty++;
            }
            changeQuantity(vid, curQty).then(function (cart) {
                renderDrawer(cart);
                updateBadge(cart);
            }).catch(function () {});
        }

        if (rmBtn) {
            removeFromCart(rmBtn.dataset.variant).then(function (cart) {
                renderDrawer(cart);
                updateBadge(cart);
            }).catch(function () {});
        }
    });

    // Add to cart from modal
    modalAddBtn.addEventListener('click', function () {
        var variant = getSelectedVariant();
        if (!variant || modalAddBtn.classList.contains('loading')) return;

        modalAddBtn.classList.add('loading');
        modalAddBtn.textContent = 'Adding...';

        addToCart(variant.id, quantity).then(function (cart) {
            updateBadge(cart);
            modalAddBtn.classList.remove('loading');
            modalAddBtn.classList.add('added');
            modalAddBtn.textContent = 'Added \u2713';
            setTimeout(function () {
                modalAddBtn.classList.remove('added');
                modalAddBtn.textContent = 'Add to Cart';
            }, 1500);
        }).catch(function () {
            modalAddBtn.classList.remove('loading');
            modalAddBtn.textContent = 'Error \u2014 Try Again';
            setTimeout(function () {
                modalAddBtn.textContent = 'Add to Cart';
            }, 2000);
        });
    });

    // Checkout redirect
    drawerCheckoutBtn.addEventListener('click', function () {
        if (!cartId) return;
        window.location.href = 'https://' + CHECKOUT_DOMAIN + '/checkout/?cartCurrency=USD&cartId=' + cartId;
    });

    // Enhance the global openCartDrawer to load cart data
    var origOpenDrawer = window.openCartDrawer;
    window.openCartDrawer = function () {
        if (origOpenDrawer) origOpenDrawer();
        if (cartId) {
            getCart().then(function (cart) {
                renderDrawer(cart);
                updateBadge(cart);
            }).catch(function () { renderDrawer(null); });
        }
    };
    // Rebind toggle
    var cartToggleBtn = document.getElementById('cart-toggle');
    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            window.openCartDrawer();
        });
    }

    // ── Init ──
    loadProducts();

})();
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/store.js
git commit -m "feat(store): add complete store.js with products, modal, cart, and checkout"
```

---

### Task 6: Integration Test and Final Adjustments

**Files:**
- All modified files

- [ ] **Step 1: Build the site and verify no Jekyll errors**

```bash
cd /Users/zakwinnick/Documents/GitHub/NorCalEVs
eval "$(rbenv init -)" && rbenv local 3.1.6
JEKYLL_ENV=production bundle exec jekyll build
```

Expected: Build succeeds with no errors. Check that `_site/store/index.html` exists.

- [ ] **Step 2: Verify the built store page contains the correct token and data attributes**

```bash
grep 'data-token' _site/store/index.html
grep 'data-checkout-domain' _site/store/index.html
```

Expected: Both attributes present with correct values.

- [ ] **Step 3: Verify store.js is included only on the store page**

```bash
grep 'store.js' _site/store/index.html
grep 'store.js' _site/index.html
```

Expected: Found in store page, NOT found in homepage.

- [ ] **Step 4: Verify navigation includes Store link and cart icon**

```bash
grep 'Store' _site/index.html
grep 'cart-toggle' _site/index.html
```

Expected: Both found on all pages.

- [ ] **Step 5: Serve locally and visually verify**

```bash
eval "$(rbenv init -)" && rbenv local 3.1.6
bundle exec jekyll serve
```

Open http://localhost:4000/store and verify:
- Product grid loads with 3 products from Fourthwall API
- Clicking a product opens the modal with correct images, colors, sizes
- Color swatches swap images
- Size buttons update price
- Add to Cart calls the API and shows confirmation
- Cart badge updates in nav
- Cart drawer opens and shows items
- Checkout redirects to norcalevs-shop.fourthwall.com

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat(store): complete Fourthwall storefront integration"
```
