/* récupérer les articles sous la forme: {id:num_id,name:"produit1",quantite:nom_qte,price:prix} */

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
    let foundArticle=panier.find(p=>p.name==article.name);
    if(foundArticle!=undefined){
        foundArticle.quantite++;
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
    if(foundArticle!=undefined){
        foundArticle.quantite=quantite;
    }
    savePanier(panier);
}

function getNumberArticle(){
    let panier=getPanier();
    let number=0;
    for(let article of panier){
        number+=article.quantite
    }
    return number;
}

function getTotalPrice(){
    let panier=getPanier();
    let total=0;
    for(let article of panier){
        total+=article.price*article.quantite
    }
    return total;
}