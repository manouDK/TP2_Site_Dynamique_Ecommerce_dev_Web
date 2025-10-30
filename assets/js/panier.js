/* récupérer les articles sous la forme: {id:num_id,nom:"produit1",prix:prix_qrticle,quantite:nom_qte} */

function savePanier(panier){
    localStorage.setItem("panier",JSON.stringify(panier));
}

function getPanier(){
    let panier=localStorage.getItem("panier");
    if (panier==null){
        return [];
    }
    else{
        return JSON.parse(localStorage.getItem("panier"));
    }

}

function addArticle(article){
    let panier=getPanier();
    //on vérifie si l'objet est dans le panier et on augmente sa quantité
    let foundArticle=panier.find(p=>p.nom==article.nom);
    if(foundArticle!=undefined){
        foundArticle.quantite+=article.quantite;
    }else{
        panier.push(article);
    }
    savePanier(panier);
}


function removeFromPanier(article){
    let panier=getPanier();
    panier=panier.filter(p=>p.nom!=article.nom);
    savePanier(panier);
}

function changeQuantity(article,quantite){
    let panier=getPanier();
    let foundArticle=panier.find(p=>p.nom==article.nom);
    if(foundArticle!==undefined){
        if (quantite<= 0) {
            // Supprimer l'article si la quantité devient 0 ou négative
            removeFromPanier(article);
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


function increaseQuantity(articleName) {
    let panier = getPanier();
    let article = panier.find(p => p.nom === articleName.nom);
    if (article) {
        changeQuantity(article, article.quantite + 1);
    }
}

function decreaseQuantity(articleName) {
    let panier = getPanier();
    let article = panier.find(p => p.nom === articleName.nom);
    if (article) {
        changeQuantity(article, article.quantite-1);
    }
}

function getNumberArticleEffectif(){
    let panier=getPanier();
    let number=0;
    for(let article of panier){
        number+=article.quantite
    }
    return number;
}

function drawPanier() {
    let panier = getPanier();
    let tbody = document.querySelector('table tbody');
    
    // Si le tableau n'existe pas sur cette page, on ne fait rien
    if (!tbody) {
        return;
    }
    
    // Vider le contenu actuel du tableau
    tbody.innerHTML = '';
    
    // Si le panier est vide
    if (panier.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 20px;">
                    Votre panier est vide
                </td>
            </tr>
        `;
        updateTotals();
        return;
    }
    
    // Pour chaque article dans le panier
    panier.forEach(article => {
        let tr = document.createElement('tr');
        let sousTotal = article.prix * article.quantite;
        
        // Dans la fonction drawPanier(), modifier cette partie :
tr.innerHTML = `
    <td>${article.nom}</td>
    <td>${article.prix} FCFA</td>
    <td>
        <div class="quantity-controls">
            <button class="quantity-btn minus" data-nom="${article.nom}">-</button>
            <span class="quantity-display">${article.quantite}</span>
            <button class="quantity-btn plus" data-nom="${article.nom}">+</button>
        </div>
    </td>
    <td>
        <button class="remove-btn icon-only" data-nom="${article.nom}" title="Supprimer l'article">
            <i class="fa fa-trash"></i>
        </button>
    </td>
`;
        
        tbody.appendChild(tr);
    });
    
    // Ajouter les écouteurs d'événements pour les boutons
    attachEventListeners();
    
    // Mettre à jour les totaux
    updateTotals();
}

function attachEventListeners() {
    // Boutons pour augmenter la quantité
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            let nomArticle = this.getAttribute('data-nom');
            let article = { nom: nomArticle };
            increaseQuantity(article);
            drawPanier(); // Redessiner le panier après modification
        });
    });
    
    // Boutons pour diminuer la quantité
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            let nomArticle = this.getAttribute('data-nom');
            let article = { nom: nomArticle };
            decreaseQuantity(article);
            drawPanier(); // Redessiner le panier après modification
        });
    });
    
    // Boutons pour supprimer l'article
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            let nomArticle = this.getAttribute('data-nom');
            let article = { nom: nomArticle };
            removeFromPanier(article);
            drawPanier(); // Redessiner le panier après suppression
        });
    });
}

function updateTotals() {
    let panier = getPanier();
    let sousTotal = getTotalPrice(); // Cette fonction calcule le total des prix × quantités
    let totalQuantity = getTotalQuantity(); // Cette fonction calcule la somme des quantités
    let fraisLivraison = 5000;
    let total = sousTotal + fraisLivraison;
    
    // Mettre à jour tous les éléments avec leurs IDs respectifs
    const subtotalElement = document.getElementById('subtotal-amount');
    const totalQuantityElement = document.getElementById('total-quantity');
    const shippingElement = document.getElementById('shipping-amount');
    const totalElement = document.getElementById('total-amount');
    
    if (subtotalElement) subtotalElement.textContent = sousTotal + ' FCFA';
    if (totalQuantityElement) totalQuantityElement.textContent = totalQuantity + ' articles';
    if (shippingElement) shippingElement.textContent = fraisLivraison + ' FCFA';
    if (totalElement) totalElement.textContent = total + ' FCFA';
}
// Fonction pour vider complètement le panier
function clearPanier() {
    localStorage.removeItem("panier");
    drawPanier();
}

// Initialisation sécurisée
function initPanier() {
    // Vérifier si nous sommes sur une page qui contient le tableau du panier
    const table = document.querySelector('table');
    if (!table) {
        return; // Quitter si le tableau n'existe pas sur cette page
    }
    
    drawPanier();
}

function safeInitPanier() {
    // Vérifier si le DOM est déjà chargé
    if (document.readyState === 'loading') {
        // DOM pas encore chargé, attendre l'événement
        document.addEventListener('DOMContentLoaded', initPanier);
    } else {
        // DOM déjà chargé, initialiser immédiatement
        initPanier();
    }
}


function getTotalQuantity() {
    let panier = getPanier();
    let totalQty = 0;
    for(let article of panier){
        totalQty += article.quantite;
    }
    return totalQty;
}



// Vérifier si nous sommes dans un environnement navigateur
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    safeInitPanier();
}