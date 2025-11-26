document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initialisation des filtres chaussures...");

    // Récupère le conteneur des produits et tous les produits
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(document.querySelectorAll('.product-card'));

    // Fonction pour convertir le prix en nombre
    function parsePrice(priceText) {
        return parseInt(priceText.replace(/[^\d]/g, '')) || 0;
    }

    // Fonction principale pour filtrer et trier
    function applyFilters() {
        console.log("🔍 Application des filtres...");
        
        // Récupère les valeurs des filtres
        const selectedSize = document.getElementById('category').value;
        const maxPrice = document.getElementById('price-range').value;
        const sortBy = document.getElementById('sort').value;

        console.log("Filtres - Pointure:", selectedSize, "Prix max:", maxPrice, "Tri:", sortBy);

        // ÉTAPE 1: Filtrer les produits
        let filteredProducts = products.filter(product => {
            const size = product.getAttribute('data-pointure');
            const priceElement = product.querySelector('.product-price');
            const price = parsePrice(priceElement.textContent);

            // Vérifie la pointure
            const sizeMatch = !selectedSize || size === selectedSize;
            
            // Vérifie le prix
            const priceMatch = !maxPrice || price <= parseInt(maxPrice);

            return sizeMatch && priceMatch;
        });

        console.log(`📊 ${filteredProducts.length} produits après filtrage`);

        // ÉTAPE 2: Trier les produits
        if (sortBy !== 'none') {
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

        // ÉTAPE 3: Réorganiser l'affichage
        // Vide le conteneur
        productGrid.innerHTML = '';

        // Réajoute les produits filtrés dans le nouvel ordre
        filteredProducts.forEach(product => {
            productGrid.appendChild(product);
        });

        // ÉTAPE 4: Mettre à jour le compteur
        updateProductCount(filteredProducts.length);
    }

    // Fonction pour mettre à jour le compteur de produits
    function updateProductCount(count) {
        const statNumbers = document.querySelectorAll('.stat-card .stat-number');
        if (statNumbers.length > 0) {
            statNumbers[0].textContent = count + '+';
            console.log(`🔄 Compteur mis à jour: ${count}+ produits`);
        }
    }

    // Ajouter les écouteurs d'événements
    const filters = ['category', 'price-range', 'sort'];
    
    filters.forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('change', applyFilters);
            console.log(`✅ Écouteur ajouté pour: ${filterId}`);
        } else {
            console.log(`❌ Élément non trouvé: ${filterId}`);
        }
    });

    // Vérifier que tous les éléments existent
    console.log("Éléments trouvés:");
    console.log("- Product grid:", !!productGrid);
    console.log("- Produits:", products.length);
    console.log("- Filtre pointure:", !!document.getElementById('category'));
    console.log("- Filtre prix:", !!document.getElementById('price-range'));
    console.log("- Filtre tri:", !!document.getElementById('sort'));

    // Appliquer les filtres au chargement
    applyFilters();
});