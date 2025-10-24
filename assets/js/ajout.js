// On attend que la page soit totalement chargée
document.addEventListener("DOMContentLoaded", () => {

  // Sélection du bouton
  const btnAddCart = document.querySelector(".btn-add-cart");

  // Quand on clique sur le bouton
  btnAddCart.addEventListener("click", () => {
    // Récupérer les infos du produit
    const nomProduit = document.querySelector("h1").textContent.trim();
    const prixText = document.querySelector(".prix").textContent.trim();
    const quantiteInput = document.querySelector(".detail-action-bar input[type='number']");
    const quantite = parseInt(quantiteInput.value) || 1;

    // Nettoyage du prix (supprimer "FCFA" et espaces)
    const prix = parseFloat(prixText.replace(/[^\d.]/g, ""));

    // Vérifie que la fonction existe
    if (typeof addArticle === "function") {
      addArticle({
        id:getNumberArticle()+1,
        nom: nomProduit,
        prix: prix,
        quantite: quantite
      });

      // Notification visuelle
      alert(nomProduit+ " a été ajouté au panier");
    } else {
      console.error("La fonction addArticle() n’est pas définie ou non chargée.");
    }
  });
});
