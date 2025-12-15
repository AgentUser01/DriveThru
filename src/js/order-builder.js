/**
 * Drive-Thru Order Builder
 * Handles the floating widget, order drawer, and "Window Mode"
 */

class OrderBuilder {
  constructor() {
    this.order = [];
    this.isOpen = false;
    this.STORAGE_KEY = 'drive_thru_order';
    
    // DOM Elements
    this.widgetEl = null;
    this.drawerEl = null;
    this.overlayEl = null;
    this.windowModeEl = null;

    this.init();
  }

  init() {
    this.loadOrder();
    this.injectStyles();
    this.renderUI();
    this.attachGlobalListeners();
    this.updateUI();
  }

  // --- State Management ---

  loadOrder() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this.order = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved order', e);
        this.order = [];
      }
    }
  }

  saveOrder() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.order));
    this.updateUI();
  }

  addItem(product) {
    const existing = this.order.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.order.push({
        ...product,
        quantity: 1
      });
    }
    this.saveOrder();
    this.openDrawer();
    this.showToast(`Added ${product.name} to order`);
  }

  removeItem(productId) {
    this.order = this.order.filter(item => item.id !== productId);
    this.saveOrder();
  }

  updateQuantity(productId, delta) {
    const item = this.order.find(item => item.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveOrder();
      }
    }
  }

  clearOrder() {
    if (confirm('Are you sure you want to clear your order?')) {
      this.order = [];
      this.saveOrder();
      this.closeWindowMode(); // Just in case
    }
  }

  getTotalItems() {
    return this.order.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.order.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // --- UI Rendering ---

  injectStyles() {
    // Basic structural styles for the drawer and widget if not in Tailwind
    // We rely mostly on Tailwind classes, but some dynamic overrides might be needed
  }

  renderUI() {
    // 1. Floating Widget
    this.widgetEl = document.createElement('div');
    this.widgetEl.id = 'order-widget';
    this.widgetEl.className = 'fixed bottom-6 right-6 z-40 transform transition-transform duration-300 translate-y-24'; // Hidden by default
    this.widgetEl.innerHTML = `
      <button class="bg-accent-500 hover:bg-accent-600 text-white rounded-full p-4 shadow-lg flex items-center gap-3 transition-all transform hover:scale-105">
        <span class="text-2xl">📝</span>
        <span class="font-bold hidden sm:inline">Current Order</span>
        <span id="widget-count" class="bg-white text-accent-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">0</span>
      </button>
    `;
    document.body.appendChild(this.widgetEl);

    // 2. Drawer Overlay
    this.overlayEl = document.createElement('div');
    this.overlayEl.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300';
    document.body.appendChild(this.overlayEl);

    // 3. Order Drawer
    this.drawerEl = document.createElement('div');
    this.drawerEl.className = 'fixed inset-y-0 right-0 w-full max-w-md bg-dark-800 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col border-l border-dark-700';
    this.drawerEl.innerHTML = `
      <div class="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-900">
        <div>
          <h2 class="text-2xl font-bold text-white">Your Order</h2>
          <p class="text-sm text-gray-400">Build your list for the drive-thru</p>
        </div>
        <button id="close-drawer" class="text-gray-400 hover:text-white p-2 text-2xl">&times;</button>
      </div>
      
      <div id="order-items" class="flex-1 overflow-y-auto p-6 space-y-4">
        <!-- Items go here -->
      </div>
      
      <div class="p-6 bg-dark-900 border-t border-dark-700 space-y-4">
        <div class="flex justify-between items-center text-lg font-bold text-white">
          <span>Estimated Total:</span>
          <span id="order-total" class="text-accent-500">$0.00</span>
        </div>
        <p class="text-xs text-gray-500 text-center">Payment is made at the window.</p>
        
        <div class="grid grid-cols-2 gap-4">
          <button id="clear-order" class="btn-outline py-3 text-sm">Clear List</button>
          <button id="window-mode-btn" class="btn-primary py-3 text-sm flex items-center justify-center gap-2">
            <span>🚗</span> I'm at the Window
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(this.drawerEl);

    // 4. Window Mode Overlay
    this.windowModeEl = document.createElement('div');
    this.windowModeEl.className = 'fixed inset-0 bg-black z-[60] hidden flex flex-col';
    this.windowModeEl.innerHTML = `
      <div class="p-6 flex justify-between items-center border-b border-gray-800">
        <h2 class="text-white text-xl font-bold">Window Mode</h2>
        <button id="exit-window-mode" class="text-gray-400 hover:text-white px-4 py-2 border border-gray-600 rounded">Close</button>
      </div>
      <div class="flex-1 overflow-y-auto p-8 flex flex-col justify-center items-center text-center">
        <div id="window-mode-list" class="space-y-8 w-full max-w-2xl">
          <!-- Large items go here -->
        </div>
        <div class="mt-12 pt-8 border-t-2 border-white/20 w-full max-w-2xl">
           <div class="text-gray-400 text-2xl mb-2">Total Estimate</div>
           <div id="window-mode-total" class="text-6xl font-bold text-white font-mono">$0.00</div>
        </div>
        <div class="mt-12 text-gray-500 animate-pulse">
          Show this screen to the attendant
        </div>
      </div>
    `;
    document.body.appendChild(this.windowModeEl);
  }

  attachGlobalListeners() {
    // Widget Toggle
    this.widgetEl.querySelector('button').addEventListener('click', () => this.toggleDrawer());
    
    // Drawer Close
    document.getElementById('close-drawer').addEventListener('click', () => this.closeDrawer());
    this.overlayEl.addEventListener('click', () => this.closeDrawer());

    // Clear Order
    document.getElementById('clear-order').addEventListener('click', () => this.clearOrder());

    // Window Mode
    document.getElementById('window-mode-btn').addEventListener('click', () => this.openWindowMode());
    document.getElementById('exit-window-mode').addEventListener('click', () => this.closeWindowMode());
  }

  // --- UI Logic ---

  toggleDrawer() {
    if (this.isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    this.isOpen = true;
    this.drawerEl.classList.remove('translate-x-full');
    this.overlayEl.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.isOpen = false;
    this.drawerEl.classList.add('translate-x-full');
    this.overlayEl.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  updateUI() {
    const totalItems = this.getTotalItems();
    const totalPrice = this.getTotalPrice();

    // Widget Visibility & Count
    const countEl = document.getElementById('widget-count');
    if (countEl) countEl.textContent = totalItems;
    
    if (totalItems > 0) {
      this.widgetEl.classList.remove('translate-y-24');
    } else {
      this.widgetEl.classList.add('translate-y-24');
      // If drawer is open but empty, maybe keep it open? Or close it? 
      // Let's keep it open so they can see it's empty if they cleared it.
    }

    // Render Drawer Items
    const listEl = document.getElementById('order-items');
    if (listEl) {
      if (this.order.length === 0) {
        listEl.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <span class="text-6xl mb-4">🛒</span>
            <p>Your list is empty.</p>
            <button onclick="document.querySelector('#close-drawer').click()" class="mt-4 text-accent-500 hover:underline">Start Browsing</button>
          </div>
        `;
        // Disable window mode button
        document.getElementById('window-mode-btn').classList.add('opacity-50', 'cursor-not-allowed');
        document.getElementById('window-mode-btn').disabled = true;
      } else {
        document.getElementById('window-mode-btn').classList.remove('opacity-50', 'cursor-not-allowed');
        document.getElementById('window-mode-btn').disabled = false;
        
        listEl.innerHTML = this.order.map(item => `
          <div class="flex gap-4 bg-dark-900 p-4 rounded-lg border border-dark-600">
             <div class="w-16 h-16 bg-dark-700 rounded flex items-center justify-center text-2xl">
               ${this.getEmojiForCategory(item.category)}
             </div>
             <div class="flex-1">
               <h3 class="font-bold text-white line-clamp-1">${item.name}</h3>
               <div class="text-accent-500 font-mono">$${item.price.toFixed(2)}</div>
               
               <div class="flex items-center gap-3 mt-2">
                 <button class="w-8 h-8 rounded bg-dark-700 text-white hover:bg-dark-600 flex items-center justify-center" onclick="window.orderBuilder.updateQuantity(${item.id}, -1)">-</button>
                 <span class="font-bold w-4 text-center">${item.quantity}</span>
                 <button class="w-8 h-8 rounded bg-dark-700 text-white hover:bg-dark-600 flex items-center justify-center" onclick="window.orderBuilder.updateQuantity(${item.id}, 1)">+</button>
                 
                 <button class="ml-auto text-red-400 hover:text-red-300 text-sm underline" onclick="window.orderBuilder.removeItem(${item.id})">Remove</button>
               </div>
             </div>
          </div>
        `).join('');
      }
    }

    // Update Totals
    const totalEl = document.getElementById('order-total');
    if (totalEl) totalEl.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // --- Window Mode ---

  openWindowMode() {
    if (this.order.length === 0) return;

    this.windowModeEl.classList.remove('hidden');
    
    // Render high contrast list
    const container = document.getElementById('window-mode-list');
    container.innerHTML = this.order.map(item => `
      <div class="flex justify-between items-center border-b border-gray-800 pb-4">
        <div class="text-left">
          <div class="text-4xl font-bold text-white mb-2">${item.quantity}x</div>
          <div class="text-2xl text-gray-300">${item.name}</div>
        </div>
        <div class="text-3xl font-mono text-white">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    document.getElementById('window-mode-total').textContent = `$${this.getTotalPrice().toFixed(2)}`;
    
    // Request full screen if possible (optional, might be annoying)
  }

  closeWindowMode() {
    this.windowModeEl.classList.add('hidden');
  }

  // --- Helpers ---

  getEmojiForCategory(category) {
    switch (category) {
      case 'e-cigarettes': return '🚬';
      case 'e-liquids': return '💧';
      case 'cigarettes': return '📦';
      case 'accessories': return '🔧';
      default: return '🛍️';
    }
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-[60] animate-fadeIn';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s';
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }
}

// Initialize
window.orderBuilder = new OrderBuilder();

