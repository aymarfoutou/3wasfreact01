# Redux avancé

## Combine reducer

Dans une application on découpe souvent l'algorithmique en plusieurs stores. Redux fournit une méthode **CombineReducer** qui permet de "combiner plusieurs reducers".

Supposons que l'on ait deux reducers a et b, alors vous pouvez définir dans votre dossier reducers un fichier index.js et combiner les reducers comme suit :

```js
import { combineReducers } from 'redux';

import a from './a';
import b from './b';

export default combineReducers({
    aRdecuer : a,
    bReducer : b
});

```

Si vous utilisez create-react-app, vous importerez le fichier **index.js** dans votre fichier de bootstrap, fichier index.js à la racine de votre application. Le "combine reducer" se récupère comme un reducer classique :

```js

import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Combine Reducer
import reducer from './reducers/index';

const store = createStore(reducer);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

```

## Comment utilisez le store d'un combine reducer

Dans la lecture des props dans un composant, il faudra faire attention à sélecionner le bon store. Dans l'exemple que nous avons donné dans le cours pour lire le store a ou b vous devrez écrire :

```js

const { a, b } = useSelector(state => {

  return {
    a : state.aRdeucer,
    b : state.bReducer
  }
})

```

## Exercice d'application Dragon

1. Reprendre le projet précédent sur les Dragons. Créez un reducer log il permettra de notifier la création et la suppression des dragons. Vous pouvez utiliser moment JS pour la gestion des dates dans votre partie log.

2. Ajoutez un bouton permettant de supprimer tous les logs.

3. Créez un nouveau reducer pour ajouter des chevaliers. Vous afficherez la liste des chevaliers à côté de la liste des dragons. Vous créez un nouveau champ sous le champ de saisi des dragons pour les chevaliers. Dans cette gestion vous mettrez en place l'ajout et la suppression des chevaliers.

4. (facultatif) Mettez en place la possibilité d'associer un chevalier à un dragon. Un chevalier ne peut avoir au plus qu'un dragon.

## Middleware

Les middlewares se trouvent, ensemble de fonction(s), entre l'envoie (dispatch) et les réduceurs (reducers). Nous pouvons donc techniquement modifier les actions distribuées avant qu'ils arrivent aux réduceurs, ou exécuter une fonctionnalités lors de ce processus.

![middleware](images/middleware.png)

\newpage

### Middleware signature

Voici la signature d'un middleware :

```js
const customMiddleware = store => next => action {
    const state = store.getState(); 
    const returnAction = next(action);
    
    return returnAction ;
}
```
Cette écriture de fonction anonyme est pratique pour éviter les problèmes de this, mais si on souhaite l'écrire avec le mot réservé function de JS :

```js
function customMiddleware(store) {
  const next = store.dispatch;

  return function dispatch(action) {
    const returnAction = next(action);
    
    return returnAction;
  }
}

```

Cette fonction fonction reçoit le store elle retourne une fonction qui reçoit les next. Ici (dans la partie next) nous pouvons donc décider d'envoyer d'autre(s) action(s) à un reduceur (ou un autre middleware). Cette dernière fonction retournera également l'action en cours de dispatching.

### remarque

Une telle fonction est une fonction renvoyant une autre fonction. Voici un exemple en JS

```js
const myFunc = a => b => a + b ;

// Retournera 20
myFunc(10)(10)
```
## Exercice logs avec un middleware

Refactorez les logs en créant un middleware : middlewareLog. Vous pouvez créer une branch avec Git refactoring (facultatif). Lorsqu'on ajoute ou supprime un dragon et uniquement pour ces actions, notifiez le dans les logs à l'aide de votre middleware.

## Middleware thunk

Les actions sont dispatchées de manière synchrone dans le reducer. Pour pouvoir gérer des actions asynchrones on doit installer le module thunk qui est un middleware. Il permettra de gérer l'asynchrone des actions dans le reducer.

Imaginons la problématique suivante dans le fichier actions-types.js :

```js
const COUNTER = 'COUNTER';

// Cette action est synchrone
export const  set_counter = payload => {
  return {
    type: COUNTER, payload
  };
}

// Cette action est asynchrone (...)
export const startCounter = () => {

   return dispatch => {
        setInterval(() => {
        dispatch(set_counter(1)); // Ici on dispatch une action asynchrone => Redux ne sait pas le faire nativement (...)
        }, 1000);
  };
}
```

## Exercice d'application

### Partie 1

Mettez en place un chrono simple, créez un nouveau reducer, dans l'application Dragon que nous avons développé. N'utilisez pas pour l'instant le module thunk, nous allons essayer de mettre en évidence la problématique des actions asynchrones dans Redux. Théoriquement votre chrono ne marchera pas (...).

Dans le header de l'application:

```txt
  [14] <-- secondes qui défilent
```

### Partie 2

Installez le module puis mettre en place la configuration (voir plus bas). Et vérifiez maintenant que votre chrono fonctionne correctement.

```bash
npm install redux-thunk
```

Puis, dans React dans le fichier **index.js** vous l'installez comme suit, une fois cette configuration réalisé vous pourrez gérer un dispatch asynchrone comme fetchAsync ci-dessus :

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

// Redux avec le middleware 
import { createStore, applyMiddleware } from 'redux';

// thunk permet la gestion de l'asynchrone dans Redux
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import reducer from './reducers/index';

const store = createStore(reducer, applyMiddleware(thunk) );
// console.log(store.getState())

// On passe le store à l'application composant racine
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

### Partie 3

Le compteur de notre chrono fonctionne maintenant à l'aide de Thunk middleware qui permet de gérer dans Redux les actions dispatchées de manière asynchrone.
Trouvez un moyen de mettre un bouton permettant l'arrêt du chrono.

## Exercice axios score

Installez un projet React avec Redux, créez un store uniquement pour lire des scores, dans ce but vous créerez l'action FETCH_SCORE qui permettra la récupération des données. Utilisez axios pour récupérer les données dans votre fichier actions-types.js.

Créez une base de données game dans firebase, puis dans cette base de données puis ajouter les données suivantes

```json
{
  "scores": [
    {
       "score" : 19
    },
   {
       "score" : 10
    },
     {
       "score" : 20
    },
     {
       "score" : 17
    }
  ]
}
```

Créez une application qui affichera les scores des utilisateurs en les récupérant depuis la base de données game.
