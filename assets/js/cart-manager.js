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
