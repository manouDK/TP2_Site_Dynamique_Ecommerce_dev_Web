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


    // Attacher les événements aux éléments du panier
    attachCartItemEvents() {
        // Événements pour les boutons de suppression
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.productId;
                if (confirm('Voulez-vous vraiment retirer cet article du panier ?')) {
                    this.removeFromCart(productId);
                }
            });
        });

        // Événements pour les inputs de quantité
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.dataset.productId;
                const newQuantity = parseInt(e.target.value);
                this.updateQuantity(productId, newQuantity);
            });
        });
    }

    // Mettre à jour le compteur du panier dans le header
    updateCartCount() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartLinks = document.querySelectorAll('.account-cart a[href*="panier"]');
        
        cartLinks.forEach(link => {
            // Retirer l'ancien badge s'il existe
            const oldBadge = link.querySelector('.cart-badge');
            if (oldBadge) oldBadge.remove();
            
            // Ajouter le nouveau badge si le panier n'est pas vide
            if (cartCount > 0) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.textContent = cartCount;
                badge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4444;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 11px;
                    font-weight: bold;
                    min-width: 18px;
                    text-align: center;
                `;
                link.style.position = 'relative';
                link.appendChild(badge);
            }
        });
    }

    // Attacher les écouteurs d'événements
    attachEventListeners() {
        // Boutons "Ajouter au panier" dans les pages de produits
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                
                if (productCard) {
                    const product = {
                        id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                        name: productCard.querySelector('.product-name').textContent,
                        price: this.parsePrice(productCard.querySelector('.product-price').textContent),
                        image: productCard.querySelector('.product-image').src,
                        quantity: 1
                    };
                    
                    this.addToCart(product);
                }
            });
        });

        // Bouton "Ajouter au panier" dans les pages de détail
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const quantityInput = document.querySelector('input[type="number"]');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                const product = {
                    id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    name: document.querySelector('.info-principale h1, .product-name').textContent,
                    price: this.parsePrice(document.querySelector('.prix, .product-price').textContent),
                    image: document.querySelector('.image-principale, .product-image').src,
                    quantity: quantity
                };
                
                this.addToCart(product);
            });
        });

        // Bouton "Ajouter au panier" dans les pages de détail
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const quantityInput = document.querySelector('input[type="number"]');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                const product = {
                    id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    name: document.querySelector('.info-principale h1, .product-name').textContent,
                    price: this.parsePrice(document.querySelector('.prix, .product-price').textContent),
                    image: document.querySelector('.image-principale, .product-image').src,
                    quantity: quantity
                };
                
                this.addToCart(product);
            });
        });

        // Bouton "Commander Directement"
        document.querySelectorAll('.btn-buy-now').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const quantityInput = document.querySelector('input[type="number"]');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                const product = {
                    id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    name: document.querySelector('.info-principale h1, .product-name').textContent,
                    price: this.parsePrice(document.querySelector('.prix, .product-price').textContent),
                    image: document.querySelector('.image-principale, .product-image').src,
                    quantity: quantity
                };
                
                this.addToCart(product);
                
                // Rediriger vers la page panier après un court délai
                setTimeout(() => {
                    window.location.href = '../../pages/panier/panier.html';
                }, 500);
            });
        });

        // Bouton "Procéder au paiement"
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.cart.length === 0) {
                    alert('Votre panier est vide !');
                    return;
                }
                this.showCheckoutForm();
            });
        }
    }

    // Parser le prix depuis le texte
    parsePrice(priceText) {
        return parseInt(priceText.replace(/[^\d]/g, ''));
    }

    // Afficher une notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#ffc107'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Afficher le formulaire de commande
    showCheckoutForm() {
        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Finaliser la commande</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="checkout-form" class="checkout-form">
                    <div class="form-group">
                        <label for="fullname">Nom complet *</label>
                        <input type="text" id="fullname" name="fullname" required 
                               placeholder="Ex: Jean Dupont">
                        <span class="error-message"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required 
                               placeholder="Ex: jean.dupont@email.com">
                        <span class="error-message"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Téléphone *</label>
                        <input type="tel" id="phone" name="phone" required 
                               placeholder="Ex: +237 6 XX XX XX XX">
                        <span class="error-message"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="address">Adresse de livraison *</label>
                        <textarea id="address" name="address" required rows="3" 
                                  placeholder="Ville, Quartier, Rue..."></textarea>
                        <span class="error-message"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="payment">Méthode de paiement *</label>
                        <select id="payment" name="payment" required>
                            <option value="">Sélectionner une méthode</option>
                            <option value="orange-money">Orange Money</option>
                            <option value="mtn-momo">MTN Mobile Money</option>
                            <option value="paypal">PayPal</option>
                            <option value="cash">Paiement à la livraison</option>
                        </select>
                        <span class="error-message"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="notes">Notes (optionnel)</label>
                        <textarea id="notes" name="notes" rows="2" 
                                  placeholder="Instructions spéciales pour la livraison..."></textarea>
                    </div>
                    
                    <div class="order-summary">
                        <h3>Récapitulatif</h3>
                        <p><strong>Total à payer:</strong> ${this.formatPrice(this.calculateTotal())}</p>
                        <p style="font-size: 14px; color: #666;">Articles: ${this.cart.length} | Quantité totale: ${this.cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    </div>
                    
                    <button type="submit" class="submit-order-btn">
                        Confirmer la commande
                    </button>
                </form>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Styles pour le modal
        this.addCheckoutStyles();
        
        // Fermer le modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
        
        // Gérer la soumission du formulaire
        modal.querySelector('#checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder(new FormData(e.target));
        });
    }
