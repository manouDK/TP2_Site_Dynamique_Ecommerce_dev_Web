
function changeQuantity(article,quantite){
    let panier=getPanier();
    //on vérifie si l'objet est dans le panier et on augmente sa quantité
    let foundArticle=panier.find(p=>p.nom==article.nom);
    if(foundArticle!=undefined){
        foundArticle.quantite+=article.quantite;
    }else{
        article.qte=1;
        panier.push(article);
    }
    savePanier(panier);
}


function removeFromPanier(article){
    let panier=getPanier();
    panier=panier.filter(p=>p.name!=article.name);
    savePanier(panier);
}

function changeQuantity(article,quantite){
    let panier=getPanier();
    let foundArticle=panier.find(p=>p.name==article.name);
    if(foundArticle!==undefined){
        if (quantite<= 0) {
            // Supprimer l'article si la quantité devient 0 ou négative
            removeFromPanier(articleName);
        }
        else{
            foundArticle.quantite=quantite;
            savePanier(panier);

        }
    }
}

function getNumberArticle(){
    let panier=getPanier();
    let number=0;
    for(let article of panier){
        number+=1
    }
    return number;
}

function getTotalPrice(){
    let panier=getPanier();
    let total=0;
    for(let article of panier){
        total+=article.prix*article.quantite
    }
    return total;
}


/*Partie ajoutée dans le code */


function displayPanier() {
    const panier = getPanier();
    const container = document.querySelector('.container');
    
    // Si le panier est vide
    if (panier.length === 0) {
        container.innerHTML = `
            <h1>Panier d'Achat</h1>
            <div class="empty-cart-message">
                <p>Votre panier est vide</p>
                <a href="../../index.html" class="continue-shopping">Continuer vos achats</a>
            </div>
        `;
        return;
    }

    // Calcul des totaux
    const sousTotal = getTotalPrice();
    const fraisLivraison = 5000;
    const total = sousTotal + fraisLivraison;

    // Génération du HTML du panier
    let cartHTML = `
        <h1>Panier d'Achat</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Sous-total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Ajout de chaque article
    panier.forEach(article => {
        const articleSousTotal = article.price * article.quantite;
        cartHTML += `
            <tr>
                <td>${article.name}</td>
                <td>${article.price.toLocaleString()} FCFA</td>
                <td>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="changeQuantity('${article.name}', ${article.quantite - 1})">-</button>
                        <span class="quantity-display">${article.quantite}</span>
                        <button class="quantity-btn plus" onclick="changeQuantity('${article.name}', ${article.quantite + 1})">+</button>
                    </div>
                </td>
                <td>${articleSousTotal.toLocaleString()} FCFA</td>
                <td>
                    <button class="remove-btn" onclick="removeFromPanierByName('${article.name}')">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </td>
            </tr>
        `;
    });

    // Suite du HTML avec les totaux
    cartHTML += `
            </tbody>
        </table>
        
        <div class="cart-totals">
            <h3>Total du Panier</h3>
            <div class="totals-row">
                <span>Sous-total</span>
                <span>${sousTotal.toLocaleString()} FCFA</span>
            </div>
            <div class="totals-row">
                <span>Frais de livraison</span>
                <span>${fraisLivraison.toLocaleString()} FCFA</span>
            </div>
            <div class="totals-row total-row">
                <span>Total</span>
                <span>${total.toLocaleString()} FCFA</span>
            </div>
        </div>
        
        <div class="customer-note">
            <h3>Note pour la commande</h3>
            <textarea placeholder="Ajoutez une note à votre commande (optionnel)"></textarea>
        </div>
        
        <div class="payment-section">
            <h3>Méthode de Paiement</h3>
            <div class="payment-options">
                <div class="payment-option selected">
                    <div class="payment-image">
                        <img src="../../assets/images/images_index/orange-money-logo-png_seeklogo-440383.png" alt="Orange Money" class="payment-logo-img">
                    </div>
                    <h4>Orange Money</h4>
                    <p>Paiement rapide et sécurisé</p>
                </div>
                <div class="payment-option">
                    <div class="payment-image">
                        <img src="../../assets/images/images_index/mtn-mobile-money-logo.jpg" alt="MTN MoMo" class="payment-logo-img">
                    </div>
                    <h4>MTN MoMo</h4>
                    <p>Paiement mobile facile</p>
                </div>
                <div class="payment-option">
                    <div class="payment-image">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="payment-logo-img">
                    </div>
                    <h4>PayPal</h4>
                    <p>Paiement international sécurisé</p>
                </div>
            </div>
        </div>
        
        <button class="checkout-btn">PROCÉDER AU PAIEMENT</button>
        
        <div class="note">
            <p>Informations pour le client</p>
        </div>
    `;

    container.innerHTML = cartHTML;
}


// Initialiser l'affichage du panier au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    displayPanier();
});


