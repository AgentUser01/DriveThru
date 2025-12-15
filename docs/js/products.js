/**
 * Product Catalog and Filtering
 */

class ProductCatalog {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentCategory = 'all';
    this.currentSort = 'featured';
    this.init();
  }

  init() {
    this.loadProducts();
    this.setupFilters();
    this.setupSort();
    this.setupQuickView();
  }

  loadProducts() {
    // Mock product data - in production, fetch from API
    this.products = [
      {
        id: 1,
        name: 'JUUL Device Starter Kit',
        category: 'e-cigarettes',
        price: 29.99,
        rating: 4.5,
        reviews: 128,
        nicotine: '5%',
        new: true,
        onSale: false,
        description: 'Complete starter kit with device and two flavor pods.',
        compatibility: 'JUUL Pods only'
      },
      {
        id: 2,
        name: 'Vuse Alto Vape Kit',
        category: 'e-cigarettes',
        price: 24.99,
        rating: 4.3,
        reviews: 95,
        nicotine: '5%',
        new: false,
        onSale: true,
        description: 'Rechargeable vape device with enhanced flavor delivery.',
        compatibility: 'Vuse Alto Pods'
      },
      {
        id: 3,
        name: 'Strawberry Ice E-Liquid 60ml',
        category: 'e-liquids',
        price: 19.99,
        rating: 4.7,
        reviews: 203,
        nicotine: '0mg, 3mg, 6mg, 12mg',
        new: false,
        onSale: false,
        description: 'Sweet strawberries with a cool menthol finish.',
        compatibility: 'Most sub-ohm devices'
      },
      {
        id: 4,
        name: 'Mango Blast E-Liquid 60ml',
        category: 'e-liquids',
        price: 19.99,
        rating: 4.8,
        reviews: 267,
        nicotine: '0mg, 3mg, 6mg, 12mg',
        new: true,
        onSale: false,
        description: 'Tropical mango explosion with every puff.',
        compatibility: 'Most sub-ohm devices'
      },
      {
        id: 5,
        name: 'Marlboro Red King Size',
        category: 'cigarettes',
        price: 14.99,
        rating: 4.0,
        reviews: 45,
        nicotine: 'Regular',
        new: false,
        onSale: false,
        description: 'Classic full-flavor cigarettes.',
        compatibility: 'N/A'
      },
      {
        id: 6,
        name: 'Replacement Coils 5-Pack',
        category: 'accessories',
        price: 12.99,
        rating: 4.6,
        reviews: 156,
        nicotine: 'N/A',
        new: false,
        onSale: true,
        description: 'Compatible with most popular vape devices. 0.5Ω resistance.',
        compatibility: 'Universal fit'
      },
      {
        id: 7,
        name: 'USB-C Charging Cable',
        category: 'accessories',
        price: 7.99,
        rating: 4.4,
        reviews: 89,
        nicotine: 'N/A',
        new: false,
        onSale: false,
        description: 'Fast charging cable for vape devices.',
        compatibility: 'USB-C devices'
      },
      {
        id: 8,
        name: 'Blue Raspberry Ice 30ml',
        category: 'e-liquids',
        price: 14.99,
        rating: 4.5,
        reviews: 134,
        nicotine: '20mg, 35mg, 50mg Salt Nic',
        new: true,
        onSale: false,
        description: 'Tart blue raspberry with icy cool menthol.',
        compatibility: 'Pod systems'
      }
    ];
    
    this.filteredProducts = [...this.products];
    this.displayProducts();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        this.currentCategory = category;
        
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('bg-accent-500', 'text-white'));
        button.classList.add('bg-accent-500', 'text-white');
        
        this.filterProducts();
      });
    });
  }

  setupSort() {
    const sortSelect = document.getElementById('sort-products');
    
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.filterProducts();
      });
    }
  }

  filterProducts() {
    // Filter by category
    if (this.currentCategory === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.currentCategory);
    }
    
    // Sort products
    switch (this.currentSort) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - show new items first, then by rating
        this.filteredProducts.sort((a, b) => {
          if (a.new && !b.new) return -1;
          if (!a.new && b.new) return 1;
          return b.rating - a.rating;
        });
    }
    
    this.displayProducts();
  }

  displayProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    if (this.filteredProducts.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-gray-400 text-lg">No products found in this category.</p>
        </div>
      `;
      return;
    }
    
    const productsHTML = this.filteredProducts.map(product => `
      <div class="product-card group" data-product-id="${product.id}">
        <div class="relative">
          <div class="aspect-square bg-dark-700 flex items-center justify-center text-gray-500">
            <span class="text-4xl">📦</span>
          </div>
          ${product.new ? '<span class="badge-new absolute top-3 left-3">NEW</span>' : ''}
          ${product.onSale ? '<span class="badge-sale absolute top-3 right-3">SALE</span>' : ''}
          <button class="quick-view-btn absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold" data-product-id="${product.id}" aria-label="Quick view ${product.name}">
            Quick View
          </button>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-1 line-clamp-2 text-white group-hover:text-accent-500 transition-colors">${product.name}</h3>
          <div class="star-rating text-sm mb-2">
            ${this.generateStars(product.rating)}
            <span class="text-gray-400 ml-1">(${product.reviews})</span>
          </div>
          <div class="flex items-center justify-between mt-3">
            <span class="text-accent-500 font-bold text-xl">$${product.price.toFixed(2)}</span>
            <button class="add-to-order-btn btn-primary py-2 px-4 text-sm" data-product-id="${product.id}" aria-label="Add ${product.name} to order">
              Add to Order
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = productsHTML;
    this.attachQuickViewListeners();
    this.attachAddToOrderListeners();
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    stars += '☆'.repeat(emptyStars);
    
    return stars;
  }

  setupQuickView() {
    const modal = document.getElementById('quick-view-modal');
    const closeBtn = document.getElementById('close-quick-view');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal?.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
    
    // Close on overlay click
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  attachQuickViewListeners() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        const productId = parseInt(btn.getAttribute('data-product-id'));
        this.showQuickView(productId);
      });
    });
  }

  attachAddToOrderListeners() {
    const addToOrderBtns = document.querySelectorAll('.add-to-order-btn');
    
    addToOrderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        const productId = parseInt(btn.getAttribute('data-product-id'));
        const product = this.products.find(p => p.id === productId);
        
        if (product && window.orderBuilder) {
          window.orderBuilder.addItem(product);
        } else if (!window.orderBuilder) {
          console.error('OrderBuilder not initialized');
        }
      });
    });
  }

  showQuickView(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
      <div class="grid md:grid-cols-2 gap-8">
        <div class="aspect-square bg-dark-700 rounded-lg flex items-center justify-center text-9xl">
          📦
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-2 text-white">${product.name}</h2>
          <div class="star-rating mb-4 text-lg">
            ${this.generateStars(product.rating)}
            <span class="text-gray-400 ml-1">(${product.reviews} reviews)</span>
          </div>
          <p class="text-4xl font-bold text-accent-500 mb-6">$${product.price.toFixed(2)}</p>
          <p class="text-gray-300 mb-6 text-lg leading-relaxed">${product.description}</p>
          <div class="space-y-3 mb-8 text-sm bg-dark-700/30 p-4 rounded-lg">
            <div class="flex justify-between border-b border-dark-600 pb-2">
              <span class="text-gray-400">Category</span> 
              <span class="capitalize font-semibold text-white">${product.category}</span>
            </div>
            ${product.nicotine !== 'N/A' ? `
            <div class="flex justify-between border-b border-dark-600 pb-2">
              <span class="text-gray-400">Nicotine Strength</span>
              <span class="font-semibold text-white">${product.nicotine}</span>
            </div>` : ''}
            <div class="flex justify-between pt-1">
              <span class="text-gray-400">Compatibility</span>
              <span class="font-semibold text-white">${product.compatibility}</span>
            </div>
          </div>
          
          <button id="quick-view-add-btn" class="btn-primary w-full py-4 text-lg mb-4 shadow-lg transform transition hover:scale-[1.02]">
            Add to Order
          </button>
          
          <div class="health-warning mt-6">
            <strong>⚠️ Health Warning:</strong> This product contains nicotine. Nicotine is an addictive chemical.
          </div>
        </div>
      </div>
    `;
    
    // Attach listener to the new button
    const addBtn = document.getElementById('quick-view-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (window.orderBuilder) {
          window.orderBuilder.addItem(product);
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// Initialize product catalog on shop page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('products-grid')) {
    new ProductCatalog();
  }
});
