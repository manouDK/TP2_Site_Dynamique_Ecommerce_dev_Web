document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Initialisation des filtres accessoires...');

  const productGrid = document.querySelector('.product-grid');
  const products = Array.from(document.querySelectorAll('.product-card'));

  function parsePrice(priceText) {
    return parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
  }

  function applyFilters() {
    console.log('🔍 Application des filtres accessoires...');
    const selectedCategory = document.getElementById('category').value;
    const maxPrice = document.getElementById('price-range').value;
    const sortBy = document.getElementById('sort').value;

    let filteredProducts = products.filter(product => {
      const type = product.getAttribute('data-type') || '';
      const priceElement = product.querySelector('.product-price');
      const price = parsePrice(priceElement.textContent);

      const categoryMatch =
        !selectedCategory || type === selectedCategory;

      const priceMatch =
        !maxPrice || price <= parseInt(maxPrice, 10);

      return categoryMatch && priceMatch;
    });

    if (sortBy !== 'featured') {
      filteredProducts.sort((a, b) => {
        const priceA = parsePrice(a.querySelector('.product-price').textContent);
        const priceB = parsePrice(b.querySelector('.product-price').textContent);
        const nameA = a.querySelector('.product-name').textContent.toLowerCase();
        const nameB = b.querySelector('.product-name').textContent.toLowerCase();

        switch (sortBy) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'name':
            return nameA.localeCompare(nameB);
          default:
            return 0;
        }
      });
    }

    productGrid.innerHTML = '';
    filteredProducts.forEach(product => productGrid.appendChild(product));

    // mise à jour du compteur "16+"
    const statNumbers = document.querySelectorAll('.stat-card .stat-number');
    if (statNumbers.length > 0) {
      statNumbers[0].textContent = filteredProducts.length + '+';
    }
  }

  ['category', 'price-range', 'sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  applyFilters();
});
