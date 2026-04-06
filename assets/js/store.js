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
        renderSizeOptions(product, selectedColor);

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
