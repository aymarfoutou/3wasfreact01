# Convert

Créez une application avec CRA permettant de convertir une somme en euro dans une autre devise. Vous ferez un select permettant de sélectionner une devise particulière dans le formulaire permettant de mettre un montant à convertir.

```txt

amount : []

devise : [euro] <-- select

[ ] <--  conversion immédiate 

```

## Configuration & installation

Utilisez l'API suivante : de ​http://fixer.io, obtention de la clé gratuite. Regardez la documentation afin de mettre en place cette API dans le code.

- 1. Dans un premier temps essayer de consommer l'API sans mettre en place un redux, (Petit test dans un useEffect).

- 2. Vous pouvez soit utiliser un context API (préférable) ou Redux, mais dans ce cas il faudra penser à utiliser le module **thunk** pour la gestion des dispatch avec l'asynchrone dans Redux. Voyez, dans ce deuxième cas, l'exemple qui suit qu'il faudra mettre en place dans le fichier actions-types.js :

```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

const increment = () => {
  return {
    type: INCREMENT_COUNTER,
  };
}

function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
}
```

Installation de thunk :

```bash
npm install redux-thunk
```

Dans le cas de l'utilisation de thunk votre index.js ressemblera à :

```js
// ...
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

// ...

```

## Charger les currency

Créez une action permettant de charger toutes les devises lors du lancement de l'application. Une fois ces devises chargées, utilisez les dans un select/options afin sélectionner une devise pour effectuer une conversion.

```text
http://data.fixer.io/api/latest?access_key= ...
```

## Convertir un montant

Créez un formulaire permettant d'effectuer une conversion d'un montant dans une devise en tant réel.