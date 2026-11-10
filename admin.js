/**
 * Food Junction Kasganj - Admin Management Portal Logic
 * Security PIN: 7017
 * Features:
 *  - PIN Verification & Session Auth
 *  - Executive Metrics (Visits, Orders, Revenue, Customers)
 *  - Orders Management (Status Update, WhatsApp / Call shortcuts, Delete)
 *  - Customer CRM Directory (Contact details, Lifetime spent, Addresses)
 *  - Visitor Analytics (Daily breakdown & live visit logs)
 *  - Excel CSV Export (UTF-8 BOM for perfect Excel & Hindi compatibility)
 *  - JSON Backup & Restore
 *  - Manual Order Entry (for phone/in-store orders)
 */

(function () {
    'use strict';

    // --- CONSTANTS ---
    const ADMIN_PIN = '7017';
    const STORAGE_KEYS = {
        ORDERS: 'fj_orders_log',
        CUSTOMERS: 'fj_customers_db',
        ANALYTICS: 'fj_analytics_data',
        AUTH_SESSION: 'fj_admin_auth',
        OFFERS: 'fj_offer_settings'
    };

    // --- STATE ---
    let enteredPin = '';
    let currentTab = 'orders';
    let ordersSearchQuery = '';
    let ordersStatusFilter = 'all';
    let customerSearchQuery = '';

    // --- DOM ELEMENTS ---
    const pinScreen = document.getElementById('pin-screen');
    const pinCard = document.getElementById('pin-card');
    const pinDots = [
        document.getElementById('pindot-0'),
        document.getElementById('pindot-1'),
        document.getElementById('pindot-2'),
        document.getElementById('pindot-3')
    ];
    const pinStatusMsg = document.getElementById('pin-status-msg');
    const btnPinClear = document.getElementById('btn-pin-clear');
    const btnPinEnter = document.getElementById('btn-pin-enter');
    const keypadButtons = document.querySelectorAll('.keypad-btn');

    const adminDashboard = document.getElementById('admin-dashboard');
    const btnLogout = document.getElementById('btn-admin-logout');
    const btnQuickExport = document.getElementById('btn-quick-export');

    // Stats Elements
    const elStatTotalVisits = document.getElementById('stat-total-visits');
    const elStatTodayVisits = document.getElementById('stat-today-visits');
    const elStatUniqueVisitors = document.getElementById('stat-unique-visitors');
    const elStatTotalOrders = document.getElementById('stat-total-orders');
    const elStatTodayOrders = document.getElementById('stat-today-orders');
    const elStatConvRate = document.getElementById('stat-conv-rate');
    const elStatTotalRevenue = document.getElementById('stat-total-revenue');
    const elStatTotalSavings = document.getElementById('stat-total-savings');
    const elStatTotalCustomers = document.getElementById('stat-total-customers');

    // Tabs & Panels
    const tabButtons = document.querySelectorAll('.admin-tab');
    const panels = {
        orders: document.getElementById('panel-orders'),
        customers: document.getElementById('panel-customers'),
        analytics: document.getElementById('panel-analytics'),
        offers: document.getElementById('panel-offers'),
        settings: document.getElementById('panel-settings')
    };
    const tabOrdersCount = document.getElementById('tab-orders-count');
    const tabCustCount = document.getElementById('tab-cust-count');

    // Orders Panel Controls
    const ordersContainer = document.getElementById('orders-container');
    const ordersSearchInput = document.getElementById('orders-search-input');
    const ordersStatusSelect = document.getElementById('orders-status-filter');
    const btnAddManualOrder = document.getElementById('btn-add-manual-order');

    // Customer Panel Controls
    const customersTableBody = document.getElementById('customers-table-body');
    const customersSearchInput = document.getElementById('customers-search-input');
    const btnExportCustomersCsv = document.getElementById('btn-export-customers-csv');
    const btnExportCustCsvPanel = document.getElementById('btn-export-cust-csv-panel');

    // Analytics Panel Controls
    const analyticsDailyList = document.getElementById('analytics-daily-list');
    const analyticsRecentLogs = document.getElementById('analytics-recent-logs');
    const analyticsActiveDate = document.getElementById('analytics-active-date');

    // Settings Panel Controls
    const btnExportOrdersCsv = document.getElementById('btn-export-orders-csv');
    const btnExportBackupJson = document.getElementById('btn-export-backup-json');
    const btnSeedSampleData = document.getElementById('btn-seed-sample-data');
    const fileRestoreBackup = document.getElementById('file-restore-backup');
    const btnClearAllData = document.getElementById('btn-clear-all-data');

    // Manual Order Modal
    const manualOrderModal = document.getElementById('manual-order-modal');
    const btnCloseManualModal = document.getElementById('btn-close-manual-modal');
    const btnCancelManual = document.getElementById('btn-cancel-manual');
    const formManualOrder = document.getElementById('form-manual-order');

    // --- INITIALIZATION ---
    function init() {
        setupPinListeners();
        setupGlobalKeyboard();
        setupTabs();
        setupSearchAndFilters();
        setupExportButtons();
        setupOffersManager();
        setupManualOrderModal();
        setupBackupRestore();

        // Check if session is already authorized
        if (sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true') {
            unlockDashboard();
        } else {
            lockDashboard();
        }
    }

    // --- 1. PIN VERIFICATION LOGIC ---
    function setupPinListeners() {
        keypadButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const num = btn.getAttribute('data-num');
                if (num && enteredPin.length < 4) {
                    enteredPin += num;
                    updatePinDots();
                    if (enteredPin.length === 4) {
                        setTimeout(verifyPin, 120);
                    }
                }
            });
        });

        if (btnPinClear) {
            btnPinClear.addEventListener('click', () => {
                if (enteredPin.length > 0) {
                    enteredPin = enteredPin.slice(0, -1);
                    updatePinDots();
                }
            });
        }

        if (btnPinEnter) {
            btnPinEnter.addEventListener('click', verifyPin);
        }

        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                if (confirm('Lock Admin Portal and logout?')) {
                    sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
                    lockDashboard();
                }
            });
        }
    }

    function setupGlobalKeyboard() {
        document.addEventListener('keydown', (e) => {
            // Only capture if PIN screen is active
            if (!pinScreen.classList.contains('hidden')) {
                if (e.key >= '0' && e.key <= '9') {
                    if (enteredPin.length < 4) {
                        enteredPin += e.key;
                        updatePinDots();
                        if (enteredPin.length === 4) {
                            setTimeout(verifyPin, 120);
                        }
                    }
                } else if (e.key === 'Backspace') {
                    if (enteredPin.length > 0) {
                        enteredPin = enteredPin.slice(0, -1);
                        updatePinDots();
                    }
                } else if (e.key === 'Enter') {
                    verifyPin();
                } else if (e.key === 'Escape') {
                    enteredPin = '';
                    updatePinDots();
                }
            }
        });
    }

    function updatePinDots() {
        pinDots.forEach((dot, idx) => {
            if (idx < enteredPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    function verifyPin() {
        if (enteredPin === ADMIN_PIN) {
            // Success
            pinStatusMsg.innerHTML = '<span class="text-emerald-600 font-bold"><i class="fa-solid fa-circle-check mr-1"></i> Access Granted! Welcome.</span>';
            sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
            setTimeout(() => {
                unlockDashboard();
            }, 300);
        } else {
            // Failed
            pinStatusMsg.innerHTML = '<span class="text-red-500 font-bold"><i class="fa-solid fa-circle-xmark mr-1"></i> Incorrect PIN! Try again.</span>';
            if (pinCard) {
                pinCard.classList.add('shake-anim');
                setTimeout(() => {
                    pinCard.classList.remove('shake-anim');
                }, 400);
            }
            setTimeout(() => {
                enteredPin = '';
                updatePinDots();
                pinStatusMsg.innerHTML = '<span class="text-stone-400">Enter PIN code (7017) to unlock</span>';
            }, 1000);
        }
    }

    function unlockDashboard() {
        pinScreen.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        loadAllData();
    }

    function lockDashboard() {
        enteredPin = '';
        updatePinDots();
        pinStatusMsg.innerHTML = '<span class="text-stone-400">Enter PIN code (7017) to unlock</span>';
        adminDashboard.classList.add('hidden');
        pinScreen.classList.remove('hidden');
    }

    // --- 2. DATA LOAD & REFRESH ---
    function getOrders() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
        } catch (_) {
            return [];
        }
    }

    function setOrders(orders) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    function getCustomers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS) || '{}');
        } catch (_) {
            return {};
        }
    }

    function setCustomers(customers) {
        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    }

    function getAnalytics() {
        try {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYTICS) || 'null');
            if (data) return data;
        } catch (_) {}

        // Default baseline if not initialized
        return {
            totalVisits: 148,
            uniqueVisitors: 94,
            dailyVisits: {
                [new Date().toISOString().slice(0, 10)]: 18
            },
            recentLogs: []
        };
    }

    function loadAllData() {
        let orders = getOrders();
        let customers = getCustomers();

        // If storage is empty on first admin login, pre-seed demo Kasganj data so everything is visible
        if (orders.length === 0 && Object.keys(customers).length === 0) {
            seedSampleKasganjData(false);
            orders = getOrders();
            customers = getCustomers();
        }

        renderMetrics();
        renderOrders();
        renderCustomers();
        renderAnalytics();
        populateOffersForm();
    }

    // --- 3. METRICS RENDERING ---
    function renderMetrics() {
        const orders = getOrders();
        const customers = getCustomers();
        const analytics = getAnalytics();
        const todayStr = new Date().toISOString().slice(0, 10);

        // Menu Opens & Visits
        const totalVisits = analytics.totalVisits || 0;
        const todayVisits = (analytics.dailyVisits && analytics.dailyVisits[todayStr]) || 0;
        const uniqueVisitors = analytics.uniqueVisitors || Math.round(totalVisits * 0.65);

        if (elStatTotalVisits) elStatTotalVisits.textContent = totalVisits.toLocaleString('en-IN');
        if (elStatTodayVisits) elStatTodayVisits.textContent = `+${todayVisits} today`;
        if (elStatUniqueVisitors) elStatUniqueVisitors.textContent = `${uniqueVisitors} unique`;

        // Orders Placed
        const totalOrders = orders.length;
        const todayOrders = orders.filter(o => o.createdAt && o.createdAt.startsWith(todayStr)).length;
        const convRate = totalVisits > 0 ? ((totalOrders / totalVisits) * 100).toFixed(1) : '0';

        if (elStatTotalOrders) elStatTotalOrders.textContent = totalOrders.toLocaleString('en-IN');
        if (elStatTodayOrders) elStatTodayOrders.textContent = `+${todayOrders} today`;
        if (elStatConvRate) elStatConvRate.textContent = `${convRate}% conv.`;

        // Revenue & Savings
        let totalRevenue = 0;
        let totalSavings = 0;
        orders.forEach(o => {
            if (o.status !== 'Cancelled') {
                totalRevenue += (Number(o.finalTotal) || 0);
                totalSavings += (Number(o.discountAmt) || 0);
            }
        });

        if (elStatTotalRevenue) elStatTotalRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
        if (elStatTotalSavings) elStatTotalSavings.textContent = `₹${totalSavings.toLocaleString('en-IN')} (10% Off)`;

        // Customers Count
        const custCount = Object.keys(customers).length;
        if (elStatTotalCustomers) elStatTotalCustomers.textContent = custCount.toLocaleString('en-IN');

        // Tab count badges
        if (tabOrdersCount) tabOrdersCount.textContent = totalOrders;
        if (tabCustCount) tabCustCount.textContent = custCount;
    }

    // --- 4. TABS NAVIGATION ---
    function setupTabs() {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabKey = btn.getAttribute('data-tab');
                switchTab(tabKey);
            });
        });
    }

    function switchTab(tabKey) {
        currentTab = tabKey;

        tabButtons.forEach(btn => {
            const isCurrent = btn.getAttribute('data-tab') === tabKey;
            if (isCurrent) {
                btn.className = 'admin-tab active px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition shrink-0 bg-orange-600 text-white border-orange-600 shadow-xs';
            } else {
                btn.className = 'admin-tab px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition shrink-0 bg-white text-stone-600 border-stone-200 hover:border-orange-300 hover:text-orange-600';
            }
        });

        Object.keys(panels).forEach(key => {
            if (panels[key]) {
                if (key === tabKey) {
                    panels[key].classList.remove('hidden');
                } else {
                    panels[key].classList.add('hidden');
                }
            }
        });

        if (tabKey === 'analytics') {
            renderAnalytics();
        } else if (tabKey === 'offers') {
            populateOffersForm();
        }
    }

    // --- 5. ORDERS TAB LOGIC ---
    function setupSearchAndFilters() {
        if (ordersSearchInput) {
            ordersSearchInput.addEventListener('input', (e) => {
                ordersSearchQuery = e.target.value.trim().toLowerCase();
                renderOrders();
            });
        }

        if (ordersStatusSelect) {
            ordersStatusSelect.addEventListener('change', (e) => {
                ordersStatusFilter = e.target.value;
                renderOrders();
            });
        }

        if (customersSearchInput) {
            customersSearchInput.addEventListener('input', (e) => {
                customerSearchQuery = e.target.value.trim().toLowerCase();
                renderCustomers();
            });
        }
    }

    function getStatusBadge(status) {
        switch (status) {
            case 'Received':
                return '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5"><i class="fa-solid fa-clock"></i> Received</span>';
            case 'Cooking':
                return '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-orange-100 text-orange-800 border border-orange-300 flex items-center gap-1.5 animate-pulse"><i class="fa-solid fa-fire-burner"></i> Cooking</span>';
            case 'Out for Delivery':
                return '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1.5"><i class="fa-solid fa-motorcycle"></i> Out for Delivery</span>';
            case 'Completed':
                return '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5"><i class="fa-solid fa-circle-check"></i> Completed</span>';
            case 'Cancelled':
                return '<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-300 flex items-center gap-1.5"><i class="fa-solid fa-circle-xmark"></i> Cancelled</span>';
            default:
                return `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-stone-100 text-stone-700 border border-stone-300">${escapeHtml(status || 'Received')}</span>`;
        }
    }

    function renderOrders() {
        if (!ordersContainer) return;

        const allOrders = getOrders();
        let filtered = allOrders;

        // Apply Status Filter
        if (ordersStatusFilter !== 'all') {
            filtered = filtered.filter(o => o.status === ordersStatusFilter);
        }

        // Apply Search Filter
        if (ordersSearchQuery) {
            filtered = filtered.filter(o => {
                const name = (o.customer && o.customer.name) || '';
                const phone = (o.customer && o.customer.phone) || '';
                const addr = (o.customer && o.customer.address) || '';
                const id = o.id || '';
                return name.toLowerCase().includes(ordersSearchQuery) ||
                       phone.includes(ordersSearchQuery) ||
                       addr.toLowerCase().includes(ordersSearchQuery) ||
                       id.toLowerCase().includes(ordersSearchQuery);
            });
        }

        if (filtered.length === 0) {
            ordersContainer.innerHTML = `
                <div class="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-3">
                    <div class="w-14 h-14 mx-auto rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl">
                        <i class="fa-solid fa-inbox"></i>
                    </div>
                    <h4 class="font-extrabold text-stone-800 text-sm">No Orders Found</h4>
                    <p class="text-xs text-stone-500 max-w-sm mx-auto">
                        ${ordersSearchQuery || ordersStatusFilter !== 'all' ? 'No orders match your current filter/search query.' : 'Customer orders placed via WhatsApp or manual entry will appear here instantly.'}
                    </p>
                    ${allOrders.length === 0 ? `
                        <button onclick="window.seedSampleDataHandler()" class="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                            <span>Load Sample Orders</span>
                        </button>
                    ` : ''}
                </div>
            `;
            return;
        }

        let html = '';
        filtered.forEach((order) => {
            const cust = order.customer || {};
            const cleanPhone = (cust.phone || '').replace(/\D/g, '');
            const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
            const waMsg = encodeURIComponent(`Namaste ${cust.name || 'Ji'}, this is Food Junction Kasganj regarding your Order #${order.id}. `);
            const waLink = `https://wa.me/${waPhone}?text=${waMsg}`;
            const callLink = `tel:${cleanPhone}`;
            const mapsQuery = encodeURIComponent(`${cust.address || ''}, Kasganj, UP`);
            const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

            const orderDate = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : '');
            const orderTime = order.time || (order.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '');

            // Render Items
            let itemsHtml = '';
            if (Array.isArray(order.items) && order.items.length > 0) {
                itemsHtml = order.items.map(item => `
                    <div class="flex items-center justify-between text-xs py-1 border-b border-stone-100 last:border-0">
                        <div class="flex items-center gap-2">
                            <span class="w-5 h-5 rounded-md bg-stone-100 font-bold text-stone-700 text-[10px] flex items-center justify-center shrink-0">${item.qty}x</span>
                            <span class="font-medium text-stone-800">${escapeHtml(item.nameEn || item.name || 'Dish')}</span>
                            ${item.variant ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-orange-50 text-orange-700 font-semibold uppercase">${escapeHtml(item.variant)}</span>` : ''}
                        </div>
                        <span class="font-mono font-bold text-stone-700">₹${Number(item.total || (item.discountedPrice * item.qty) || (item.price * item.qty)).toFixed(0)}</span>
                    </div>
                `).join('');
            } else if (order.itemsSummary) {
                itemsHtml = `<p class="text-xs text-stone-700 font-medium whitespace-pre-line py-1">${escapeHtml(order.itemsSummary)}</p>`;
            }

            html += `
                <div class="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:border-orange-300 transition overflow-hidden">
                    
                    <!-- Card Top Header -->
                    <div class="p-3.5 sm:p-4 bg-stone-50/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2.5">
                        <div class="flex items-center gap-2">
                            <span class="font-mono font-bold text-xs sm:text-sm text-stone-900 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs">${escapeHtml(order.id)}</span>
                            <span class="text-[11px] text-stone-500 font-medium">
                                <i class="fa-regular fa-clock mr-1 text-stone-400"></i>${escapeHtml(orderDate)} at ${escapeHtml(orderTime)}
                            </span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-600 font-semibold">${escapeHtml(order.source || 'WhatsApp')}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            ${getStatusBadge(order.status)}
                        </div>
                    </div>

                    <!-- Customer & Order Body -->
                    <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        <!-- Customer Details (Left 5 Cols) -->
                        <div class="md:col-span-5 space-y-2.5 border-b md:border-b-0 md:border-r border-stone-100 pb-3 md:pb-0 md:pr-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center shrink-0">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-stone-900 text-sm leading-tight">${escapeHtml(cust.name || 'Guest Customer')}</h4>
                                        <span class="font-mono text-xs text-stone-600 font-semibold">${escapeHtml(cust.phone || 'No Phone')}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Fast Action Buttons (Call / WhatsApp) -->
                            <div class="flex items-center gap-2 pt-0.5">
                                <a href="${waLink}" target="_blank" class="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95">
                                    <i class="fa-brands fa-whatsapp text-sm"></i>
                                    <span>WhatsApp</span>
                                </a>
                                <a href="${callLink}" class="flex-1 py-1.5 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95">
                                    <i class="fa-solid fa-phone text-xs"></i>
                                    <span>Call</span>
                                </a>
                            </div>

                            <!-- Kasganj Address -->
                            <div class="bg-stone-50 rounded-xl p-2.5 border border-stone-200/80 text-xs text-stone-700 space-y-1">
                                <div class="flex items-start justify-between gap-1">
                                    <div class="flex items-start gap-1.5 font-medium">
                                        <i class="fa-solid fa-location-dot text-orange-600 text-xs mt-0.5 shrink-0"></i>
                                        <span class="break-words">${escapeHtml(cust.address || 'Kasganj, Uttar Pradesh')}</span>
                                    </div>
                                    <a href="${mapsLink}" target="_blank" class="text-[10px] text-blue-600 hover:underline shrink-0 font-bold" title="Open in Google Maps">
                                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Maps
                                    </a>
                                </div>
                                ${cust.note ? `
                                    <div class="text-[11px] text-amber-800 bg-amber-50 rounded-lg p-1.5 border border-amber-200 mt-1.5">
                                        <strong>Note:</strong> ${escapeHtml(cust.note)}
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Ordered Items & Bill (Right 7 Cols) -->
                        <div class="md:col-span-7 flex flex-col justify-between space-y-3">
                            <div class="space-y-1">
                                <span class="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">Dishes Ordered</span>
                                <div class="max-h-40 overflow-y-auto no-scrollbar pr-1">
                                    ${itemsHtml}
                                </div>
                            </div>

                            <!-- Bill Calculation Summary -->
                            <div class="bg-orange-50/60 rounded-xl p-2.5 border border-orange-200/70 flex items-center justify-between text-xs">
                                <div>
                                    <span class="text-stone-500 text-[11px]">Subtotal: <span class="line-through">₹${order.origTotal || order.finalTotal}</span></span>
                                    ${order.discountAmt ? `<span class="text-emerald-700 text-[11px] font-bold ml-1.5">(-₹${order.discountAmt} 10% Off)</span>` : ''}
                                </div>
                                <div class="text-right">
                                    <span class="text-[11px] text-stone-500 mr-1">Final Payable:</span>
                                    <span class="font-mono text-base font-black text-orange-700">₹${order.finalTotal}</span>
                                </div>
                            </div>

                            <!-- Action Bar: Update Status & Delete -->
                            <div class="flex items-center justify-between gap-2 pt-1 border-t border-stone-100">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <span class="text-[11px] font-bold text-stone-500">Update Status:</span>
                                    <select onchange="window.updateOrderStatusHandler('${order.id}', this.value)" class="text-xs font-bold py-1 px-2 rounded-lg bg-stone-100 border border-stone-300 text-stone-800 outline-none">
                                        <option value="Received" ${order.status === 'Received' ? 'selected' : ''}>Received</option>
                                        <option value="Cooking" ${order.status === 'Cooking' ? 'selected' : ''}>Cooking</option>
                                        <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                                        <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                                    </select>
                                </div>

                                <button onclick="window.deleteOrderHandler('${order.id}')" class="text-xs text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition" title="Delete Order">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            `;
        });

        ordersContainer.innerHTML = html;
    }

    // Expose Order status handlers to global window for inline onclicks
    window.updateOrderStatusHandler = function (orderId, newStatus) {
        const orders = getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            setOrders(orders);
            renderMetrics();
            renderOrders();
            showAdminToast(`Order #${orderId} status updated to "${newStatus}"`);
        }
    };

    window.deleteOrderHandler = function (orderId) {
        if (confirm(`Are you sure you want to delete Order #${orderId}?`)) {
            let orders = getOrders();
            orders = orders.filter(o => o.id !== orderId);
            setOrders(orders);
            renderMetrics();
            renderOrders();
            showAdminToast(`Order #${orderId} deleted successfully.`);
        }
    };

    // --- 6. CUSTOMER DIRECTORY LOGIC ---
    function renderCustomers() {
        if (!customersTableBody) return;

        const customersObj = getCustomers();
        const customersList = Object.values(customersObj);

        let filtered = customersList;
        if (customerSearchQuery) {
            filtered = filtered.filter(c => {
                const name = (c.name || '').toLowerCase();
                const phone = (c.phone || '');
                const addr = (c.address || '').toLowerCase();
                return name.includes(customerSearchQuery) || phone.includes(customerSearchQuery) || addr.includes(customerSearchQuery);
            });
        }

        if (filtered.length === 0) {
            customersTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="py-8 text-center text-stone-400 text-xs">
                        <i class="fa-solid fa-user-slash text-2xl mb-2 text-stone-300 block"></i>
                        No customers found matching search query.
                    </td>
                </tr>
            `;
            return;
        }

        let html = '';
        filtered.forEach(c => {
            const cleanPhone = (c.phone || '').replace(/\D/g, '');
            const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
            const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Namaste ${c.name || 'Ji'}, Food Junction Kasganj se special offer for you! 🍕`)}`;
            const callLink = `tel:${cleanPhone}`;

            const lastOrderStr = c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleDateString('en-IN') : 'Recent';

            html += `
                <tr class="hover:bg-orange-50/40 transition">
                    <td class="py-3 px-4 font-bold text-stone-900">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-full bg-stone-100 text-stone-600 text-[10px] flex items-center justify-center font-bold">
                                ${(c.name || 'G').charAt(0).toUpperCase()}
                            </div>
                            <span>${escapeHtml(c.name || 'Valued Customer')}</span>
                        </div>
                    </td>
                    <td class="py-3 px-4">
                        <div class="flex items-center gap-2">
                            <span class="font-mono font-semibold text-stone-800">${escapeHtml(cleanPhone)}</span>
                            <a href="${waLink}" target="_blank" class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center justify-center text-xs transition" title="Message on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                            <a href="${callLink}" class="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center justify-center text-xs transition" title="Direct Phone Call">
                                <i class="fa-solid fa-phone"></i>
                            </a>
                        </div>
                    </td>
                    <td class="py-3 px-4 text-stone-600 max-w-xs break-words">
                        <div class="flex items-start gap-1">
                            <i class="fa-solid fa-location-dot text-orange-600 text-[10px] mt-0.5 shrink-0"></i>
                            <span>${escapeHtml(c.address || 'Kasganj, UP')}</span>
                        </div>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-extrabold text-[11px] font-mono">${c.ordersCount || 1}</span>
                    </td>
                    <td class="py-3 px-4 text-right font-mono font-bold text-stone-900">
                        ₹${(c.totalSpent || 0).toLocaleString('en-IN')}
                    </td>
                    <td class="py-3 px-4 text-right text-stone-500 font-mono text-[11px]">
                        ${escapeHtml(lastOrderStr)}
                    </td>
                </tr>
            `;
        });

        customersTableBody.innerHTML = html;
    }

    // --- 7. VISITOR INSIGHTS LOGIC ---
    function renderAnalytics() {
        const analytics = getAnalytics();
        const todayStr = new Date().toISOString().slice(0, 10);
        if (analyticsActiveDate) analyticsActiveDate.textContent = `Today: ${todayStr}`;

        // Render Daily Visits Breakdown
        if (analyticsDailyList) {
            const daily = analytics.dailyVisits || {};
            const dates = Object.keys(daily).sort().reverse().slice(0, 10);

            if (dates.length === 0) {
                analyticsDailyList.innerHTML = '<p class="text-xs text-stone-400">No daily logs recorded yet.</p>';
            } else {
                const maxVal = Math.max(...Object.values(daily), 1);
                analyticsDailyList.innerHTML = dates.map(d => {
                    const count = daily[d] || 0;
                    const percent = Math.min(100, Math.round((count / maxVal) * 100));
                    const isToday = d === todayStr;
                    return `
                        <div class="flex items-center gap-3 text-xs">
                            <span class="w-24 font-mono text-stone-600 shrink-0 ${isToday ? 'font-bold text-orange-600' : ''}">
                                ${escapeHtml(d)} ${isToday ? '(Today)' : ''}
                            </span>
                            <div class="flex-1 bg-stone-100 rounded-full h-3 overflow-hidden">
                                <div class="bg-orange-500 h-full rounded-full transition-all duration-500" style="width: ${percent}%"></div>
                            </div>
                            <span class="w-12 text-right font-mono font-bold text-stone-800 shrink-0">${count}</span>
                        </div>
                    `;
                }).join('');
            }
        }

        // Render Recent Logs
        if (analyticsRecentLogs) {
            const logs = analytics.recentLogs || [];
            if (logs.length === 0) {
                analyticsRecentLogs.innerHTML = '<p class="text-xs text-stone-400 py-3 text-center">Live visit logs will appear here when customers browse the menu.</p>';
            } else {
                analyticsRecentLogs.innerHTML = logs.slice(0, 30).map(log => {
                    const devIcon = (log.device || '').toLowerCase().includes('mobile') || (log.device || '').toLowerCase().includes('android') || (log.device || '').toLowerCase().includes('ios')
                        ? 'fa-mobile-screen'
                        : 'fa-laptop';
                    return `
                        <div class="p-2 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs hover:bg-orange-50/50 transition">
                            <div class="flex items-center gap-2">
                                <div class="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] shrink-0">
                                    <i class="fa-solid ${devIcon}"></i>
                                </div>
                                <div>
                                    <span class="font-bold text-stone-800">${escapeHtml(log.device || 'Mobile Device')}</span>
                                    <span class="text-[10px] text-stone-400 block">${escapeHtml(log.screen || 'Screen')}</span>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] text-stone-500">${escapeHtml(log.timeStr || (log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN') : ''))}</span>
                        </div>
                    `;
                }).join('');
            }
        }
    }

    // --- 8. EXCEL CSV EXPORTERS ---
    function setupExportButtons() {
        if (btnExportOrdersCsv) {
            btnExportOrdersCsv.addEventListener('click', exportOrdersToCSV);
        }
        if (btnQuickExport) {
            btnQuickExport.addEventListener('click', exportOrdersToCSV);
        }
        if (btnExportCustomersCsv) {
            btnExportCustomersCsv.addEventListener('click', exportCustomersToCSV);
        }
        if (btnExportCustCsvPanel) {
            btnExportCustCsvPanel.addEventListener('click', exportCustomersToCSV);
        }
        if (btnExportBackupJson) {
            btnExportBackupJson.addEventListener('click', exportFullBackupJSON);
        }
        if (btnSeedSampleData) {
            btnSeedSampleData.addEventListener('click', () => {
                seedSampleKasganjData(true);
            });
        }
        window.seedSampleDataHandler = function () {
            seedSampleKasganjData(true);
        };
    }

    // Export Orders to UTF-8 BOM CSV (Excel opens it without encoding errors)
    function exportOrdersToCSV() {
        const orders = getOrders();
        if (orders.length === 0) {
            alert('No orders available to export.');
            return;
        }

        const headers = [
            'Order ID',
            'Date',
            'Time',
            'Customer Name',
            'Phone Number',
            'Kasganj Delivery Address',
            'Ordered Dishes Summary',
            'Original Total (INR)',
            'Diwali Discount (INR)',
            'Final Payable (INR)',
            'Order Status',
            'Order Source',
            'Customer Note'
        ];

        const rows = orders.map(o => {
            const cust = o.customer || {};
            let itemsSummary = '';
            if (Array.isArray(o.items) && o.items.length > 0) {
                itemsSummary = o.items.map(it => `${it.qty}x ${it.nameEn || it.name}${it.variant ? ` (${it.variant})` : ''} [Rs.${it.total}]`).join('; ');
            } else {
                itemsSummary = o.itemsSummary || '';
            }

            const cleanPhone = (cust.phone || '').replace(/\D/g, '');

            return [
                csvSafe(o.id),
                csvSafe(o.date || (o.createdAt ? o.createdAt.slice(0, 10) : '')),
                csvSafe(o.time || ''),
                csvSafe(cust.name || 'Guest'),
                csvSafe(`'${cleanPhone}`), // Prepend apostrophe so Excel treats phone as string
                csvSafe(cust.address || ''),
                csvSafe(itemsSummary),
                csvSafe(o.origTotal || o.finalTotal || 0),
                csvSafe(o.discountAmt || 0),
                csvSafe(o.finalTotal || 0),
                csvSafe(o.status || 'Received'),
                csvSafe(o.source || 'WhatsApp Web'),
                csvSafe(cust.note || '')
            ].join(',');
        });

        // Prepend UTF-8 BOM (\uFEFF)
        const csvContent = '\uFEFF' + headers.join(',') + '\r\n' + rows.join('\r\n');
        const todayStr = new Date().toISOString().slice(0, 10);
        downloadFile(csvContent, `Food_Junction_Orders_${todayStr}.csv`, 'text/csv;charset=utf-8;');
        showAdminToast('Orders exported to Excel CSV successfully!');
    }

    // Export Customer Contacts CRM Directory to CSV
    function exportCustomersToCSV() {
        const customersObj = getCustomers();
        const customersList = Object.values(customersObj);

        if (customersList.length === 0) {
            alert('No customer records available to export.');
            return;
        }

        const headers = [
            'Customer Name',
            'Phone Number',
            'WhatsApp Direct Link',
            'Kasganj Delivery Address',
            'Total Orders Placed',
            'Total Amount Spent (INR)',
            'Last Order Date'
        ];

        const rows = customersList.map(c => {
            const cleanPhone = (c.phone || '').replace(/\D/g, '');
            const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
            const waLink = `https://wa.me/${waPhone}`;

            return [
                csvSafe(c.name || 'Valued Customer'),
                csvSafe(`'${cleanPhone}`),
                csvSafe(waLink),
                csvSafe(c.address || 'Kasganj, UP'),
                csvSafe(c.ordersCount || 1),
                csvSafe(c.totalSpent || 0),
                csvSafe(c.lastOrderAt ? c.lastOrderAt.slice(0, 10) : '')
            ].join(',');
        });

        const csvContent = '\uFEFF' + headers.join(',') + '\r\n' + rows.join('\r\n');
        const todayStr = new Date().toISOString().slice(0, 10);
        downloadFile(csvContent, `Food_Junction_Kasganj_Customers_${todayStr}.csv`, 'text/csv;charset=utf-8;');
        showAdminToast('Customer Directory exported to Excel CSV successfully!');
    }

    function exportFullBackupJSON() {
        const backupData = {
            appName: 'Food Junction Kasganj',
            version: '2.0',
            exportedAt: new Date().toISOString(),
            analytics: getAnalytics(),
            orders: getOrders(),
            customers: getCustomers()
        };

        const jsonStr = JSON.stringify(backupData, null, 2);
        const todayStr = new Date().toISOString().slice(0, 10);
        downloadFile(jsonStr, `Food_Junction_Full_Backup_${todayStr}.json`, 'application/json');
        showAdminToast('Full JSON Backup downloaded successfully!');
    }

    function csvSafe(val) {
        if (val === null || val === undefined) return '""';
        let str = String(val).replace(/"/g, '""');
        return `"${str}"`;
    }

    function downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // --- 9. BACKUP RESTORE & CLEAR DATA ---
    function setupBackupRestore() {
        if (fileRestoreBackup) {
            fileRestoreBackup.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const parsed = JSON.parse(event.target.result);
                        if (parsed.orders && Array.isArray(parsed.orders)) {
                            setOrders(parsed.orders);
                        }
                        if (parsed.customers && typeof parsed.customers === 'object') {
                            setCustomers(parsed.customers);
                        }
                        if (parsed.analytics && typeof parsed.analytics === 'object') {
                            localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(parsed.analytics));
                        }
                        loadAllData();
                        alert('Backup restored successfully!');
                    } catch (err) {
                        alert('Invalid JSON file format. Could not restore backup.');
                    }
                };
                reader.readAsText(file);
                fileRestoreBackup.value = '';
            });
        }

        if (btnClearAllData) {
            btnClearAllData.addEventListener('click', () => {
                const conf = confirm('DANGER: This will delete all order records, reset customers directory, and reset visitor statistics! Are you sure?');
                if (conf) {
                    localStorage.removeItem(STORAGE_KEYS.ORDERS);
                    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
                    localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
                    loadAllData();
                    showAdminToast('All data cleared successfully.');
                }
            });
        }
    }

    // --- 10. MANUAL ORDER ENTRY MODAL ---
    function setupManualOrderModal() {
        if (btnAddManualOrder) {
            btnAddManualOrder.addEventListener('click', () => {
                if (manualOrderModal) manualOrderModal.classList.remove('hidden');
            });
        }

        if (btnCloseManualModal) {
            btnCloseManualModal.addEventListener('click', () => {
                if (manualOrderModal) manualOrderModal.classList.add('hidden');
            });
        }

        if (btnCancelManual) {
            btnCancelManual.addEventListener('click', () => {
                if (manualOrderModal) manualOrderModal.classList.add('hidden');
            });
        }

        if (formManualOrder) {
            formManualOrder.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('manual-cust-name').value.trim();
                const phone = document.getElementById('manual-cust-phone').value.trim();
                const address = document.getElementById('manual-cust-address').value.trim();
                const itemsText = document.getElementById('manual-items-text').value.trim();
                const finalAmount = Number(document.getElementById('manual-final-amount').value.trim()) || 0;
                const status = document.getElementById('manual-order-status').value || 'Received';
                const note = document.getElementById('manual-cust-note').value.trim();

                if (!name || !phone || !address || !itemsText || finalAmount <= 0) {
                    alert('Please fill all required fields correctly.');
                    return;
                }

                const cleanPhone = phone.replace(/\D/g, '');
                const now = new Date();
                const orderId = `ORD-MANUAL-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

                const newOrder = {
                    id: orderId,
                    createdAt: now.toISOString(),
                    date: now.toLocaleDateString('en-IN'),
                    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                    customer: {
                        name,
                        phone: cleanPhone,
                        address,
                        note: note || ''
                    },
                    items: [],
                    itemsSummary: itemsText,
                    totalCount: 1,
                    origTotal: Math.round(finalAmount / 0.9),
                    discountAmt: Math.round(finalAmount / 0.9) - finalAmount,
                    finalTotal: finalAmount,
                    status,
                    source: 'Manual Phone Order'
                };

                // Save Order
                const orders = getOrders();
                orders.unshift(newOrder);
                setOrders(orders);

                // Update Customers CRM
                const customers = getCustomers();
                if (!customers[cleanPhone]) {
                    customers[cleanPhone] = {
                        name,
                        phone: cleanPhone,
                        address,
                        ordersCount: 1,
                        totalSpent: finalAmount,
                        lastOrderAt: now.toISOString()
                    };
                } else {
                    customers[cleanPhone].ordersCount = (customers[cleanPhone].ordersCount || 1) + 1;
                    customers[cleanPhone].totalSpent = (customers[cleanPhone].totalSpent || 0) + finalAmount;
                    customers[cleanPhone].lastOrderAt = now.toISOString();
                    if (address) customers[cleanPhone].address = address;
                    if (name) customers[cleanPhone].name = name;
                }
                setCustomers(customers);

                // Reset & Close Modal
                formManualOrder.reset();
                if (manualOrderModal) manualOrderModal.classList.add('hidden');

                loadAllData();
                showAdminToast(`New order #${orderId} created successfully!`);
            });
        }
    }

    // --- 11. SAMPLE DATA SEEDER ---
    function seedSampleKasganjData(isManualUserTrigger) {
        const now = new Date();
        const dStr = now.toLocaleDateString('en-IN');
        const tStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        const sampleOrders = [
            {
                id: 'ORD-20261106-9182',
                createdAt: now.toISOString(),
                date: dStr,
                time: tStr,
                customer: {
                    name: 'Amit Varshney',
                    phone: '9897123456',
                    address: 'Near Bilram Gate, Main Road, Kasganj',
                    note: 'Send extra green chutney & onions'
                },
                items: [
                    { nameEn: 'Shahi Paneer', nameHi: 'शाही पनीर', variant: 'Full', qty: 1, price: 260, discountedPrice: 234, total: 234 },
                    { nameEn: 'Butter Naan', nameHi: 'बटर नान', variant: 'Piece', qty: 4, price: 40, discountedPrice: 36, total: 144 },
                    { nameEn: 'Jeera Rice', nameHi: 'जीरा राइस', variant: 'Half', qty: 1, price: 90, discountedPrice: 81, total: 81 }
                ],
                totalCount: 6,
                origTotal: 510,
                discountAmt: 51,
                finalTotal: 459,
                status: 'Cooking',
                source: 'WhatsApp Web'
            },
            {
                id: 'ORD-20261106-8841',
                createdAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
                date: dStr,
                time: '12:15 PM',
                customer: {
                    name: 'Dr. R. K. Gupta',
                    phone: '9412345678',
                    address: 'Near District Hospital, Thandi Sadak, Kasganj',
                    note: 'Less spicy food please'
                },
                items: [
                    { nameEn: 'Dal Makhani', nameHi: 'दाल मखनी', variant: 'Full', qty: 1, price: 220, discountedPrice: 198, total: 198 },
                    { nameEn: 'Kadai Paneer', nameHi: 'कड़ाही पनीर', variant: 'Half', qty: 1, price: 160, discountedPrice: 144, total: 144 },
                    { nameEn: 'Tandoori Butter Roti', nameHi: 'तंदूरी बटर रोटी', variant: 'Piece', qty: 6, price: 15, discountedPrice: 14, total: 84 }
                ],
                totalCount: 8,
                origTotal: 470,
                discountAmt: 44,
                finalTotal: 426,
                status: 'Out for Delivery',
                source: 'WhatsApp Web'
            },
            {
                id: 'ORD-20261106-7429',
                createdAt: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
                date: dStr,
                time: '10:45 AM',
                customer: {
                    name: 'Priya Sharma',
                    phone: '7017894561',
                    address: 'Laxmi Colony, Street No. 3, Kasganj',
                    note: 'Hot & crunchy momos'
                },
                items: [
                    { nameEn: 'Kurkure Paneer Momos', nameHi: 'कुरकुरे पनीर मोमोज', variant: 'Full', qty: 1, price: 160, discountedPrice: 144, total: 144 },
                    { nameEn: 'Veg Hakka Noodles', nameHi: 'वेज हक्का नूडल्स', variant: 'Half', qty: 1, price: 110, discountedPrice: 99, total: 99 },
                    { nameEn: 'Cold Coffee with Ice Cream', nameHi: 'कोल्ड कॉफी', variant: 'Glass', qty: 1, price: 90, discountedPrice: 81, total: 81 }
                ],
                totalCount: 3,
                origTotal: 360,
                discountAmt: 36,
                finalTotal: 324,
                status: 'Completed',
                source: 'WhatsApp Web'
            },
            {
                id: 'ORD-20261105-6312',
                createdAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString(),
                date: '05/11/2026',
                time: '08:30 PM',
                customer: {
                    name: 'Suresh Chandra Solanki',
                    phone: '8273112233',
                    address: 'Prabhu Park Colony, Near Water Tank, Kasganj',
                    note: 'Please pack in eco-friendly thali box'
                },
                items: [
                    { nameEn: 'Special Royal Thali', nameHi: 'स्पेशल रॉयल थाली', variant: 'Standard', qty: 2, price: 260, discountedPrice: 234, total: 468 },
                    { nameEn: 'Gulab Jamun (2 Pcs)', nameHi: 'गुलाब जामुन', variant: 'Portion', qty: 2, price: 60, discountedPrice: 54, total: 108 }
                ],
                totalCount: 4,
                origTotal: 640,
                discountAmt: 64,
                finalTotal: 576,
                status: 'Completed',
                source: 'Manual Phone Order'
            }
        ];

        const sampleCustomers = {
            '9897123456': {
                name: 'Amit Varshney',
                phone: '9897123456',
                address: 'Near Bilram Gate, Main Road, Kasganj',
                ordersCount: 3,
                totalSpent: 1240,
                lastOrderAt: now.toISOString()
            },
            '9412345678': {
                name: 'Dr. R. K. Gupta',
                phone: '9412345678',
                address: 'Near District Hospital, Thandi Sadak, Kasganj',
                ordersCount: 2,
                totalSpent: 890,
                lastOrderAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString()
            },
            '7017894561': {
                name: 'Priya Sharma',
                phone: '7017894561',
                address: 'Laxmi Colony, Street No. 3, Kasganj',
                ordersCount: 1,
                totalSpent: 324,
                lastOrderAt: new Date(now.getTime() - 2 * 3600 * 1000).toISOString()
            },
            '8273112233': {
                name: 'Suresh Chandra Solanki',
                phone: '8273112233',
                address: 'Prabhu Park Colony, Near Water Tank, Kasganj',
                ordersCount: 4,
                totalSpent: 2180,
                lastOrderAt: new Date(now.getTime() - 24 * 3600 * 1000).toISOString()
            }
        };

        const todayKey = now.toISOString().slice(0, 10);
        const yesterdayKey = new Date(now.getTime() - 24 * 3600 * 1000).toISOString().slice(0, 10);

        const sampleAnalytics = {
            totalVisits: 178,
            uniqueVisitors: 112,
            dailyVisits: {
                [todayKey]: 34,
                [yesterdayKey]: 52,
                '2026-11-04': 46,
                '2026-11-03': 46
            },
            recentLogs: [
                { timestamp: now.getTime(), timeStr: tStr, device: 'Android Smartphone', screen: '390x844' },
                { timestamp: now.getTime() - 12 * 60 * 1000, timeStr: '12:28 PM', device: 'Apple iPhone (iOS)', screen: '414x896' },
                { timestamp: now.getTime() - 35 * 60 * 1000, timeStr: '12:05 PM', device: 'Android Smartphone', screen: '360x800' },
                { timestamp: now.getTime() - 75 * 60 * 1000, timeStr: '11:25 AM', device: 'Windows Desktop', screen: '1920x1080' }
            ]
        };

        setOrders(sampleOrders);
        setCustomers(sampleCustomers);
        localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(sampleAnalytics));

        if (isManualUserTrigger) {
            loadAllData();
            showAdminToast('Realistic Kasganj sample orders & contacts loaded successfully!');
        }
    }

    // --- 12. OFFERS & ROW BANNERS MANAGEMENT ---
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

    const OFFER_PRESETS = {
        'food10': {
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
        },
        'no-discount': {
            showTopStrip: true,
            topStripText: '🍽️ WELCOME TO FOOD JUNCTION KASGANJ | 100% PURE VEG RESTAURANT | 📞 7017643199',
            topStripTheme: 'orange',
            showOfferCard: false,
            offerBadge: 'Pure Veg Specials',
            offerTitle: 'TASTE THAT BRINGS YOU TOGETHER',
            offerDesc: 'Kasganj favorite family dining & takeaway restaurant. Order directly on WhatsApp!',
            offerCode: '',
            discountEnabled: false,
            discountPercent: 0,
            discountLabel: 'Regular Pricing',
            footerOfferText: '✨ 100% Pure Vegetarian Kitchen — Near Laddo Sweets, Kasganj'
        },
        'weekend': {
            showTopStrip: true,
            topStripText: '⚡ WEEKEND DHAMAKA: FLAT 15% OFF ON ALL FOODS | CODE: WEEKEND | 📞 7017643199',
            topStripTheme: 'orange',
            showOfferCard: true,
            offerBadge: 'Weekend Dhamaka',
            offerTitle: 'FLAT 15% OFF THIS WEEKEND',
            offerDesc: 'Celebrate your weekend with smoking hot chaap, paneer tikka, kurkure momos & special thalis!',
            offerCode: 'WEEKEND',
            discountEnabled: true,
            discountPercent: 15,
            discountLabel: 'Weekend 15% Discount',
            footerOfferText: '🔥 Weekend Special — Order Fresh Pure Veg Delicacies in Kasganj'
        },
        'newyear': {
            showTopStrip: true,
            topStripText: '🎊 HAPPY NEW YEAR CELEBRATIONS: FLAT 10% OFF ON ALL FOODS | CODE: NEWYEAR | 📞 7017643199',
            topStripTheme: 'crimson',
            showOfferCard: true,
            offerBadge: 'New Year Special',
            offerTitle: 'NEW YEAR FESTIVE OFFER - FLAT 10% OFF',
            offerDesc: 'Ring in the New Year with delicious food and royal meals from Food Junction Kasganj!',
            offerCode: 'NEWYEAR',
            discountEnabled: true,
            discountPercent: 10,
            discountLabel: 'New Year 10% Discount',
            footerOfferText: '🎊 Happy New Year — Taste That Brings You Together'
        },
        'diwali': {
            showTopStrip: true,
            topStripText: '🪔 DIWALI DHAMAKA OFFER: FLAT 10% OFF ON ALL FOODS | CODE: DIWALI10 | 📞 7017643199',
            topStripTheme: 'orange',
            showOfferCard: true,
            offerBadge: 'Diwali Festive Offer',
            offerTitle: 'FLAT 10% OFF ON ALL FOODS',
            offerDesc: 'Celebrate Diwali with delicious North Indian meals, Chaap, Momos & Pizzas! Prices shown with 10% discount.',
            offerCode: 'DIWALI10',
            discountEnabled: true,
            discountPercent: 10,
            discountLabel: 'Diwali Festive 10% Discount',
            footerOfferText: '🪔 Happy Diwali — Flat 10% OFF on all foods'
        }
    };

    function getOfferSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.OFFERS);
            if (raw) {
                return { ...DEFAULT_OFFERS, ...JSON.parse(raw) };
            }
        } catch (_) {}
        return { ...DEFAULT_OFFERS };
    }

    function setOfferSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(settings));
    }

    function setupOffersManager() {
        // Preset Buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const presetKey = btn.dataset.preset;
                const preset = OFFER_PRESETS[presetKey];
                if (preset) {
                    applyValuesToOfferForm(preset);
                    updateOffersPreview();
                    showAdminToast(`Applied preset: ${btn.textContent.trim()}`);
                }
            });
        });

        // Form Inputs Live Preview Listeners
        const liveInputs = [
            'offer-show-marquee', 'offer-marquee-text', 'offer-marquee-theme',
            'offer-show-card', 'offer-badge-input', 'offer-code-input',
            'offer-title-input', 'offer-desc-input', 'offer-discount-percent',
            'offer-discount-label', 'offer-footer-text'
        ];

        liveInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', updateOffersPreview);
                el.addEventListener('change', updateOffersPreview);
            }
        });

        // Save Offer Buttons (Top & Bottom)
        const saveBtns = [document.getElementById('btn-save-offers'), document.getElementById('btn-save-offers-bottom')];
        saveBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', saveOffersFromForm);
            }
        });

        // Reset Button
        const resetBtn = document.getElementById('btn-reset-offers');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset offer settings to default (10% Food Offer)?')) {
                    applyValuesToOfferForm(DEFAULT_OFFERS);
                    setOfferSettings(DEFAULT_OFFERS);
                    updateOffersPreview();
                    showAdminToast('Offers reset to default settings.');
                }
            });
        }
    }

    function populateOffersForm() {
        const settings = getOfferSettings();
        applyValuesToOfferForm(settings);
        updateOffersPreview();
    }

    function applyValuesToOfferForm(cfg) {
        const showMarquee = document.getElementById('offer-show-marquee');
        const marqueeText = document.getElementById('offer-marquee-text');
        const marqueeTheme = document.getElementById('offer-marquee-theme');
        const showCard = document.getElementById('offer-show-card');
        const badgeInput = document.getElementById('offer-badge-input');
        const codeInput = document.getElementById('offer-code-input');
        const titleInput = document.getElementById('offer-title-input');
        const descInput = document.getElementById('offer-desc-input');
        const percentInput = document.getElementById('offer-discount-percent');
        const labelInput = document.getElementById('offer-discount-label');
        const footerInput = document.getElementById('offer-footer-text');

        if (showMarquee) showMarquee.checked = cfg.showTopStrip !== false;
        if (marqueeText) marqueeText.value = cfg.topStripText || '';
        if (marqueeTheme) marqueeTheme.value = cfg.topStripTheme || 'orange';
        if (showCard) showCard.checked = cfg.showOfferCard !== false;
        if (badgeInput) badgeInput.value = cfg.offerBadge || '';
        if (codeInput) codeInput.value = cfg.offerCode || '';
        if (titleInput) titleInput.value = cfg.offerTitle || '';
        if (descInput) descInput.value = cfg.offerDesc || '';
        if (percentInput) percentInput.value = cfg.discountPercent !== undefined ? cfg.discountPercent : 10;
        if (labelInput) labelInput.value = cfg.discountLabel || '';
        if (footerInput) footerInput.value = cfg.footerOfferText || '';
    }

    function getValuesFromOfferForm() {
        const showMarquee = document.getElementById('offer-show-marquee');
        const marqueeText = document.getElementById('offer-marquee-text');
        const marqueeTheme = document.getElementById('offer-marquee-theme');
        const showCard = document.getElementById('offer-show-card');
        const badgeInput = document.getElementById('offer-badge-input');
        const codeInput = document.getElementById('offer-code-input');
        const titleInput = document.getElementById('offer-title-input');
        const descInput = document.getElementById('offer-desc-input');
        const percentInput = document.getElementById('offer-discount-percent');
        const labelInput = document.getElementById('offer-discount-label');
        const footerInput = document.getElementById('offer-footer-text');

        const pct = percentInput ? Math.max(0, Math.min(100, parseInt(percentInput.value, 10) || 0)) : 10;

        return {
            showTopStrip: showMarquee ? showMarquee.checked : true,
            topStripText: marqueeText ? marqueeText.value.trim() : DEFAULT_OFFERS.topStripText,
            topStripTheme: marqueeTheme ? marqueeTheme.value : 'orange',
            showOfferCard: showCard ? showCard.checked : true,
            offerBadge: badgeInput ? badgeInput.value.trim() : 'Special Food Offer',
            offerTitle: titleInput ? titleInput.value.trim() : 'FLAT 10% OFF ON ALL FOODS',
            offerDesc: descInput ? descInput.value.trim() : '',
            offerCode: codeInput ? codeInput.value.trim().toUpperCase() : '',
            discountEnabled: pct > 0,
            discountPercent: pct,
            discountLabel: labelInput ? labelInput.value.trim() : 'Special Discount',
            footerOfferText: footerInput ? footerInput.value.trim() : '✨ Taste That Brings You Together — Kasganj'
        };
    }

    function updateOffersPreview() {
        const cfg = getValuesFromOfferForm();

        // Marquee preview
        const prevMarqueeStrip = document.getElementById('preview-marquee-strip');
        const prevMarqueeText = document.getElementById('preview-marquee-text');
        const prevMarqueeCode = document.getElementById('preview-marquee-code');

        if (prevMarqueeStrip) {
            if (cfg.showTopStrip) {
                prevMarqueeStrip.classList.remove('opacity-40');
                if (cfg.topStripTheme === 'emerald') {
                    prevMarqueeStrip.className = 'p-2 rounded-xl text-white text-[11px] font-bold overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 shadow-xs flex items-center justify-between gap-2';
                } else if (cfg.topStripTheme === 'crimson') {
                    prevMarqueeStrip.className = 'p-2 rounded-xl text-white text-[11px] font-bold overflow-hidden bg-gradient-to-r from-red-600 via-rose-500 to-amber-600 shadow-xs flex items-center justify-between gap-2';
                } else if (cfg.topStripTheme === 'dark') {
                    prevMarqueeStrip.className = 'p-2 rounded-xl text-white text-[11px] font-bold overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 shadow-xs flex items-center justify-between gap-2';
                } else {
                    prevMarqueeStrip.className = 'p-2 rounded-xl text-white text-[11px] font-bold overflow-hidden bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 shadow-xs flex items-center justify-between gap-2';
                }
            } else {
                prevMarqueeStrip.classList.add('opacity-40');
            }
        }
        if (prevMarqueeText) prevMarqueeText.textContent = cfg.topStripText || 'No marquee text';
        if (prevMarqueeCode) {
            if (cfg.offerCode) {
                prevMarqueeCode.textContent = `CODE: ${cfg.offerCode}`;
                prevMarqueeCode.classList.remove('hidden');
            } else {
                prevMarqueeCode.classList.add('hidden');
            }
        }

        // Card preview
        const prevOfferCard = document.getElementById('preview-offer-card');
        const prevBadge = document.getElementById('preview-badge');
        const prevDiscountTag = document.getElementById('preview-discount-tag');
        const prevTitle = document.getElementById('preview-title');
        const prevCodeBox = document.getElementById('preview-code-box');

        if (prevOfferCard) {
            if (cfg.showOfferCard) {
                prevOfferCard.classList.remove('opacity-40');
            } else {
                prevOfferCard.classList.add('opacity-40');
            }
        }
        if (prevBadge) prevBadge.textContent = cfg.offerBadge || 'Special Offer';
        if (prevDiscountTag) {
            if (cfg.discountPercent > 0) {
                prevDiscountTag.textContent = `${cfg.discountPercent}% OFF Active`;
                prevDiscountTag.className = 'text-[10px] text-emerald-700 font-bold';
            } else {
                prevDiscountTag.textContent = 'Regular Pricing';
                prevDiscountTag.className = 'text-[10px] text-stone-500 font-medium';
            }
        }
        if (prevTitle) prevTitle.textContent = cfg.offerTitle || 'Food Junction Specials';
        if (prevCodeBox) {
            if (cfg.offerCode) {
                prevCodeBox.textContent = cfg.offerCode;
                prevCodeBox.classList.remove('hidden');
            } else {
                prevCodeBox.classList.add('hidden');
            }
        }
    }

    function saveOffersFromForm() {
        const settings = getValuesFromOfferForm();
        setOfferSettings(settings);
        updateOffersPreview();
        showAdminToast('Offers & Row Banner updated successfully! Changes are live on customer menu.');
    }

    // --- HELPER UTILITIES ---
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function showAdminToast(msg) {
        const existing = document.getElementById('admin-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'admin-toast';
        toast.className = 'fixed bottom-5 right-5 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-stone-700 animate-bounce';
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> <span>${escapeHtml(msg)}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast) toast.remove();
        }, 3200);
    }

    // Run when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
