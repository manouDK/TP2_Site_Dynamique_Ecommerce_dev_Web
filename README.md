BEBECONFORT – Site e‑commerce de layette pour bébés
BEBECONFORT est un site de e‑commerce dynamique dédié à la layette pour bébés, réalisé uniquement en HTML, CSS et JavaScript côté client dans le cadre du TP 2 de développement web.​
Le site propose une expérience complète d’achat en ligne (exploration des catégories, pages de détails produits, panier, formulaire de commande et confirmation) sans backend réel, avec une logique métier gérée entièrement dans le navigateur.​

Table des matières
Présentation du projet

Objectifs pédagogiques

Fonctionnalités principales

Structure du projet

Technologies utilisées

Maquettage (UI/UX)

Navigation et parcours utilisateur

Pages catégories et pages détail produit

Gestion du panier (CartManager)

Formulaire de commande et validation

Simulation de l’envoi de la commande

Installation et lancement du projet

Bonnes pratiques et responsive design

Organisation du travail en groupe

Auteurs (équipe BEBECONFORT)

Présentation du projet
Il s’agit d’un site de layette pour bébés qui commercialise plusieurs catégories de produits : vêtements, alimentation, textiles de maternité, accessoires, aménagement de la chambre, chaussures, couches et lingettes, poussettes, etc.​
L’utilisateur peut parcourir les catégories, consulter des fiches détaillées de produits, ajouter des articles au panier, remplir un formulaire de commande et obtenir une confirmation visuelle de sa commande.​

Objectifs pédagogiques
Ce projet est réalisé dans le cadre du TP 2 : « Construire un site de e‑commerce complet en HTML, CSS, JS avec les interactions côté client ».
Les objectifs principaux sont :

Concevoir l’architecture front‑end d’un site e‑commerce multi‑pages.​

Rendre le panier fonctionnel avec JavaScript (ajout, suppression, modification de quantité, calcul du total et des frais de livraison).​

Implémenter un formulaire de commande avec validation côté client.​

Simuler l’envoi d’une commande sans serveur (logique 100% front).​

Fonctionnalités principales
Page d’accueil avec : slider (hero), sections « Meilleures ventes », « Nouveautés », « Bonnes affaires », témoignages clients, etc.​

Navigation par catégories (vêtements, alimentation, poussettes, accessoires, aménagement de la chambre, couches et lingettes, textile de maternité…).​

Pages catégories listant les produits avec image, nom, prix et actions (voir le détail, ajouter au panier, promotions, etc.).​

Pages de détail produit permettant de voir une fiche complète et d’ajouter le produit au panier avec une quantité choisie.​

Panier dynamique avec calcul du sous‑total, frais de livraison et total général, plus gestion des quantités et suppression d’articles.​

Formulaire de commande sur la page panier, avec validation des champs et message de confirmation.​

Structure du projet
À la racine du projet :​

index.html : page d’accueil principale (slider, sections produits, témoignages, footer).

README.md : documentation du projet (présent fichier).

.hintrc / .gitignore : fichiers de configuration éventuels (qualité, Git).

Dossiers principaux :

assets/

css/ :

Feuilles de style globales (par ex. styleindex.css, model.css) pour la mise en forme, la mise en page et la responsivité. [attached_file:870e35a7-c6c6-47d5-b5ff-56a2f0db1bd9]​

Styles spécifiques pour certaines pages (par ex. chaussures.css, autres fichiers par catégorie). [attached_file:870e35a7-c6c6-47d5-b5ff-56a2f0db1bd9][attached_file:d0c77434-3ffa-4504-93c5-4d6f01c79d41]

images/ : toutes les images du site (bannières, produits, pictogrammes, etc.).​

js/ : scripts JavaScript principaux :

cart-manager.js : gestion complète du panier (classe CartManager).​

ajout.js : ajout d’un produit au panier depuis une page de détail.​

panier.js (si présent) : logique spécifique à la page panier/commande (initialisation du CartManager, écouteurs sur le formulaire, etc.).

pages/

vêtements/ (ex. pageCategorieVetement.html, pageDetailVetement1.html, autres détails). [attached_file:3e51380d-9a9c-4ebb-99d7-c0ab44a97a1a]​

alimentation/, poussettes/, Accessoires/, amenagement_de_chambre/, chaussures/, couches_et_lingettes/, textile_de_maternité/ : pages catégories et éventuellement pages de détails par produit.​

panier/ : page de gestion du panier et du formulaire de commande.​

connexion/ : page de connexion / compte utilisateur.​

Technologies utilisées
HTML5 : structure sémantique des pages, sections, formulaires, tableaux de panier, etc.​

CSS3 :

Mise en page responsive (flexbox, grid, media queries).

Styles de cartes produits, boutons, bannières, menus et footer. [attached_file:870e35a7-c6c6-47d5-b5ff-56a2f0db1bd9][attached_file:d0c77434-3ffa-4504-93c5-4d6f01c79d41]

JavaScript (ES6+) :

Classe CartManager pour la gestion centralisée du panier.​

Scripts d’ajout au panier sur les pages de détails produits (ajout.js).​

Scripts de navigation, sliders, interactions visuelles (selon les autres fichiers JS du projet).​

Bibliothèques externes :

Font Awesome pour les icônes (compte, panier, recherche, réseaux sociaux).​

Maquettage (UI/UX)
La maquette du projet a été réalisée sur Figma pour définir :

L’identité visuelle de BEBECONFORT (palette pastel, typographies, ambiance douce adaptée à l’univers bébé).

La disposition des blocs : header, section héro, blocs produits, sections marketing, témoignages, footer.

Lien vers la maquette Figma :

https://www.figma.com/design/1VNK4au3f1GrLbJgPcXIch/Untitled?node-id=0-1

Navigation et parcours utilisateur
Header :

Logo « BBCONFORT » cliquable vers index.html.

Barre de recherche pour trouver des produits.

Icône de compte utilisateur (vers la page connexion) et icône de panier.​

Menu principal :

Lien « Catégories » avec un menu déroulant listant les principales familles de produits.

Liens supplémentaires vers des pages comme « À propos », « Contact ».​

Footer :

Liens de service client (« Centre d’aide », « Votre compte », « Vos commandes », « Comment acheter », etc.).

Liens rapides vers les catégories.

Informations légales et moyens de paiement.​

Pages catégories et pages détail produit
Pages catégories (ex. pageCategorieVetement.html) :

Affichent une grille de produits avec image, nom, prix, badges ou informations de stock.​

Peuvent proposer des filtres ou des informations contextuelles (nombre d’articles disponibles, qualité, service client, notation…).​

Pages détail produit (ex. pageDetailVetement1.html) :

Présentent une fiche complète : grande image, titre (balise h1), prix, description, caractéristiques, choix de taille/couleur et champ quantité. [attached_file:3e51380d-9a9c-4ebb-99d7-c0ab44a97a1a]

Un bouton « Ajouter au panier » (classe .btn-add-cart) déclenche le script ajout.js pour créer l’article et l’envoyer au panier.​

Gestion du panier (CartManager)
Le cœur de la logique du panier est centralisé dans la classe CartManager définie dans cart-manager.js.​

Principales responsabilités :

Chargement et sauvegarde :

Le panier est stocké dans localStorage sous la clé bebeconfort_cart, ce qui permet de conserver les articles même après un rechargement de page.​

Ajout d’un produit :

addToCart(product) ajoute un nouvel article au panier ou incrémente la quantité si l’article existe déjà.

Après chaque ajout, le panier est sauvegardé, l’affichage est mis à jour et une notification est affichée.​

Suppression et mise à jour :

removeFromCart(productId) supprime un article du panier.

updateQuantity(productId, newQuantity) met à jour la quantité ou supprime l’article si la quantité devient nulle.​

Calculs :

calculateSubtotal() calcule la somme des prix × quantités.

calculateShippingFee() applique une livraison gratuite à partir de 100 000 FCFA, sinon 5 000 FCFA.

calculateTotal() retourne sous‑total + frais de livraison.​

Affichage :

updateCartDisplay() met à jour le tableau du panier (.cart-items-body) et la section de totaux (.cart-totals), avec un message spécifique lorsque le panier est vide.​

updateCartCount() met à jour le compteur d’articles (par exemple dans le header).

showNotification(message) affiche des messages de feedback à l’utilisateur.​

Sur les pages de détail produit, ajout.js récupère le nom, le prix et la quantité depuis le DOM, puis appelle la fonction d’ajout (selon votre intégration, soit une fonction comme addArticle, soit une méthode du CartManager).​

Formulaire de commande et validation
Le formulaire de commande est intégré à la page panier.​

Il permet de saisir les informations nécessaires à la livraison et au paiement (nom, coordonnées, adresse, etc. – à adapter à vos champs réels).

Une logique JavaScript contrôle la validité des champs (ex. champs obligatoires, format d’email, longueur minimale…) et empêche la soumission si les conditions ne sont pas respectées.​

Des messages d’erreur et de succès sont affichés pour guider l’utilisateur (par exemple via des classes CSS spécifiques ou des éléments dédiés).​

Simulation de l’envoi de la commande
L’envoi de commande est simulé côté client, sans serveur :​

Lorsque le formulaire est valide, un événement JavaScript intercepte la soumission.

Le panier est lu via CartManager pour récupérer le total et les articles.

Une confirmation visuelle est affichée (message de succès, récapitulatif, etc.) et le panier peut être vidé pour simuler une commande traitée.​

Installation et lancement du projet
Cloner le dépôt ou télécharger le ZIP du projet depuis GitHub.

Extraire le dossier et l’ouvrir dans votre éditeur (par exemple VS Code).

Ouvrir index.html dans un navigateur moderne.

Naviguer dans les différentes catégories, ouvrir des pages détail produit, ajouter des articles au panier, puis accéder à la page panier pour finaliser la commande.

Aucun serveur backend n’est requis, mais l’utilisation d’une extension de type « Live Server » est recommandée pour le confort de développement.

Bonnes pratiques et responsive design
Séparation claire :

HTML pour la structure,

CSS pour le style,

JS pour la logique. [attached_file:870e35a7-c6c6-47d5-b5ff-56a2f0db1bd9]​

Composants réutilisables : cartes produits, sections de mise en avant, boutons d’action, etc.​

Mise en page responsive :

Utilisation de flexbox, grid et media queries pour adapter le site aux écrans mobiles, tablettes et desktop. [attached_file:870e35a7-c6c6-47d5-b5ff-56a2f0db1bd9][attached_file:d0c77434-3ffa-4504-93c5-4d6f01c79d41]

Adaptation de la navigation (menu burger, réorganisation des blocs sur petit écran).​

Organisation du travail en groupe
Le projet a été réalisé en groupe, avec GitHub comme plateforme de collaboration (hébergement du code, gestion de versions, contributions).

Chaque membre est responsable d’une ou plusieurs parties (catégories de produits, pages de détails, scripts JavaScript, styles CSS, intégration de la maquette Figma…).

Les contributions sont intégrées dans un dépôt commun, en suivant un flux de travail collaboratif (commits fréquents, messages de commit explicites, synchronisation régulière).

Auteurs (équipe BEBECONFORT)
NOMS DES MEMBRES DU GROUPE :

DANWE KAGOU MANUELLA – manouDK (danwemanuella@gmail.com)

CHARLES HENRY ATANGA – CharlesHenryAtanga

FONING KOTSAP JAURES HERVE – Foningjaures

FRANCOIS CHARLES ATANGA – FrancoisCharlesATANGA

KENMEUGNE TCHOUNGA MICHELE ESTELLE – KENMEUGNEMICHELE14

KOUAM KAMDEM ULRICH – kouam kamdem ulrich

MANFOUO KOUAMASSONG BRAUN – BraunNK (mkbraun256@gmail.com)

MEBENGA OWONA MICHEL STEPHANE – StephOwona

MOFFO PICHELE STEVENIE – Stevenie

PAFE MEKONTSO DILANE – Pafe Dilane

PASSO NGUENA DENNY BRAYAN – Escanor-pro




