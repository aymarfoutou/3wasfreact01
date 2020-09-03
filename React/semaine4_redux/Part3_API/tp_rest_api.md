# Rest API

Nous allons créer une petite application REST pour lire, afficher, supprimer et modifier des auteurs d'une librairie.

Créez le serveur Express suivant et placez les données authors directement sur le serveur. Insallez les dépendances nécessaire puis lanez le serveur dans un dossier à l'extérieur du projet React.

```js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let authors = [{
    "_id": "3hj9ecwzc5",
    "name": "Alan",
    "bio": "DEA à l'université Luminy",
    "shop_name" : "fnac",
    "books" : ["Javascript", "Eloquent JavaScript, Second Edition"]
},
{
    "_id": "ii3v6javys",
    "name": "Albert",
    "bio": "BAC science et stages au CNRS",
    "shop_name" : "librarie grande rue",
    "books" : ["Maths", "Relativité restreinte"]
},
{
    "_id": "ii3v6jaYUY",
    "name": "Sophie",
    "bio": "Science po",
    "shop_name" : "librarie",
     "books" : ["Politique", "Ecologie"]
},
{
    "_id": "81928usije",
    "name": "Alice",
    "bio": "Brevet des collège",
    "shop_name" : "fnac",
     "books" : ["Le pays des merveilles", "un monde merveilleux"]
},
{
    "_id": "8798uhyek",
    "name": "Phil",
    "bio": "Médecine",
    "shop_name" : "fnac",
    "books": ["néphrologie", "beta bloquant"]
}
];

app.use(express.json({ limit: "1mb" }));

// Get all
app.get('/authors', (req, res) => {
    res.json(authors);
});

// store author
app.post('/author', (req, res) => {
    const { name, bio, shop_mame, books } = req.body;

    authors.push(req.body);

    res.json({
        status: 'success',
        name: name
    });
});

// get one author 
app.get('/author/:id', (req, res) => {
    const { id } = req.params;
    const author = authors.filter(author => author._id === id);

    if (author.length > 0)
        res.json({
            status: 'success',
            id: id,
            author: JSON.stringify( author[0] )
        });

    else
        res.status(404).send('Author not found');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
```

## React API Objectifs

Dans ce API nous allons créer une application qui affiche des auteurs et de l'information liée à ces auteurs. Nous faisons ici un CRUD sur des auteurs : lecture, création, modification et suppression.

Ces actions sont défnies sur le serveur ci-dessus.

### Mise en place de l'asynchrone dans React & Redux

Le dispatcher de Redux est synchrone or ici pour consommer notre API nous utiliserons axios qui est asynchrone. Pour rés

```bash
npm install redux-thunk
```

Puis dans votre index.js configurer React pour que Redux prenne en compte cette dépendance. Dans l'exemple ci-dessous on utilise applyMiddleware une méthode de Redux pour lui passer le module thunk permettant de gérer l'asynchrone dans React.

```js
// pensez à importer les classes nécessaires
import { createStore, applyMiddleware } from 'redux';

const store = createStore(shop, applyMiddleware(thunk));
```

Voici un exemple dans le fichier actions-types.js d'une méthode asynchrone que l'on peut maintenant écrire :

```js

export const fetch_promise_response = payload => {
    return {
        type: 'FETCH_PROMISE', payload
    };
}

export const fetch_promise_async = () => {

    return dispatch => {

        const fetch_promise = async () => {

            const response = await new Promise(res => {
                setTimeout(() => {
                    res(false);
                }, 1000);
            });

            dispatch(fetch_promise_response(response));
        }

        fetch_promise();
    };
}
```

## Partie 1

Gérez l'affichage des auteurs sur la page principale. Ajoutez un bouton sous chaque nom afin d'afficher le détails d'un auteur dans la colonne latérale.

Vous afficherez lorsqu'on cliquera sur le bouton détails :

Nom 
Bio
Librairie
Livres de l'auteur

## Partie 2

Créez un formulaire permettant d'ajouter un nouvel auteur. Placez ce bouton sur la page principale. Vous pouvez si vous le souhaitez utilise un module externe pour gérer du routing.

## Partie 3

Ajoutez pour chaque auteur un bouton permettant de le supprimer.

## Partie 4

Ajoutez maintenant un bouton pour chaque auteur "Mise à jour". Il permettra de modifier les informations liés à l'auteur.