/**
 * Navigation and Search Functionality
 */

class Navigation {
  constructor() {
    this.mobileMenuOpen = false;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSearch();
    this.setupStickyHeader();
    this.highlightActiveLink();
  }

  setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        mobileMenu.classList.toggle('hidden');
        menuToggle.setAttribute('aria-expanded', this.mobileMenuOpen.toString());
        
        // Animate hamburger icon
        const icon = menuToggle.querySelector('svg');
        if (icon) {
          icon.classList.toggle('rotate-90');
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.mobileMenuOpen && !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
          this.mobileMenuOpen = false;
          mobileMenu.classList.add('hidden');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
      let searchTimeout;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
          searchResults.classList.add('hidden');
          return;
        }
        
        // Debounce search
        searchTimeout = setTimeout(() => {
          this.performSearch(query, searchResults);
        }, 300);
      });
      
      // Close search results when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
          searchResults.classList.add('hidden');
        }
      });
    }
  }

  performSearch(query, resultsContainer) {
    // Mock search data - in production, this would call an API
    const mockProducts = [
      { id: 1, name: 'JUUL Device Starter Kit', category: 'E-cigarettes', price: 29.99, image: 'juul.jpg' },
      { id: 2, name: 'Vuse Alto', category: 'E-cigarettes', price: 24.99, image: 'vuse.jpg' },
      { id: 3, name: 'Strawberry Ice E-Liquid', category: 'E-liquids', price: 19.99, image: 'strawberry.jpg' },
      { id: 4, name: 'Mango Blast E-Liquid', category: 'E-liquids', price: 19.99, image: 'mango.jpg' },
      { id: 5, name: 'Marlboro Red', category: 'Cigarettes', price: 14.99, image: 'marlboro.jpg' },
      { id: 6, name: 'Replacement Coils 5-Pack', category: 'Accessories', price: 12.99, image: 'coils.jpg' },
    ];
    
    const results = mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    this.displaySearchResults(results, resultsContainer);
  }

  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = `
        <div class="p-4 text-gray-400">
          No results found. Try different keywords.
        </div>
      `;
      container.classList.remove('hidden');
      return;
    }
    
    const resultsHTML = results.map(product => `
      <a href="shop.html?product=${product.id}" class="flex items-center gap-3 p-3 hover:bg-dark-700 transition-colors">
        <div class="w-12 h-12 bg-dark-600 rounded flex items-center justify-center text-xs text-gray-400">
          IMG
        </div>
        <div class="flex-1">
          <div class="font-semibold text-white">${product.name}</div>
          <div class="text-sm text-gray-400">${product.category}</div>
        </div>
        <div class="text-accent-500 font-bold">$${product.price.toFixed(2)}</div>
      </a>
    `).join('');
    
    container.innerHTML = resultsHTML;
    container.classList.remove('hidden');
  }

  setupStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
      
      lastScrollTop = scrollTop;
    });
  }

  highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('nav-link-active');
      }
    });
  }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});

