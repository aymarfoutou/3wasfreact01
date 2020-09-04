# Rest API

## Présentation

Nous allons créer une application **medialibrary** REST elle permettra de lire, créer, mettre à jour et supprimer des auteurs.

Créez une application React **medialibrary** dans un dossier API_project. Dans ce dossier vous pourrez également mettre le serveur Express, dans un dossier **server** par exemple.

Sur le serveur Express vous avez les méthodes fonctionnelles suivantes, elles se consomment en http de manière classique, voyez les exemples ci-dessous :

- app.get('/author/:id', (req, res) ... ) récupérer un auteur en fonction de son ID.

```txt
http://localhost:3000/author/3hj9ecwzc5
```

- app.get('/authors' (req, res) ... ) récupérer tous les auteurs.

```txt
http://localhost:3000/authors
```

Pour ces méthodes voyez la partie 3 et 4 ci-dessous.

- app.post('/add', (req, res) ... ) enregistrer un nouvel auteur.

- app.put('/author/:id' , (req, res) ... ) mettre à jour un auteur.

- app.delete('/author/:id', (req, res) ... ) supprimer un auteur.

*Remarque : on ne vous demande pas de développer le serveur, mais simplement de consommer l'API Express.*

## Installation du serveur

Dans le dossier serveur tapez la commande suivante :

```bash
npm install
```

Puis lancez le serveur :

```bash
node server.js
```

## Partie 1

Vous devez installez les dépendances suivantes :

- Redux & thunk-redux

- react-router-dom

- Styled components Gestion des styles en CSS-In-JS

- Vous utiliserez axios ou fetch (voir un dans la partie annexes)

Facultatifs :

- Redux toolkit peut également être utilisé.

- Middleware : dans ce cas faites historiques des créations d'auteurs

Attention, comme vous utilisez fetch (ou axios) qui est asynchrone et Redux pour la gestion des stores vous devez mettre en place le middleware thunk (configuration dans index.js).

La page principale sera structurée sur deux colonnes. Elle comporte un menu principal avec deux items **Home** et **Add Author**. Créez un dossier Styles dans lequel vous placerez les fichiers de styles de Styled components.  

- La page Home affichera l'ensemble des noms des auteurs uniquement, sous chaque nom vous créez deux boutons : **Détails** & **Delete** (voir plus loin pour ces  fonctionnalités à développer).


```txt

---------------------------------------------------

    [ Home ]  [ Add author ]

    Liste des auteurs          Details d'un auteur
    
    Alan 
    [Details]
    [Delete]

    ...

---------------------------------------------------

```

*Remarques : les données sont visibles sur le serveur dans le fichier server.js et dans la variables authors, chaque auteur est structuré comme suit dans un fichier JSON*

```json
{
    "id": "3hj9ecwzc5",
    "name": "Alan",
    "bio": "DEA à l'université Luminy",
    "shop_name": "fnac",
    "books": ["Javascript", "Eloquent JavaScript, Second Edition"]
},
```

### Bouton Details

Une fois que l'on clique sur le bouton Details on affichera dans la colonne de droite le détail d'un auteur :

```txt

---------------------------------------------------

    [ Home ]  [ Add author ]

    Liste des auteurs          Details d'un auteur
    
    Alan 
    [details]                  name : Alan
                                    bio : DEA à l'université Luminy
                                    shop : Fnac
                                    Books : 
                                        Javascript
                                        Eloquent JavaScript, Second Edition

    ...

---------------------------------------------------

```

## Partie 2 Ajouter un auteur

Le bouton **Add author** permet d'ajouter un auteur, vous développerez un champ pour définir le nom de l'auteur et un champ pour définir la librairie dans laquelle l'auteur à publier ses livres, ce dernier champ est un bouton select. La liste des librairies est donnée dans l'énoncé du projet voir ci-après :

```txt

---------------------------------------------------

    [ Home ]  [ Add author ]

    
    Name : []

    Shop : [Fnac] 

    [Ok]

    ...

---------------------------------------------------

```

Liste des librairies ( pour le bouton select ) :

- Fnac
- Eyrolles
- Gibert Jeune

Facultatif, ajoutez un champ pour définir une liste de livres par auteur :

```txt

---------------------------------------------------

    [ Home ]  [ Add author ]

    Name : [Tony]

    Shop : [Fnac] 

    Book(s) : [ ] [Add] ( 2 books )

        - Javascript avancé
        - MongoDB

    [Ok]
    ...

---------------------------------------------------

```

## Partie 3

Implémentez la suppression d'un auteur, ce bouton sera implémenté directement en page d'accueil.

Facultatif : créez un pop-in permettant de confirmer la suppression d'un auteur.

## Partie 4

Mettre en place la mise à jour d'un auteur.

## Annexes

Pour récupérez l'ensemble des auteurs avec fetch vous devez écrire une fonction comme suit :

```js

// JS async/await
/*
*  fetch est une fonction asynchrone async/await permet d'attendre que les fonctions aient retournées quelque chose avant d'exécuter le reste du script
*/
const fetchData = async () => {
    
    // 1
    const response = await fetch("http://localhost:3000/authors"); // await attend que le serveur réponde 
    
    // 2
    const data = await response.json(); // Puis dans response on demande à fetch de nous renvoyer les data dans un JSON

    // 3
    console.log(data);
}

// Pour exécuter cette fonction 
fetchData();

// Deuxième syntaxe possible pour le fetch en utilisant une approche Promesse 
fetch("http://localhost:3000/authors").then( response => {
    
    return response.json()
}).then( data => console.log(data ) );

```
Pour ajouter un auteur dans l'API :

```js

const fetchAuthor = async () => {
    const author = {
        name : "Antoine",
        shop : "Fnac"
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(author), // format chaîne de caractères (objet => chaîne de caractères )
        headers: { "Content-Type": "application/json" }
    }

    const response = await fetch("http://localhost:3000/add", options);
    const info = await response.json(); // le serveur vous retourne un message que l'on souhaite récupérer en JSON

    console.log(info);
}

```
