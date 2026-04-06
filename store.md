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
    <p class="store-error-fallback">Or visit our store directly at <a href="https://shop.norcalevs.org" target="_blank" rel="noopener noreferrer">shop.norcalevs.org</a></p>
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
