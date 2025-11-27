document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Initialisation des filtres aménagement...');

  const productGrid = document.querySelector('.product-grid');
  const products = Array.from(document.querySelectorAll('.product-card'));

  function parsePrice(priceText) {
    return parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
  }

  function applyFilters() {
    const selectedCategory = document.getElementById('amenagement-category').value;
    const maxPrice = document.getElementById('amenagement-price').value;
    const sortBy = document.getElementById('amenagement-sort').value;

    let filteredProducts = products.filter(product => {
      const category = product.getAttribute('data-category') || '';
      const priceElement = product.querySelector('.product-price');
      const price = parsePrice(priceElement.textContent);

      const categoryMatch =
        !selectedCategory || category === selectedCategory;

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

  ['amenagement-category', 'amenagement-price', 'amenagement-sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  applyFilters();
});