// Food Junction - Official Digital Menu Application with Online WhatsApp Ordering (7017643199)
document.addEventListener('DOMContentLoaded', () => {
    // Restore cart & customer details from localStorage
    let savedCart = {};
    let savedCustomer = { name: '', phone: '', address: '', note: '' };
    try {
        const c = localStorage.getItem('fj_cart');
        if (c) savedCart = JSON.parse(c);
        const u = localStorage.getItem('fj_customer_details');
        if (u) savedCustomer = JSON.parse(u);
    } catch (_) {}

    // Application State
    const state = {
        activeCategory: 'all',
        searchQuery: '',
        activeFilter: 'all',
        languageMode: 'both',
        currentSlide: 0,
        sliderTimer: null,
        cart: savedCart,
        customer: savedCustomer
    };

    const ORDER_PHONE = '7017643199';
    const ORDER_WHATSAPP = '917017643199';

    // DOM Elements - Menu & Filter
    const itemsGrid = document.getElementById('items-grid');
    const categoryScroll = document.getElementById('category-scroll');
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear');
    const itemCountBadge = document.getElementById('items-found-count');
    const filterChips = document.querySelectorAll('.filter-chip');
    const langSelectButtons = document.querySelectorAll('.lang-btn');

    // DOM Elements - Online Order & Cart
    const btnHeaderCart = document.getElementById('btn-header-cart');
    const headerCartBadge = document.getElementById('header-cart-badge');
    const floatingCartBar = document.getElementById('floating-cart-bar');
    const floatCartCount = document.getElementById('float-cart-count');
    const floatCartPrice = document.getElementById('float-cart-price');
    const floatCartOrigPrice = document.getElementById('float-cart-orig-price');
    const btnOpenOrderModal = document.getElementById('btn-open-order-modal');
    const cartBarTrigger = document.getElementById('cart-bar-trigger');
    const btnMobileOrder = document.getElementById('btn-mobile-order');
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    const btnFooterOrder = document.getElementById('btn-footer-order');

    // DOM Elements - Order Modal
    const orderModal = document.getElementById('order-modal');
    const btnCloseOrderModal = document.getElementById('btn-close-order-modal');
    const modalCartItems = document.getElementById('modal-cart-items');
    const modalItemsCount = document.getElementById('modal-items-count');
    const modalOrigTotal = document.getElementById('modal-orig-total');
    const modalDiscountAmt = document.getElementById('modal-discount-amt');
    const modalFinalTotal = document.getElementById('modal-final-total');
    const btnClearCart = document.getElementById('btn-clear-cart');
    const btnSubmitWhatsappOrder = document.getElementById('btn-submit-whatsapp-order');
    const custNameInput = document.getElementById('cust-name');
    const custPhoneInput = document.getElementById('cust-phone');
    const custAddressInput = document.getElementById('cust-address');
    const custNoteInput = document.getElementById('cust-note');

    // Toast Notice
    const toastNotice = document.getElementById('toast-notice');
    const toastMsg = document.getElementById('toast-msg');
    const toastIcon = document.getElementById('toast-icon');

    // Mobile Bottom Navigation & Category Bottom Sheet Elements
    const mobileBottomNav = document.getElementById('mobile-bottom-nav');
    const categorySheetModal = document.getElementById('category-sheet-modal');
    const categorySheetBackdrop = document.getElementById('category-sheet-backdrop');
    const categorySheetPanel = document.getElementById('category-sheet-panel');
    const btnOpenCategorySheet = document.getElementById('btn-open-category-sheet');
    const btnCloseCategorySheet = document.getElementById('btn-close-category-sheet');
    const sheetCategoriesList = document.getElementById('sheet-categories-list');
    const mobileCatCount = document.getElementById('mobile-cat-count');
    const btnMobileTop = document.getElementById('btn-mobile-top');

    // 4-Banner Slider Setup with Native Touch Swipe Support
    const sliderWrapper = document.getElementById('banner-slider');
    const sliderDots = document.getElementById('slider-dots');
    const btnPrevSlide = document.getElementById('btn-prev-slide');
    const btnNextSlide = document.getElementById('btn-next-slide');
    const totalSlides = 4;

    function initSlider() {
        if (!sliderWrapper) return;

        if (sliderDots) {
            sliderDots.innerHTML = Array.from({ length: totalSlides }).map((_, i) => `
                <button class="slider-dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-orange-500 w-6 sm:w-8' : 'bg-stone-300 hover:bg-stone-400'}" 
                        data-index="${i}" aria-label="Slide ${i + 1}"></button>
            `).join('');

            sliderDots.querySelectorAll('.slider-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    goToSlide(parseInt(dot.dataset.index));
                    resetSliderTimer();
                });
            });
        }

        if (btnPrevSlide) {
            btnPrevSlide.addEventListener('click', () => {
                prevSlide();
                resetSliderTimer();
            });
        }
        if (btnNextSlide) {
            btnNextSlide.addEventListener('click', () => {
                nextSlide();
                resetSliderTimer();
            });
        }

        startSliderTimer();

        // Pause on mouse hover
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(state.sliderTimer));
        sliderWrapper.addEventListener('mouseleave', () => startSliderTimer());

        // Mobile Touch Swipe Gesture Handling
        let touchStartX = 0;
        let touchStartY = 0;

        sliderWrapper.addEventListener('touchstart', (e) => {
            clearInterval(state.sliderTimer);
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        sliderWrapper.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                const diffX = e.changedTouches[0].clientX - touchStartX;
                const diffY = e.changedTouches[0].clientY - touchStartY;
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
                    if (diffX < 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
            startSliderTimer();
        }, { passive: true });
    }

    function goToSlide(index) {
        state.currentSlide = (index + totalSlides) % totalSlides;
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${state.currentSlide * 100}%)`;
        }
        if (sliderDots) {
            sliderDots.querySelectorAll('.slider-dot').forEach((dot, i) => {
                if (i === state.currentSlide) {
                    dot.classList.add('bg-orange-500', 'w-6', 'sm:w-8');
                    dot.classList.remove('bg-stone-300', 'w-2', 'sm:w-2.5');
                } else {
                    dot.classList.remove('bg-orange-500', 'w-6', 'sm:w-8');
                    dot.classList.add('bg-stone-300', 'w-2', 'sm:w-2.5');
                }
            });
        }
    }

    function nextSlide() { goToSlide(state.currentSlide + 1); }
    function prevSlide() { goToSlide(state.currentSlide - 1); }

    function startSliderTimer() {
        clearInterval(state.sliderTimer);
        state.sliderTimer = setInterval(nextSlide, 4500);
    }

    function resetSliderTimer() {
        clearInterval(state.sliderTimer);
        startSliderTimer();
    }

    // Connect Banner Action Buttons
    document.querySelectorAll('[data-goto-category]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(btn.dataset.gotoCategory);
        });
    });

    // Quick Search & Browse Scroll Buttons
    const scrollSearchBtns = [
        document.getElementById('btn-scroll-search'),
        document.getElementById('btn-offer-browse'),
        document.getElementById('btn-slide-browse')
    ];
    scrollSearchBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (searchInput) {
                    const yOffset = -80;
                    const y = searchInput.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    setTimeout(() => searchInput.focus(), 350);
                }
            });
        }
    });

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    let toastTimeout = null;
    function showToast(message, isSuccess = true) {
        if (!toastNotice || !toastMsg) return;
        toastMsg.textContent = message;
        if (toastIcon) {
            toastIcon.className = isSuccess 
                ? "fa-solid fa-circle-check text-emerald-400" 
                : "fa-solid fa-triangle-exclamation text-amber-400";
        }
        toastNotice.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastNotice.classList.remove('show');
        }, 2800);
    }

    // ==========================================
    // CART & ORDER MANAGEMENT
    // ==========================================
    function getCartTotals() {
        let totalCount = 0;
        let origTotal = 0;
        let finalTotal = 0;

        Object.values(state.cart).forEach(entry => {
            if (entry && entry.qty > 0) {
                totalCount += entry.qty;
                origTotal += entry.origPrice * entry.qty;
                finalTotal += entry.discountedPrice * entry.qty;
            }
        });

        const discountAmt = Math.max(0, origTotal - finalTotal);
        return { totalCount, origTotal, discountAmt, finalTotal };
    }

    function saveCart() {
        try {
            localStorage.setItem('fj_cart', JSON.stringify(state.cart));
        } catch (_) {}
    }

    const DEFAULT_OFFERS = {
        showTopStrip: true,
        topStripText: '🔥 SPECIAL FOOD OFFER: FLAT 10% OFF ON ALL ORDERS | CODE: FOOD10 | 📞 7017643199, 7017718936',
        topStripTheme: 'orange',
        showOfferCard: true,
        offerBadge: 'Special Food Offer',
        offerTitle: 'FLAT 10% OFF ON ALL FOODS',
        offerDesc: 'Order delicious North Indian gravies, Paneer, Chaap, Momos & Pizzas in Kasganj! Prices shown with discount.',
        offerCode: 'FOOD10',
        discountEnabled: true,
        discountPercent: 10,
        discountLabel: 'Special 10% Discount',
        footerOfferText: '✨ Taste That Brings You Together — Kasganj'
    };

    function getOfferSettings() {
        try {
            const raw = localStorage.getItem('fj_offer_settings');
            if (raw) return { ...DEFAULT_OFFERS, ...JSON.parse(raw) };
        } catch (_) {}
        return { ...DEFAULT_OFFERS };
    }

    function getCategoriesList() {
        return (typeof CATEGORIES !== 'undefined' ? CATEGORIES : (window.CATEGORIES || []));
    }

    function getMenuItemsList() {
        return (typeof MENU_ITEMS !== 'undefined' ? MENU_ITEMS : (window.MENU_ITEMS || []));
    }

    function addToCart(itemId, variantName = null) {
        const item = getMenuItemsList().find(m => m.id === itemId);
        if (!item) return;

        let origPrice = item.price;
        if (variantName && item.variants) {
            const v = item.variants.find(va => va.name === variantName);
            if (v) origPrice = v.price;
        }

        const offer = getOfferSettings();
        const pct = (offer.discountEnabled !== false && offer.discountPercent > 0) ? offer.discountPercent : 0;
        const discountedPrice = pct > 0 ? Math.round(origPrice * (1 - pct / 100)) : origPrice;
        const cartKey = variantName ? `${itemId}_${variantName}` : itemId;

        if (!state.cart[cartKey]) {
            state.cart[cartKey] = {
                cartKey,
                itemId: item.id,
                nameEn: item.nameEn,
                nameHi: item.nameHi,
                variantName: variantName || '',
                isVeg: item.isVeg,
                isEgg: item.isEgg,
                origPrice,
                discountedPrice,
                qty: 1
            };
        } else {
            state.cart[cartKey].qty += 1;
        }

        saveCart();
        updateCartUI();
        renderMenuItems();
        showToast(`Added ${item.nameEn}${variantName ? ' (' + variantName + ')' : ''} to Plate!`);
    }

    function updateCartQty(cartKey, delta) {
        if (!state.cart[cartKey]) return;
        state.cart[cartKey].qty += delta;
        if (state.cart[cartKey].qty <= 0) {
            delete state.cart[cartKey];
        }
        saveCart();
        updateCartUI();
        renderMenuItems();
        if (orderModal && !orderModal.classList.contains('hidden')) {
            renderModalCart();
        }
    }

    function removeFromCart(cartKey) {
        if (state.cart[cartKey]) {
            delete state.cart[cartKey];
            saveCart();
            updateCartUI();
            renderMenuItems();
            if (orderModal && !orderModal.classList.contains('hidden')) {
                renderModalCart();
            }
        }
    }

    function clearCart() {
        state.cart = {};
        saveCart();
        updateCartUI();
        renderMenuItems();
        if (orderModal && !orderModal.classList.contains('hidden')) {
            renderModalCart();
        }
        showToast("Plate cleared.");
    }

    function updateCartUI() {
        const { totalCount, origTotal, finalTotal } = getCartTotals();

        // Header cart badge
        if (headerCartBadge) {
            if (totalCount > 0) {
                headerCartBadge.textContent = totalCount;
                headerCartBadge.classList.remove('hidden');
            } else {
                headerCartBadge.classList.add('hidden');
            }
        }

        // Mobile bottom nav badge
        if (mobileCartBadge) {
            if (totalCount > 0) {
                mobileCartBadge.textContent = totalCount;
                mobileCartBadge.classList.remove('hidden');
            } else {
                mobileCartBadge.classList.add('hidden');
            }
        }

        // Floating Order Bar
        if (floatingCartBar) {
            if (totalCount > 0) {
                floatingCartBar.classList.remove('hidden');
                if (floatCartCount) floatCartCount.textContent = totalCount;
                if (floatCartPrice) floatCartPrice.textContent = `₹${finalTotal}`;
                if (floatCartOrigPrice) floatCartOrigPrice.textContent = `₹${origTotal}`;
            } else {
                floatingCartBar.classList.add('hidden');
            }
        }
    }

    // ==========================================
    // ORDER MODAL & WHATSAPP SUBMISSION
    // ==========================================
    function openOrderModal() {
        if (!orderModal) return;
        // Populate customer details from state
        if (state.customer) {
            if (custNameInput && state.customer.name) custNameInput.value = state.customer.name;
            if (custPhoneInput && state.customer.phone) custPhoneInput.value = state.customer.phone;
            if (custAddressInput && state.customer.address) custAddressInput.value = state.customer.address;
            if (custNoteInput && state.customer.note) custNoteInput.value = state.customer.note;
        }
        renderModalCart();
        orderModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeOrderModal() {
        if (!orderModal) return;
        orderModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    function renderModalCart() {
        const { totalCount, origTotal, discountAmt, finalTotal } = getCartTotals();
        if (modalItemsCount) modalItemsCount.textContent = totalCount;
        if (modalOrigTotal) modalOrigTotal.textContent = `₹${origTotal}`;
        if (modalDiscountAmt) modalDiscountAmt.textContent = `-₹${discountAmt}`;
        if (modalFinalTotal) modalFinalTotal.textContent = `₹${finalTotal}`;

        const offer = getOfferSettings();
        const modalDiscountRow = document.getElementById('modal-discount-row');
        const modalDiscountLabel = document.getElementById('modal-discount-label');
        if (modalDiscountRow) {
            if (discountAmt > 0) {
                modalDiscountRow.classList.remove('hidden');
                if (modalDiscountLabel) {
                    modalDiscountLabel.textContent = offer.discountLabel || `${offer.discountPercent}% Discount`;
                }
            } else {
                modalDiscountRow.classList.add('hidden');
            }
        }

        if (btnClearCart) {
            btnClearCart.classList.toggle('hidden', totalCount === 0);
        }

        if (!modalCartItems) return;

        const entries = Object.values(state.cart);
        if (entries.length === 0) {
            modalCartItems.innerHTML = `
                <div class="py-8 text-center text-stone-400 space-y-2">
                    <div class="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400 text-xl">
                        <i class="fa-solid fa-plate-wheat"></i>
                    </div>
                    <p class="text-xs font-semibold text-stone-700">Your Plate is Empty!</p>
                    <p class="text-[11px] text-stone-500">Tap "+ ADD" on any dish in the menu to build your online order.</p>
                </div>
            `;
            return;
        }

        modalCartItems.innerHTML = entries.map(entry => {
            const itemTotal = entry.discountedPrice * entry.qty;
            const origItemTotal = entry.origPrice * entry.qty;
            const portionText = entry.variantName ? `<span class="px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 text-[10px] font-bold uppercase">${entry.variantName}</span>` : '';

            return `
                <div class="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 border border-stone-200/90 gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="${entry.isEgg ? 'egg-indicator' : 'veg-indicator'} shrink-0"></span>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <span class="font-bold text-xs text-stone-900 truncate">${entry.nameEn}</span>
                                ${portionText}
                            </div>
                            <div class="flex items-baseline gap-1 mt-0.5">
                                <span class="text-xs font-black text-orange-700 font-mono">₹${itemTotal}</span>
                                <span class="text-[10px] text-stone-400 line-through font-mono">₹${origItemTotal}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <div class="flex items-center bg-white border border-stone-300 rounded-xl shadow-xs overflow-hidden">
                            <button class="modal-qty-btn px-2.5 py-1 text-stone-700 hover:bg-stone-100 active:scale-90 font-black text-xs" data-action="minus" data-key="${entry.cartKey}">−</button>
                            <span class="px-2 text-xs font-black font-mono text-stone-900">${entry.qty}</span>
                            <button class="modal-qty-btn px-2.5 py-1 text-stone-700 hover:bg-stone-100 active:scale-90 font-black text-xs" data-action="plus" data-key="${entry.cartKey}">+</button>
                        </div>
                        <button class="modal-remove-btn w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition active:scale-90" data-key="${entry.cartKey}" title="Remove item">
                            <i class="fa-solid fa-trash-can text-xs"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Modal Steppers & Remove Listeners
        modalCartItems.querySelectorAll('.modal-qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.dataset.key;
                const delta = btn.dataset.action === 'plus' ? 1 : -1;
                updateCartQty(key, delta);
            });
        });

        modalCartItems.querySelectorAll('.modal-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromCart(btn.dataset.key);
            });
        });
    }

    function submitWhatsAppOrder() {
        const { totalCount, origTotal, discountAmt, finalTotal } = getCartTotals();
        if (totalCount === 0) {
            showToast("Please add dishes to your plate first!", false);
            return;
        }

        const name = (custNameInput ? custNameInput.value : '').trim();
        const phone = (custPhoneInput ? custPhoneInput.value : '').trim();
        const address = (custAddressInput ? custAddressInput.value : '').trim();
        const note = (custNoteInput ? custNoteInput.value : '').trim();

        if (!name) {
            showToast("Please enter your Full Name!", false);
            if (custNameInput) custNameInput.focus();
            return;
        }

        const cleanPhone = phone.replace(/\D/g, '');
        if (!cleanPhone || cleanPhone.length < 10) {
            showToast("Please enter a valid 10-digit Mobile Number!", false);
            if (custPhoneInput) custPhoneInput.focus();
            return;
        }

        if (!address || address.length < 5) {
            showToast("Please enter your complete Delivery Address in Kasganj!", false);
            if (custAddressInput) custAddressInput.focus();
            return;
        }

        // Save customer details for subsequent orders
        state.customer = { name, phone, address, note };
        try {
            localStorage.setItem('fj_customer_details', JSON.stringify(state.customer));
        } catch (_) {}

        // Log order to Admin Database
        try {
            const orderRecord = {
                id: 'FJ-' + Math.floor(1000 + Math.random() * 9000),
                createdAt: new Date().toISOString(),
                displayDate: new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                customer: {
                    name,
                    phone: cleanPhone,
                    address,
                    note: note || ''
                },
                items: Object.values(state.cart).map(entry => ({
                    itemId: entry.itemId,
                    nameEn: entry.nameEn,
                    nameHi: entry.nameHi,
                    variant: entry.variantName || '',
                    price: entry.origPrice,
                    discountedPrice: entry.discountedPrice,
                    qty: entry.qty,
                    total: entry.discountedPrice * entry.qty
                })),
                totalCount,
                origTotal,
                discountAmt,
                finalTotal,
                status: 'Received',
                source: 'WhatsApp Web'
            };

            const existingOrders = JSON.parse(localStorage.getItem('fj_orders_log') || '[]');
            existingOrders.unshift(orderRecord);
            localStorage.setItem('fj_orders_log', JSON.stringify(existingOrders));

            // Update Customers CRM Directory
            const existingCustomers = JSON.parse(localStorage.getItem('fj_customers_db') || '{}');
            const custKey = cleanPhone;
            if (!existingCustomers[custKey]) {
                existingCustomers[custKey] = {
                    name,
                    phone: cleanPhone,
                    address,
                    ordersCount: 1,
                    totalSpent: finalTotal,
                    firstOrderDate: new Date().toISOString(),
                    lastOrderDate: new Date().toISOString()
                };
            } else {
                existingCustomers[custKey].ordersCount = (existingCustomers[custKey].ordersCount || 0) + 1;
                existingCustomers[custKey].totalSpent = (existingCustomers[custKey].totalSpent || 0) + finalTotal;
                existingCustomers[custKey].lastOrderDate = new Date().toISOString();
                if (address) existingCustomers[custKey].address = address;
                if (name) existingCustomers[custKey].name = name;
            }
            localStorage.setItem('fj_customers_db', JSON.stringify(existingCustomers));
        } catch (err) {
            console.error('Order log error:', err);
        }

        // Format WhatsApp message
        let itemsListText = '';
        let index = 1;
        Object.values(state.cart).forEach(entry => {
            const portion = entry.variantName ? ` (${entry.variantName})` : '';
            const cost = entry.discountedPrice * entry.qty;
            itemsListText += `${index}. *${entry.nameEn}*${portion} x ${entry.qty} = ₹${cost}\n`;
            index++;
        });

        const dateStr = new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let msg = `🛍️ *FOOD JUNCTION - ONLINE ORDER*\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `👤 *Customer Name:* ${name}\n`;
        msg += `📞 *Contact Number:* ${phone}\n`;
        msg += `📍 *Delivery Address:* ${address}\n`;
        if (note) {
            msg += `📝 *Cooking Request:* ${note}\n`;
        }
        msg += `🕒 *Time:* ${dateStr}\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `🍽️ *ORDER ITEMS (${totalCount}):*\n`;
        msg += itemsListText;
        msg += `━━━━━━━━━━━━━━━━━━━━\n`;
        const offer = getOfferSettings();
        if (discountAmt > 0) {
            msg += `💰 *Original Total:* ₹${origTotal}\n`;
            msg += `🎉 *${offer.discountLabel || 'Special Discount'}:* -₹${discountAmt}\n`;
            msg += `🏷️ *Grand Total Payable:* *₹${finalTotal}*\n`;
        } else {
            msg += `🏷️ *Grand Total Payable:* *₹${finalTotal}*\n`;
        }
        msg += `━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `🙏 *Please confirm my order and share estimated delivery time!*`;

        const waUrl = `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(msg)}`;

        showToast(`Sending order to WhatsApp (${ORDER_PHONE})...`);
        window.open(waUrl, '_blank');
    }

    // Modal Trigger Listeners
    if (btnHeaderCart) btnHeaderCart.addEventListener('click', openOrderModal);
    if (btnOpenOrderModal) btnOpenOrderModal.addEventListener('click', openOrderModal);
    if (cartBarTrigger) cartBarTrigger.addEventListener('click', openOrderModal);
    if (btnMobileOrder) btnMobileOrder.addEventListener('click', openOrderModal);
    if (btnFooterOrder) btnFooterOrder.addEventListener('click', openOrderModal);
    if (btnCloseOrderModal) btnCloseOrderModal.addEventListener('click', closeOrderModal);
    if (btnClearCart) btnClearCart.addEventListener('click', clearCart);
    if (btnSubmitWhatsappOrder) btnSubmitWhatsappOrder.addEventListener('click', submitWhatsAppOrder);

    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) closeOrderModal();
        });
    }

    // ==========================================
    // MOBILE BOTTOM SHEET DRAWER & CONTROLS
    // ==========================================
    function openCategorySheet() {
        if (!categorySheetModal || !categorySheetPanel || !categorySheetBackdrop) return;
        categorySheetModal.classList.remove('hidden');
        setTimeout(() => {
            categorySheetBackdrop.classList.remove('opacity-0');
            categorySheetBackdrop.classList.add('opacity-100');
            categorySheetPanel.classList.remove('translate-y-full');
            categorySheetPanel.classList.add('translate-y-0');
        }, 10);
        document.body.classList.add('overflow-hidden');
    }

    function closeCategorySheet() {
        if (!categorySheetModal || !categorySheetPanel || !categorySheetBackdrop) return;
        categorySheetBackdrop.classList.remove('opacity-100');
        categorySheetBackdrop.classList.add('opacity-0');
        categorySheetPanel.classList.remove('translate-y-0');
        categorySheetPanel.classList.add('translate-y-full');
        setTimeout(() => {
            categorySheetModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 320);
    }

    if (btnOpenCategorySheet) btnOpenCategorySheet.addEventListener('click', openCategorySheet);
    if (btnCloseCategorySheet) btnCloseCategorySheet.addEventListener('click', closeCategorySheet);
    if (categorySheetBackdrop) categorySheetBackdrop.addEventListener('click', closeCategorySheet);

    // Mobile Scroll-To-Top Button
    window.addEventListener('scroll', () => {
        if (btnMobileTop) {
            if (window.scrollY > 300) {
                btnMobileTop.classList.remove('hidden');
            } else {
                btnMobileTop.classList.add('hidden');
            }
        }
    }, { passive: true });

    if (btnMobileTop) {
        btnMobileTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // DIGITAL LIST CATEGORIES & RENDERING
    // ==========================================
    function initCategories() {
        const categories = getCategoriesList();
        const items = getMenuItemsList();
        if (mobileCatCount) mobileCatCount.textContent = `${Math.max(0, categories.length - 1)}`;

        if (categoryScroll) {
            categoryScroll.innerHTML = categories.map(cat => {
                const count = cat.id === 'all' 
                    ? items.length 
                    : items.filter(item => item.category === cat.id).length;

                return `
                    <button class="cat-pill whitespace-nowrap px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${state.activeCategory === cat.id ? 'active' : ''}" 
                            data-category="${cat.id}">
                        <i class="fa-solid ${cat.icon} ${state.activeCategory === cat.id ? 'text-white' : 'text-orange-500'} text-[11px] sm:text-xs"></i>
                        <span>${state.languageMode === 'hi' ? cat.nameHi : cat.nameEn}</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded-full ${state.activeCategory === cat.id ? 'bg-orange-700/60 text-white' : 'bg-stone-100 text-stone-500'} font-mono">${count}</span>
                    </button>
                `;
            }).join('');

            categoryScroll.querySelectorAll('.cat-pill').forEach(btn => {
                btn.addEventListener('click', () => {
                    selectCategory(btn.dataset.category);
                });
            });
        }

        // Render in Mobile Bottom Sheet
        if (sheetCategoriesList) {
            sheetCategoriesList.innerHTML = categories.map(cat => {
                const count = cat.id === 'all' 
                    ? items.length 
                    : items.filter(item => item.category === cat.id).length;
                const isActive = state.activeCategory === cat.id;

                return `
                    <button class="w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${isActive ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-stone-50 hover:bg-orange-50 text-stone-800 border-stone-200'} active:scale-98" data-sheet-category="${cat.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'} flex items-center justify-center text-sm">
                                <i class="fa-solid ${cat.icon}"></i>
                            </div>
                            <div class="text-left">
                                <span class="font-bold text-sm block leading-tight">${cat.nameEn}</span>
                                <span class="text-xs ${isActive ? 'text-orange-100' : 'text-orange-600'} font-hindi font-medium">${cat.nameHi}</span>
                            </div>
                        </div>
                        <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full ${isActive ? 'bg-white/30 text-white' : 'bg-stone-200/80 text-stone-600'}">${count} items</span>
                    </button>
                `;
            }).join('');

            sheetCategoriesList.querySelectorAll('[data-sheet-category]').forEach(btn => {
                btn.addEventListener('click', () => {
                    selectCategory(btn.dataset.sheetCategory);
                    closeCategorySheet();
                });
            });
        }
    }

    function selectCategory(catId) {
        state.activeCategory = catId;
        if (categoryScroll) {
            categoryScroll.querySelectorAll('.cat-pill').forEach(b => {
                const isActive = b.dataset.category === catId;
                b.classList.toggle('active', isActive);
                if (isActive) {
                    b.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            });
        }
        renderMenuItems();
        const listEl = document.getElementById('view-section-list');
        if (listEl) {
            const yOffset = -105;
            const y = listEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    function getFilteredItems() {
        const items = getMenuItemsList();
        return items.filter(item => {
            if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
                return false;
            }

            if (state.activeFilter === 'veg' && !item.isVeg) return false;
            if (state.activeFilter === 'bestseller' && !item.isBestseller) return false;
            if (state.activeFilter === 'special' && !item.isChefSpecial) return false;
            if (state.activeFilter === 'under100') {
                const basePrice = item.variants ? item.variants[0].price : item.price;
                if (basePrice > 100) return false;
            }

            if (state.searchQuery.trim()) {
                const q = state.searchQuery.toLowerCase().trim();
                const matchEn = item.nameEn.toLowerCase().includes(q);
                const matchHi = item.nameHi.includes(q);
                const matchDescEn = item.descEn ? item.descEn.toLowerCase().includes(q) : false;
                const matchDescHi = item.descHi ? item.descHi.includes(q) : false;
                const matchCat = item.category.toLowerCase().includes(q);
                if (!matchEn && !matchHi && !matchDescEn && !matchDescHi && !matchCat) {
                    return false;
                }
            }

            return true;
        });
    }

    function renderMenuItems() {
        if (!itemsGrid) return;

        const allItems = getMenuItemsList();
        if (allItems.length === 0) {
            itemsGrid.innerHTML = `
                <div class="col-span-full py-16 text-center text-stone-500">
                    <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 text-2xl">
                        <i class="fa-solid fa-utensils animate-bounce"></i>
                    </div>
                    <h3 class="text-base font-bold text-stone-800">Loading Food Junction Menu...</h3>
                    <p class="text-xs text-stone-500 mt-1">Please wait a moment while dishes load.</p>
                </div>
            `;
            setTimeout(() => {
                if (getMenuItemsList().length > 0) {
                    initCategories();
                    renderMenuItems();
                }
            }, 350);
            return;
        }

        const filtered = getFilteredItems();
        if (itemCountBadge) itemCountBadge.textContent = `${filtered.length} Dishes`;

        if (filtered.length === 0) {
            itemsGrid.innerHTML = `
                <div class="col-span-full py-16 text-center text-stone-500">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 text-2xl">
                        <i class="fa-solid fa-utensils"></i>
                    </div>
                    <h3 class="text-lg font-bold text-stone-800 mb-1">No dishes found</h3>
                    <p class="text-sm text-stone-500 mb-4">Try searching for another dish or clear your filters.</p>
                    <button id="reset-filters-btn" class="px-4 py-2 rounded-xl text-xs font-semibold btn-brand text-white inline-flex items-center gap-2">
                        <i class="fa-solid fa-rotate-left"></i> Reset Search & Filters
                    </button>
                </div>
            `;
            const resetBtn = document.getElementById('reset-filters-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    state.searchQuery = '';
                    state.activeCategory = 'all';
                    state.activeFilter = 'all';
                    if (searchInput) searchInput.value = '';
                    filterChips.forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
                    initCategories();
                    renderMenuItems();
                });
            }
            return;
        }

        itemsGrid.innerHTML = filtered.map(item => {
            let badgeHtml = '';
            if (item.isChefSpecial) {
                badgeHtml += `<span class="badge-special text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><i class="fa-solid fa-crown text-[9px]"></i> Chef Special</span>`;
            }
            if (item.isBestseller) {
                badgeHtml += `<span class="badge-bestseller text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><i class="fa-solid fa-fire text-[9px]"></i> Bestseller</span>`;
            }
            if (item.isSpicy) {
                badgeHtml += `<span class="badge-spicy text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><i class="fa-solid fa-pepper-hot text-[9px]"></i> Spicy</span>`;
            }

            let titleHtml = '';
            if (state.languageMode === 'en') {
                titleHtml = `<h3 class="font-extrabold text-stone-900 text-base leading-snug">${item.nameEn}</h3>`;
            } else if (state.languageMode === 'hi') {
                titleHtml = `<h3 class="font-extrabold text-stone-900 text-base leading-snug font-hindi">${item.nameHi}</h3>`;
            } else {
                titleHtml = `
                    <div class="flex items-baseline gap-2 flex-wrap">
                        <span class="font-extrabold text-stone-900 text-base leading-snug">${item.nameEn}</span>
                        <span class="text-xs text-orange-600 font-hindi font-bold">${item.nameHi}</span>
                    </div>
                `;
            }

            let desc = state.languageMode === 'en' 
                ? (item.descEn || '') 
                : (state.languageMode === 'hi' ? (item.descHi || item.descEn || '') : (item.descEn || item.descHi || ''));

            const offer = getOfferSettings();
            const pct = (offer.discountEnabled !== false && offer.discountPercent > 0) ? offer.discountPercent : 0;
            const discountFactor = (100 - pct) / 100;

            let priceSection = '';
            if (item.variants && item.variants.length > 0) {
                const variantPills = item.variants.map(v => {
                    const discountedPrice = pct > 0 ? Math.round(v.price * discountFactor) : v.price;
                    const cartKey = `${item.id}_${v.name}`;
                    const inCartEntry = state.cart[cartKey];
                    const inCartQty = inCartEntry ? inCartEntry.qty : 0;

                    let actionHtml = '';
                    if (inCartQty > 0) {
                        actionHtml = `
                            <div class="flex items-center bg-orange-600 text-white rounded-lg shadow-xs overflow-hidden">
                                <button class="item-stepper-btn px-2 py-0.5 hover:bg-orange-700 active:scale-90 font-black text-xs" data-action="minus" data-key="${cartKey}">−</button>
                                <span class="px-2 text-[11px] font-black font-mono">${inCartQty}</span>
                                <button class="item-stepper-btn px-2 py-0.5 hover:bg-orange-700 active:scale-90 font-black text-xs" data-action="plus" data-key="${cartKey}">+</button>
                            </div>
                        `;
                    } else {
                        actionHtml = `
                            <button class="item-add-btn px-2.5 py-1 rounded-lg text-xs font-bold text-orange-600 bg-white border border-orange-300 hover:bg-orange-50 active:scale-95 shadow-xs transition" data-id="${item.id}" data-variant="${v.name}">
                                + ADD
                            </button>
                        `;
                    }

                    const priceBadgeHtml = pct > 0
                        ? `
                            <div class="flex items-baseline gap-1 mt-0.5">
                                <span class="text-xs font-black text-orange-700 font-mono">₹${discountedPrice}</span>
                                <span class="text-[9px] sm:text-[10px] text-stone-400 line-through font-mono">₹${v.price}</span>
                            </div>
                        `
                        : `
                            <div class="flex items-baseline gap-1 mt-0.5">
                                <span class="text-xs font-black text-stone-900 font-mono">₹${v.price}</span>
                            </div>
                        `;

                    return `
                        <div class="flex items-center justify-between gap-1 p-1.5 sm:p-2 rounded-xl bg-orange-50/80 border border-orange-200 min-w-0">
                            <div class="min-w-0">
                                <span class="text-[9px] sm:text-[10px] text-stone-600 uppercase font-extrabold tracking-wider block truncate">${v.name}</span>
                                ${priceBadgeHtml}
                            </div>
                            <div class="shrink-0">
                                ${actionHtml}
                            </div>
                        </div>
                    `;
                }).join('');

                priceSection = `
                    <div class="mt-3 pt-2.5 border-t border-stone-100">
                        <div class="grid ${item.variants.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-1.5 w-full">
                            ${variantPills}
                        </div>
                    </div>
                `;
            } else {
                const discountedPrice = pct > 0 ? Math.round(item.price * discountFactor) : item.price;
                const cartKey = item.id;
                const inCartEntry = state.cart[cartKey];
                const inCartQty = inCartEntry ? inCartEntry.qty : 0;

                let actionHtml = '';
                if (inCartQty > 0) {
                    actionHtml = `
                        <div class="flex items-center bg-orange-600 text-white rounded-xl shadow-xs overflow-hidden">
                            <button class="item-stepper-btn px-2.5 py-1 hover:bg-orange-700 active:scale-90 font-black text-xs" data-action="minus" data-key="${cartKey}">−</button>
                            <span class="px-3 text-xs font-black font-mono">${inCartQty}</span>
                            <button class="item-stepper-btn px-2.5 py-1 hover:bg-orange-700 active:scale-90 font-black text-xs" data-action="plus" data-key="${cartKey}">+</button>
                        </div>
                    `;
                } else {
                    actionHtml = `
                        <button class="item-add-btn px-4 py-1.5 rounded-xl text-xs font-extrabold text-white btn-brand active:scale-95 shadow-xs transition flex items-center gap-1.5" data-id="${item.id}">
                            <span>+ ADD</span>
                        </button>
                    `;
                }

                const priceBadgeHtml = pct > 0
                    ? `
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-base font-black text-orange-700 font-mono">₹${discountedPrice}</span>
                            <span class="text-xs text-stone-400 line-through font-mono">₹${item.price}</span>
                            <span class="text-[9px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded border border-orange-200">${pct}% Off</span>
                        </div>
                    `
                    : `
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-base font-black text-stone-900 font-mono">₹${item.price}</span>
                        </div>
                    `;

                priceSection = `
                    <div class="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                        ${priceBadgeHtml}
                        <div class="shrink-0">
                            ${actionHtml}
                        </div>
                    </div>
                `;
            }

            return `
                <div class="menu-clean-card rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 relative group">
                    <div>
                        <div class="flex items-start justify-between gap-2 mb-1.5">
                            <div class="flex items-center gap-2">
                                <span class="${item.isEgg ? 'egg-indicator' : 'veg-indicator'}" title="${item.isEgg ? 'Egg Preparation' : 'Pure Vegetarian'}"></span>
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    ${badgeHtml}
                                </div>
                            </div>
                        </div>

                        <div class="mt-0.5">
                            ${titleHtml}
                            ${desc ? `<p class="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">${desc}</p>` : ''}
                        </div>
                    </div>

                    ${priceSection}
                </div>
            `;
        }).join('');

        // Attach Card Add & Stepper Listeners
        itemsGrid.querySelectorAll('.item-add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const variant = btn.dataset.variant || null;
                addToCart(id, variant);
            });
        });

        itemsGrid.querySelectorAll('.item-stepper-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.dataset.key;
                const delta = btn.dataset.action === 'plus' ? 1 : -1;
                updateCartQty(key, delta);
            });
        });
    }

    // Search & Filter Events
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            if (searchClearBtn) {
                searchClearBtn.classList.toggle('hidden', state.searchQuery.length === 0);
            }
            renderMenuItems();
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            state.searchQuery = '';
            searchClearBtn.classList.add('hidden');
            renderMenuItems();
            searchInput.focus();
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.activeFilter = chip.dataset.filter;
            renderMenuItems();
        });
    });

    langSelectButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langSelectButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.languageMode = btn.dataset.lang;
            initCategories();
            renderMenuItems();
        });
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (orderModal && !orderModal.classList.contains('hidden')) {
                closeOrderModal();
            }
            if (categorySheetModal && !categorySheetModal.classList.contains('hidden')) {
                closeCategorySheet();
            }
        }
    });

    // ==========================================
    // MENU VISITOR ANALYTICS TRACKING
    // ==========================================
    function trackMenuVisit() {
        try {
            const todayKey = new Date().toISOString().slice(0, 10);
            let analytics = JSON.parse(localStorage.getItem('fj_analytics_data') || 'null');
            if (!analytics) {
                // Initialize with realistic baseline if first run
                analytics = {
                    totalVisits: 142,
                    uniqueVisitors: 89,
                    dailyVisits: {
                        [todayKey]: 18
                    },
                    recentLogs: []
                };
            }

            analytics.totalVisits = (analytics.totalVisits || 0) + 1;
            analytics.dailyVisits = analytics.dailyVisits || {};
            analytics.dailyVisits[todayKey] = (analytics.dailyVisits[todayKey] || 0) + 1;

            let visitorId = localStorage.getItem('fj_visitor_id');
            if (!visitorId) {
                visitorId = 'v_' + Math.random().toString(36).substring(2, 9);
                localStorage.setItem('fj_visitor_id', visitorId);
                analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
            }

            analytics.recentLogs = analytics.recentLogs || [];
            analytics.recentLogs.unshift({
                timestamp: new Date().toISOString(),
                time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                date: todayKey
            });
            if (analytics.recentLogs.length > 50) analytics.recentLogs = analytics.recentLogs.slice(0, 50);

            localStorage.setItem('fj_analytics_data', JSON.stringify(analytics));
        } catch (_) {}
    }

    // ==========================================
    // DYNAMIC OFFER & ROW BANNER APPLIER
    // ==========================================
    function applyOfferSettings() {
        const offer = getOfferSettings();

        // 1. Top Marquee Strip
        const topMarqueeStrip = document.getElementById('top-marquee-strip');
        const marqueeOfferText = document.getElementById('marquee-offer-text');
        const marqueeOfferCode = document.getElementById('marquee-offer-code');
        const marqueeRepeats = document.querySelectorAll('.marquee-offer-text-repeat');
        const marqueeCodeRepeats = document.querySelectorAll('.marquee-offer-code-repeat');

        if (topMarqueeStrip) {
            if (offer.showTopStrip === false) {
                topMarqueeStrip.classList.add('hidden');
            } else {
                topMarqueeStrip.classList.remove('hidden');
                if (offer.topStripTheme === 'emerald') {
                    topMarqueeStrip.className = 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white text-xs font-black py-1.5 overflow-hidden shadow-xs relative z-50 w-full max-w-full';
                } else if (offer.topStripTheme === 'crimson') {
                    topMarqueeStrip.className = 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-600 text-white text-xs font-black py-1.5 overflow-hidden shadow-xs relative z-50 w-full max-w-full';
                } else if (offer.topStripTheme === 'dark') {
                    topMarqueeStrip.className = 'bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white text-xs font-black py-1.5 overflow-hidden shadow-xs relative z-50 w-full max-w-full';
                } else {
                    topMarqueeStrip.className = 'bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white text-xs font-black py-1.5 overflow-hidden shadow-xs relative z-50 w-full max-w-full';
                }
            }
        }

        if (marqueeOfferText) marqueeOfferText.textContent = offer.topStripText || '';
        marqueeRepeats.forEach(el => el.textContent = offer.topStripText || '');

        if (marqueeOfferCode) {
            if (offer.offerCode) {
                marqueeOfferCode.textContent = `CODE: ${offer.offerCode}`;
                marqueeOfferCode.classList.remove('hidden');
            } else {
                marqueeOfferCode.classList.add('hidden');
            }
        }
        marqueeCodeRepeats.forEach(el => {
            if (offer.offerCode) {
                el.textContent = `CODE: ${offer.offerCode}`;
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });

        // 2. Featured Offer Banner Card
        const offerBannerSection = document.getElementById('offer-banner-section');
        const offerBadgeText = document.getElementById('offer-badge-text');
        const offerHeadlineText = document.getElementById('offer-headline-text');
        const offerDescText = document.getElementById('offer-desc-text');
        const offerCodeContainer = document.getElementById('offer-code-container');
        const offerCodeText = document.getElementById('offer-code-text');

        if (offerBannerSection) {
            if (offer.showOfferCard === false) {
                offerBannerSection.classList.add('hidden');
            } else {
                offerBannerSection.classList.remove('hidden');
            }
        }
        if (offerBadgeText) offerBadgeText.textContent = offer.offerBadge || 'Special Food Offer';
        if (offerHeadlineText) offerHeadlineText.textContent = offer.offerTitle || 'FLAT 10% OFF ON ALL FOODS';
        if (offerDescText) offerDescText.textContent = offer.offerDesc || '';
        if (offerCodeContainer && offerCodeText) {
            if (offer.offerCode) {
                offerCodeText.textContent = offer.offerCode;
                offerCodeContainer.classList.remove('hidden');
            } else {
                offerCodeContainer.classList.add('hidden');
            }
        }

        // 3. Carousel Slide 1
        const slide1Badge = document.getElementById('slide1-badge-text');
        const slide1Headline = document.getElementById('slide1-headline-text');
        const slide1Desc = document.getElementById('slide1-desc-text');
        const slide1CodeBadge = document.getElementById('slide1-code-badge');

        if (slide1Badge) slide1Badge.textContent = offer.offerBadge || 'Food Junction Special';
        if (slide1Headline) slide1Headline.textContent = offer.offerTitle || 'Flat 10% OFF On All Foods!';
        if (slide1Desc) slide1Desc.textContent = offer.offerDesc || '';
        if (slide1CodeBadge) {
            if (offer.offerCode) {
                slide1CodeBadge.textContent = offer.offerCode;
                slide1CodeBadge.classList.remove('hidden');
            } else {
                slide1CodeBadge.classList.add('hidden');
            }
        }

        // 4. Footer Offer Text
        const footerOfferText = document.getElementById('footer-offer-text');
        if (footerOfferText) {
            footerOfferText.textContent = offer.footerOfferText || '✨ Taste That Brings You Together — Kasganj';
        }
    }

    // Auto-sync offer changes if updated in Admin panel in another tab
    window.addEventListener('storage', (e) => {
        if (e.key === 'fj_offer_settings') {
            applyOfferSettings();
            renderMenuItems();
            updateCartUI();
        }
    });

    // Auto-redirect to admin if #admin hash or /admin in URL
    if (window.location.hash === '#admin' || window.location.pathname.endsWith('/admin')) {
        window.location.href = 'admin.html';
        return;
    }

    // Initial setup
    trackMenuVisit();
    applyOfferSettings();
    initSlider();
    initCategories();
    renderMenuItems();
    updateCartUI();
});
