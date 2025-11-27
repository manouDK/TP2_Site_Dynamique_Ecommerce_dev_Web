document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Initialisation des filtres alimentation...');

  const productGrid = document.querySelector('.products-grid');
  const products = Array.from(document.querySelectorAll('.product-card'));

  function parsePrice(priceText) {
    return parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
  }

  function applyFilters() {
    console.log('🔍 Application des filtres alimentation...');
    const selectedCategory = document.getElementById('category').value;
    const maxPrice = document.getElementById('price-range').value;
    const sortBy = document.getElementById('sort').value;

    let filteredProducts = products.filter(product => {
      const categoryElement = product.querySelector('.product-category');
      const category = categoryElement ? categoryElement.textContent.toLowerCase() : '';
      const priceElement = product.querySelector('.product-price');
      const price = parsePrice(priceElement.textContent);

      const categoryMatch =
        !selectedCategory || category.includes(selectedCategory.toLowerCase());

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
  }

  ['category', 'price-range', 'sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  applyFilters();
});