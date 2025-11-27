// script-filtres.js (version adaptée : catégories nuisette/lingette/creme)
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price-range');
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');

    if (!productGrid) return;

    // Récupère les cartes produits et stocke l'ordre initial
    const originalCards = Array.from(productGrid.querySelectorAll('.product-card')).map((card, i) => {
        card.dataset.originalIndex = i;
        return card;
    });

    // utilitaire : extrait le nombre entier du prix (ex: "10.000 FCFA" -> 10000)
    function parsePrice(priceText) {
        if (!priceText) return 0;
        // nettoie tout caractère non numérique (gère espaces insécables, points, virgules)
        const digits = priceText.replace(/\s| |,/g, '').replace(/\./g, '').replace(/\D/g, '');
        return digits ? parseInt(digits, 10) : 0;
    }

    // utilitaire : normalise une catégorie (gère pluriels et accents)
    function normalizeCategory(cat) {
        if (!cat) return '';
        return cat.toString().trim().toLowerCase()
            .replace(/\s+/g, '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // supprime accents
    }

    function applyFiltersAndSort() {
        const selectedCategory = normalizeCategory(categorySelect ? categorySelect.value : '');
        const selectedPriceMax = priceSelect && priceSelect.value ? parseInt(priceSelect.value, 10) : null;
        const sortMode = sortSelect ? sortSelect.value : 'featured';

        let filtered = originalCards.filter(card => {
            const priceEl = card.querySelector('.product-price');
            const price = priceEl ? parsePrice(priceEl.textContent || '') : 0;

            // Filtre prix
            if (selectedPriceMax && price > selectedPriceMax) return false;

            // Filtre catégorie
            if (selectedCategory) {
                // récupère data-category (peut contenir plusieurs catégories séparées par espace)
                const raw = card.dataset.category || '';
                const cardCats = raw.split(/\s+/).map(normalizeCategory).filter(Boolean);

                // Si aucune catégorie présente sur la carte, on la considère visible par défaut
                if (cardCats.length === 0) {
                    // garder la carte (ou changer pour filtrer strictement en retournant false)
                } else {
                    // accepter si un des éléments matches la catégorie sélectionnée
                    if (!cardCats.includes(selectedCategory)) return false;
                }
            }

            return true;
        });

        // Tri
        if (sortMode === 'price-asc') {
            filtered.sort((a, b) => parsePrice(a.querySelector('.product-price')?.textContent || '') - parsePrice(b.querySelector('.product-price')?.textContent || ''));
        } else if (sortMode === 'price-desc') {
            filtered.sort((a, b) => parsePrice(b.querySelector('.product-price')?.textContent || '') - parsePrice(a.querySelector('.product-price')?.textContent || ''));
        } else if (sortMode === 'name') {
            filtered.sort((a, b) => {
                const na = (a.querySelector('.product-name')?.textContent || '').trim().toLowerCase();
                const nb = (b.querySelector('.product-name')?.textContent || '').trim().toLowerCase();
                return na.localeCompare(nb, 'fr', { sensitivity: 'base' });
            });
        } else {
            // featured => remettre l'ordre original
            filtered.sort((a, b) => parseInt(a.dataset.originalIndex, 10) - parseInt(b.dataset.originalIndex, 10));
        }

        // Mise à jour DOM : on vide et on ré-insère les cartes filtrées dans l'ordre
        productGrid.innerHTML = '';
        filtered.forEach(card => productGrid.appendChild(card));
    }

    // Attache événements
    if (categorySelect) categorySelect.addEventListener('change', applyFiltersAndSort);
    if (priceSelect) priceSelect.addEventListener('change', applyFiltersAndSort);
    if (sortSelect) sortSelect.addEventListener('change', applyFiltersAndSort);

    // Appliquer au chargement
    applyFiltersAndSort();
});
