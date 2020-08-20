# Router

## Router React

Nous allons installer **React Router**, une librairie implémentant la gestion des routes. Cette librairie permettra de connecter une route à un Component donné.

En utilisant cette libraire, nous sommes dans le cadre d'une SAP (single application page). Il n'y a pas de requête HTTP côté client, de fait, tout se passe dans la page du navigateur et en Javascript.

```bash
npm install --save react-router-dom
```

Il faudra par la suite importer les modules suivants dans l'application :

```js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
```

Pour définir une route avec cette librairie, vous écrirez :

```html
<!-- en HTML : <a href="/" >Home</a> 
Et avec la librairie : -->
<link to="/" >Home</link>
```

Une route sera connectée à un composant donné de la manière suivante :

```html
<Router>
    <Link to="/" >Home </Link>
    <Route exact path="/" component={Home} />
</Router>
```

*Remarques :*

L'attribut exact permet de faire correspondre uniquement l'url "/" avec cette route. Si vous ne mettez pas exact d'autres urls pourront correspondre également : "/a", "/a/b", ...

On met souvent exact pour l'url racine de l'application.

## Plusieurs routes

Si vous avez plusieurs routes à gérer dans votre application, vous devez utiliser la balise switch. Lorsqu'il y a plusieurs routes à rendre la méthode switch utilisera la première route trouvée pour faire la correspondance :

```js
<Router>
    <div>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
    </ul>
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route  path="/login">
            <Login />
        </Route>
        <Route path="/dashboard">
            <Dashboard />
        </Route>
    </Switch>
    </div>
</Router>

```

\newpage

## Gestion de paramètres dans une route

Vous pouvez passer des paramètres à une route. Dans ce cas utiliser la syntaxe ":param" pour désigner le paramètre variable dans l'url.

Par exemple si vous avez des posts avec leur id vous écrirez dans le code React :

```js
{
    posts.map((post, i) => ( <Link to={`/post/${post.id}`}>{post.title}</Link> ) )
}

```

D'un autre côté vous connecterez chaque url à un pattern à déterminer avec un paramètre variable :

```js

<Switch>
    <Route path="post/:id" component={<Post />} />
</Switch>

```

Pour récupérer le paramètre id dans l'url il faudra alors dans le contexte du Router utiliser la variable match dans les props :

```js

const { url, path } = this.props.match;

```

La variable path designe le pattern /post/:id et url l'url concrète dans le code par exemple /post/12

## Redirection & PrivateRoute

Vous pouvez protéger des routes avec React Router et mettre en place un système de redirection, c'est pratique lorsqu'on souhaite par exemple protéger un dashboard pour administrer des contenus. 

```js
<Router>
    <div>
    <ul>
        <li>
        <Link to="/dashboard">Dashboard</Link>
        </li>
    </ul>
    <Switch>
        <PrivateRoute path="/dashboard">
            <Dashboard />
        </PrivateRoute>
    </Switch>
    </div>
</Router>

```

Vous pouvez utiliser la syntaxe suivante également, la logique de la redirection et de la protection de la route "/dashboard" sera implémentée dans le composant PrivateRoute

```js
<PrivateRoute path="/dashboard" />  
```

Dans le composant PrivateRoute vous écrirez quelque chose comme suit, où la variable rest contiendra les informations liées au router. La balise Redirect du router permet pour sa part de rediriger la route vers "/login", notez que vous pouvez également définir l'origine avec from.

Pour que tout fonctionne correctement vous devez vous trouvez dans le contexte du Router.

```js

const { ...rest } = this.props;

return (
    <Route 
        { ...rest }
        render={ (rest) => 
        isLogged ? <Dashboard  { ...rest } /> :
        <Redirect 
            to={{pathname : '/login', state : { from : "/"}}} 
        />
        }
    />
)

```

## Exercice private routes & posts

Créez un squelette d'application private-posts sur votre machine.

Vous allez mettre en place un dashboard et une page home. Le dashboard contiendra les liens vers des posts. Pour y accéder vous devrez vous authentifiez à l'aide d'un formulaire.

### Page principale

Cette page est simple vous affichez le menu principal, par défaut on arrive sur la page principale avec un message de bienvenu :

```txt
Home Dashboard

Bienvenu sur la page principale

```

Si vous essayez de vous connectez sur le dashboard la première fois vous serez alors redirigez vers la page de login. Et sinon, si vous êtes authentifié alors vous êtes redirigé vers la page en question.

### Page de login

Cette page (composant Login) est constituée de deux champs respectivement un champ pour son email et un champ pour le password. Le menu principal reste présent sur cette page. Pour l'authentification utilisez un couple de valeurs email/password que vous placerez dans une constante dans le composant Login.

Utilisez le locastorage du navigateur pour enregistrer une variable token qui permettra de savoir si vous êtes authentifié ou non.

Vous devez également gérer les messages d'erreur si l'authentification échoue.

```txt
Home Dashboard

Authentifiez-vous 

Email : []

Password : []

[Valider]

```

### Page Dashboard partie 1

Sur cette page vous afficherez les titres de chaque post.

Ajoutez sur la page ub bouton permettant de supprimer un post

```txt
Home Dashboard

Bienvenu sur le Dashboard

React JS  [delete]
React Native  [delete]
Angular  [delete]
Symfony  [delete]
MongoDB  [delete]

```

### Page Dashboard partie 2

Implémentez maintenant un bouton pour ajouter un post à la liste des posts.

```txt
Home Dashboard

Bienvenu sur le Dashboard

ajouter : 

title : []
content : []

[add]

React JS  [delete]
React Native  [delete]
Angular  [delete]
Symfony  [delete]
MongoDB  [delete]

```

Pour vous aidez voici ci-dessous la constante contenant les posts que l'on souhaite afficher :

```js

const posts = [
  { id: 16, title: "React JS", content: "Libraire ou Framework ?" },
  { id: 11, title: "React Native", content: "Mobile React" },
  { id: 100, title: "Angular", content: "Super ..." },
  { id: 7, title: "Symfony", content: "Framework expressif ..." },
  { id: 27, title: "MongoDB", content: "Base de données NoSQL" },
];

```

### Exercices supplémentaires Jeux maths

Pour les deux projets suivants installez celui-ci avec CRA et utilisez react-router-dom. Pour la partie CSS et SASS si vous voulez, tapez les lignes de commmandes suivantes dans le projet CRA. Notez que si vous utilisez node-sass vos fichiers CSS auront pour extension .scss ou .sass. L'extension s'occupe de transpiler le code SASS en CSS.

```bash
# merci à Mathias pour uuid pb d'encodage (...)
npm install bootstrap uuid --save

# Gestion du sass
npm install --save node-sass
```

Pour que le framework Bootstap Twitter soit installé dans l'application vous devez importez ses styles dans le fichier index.js de votre application comme suit :

```js
import React from 'react';
import ReactDOM from 'react-dom';
// Pour la gestion global des styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // css pour global 
// Pour sass
// import './index.scss'; 

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

### Proposition 1

Créez une app qui propose 2 liens : Home et Multiplication.

La page d'accueil affichera un petit texte présentant l'app :

Voici les tables de multiplication de 1 à 10.

La page Multiplication proposera 10 liens pour les 10 tables de multiplication. Ces liens sont cliquables et afficherons chacune des tables.

wireframe 1

```txt
Home Multiplication

Voici les tables de multiplication de 1 à 10

```

wireframe 2

```txt
Home Multiplication

Table de multiplication 1
Table de multiplication 2
Table de multiplication 3
...
Table de multiplication 10

```

### Proposition 2

Vous allez créer un jeu qui permettra de s'entrainer avec les tables de multiplication. Voyez ce qui suit :

- Page d'accueil

Présentera le jeu

```txt
Home Game Multiplication

Présentation du jeu : cliquez sur Game pour commencer le jeu. Ce dernier consiste à trouver
une multiplication. Vous avez 5 multiplications à trouver. Puis une fois le jeu terminé on affichera (redirection)
votre score.

```

- Page du jeu

Sur cette page vous proposez des multiplications à deviner. Vous proposerez 5 multiplications à deviner, une fois terminé on est redirigé vers une page qui affichera le score du jeu.

```txt
Home Game Multiplication

Combien font 5 X 9 
votre réponse [ ]
[valider]
```
Une option possible : gérez le temps de réponse de l'utilisateur. Par exemple créez un compteur une fois celui-ci dépassé et si l'utilisateur n'a pas répondu vous proposerez une autre multiplication à devinier.


