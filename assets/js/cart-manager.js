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