# Introduction

Nous allons découvrir styled-components un module spécifique React permettant de gérer les styles en JS. D'autre approche similaire comme Emotion peut être utiliser avec React et sans.

Les composants stylisés seront définie dans un composant avec une syntaxe qui ressemblera à :

```js
import React from "react";
import styled from "styled-components";

// définition d'un composant avec ses styles propres.
const Presentation = styled.h1`
    color : red;
    font-size : 1.2rem;
`;

const App = () => (
    <Presentation>Hello world</Presentation>
);

export default App;

```

Il existe de nombreuse approche pour la gestion des styles CSS avec React. Nous avons vu par exemple que l'on pouvait utiliser SASS et des fichiers de styles par composant en gérant également un fichier de style global avec un index.scss.

L'approche CSS-in-JS permet de gérer les CSS en JS. Il n'utilisera pas le build SASS ou CSS de React qui est gérer par webpack en interne. Les CSS un peu moins optimisé seront directement insérer dans la balise style de la page. Cependant ils seront propre à chaque composant et donc sont plus optimisés.

## Avantages

Les noms de classe sont autogéré, ils sont unique par composant. Il n'y donc pas de risque d'effet de bord pour la définition des styles entres composants. On peut donc facilement gérer les CSS directement dans l'inspecteur.

On a une syntaxe CSS classique pour définir les styles et une partie des fonctionnalités SASS est intégrée dans sa syntaxe. On peut également utiliser des pseudo-classes, pseudo-éléments et les media-queries.

On peut utiliser des thèmes avec un composant ThemProvider, cette approche est très pratique en utilisant le Context API de React. Il permet alors d'injecter un thème dans les props de tous ces enfants. Le thème peut alors être utiliser dans les règles CSS d'un composant.

On peut également utiliser des props pour styliser de manière conditionnelle.

```js

```

## Installation

Vous pouvez installer styled components avec yarn ou npm.

```bash
npm install styled-components --save
```

## Création de classes

Vous pouvez créer des classes pour ciblier un élément spécifique :

Un élément HTML :

```html
<div class="Presentation Presentation--outline Presentation--primary">
    <img class="Presentation__img" />
</div>
```

Et pour la partie CSS :

```css

.Presentation {
    &--outline{

    }
    &--primary{

        &__img{

        }
    }
}
```

## Création de composant avec styled component

Ci-dessous on définit un composant Presentation qui sera un titre de niveau 1 (h1).

```js
import React from "react";
import styled from "styled-components";

// définition d'un composant avec ses styles propres.
const Presentation = styled.h1`
    color : red;
    font-size : 1.2rem;
`;

const App = () => (
    <Presentation>Hello Styled components</Presentation>
);

export default App;

```

Styled components créera dans le DOM une classe spécifique pour titre h1 :

```html
<h1 class="sc-bdGXs ghtXs">Hello Styled components</h1>
```

## Style global

Vous pouvez créer des règles CSS globales à l'aide de la méthode createGlobalStyle de styled-components :

```js
const GlobalStyle = createGlobalStyle`
    /*...*/
`;

const Container = styled.div``;
const Section = styled.div``;

const App = () => (
  <Container>
    <GlobalStyle />
    <Form />
  </Container>
);

export default App;
```

Il faudra insérez le composant GlobalStyle dans votre composant racine comme dans l'exemple ci-dessus.


## Exercice création d'un menu

Créez