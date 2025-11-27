// script-filtres.js
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price-range');
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');

    // Récupère les cartes produits dans un tableau et conserve l'ordre initial (pour "Populaires")
    const originalCards = Array.from(productGrid.querySelectorAll('.product-card')).map((card, i) => {
        // stocke l'index original
        card.dataset.originalIndex = i;
        return card;
    });

    // fonction utilitaire pour extraire le prix numérique depuis le texte "10.000 FCFA" -> 10000
    function parsePrice(priceText) {
        if (!priceText) return 0;
        // enlève tout sauf les chiffres
        const digits = priceText.replace(/\D+/g, '');
        return digits ? parseInt(digits, 10) : 0;
    }

    // Applique les filtres et le tri, et met à jour le DOM
    function applyFiltersAndSort() {
        const selectedCategory = categorySelect ? categorySelect.value : '';
        const selectedPriceMax = priceSelect && priceSelect.value ? parseInt(priceSelect.value, 10) : null;
        const sortMode = sortSelect ? sortSelect.value : 'featured';

        // Filtrage
        let filtered = originalCards.filter(card => {
            // Si la carte n'a pas de price ou name, on la garde par défaut
            const priceEl = card.querySelector('.product-price');
            const price = priceEl ? parsePrice(priceEl.textContent) : 0;

            // 1) Filtre prix
            if (selectedPriceMax && price > selectedPriceMax) return false;

            // 2) Filtre catégorie (optionnel) :
            // Pour que ça marche, chaque .product-card doit contenir un attribut data-category="accessoires" (ou plusieurs séparés par espace)
            if (selectedCategory) {
                const cardCategories = (card.dataset.category || '').toLowerCase().split(/\s+/).filter(Boolean);
                if (!cardCategories.length) {
                    // Si pas d'attribut data-category défini, on considère la carte comme appartenant à toutes les catégories
                    // (ou tu peux décider de la filtrer en la rejetant : ici on la garde)
                } else if (!cardCategories.includes(selectedCategory.toLowerCase())) {
                    return false;
                }
            }

            return true;
        });

        // Tri
        if (sortMode === 'price-asc') {
            filtered.sort((a, b) => {
                const pa = parsePrice(a.querySelector('.product-price')?.textContent || '');
                const pb = parsePrice(b.querySelector('.product-price')?.textContent || '');
                return pa - pb;
            });
        } else if (sortMode === 'price-desc') {
            filtered.sort((a, b) => {
                const pa = parsePrice(a.querySelector('.product-price')?.textContent || '');
                const pb = parsePrice(b.querySelector('.product-price')?.textContent || '');
                return pb - pa;
            });
        } else if (sortMode === 'name') {
            filtered.sort((a, b) => {
                const na = (a.querySelector('.product-name')?.textContent || '').trim().toLowerCase();
                const nb = (b.querySelector('.product-name')?.textContent || '').trim().toLowerCase();
                return na.localeCompare(nb, 'fr', { sensitivity: 'base' });
            });
        } else { // 'featured' : remettre l'ordre original
            filtered.sort((a, b) => parseInt(a.dataset.originalIndex, 10) - parseInt(b.dataset.originalIndex, 10));
        }

        // Met à jour le DOM : supprime tout et ré-insère dans l'ordre filtré
        productGrid.innerHTML = '';
        filtered.forEach(card => productGrid.appendChild(card));
    }

    // Attache événements
    if (categorySelect) categorySelect.addEventListener('change', applyFiltersAndSort);
    if (priceSelect) priceSelect.addEventListener('change', applyFiltersAndSort);
    if (sortSelect) sortSelect.addEventListener('change', applyFiltersAndSort);

    // Exécute une première fois pour appliquer les valeurs par défaut
    applyFiltersAndSort();
});
