
**NOMS DES MEMBRES DU GROUPE :**

1. DANWE KAGOU MANUELLA – `manouDK` (danwemanuella@gmail.com)  
2. CHARLES HENRY ATANGA – `CharlesHenryAtanga`  
3. FONING KOTSAP JAURES HERVE – `Foningjaures`  
4. FRANCOIS CHARLES ATANGA – `FrancoisCharlesATANGA`  
5. KENMEUGNE TCHOUNGA MICHELE ESTELLE – `KENMEUGNEMICHELE14`  
6. KOUAM KAMDEM ULRICH – `kouam kamdem ulrich`  
7. MANFOUO KOUAMASSONG BRAUN – `BraunNK` (mkbraun256@gmail.com)  
8. MEBENGA OWONA MICHEL STEPHANE – `StephOwona`  
9. MOFFO PICHELE STEVENIE – `Stevenie`  
10. PAFE MEKONTSO DILANE – `Pafe Dilane`  
11. PASSO NGUENA DENNY BRAYAN – `Escanor-prog`


# BEBECONFORT – Site e‑commerce de layette pour bébés

BEBECONFORT est un site de e‑commerce dynamique dédié à la layette pour bébés, réalisé uniquement en **HTML**, **CSS** et **JavaScript** côté client dans le cadre du **TP 2 de développement web**.  
Le site propose une expérience complète d’achat (exploration des catégories, pages de détails produits, panier, formulaire de commande et confirmation) sans backend réel, avec une logique métier gérée entièrement dans le navigateur.

---

## 📚 Table des matières

- [Présentation du projet](#-présentation-du-projet)  
- [Objectifs pédagogiques](#-objectifs-pédagogiques)  
- [Fonctionnalités principales](#-fonctionnalités-principales)  
- [Structure du projet](#-structure-du-projet)  
- [Technologies utilisées](#-technologies-utilisées)  
- [Maquettage (UI/UX)](#-maquettage-uiux)  
- [Navigation et parcours utilisateur](#-navigation-et-parcours-utilisateur)  
- [Pages catégories et pages détail produit](#-pages-catégories-et-pages-détail-produit)  
- [Gestion du panier (CartManager)](#-gestion-du-panier-cartmanager)  
- [Formulaire de commande et validation](#-formulaire-de-commande-et-validation)  
- [Simulation de l’envoi de la commande](#-simulation-de-lenvoi-de-la-commande)  
- [Installation et lancement du projet](#-installation-et-lancement-du-projet)  
- [Bonnes pratiques et responsive design](#-bonnes-pratiques-et-responsive-design)  
- [Organisation du travail en groupe](#-organisation-du-travail-en-groupe)  
- [Auteurs (équipe BEBECONFORT)](#-auteurs-équipe-bebeconfort)

---

## 🍼 Présentation du projet

BEBECONFORT est un site de layette pour bébés qui commercialise plusieurs catégories de produits : **vêtements**, **alimentation**, **textiles de maternité**, **accessoires**, **aménagement de la chambre**, **chaussures**, **couches et lingettes**, **poussettes**, etc.  
L’utilisateur peut parcourir les catégories, consulter des fiches détaillées de produits, ajouter des articles au panier, remplir un formulaire de commande et obtenir une confirmation visuelle de sa commande.  

---

## 🎯 Objectifs pédagogiques

Ce projet est réalisé dans le cadre du **TP 2 : “Construire un site de e‑commerce complet en HTML, CSS, JS avec les interactions côté client.”** qui est aussi une continuité du TP1 qui a fait le site statique. 

Objectifs principaux :

- Concevoir l’architecture front‑end d’un site e‑commerce multi‑pages.  
- Rendre le panier fonctionnel avec JavaScript (ajout, suppression, modification de quantité, calcul du total et des frais de livraison).  
- Implémenter un formulaire de commande avec validation côté client.  
- Simuler l’envoi d’une commande.

---

## ✨ Fonctionnalités principales
 
 Les besoins fonctionnels du site sont : 
- Page d’accueil avec :
  - Slider / section héro.  
  - Sections « Meilleures ventes », « Nouveautés », « Bonnes affaires », témoignages clients, etc.  
- Menu de navigation par catégories : vêtements, alimentation, poussettes, accessoires, aménagement de la chambre, couches et lingettes, textile de maternité, chaussures…  
- Pages catégories listant les produits avec image, nom, prix et actions (voir le détail, ajouter au panier).  
- Pages de **détail produit** avec fiche complète et choix de quantité.  
- Panier dynamique :
  - Ajout d’article depuis les catégories ou les fiches détail.  
  - Affichage des produits, quantités, prix et total.  
  - Possibilité de modifier les quantités ou de supprimer un article.  
- Formulaire de commande sur la page panier, avec validation des champs et message de confirmation.  
- une page connexion pour simuler la connexion et s'inscrire si on est pas connecté. 
- le footer avec tous les liens utiles du site. 


 Les besoins non fonctionnels du site sont : 

- la responsivité 
- l'interface qui satisfait l'utilisateur
---

## 📁 Structure du projet

À la racine du projet on a :

- `index.html` : page d’accueil principale (slider, sections produits, témoignages, footer…).  
- `README.md` : présentation du projet (ce fichier).  
- `.hintrc` / `.gitignore` : fichiers de configuration du projet.

### Dossiers principaux

- `assets/`  
  - `css/`  
    - Feuilles de style globales (exple :  `styleindex.css`, `model.css`) pour la mise en forme, la mise en page et la responsivité.  
    - Styles spécifiques pour certaines pages (exple :  `chaussures.css` et autres CSS par catégorie).  
  - `images/`  
    - Toutes les images du site : bannières, produits, pictogrammes, etc.  
  - `js/`  
    - `cart-manager.js` : gestion complète du panier (classe `CartManager`).  
    - `ajout.js` : ajout d’un produit au panier depuis une page de détail produit.  
    - `panier.js` : logique spécifique à la page panier / commande (initialisation du panier, gestion du formulaire, etc.).

- `pages/`  
  - `vêtements/` (ex. `pageCategorieVetement.html`, `pageDetailVetement1.html`, autres fiches détail).  
  - `alimentation/`  dossiers des pages concernant l'alimentation 
  - `poussettes/`  dossiers des pages concernant les poussettes
  - `Accessoires/`  dossiers des pages concernant les accessoires
  - `amenagement_de_chambre/`  dossiers des pages concernant les aménagement de chambre
  - `chaussures/`  dossiers des pages concernant les chaussures
  - `couches_et_lingettes/`  dossiers des pages concernant les couches et lingettes
  - `textile_de_maternité/`  dossiers des pages concernant les textiles de maternité
  - `panier/` : dossier des page d’affichage du panier et du formulaire de commande.  
  - `connexion/` : page de connexion / compte utilisateur.

---

## 🛠️ Technologies utilisées

- **HTML** : structure sémantique des pages (sections, listes, formulaires, tableaux de panier, etc.).  
- **CSS** :
  - Mise en page responsive (flexbox, grid, media queries).  
  - Design des cartes produits, boutons, bannières, menus, footer…  
- **JavaScript** :
  - Classe `CartManager` pour centraliser toute la logique du panier.  
  - Scripts d’ajout au panier sur les pages détail (`ajout.js`).  
  - Scripts d’interactions (navigation, sliders, notifications, etc.).  
- **Bibliothèque externe** :
  - [Font Awesome](https://fontawesome.com/) pour les icônes (compte, panier, recherche, réseaux sociaux…).

---

## 🎨 Maquettage (UI/UX)

Nous avons réalisé la maquette de notre site sur **Figma** :

Lien Figma de la maquette :

- https://www.figma.com/design/1VNK4au3f1GrLbJgPcXIch/Untitled?node-id=0-1

---

## 🧭 Navigation et parcours utilisateur

- **Header** :
  - Logo « BEBECONFORT » cliquable vers `index.html`.  
  - Barre de recherche pour trouver un produit.  
  - Icônes de compte (page `connexion`) et de panier. 
   - Lien « Catégories » avec un menu déroulant listant les différentes familles de produits.  
  - Liens supplémentaires vers l’accueil, le panier, la connexion et d’autres pages (ex. À propos, Contact). 

- **Menu principal** :
C'est la présentation du site de ecommerce, on navige.
   

- **Footer** :
  - Liens de service client : « Centre d’aide », « Votre compte », « Vos commandes », « Comment acheter », « Contactez‑nous », « Mentions légales »…  
  - Raccourcis vers les principales catégories du site.  
  - Informations légales et moyens de paiement / réseaux sociaux.

---

## 🧷 Pages catégories et pages détail produit

### Pages catégories

Exemple : `pages/vêtements/pageCategorieVetement.html`  

- Affichent une **grille de produits** avec :
  - Image, nom, prix.  
  - Boutons pour consulter le détail ou ajouter au panier. 

### Pages détail produit

Exemple : `pages/vêtements/pageDetailVetement1.html`  

- Fiche produit complète :
  - Grande image du produit.  
  - Titre (`<h1>`), prix, description, caractéristiques.  
  - Choix de quantité via un champ numérique.  
- Bouton **« Ajouter au panier »** (classe `.btn-add-cart`) qui déclenche le script `ajout.js` pour envoyer l’article dans le panier.

---

## 🛒 Gestion du panier (`CartManager`)

Le cœur de la logique du panier est centralisé dans la classe `CartManager` (fichier `assets/js/cart-manager.js`).

Principales responsabilités :

- **Stockage** :
  - Le panier est enregistré dans `localStorage` sous une clé dédiée (ex. `bebeconfort_cart`).  
  - Les articles sont conservés même après rechargement de la page.

- **Ajout d’article** :
  - `addToCart(product)` ajoute un nouvel article ou incrémente la quantité si l’article existe déjà.  
  - Après chaque ajout, le panier est sauvegardé, l’affichage est mis à jour et une notification visuelle est affichée.

- **Suppression & mise à jour** :
  - `removeFromCart(productId)` supprime un article du panier.  
  - `updateQuantity(productId, newQuantity)` met à jour la quantité ou supprime l’article si la quantité devient nulle.

- **Calculs** :
  - `calculateSubtotal()` : somme des `prix × quantité`.  
  - `calculateShippingFee()` :  
    - Livraison gratuite à partir d’un certain montant (ex. 100 000 FCFA).  
    - Sinon, application de frais fixes (ex. 5 000 FCFA).  
  - `calculateTotal()` : sous‑total + frais de livraison.

- **Affichage** :
  - `updateCartDisplay()` met à jour :
    - Le tableau listant les articles (lignes avec image, nom, prix, quantité, actions).  
    - La section « totaux » (sous‑total, livraison, total).  
    - Un message spécifique lorsque le panier est vide.  
  - `updateCartCount()` met à jour le compteur d’articles (par exemple dans le header).  
  - `showNotification(message, type)` affiche des messages de feedback (succès, avertissement…).

### Interaction avec `ajout.js`

Sur les pages détail produit :

- `ajout.js` :
  - Récupère le **nom du produit**, son **prix** et la **quantité** à partir du DOM.  
  - Formate le prix (suppression du texte « FCFA » et des espaces).  
  - Appelle la fonction d’ajout au panier (via `CartManager` ou une fonction intermédiaire) et affiche une alerte de confirmation à l’utilisateur.

---

## 📝 Formulaire de commande et validation

Le formulaire de commande se trouve directement sur la **page panier**.

IL choisi le mode de paiement dans le panier et entre ses informations. 
---

## 📦 Simulation de l’envoi de la commande

Le projet ne dispose **pas** de backend réel : tout est simulé côté navigateur.

- Lorsqu’un formulaire valide est soumis :
  - Un script intercepte la soumission.  
  - Les informations de commande (articles du panier, total, coordonnées) sont lues côté front.  
  - Une **confirmation visuelle** est affichée (message de succès, éventuellement récapitulatif). 
---

## 🚀 Installation et lancement du projet

1. **Cloner** le dépôt ou **télécharger le ZIP** du projet depuis GitHub.  
2. Extraire le dossier et l’ouvrir dans votre éditeur (ex. Visual Studio Code).  
3. Ouvrir `index.html` dans un navigateur moderne (ou lancer un serveur local type *Live Server*).  
4. Naviguer dans les différentes catégories, ouvrir des pages détail produit, ajouter des articles au panier, puis accéder à la page panier pour tester la commande.

Aucun serveur backend n’est requis : un simple navigateur suffit.

---


## 👥 Organisation du travail en groupe

Le projet BEBECONFORT a été réalisé en **travail de groupe**, avec GitHub comme plateforme de collaboration, et figma pour la maquette. Une phase d'analyse a été partiellement faire mais elle sera plus détaillée dans le TP4 car il utilise le backend réel. 

- Répartition des tâches :
  - Intégration de la maquette Figma.  
  - Création des pages catégories et détail.  
  - Mise en place du panier et du formulaire de commande.  
  - Intégration des styles et des comportements responsives.  

- Collaboration :
  - Utilisation d’un dépôt commun où chaque membre du groupe doit créer sa branche et faire son travail à l'intérieur puis merge dans le main.  
  - Commits réguliers avec des messages explicites pour tous les membres du groupe.  
  - Tests et harmonisation de l’interface avant la livraison finale.

---

## ✍️ Auteurs (équipe BEBECONFORT)

**NOMS DES MEMBRES DU GROUPE :**

1. DANWE KAGOU MANUELLA – `manouDK` (danwemanuella@gmail.com)  
2. CHARLES HENRY ATANGA – `CharlesHenryAtanga`  
3. FONING KOTSAP JAURES HERVE – `Foningjaures`  
4. FRANCOIS CHARLES ATANGA – `FrancoisCharlesATANGA`  
5. KENMEUGNE TCHOUNGA MICHELE ESTELLE – `KENMEUGNEMICHELE14`  
6. KOUAM KAMDEM ULRICH – `kouam kamdem ulrich`  
7. MANFOUO KOUAMASSONG BRAUN – `BraunNK` (mkbraun256@gmail.com)  
8. MEBENGA OWONA MICHEL STEPHANE – `StephOwona`  
9. MOFFO PICHELE STEVENIE – `Stevenie`  
10. PAFE MEKONTSO DILANE – `Pafe Dilane`  
11. PASSO NGUENA DENNY BRAYAN – `Escanor-prog`
