// ==========================================
// SYSTÈME DE GESTION DU PANIER - BÉBÉCONFORT
// ==========================================

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    // Initialiser le système
    init() {
        this.updateCartDisplay();
        this.attachEventListeners();
        this.updateCartCount();
    }

    // Charger le panier depuis localStorage
    loadCart() {
        const savedCart = localStorage.getItem('bebeconfort_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Sauvegarder le panier dans localStorage
    saveCart() {
        localStorage.setItem('bebeconfort_cart', JSON.stringify(this.cart));
    }
    // Ajouter un produit au panier
    // Ajouter un produit au panier
    addToCart(product) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
        this.showNotification('Produit ajouté au panier !');
    }

    // Supprimer un produit du panier
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
        this.showNotification('Produit retiré du panier', 'warning');
    }

    // Modifier la quantité d'un produit
    updateQuantity(productId, newQuantity) {
        const product = this.cart.find(item => item.id === productId);
        if (product) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                product.quantity = parseInt(newQuantity);
                this.saveCart();
                this.updateCartDisplay();
                this.updateCartCount();
            }
        }
    }

    // Calculer le sous-total
    calculateSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calculer les frais de livraison
    calculateShippingFee() {
        const subtotal = this.calculateSubtotal();
        if (subtotal === 0) return 0;
        if (subtotal >= 100000) return 0; // Livraison gratuite au-dessus de 100 000 FCFA
        return 5000;
    }

    // Calculer le total
    calculateTotal() {
        return this.calculateSubtotal() + this.calculateShippingFee();
    }

    // Formater les prix en FCFA
    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price) + ' FCFA';
    }

    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        const cartTableBody = document.querySelector('.cart-items-body');
        const cartTotalsDiv = document.querySelector('.cart-totals');
        
        if (!cartTableBody) return;

        if (this.cart.length === 0) {
            cartTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px;">
                        <p style="font-size: 18px; color: #666;">Votre panier est vide</p>
                        <a href="../../index.html" style="color: #2268ff; text-decoration: none; margin-top: 10px; display: inline-block;">
                            Continuer vos achats
                        </a>
                    </td>
                </tr>
            `;
        } else {
            cartTableBody.innerHTML = this.cart.map(item => `
                <tr data-product-id="${item.id}">
                    <td>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                            <span style="font-weight: 500;">${item.name}</span>
                        </div>
                    </td>
                    <td style="font-weight: 600; color: #2268ff;">${this.formatPrice(item.price)}</td>
                    <td>
                        <input type="number" 
                               value="${item.quantity}" 
                               min="1" 
                               max="10" 
                               class="quantity-input" 
                               data-product-id="${item.id}"
                               style="width: 70px; padding: 8px; border: 2px solid #ddd; border-radius: 5px; text-align: center;">
                    </td>
                    <td style="font-weight: 600;">${this.formatPrice(item.price * item.quantity)}</td>
                    <td>
                        <button class="remove-btn" data-product-id="${item.id}" 
                                style="background: #ff4444; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                            <i class="fa fa-trash"></i> Supprimer
                        </button>
                    </td>
                </tr>
            `).join('');

            // Réattacher les événements pour les boutons de suppression et les inputs de quantité
            this.attachCartItemEvents();
        }

        // Mettre à jour les totaux
        if (cartTotalsDiv) {
            const subtotal = this.calculateSubtotal();
            const shipping = this.calculateShippingFee();
            const total = this.calculateTotal();

            const totalsHTML = `
                <h3>Total du Panier</h3>
                <div class="totals-row">
                    <span>Sous-total</span>
                    <span>${this.formatPrice(subtotal)}</span>
                </div>
                <div class="totals-row">
                    <span>Frais de livraison</span>
                    <span>${shipping === 0 ? 'GRATUIT' : this.formatPrice(shipping)}</span>
                </div>
                ${subtotal >= 100000 ? '<p style="color: #28a745; font-size: 14px; margin: 10px 0;">🎉 Livraison gratuite !</p>' : ''}
                <div class="totals-row total-row">
                    <span>Total</span>
                    <span>${this.formatPrice(total)}</span>
                </div>
            `;
            
            cartTotalsDiv.innerHTML = totalsHTML;
        }
    }
