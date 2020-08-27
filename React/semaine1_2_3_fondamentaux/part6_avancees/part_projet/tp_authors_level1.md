# Authors

Temps de réalisation : 1 jour.

Vous devez faire cet exercice en autonomie, il n'est pas noté. Il nous permettra de tester nos connaissances.

Dans ce projet vous avez un ensemble d'auteurs avec leurs passions. Vous afficherez l'ensemble des passions de chaque auteur et donnerez la possibilité pour chacun des auteurs de leurs associer des notes.

Un bouton global permettra de calculer la moyenne de chaque auteur.

## Contraintes

Vous devez utiliser **CRA** pour initialiser le squelette du projet.

Vous contextualiserez le store à l'aide de la technique API contexte vue en cours. Pensez à organiser l'application, faites un dossier reducers et un dossier components.

Vous êtes libre d'utiliser un framework HTML/CSS de votre choix pour le projet. Vous pouvez utiliser par exemple, **Bootstrap Twitter** en CDN dans le fichier index.html dans le dossier public, si vous le souhaitez.

Vous devez organiser l'application en composants modulables. Pensez à définir les constantes de votre application.

## Page principale

Vous listerez sur cette page l'ensemble des auteurs avec leurs passions et un champ de saisi propre à l'auteur pour lui ajouter une note.

L'item passion est cliquable et permet d'afficher les passions de l'auteur correspondant :

```txt

Les auteurs :

- Alan
    [passion] : 
        * React
        * JS
        * MongoDB

    average : "aucune note"
    Ajouter une note : []
    [Ok]

- Alice
    [passion]

    average : "aucune note"
    Ajouter une note : []
    [Ok]
```

## Facultative (si vous avez le temps)

Créez une page permettant d'ajouter un auteur. Vous pouvez si vous le souhaitez utiliser react-router-dom. Dans ce cas créez un menu comme suit, par défaut vous serez redirigé vers la page Home qui affichera le texte suivant :

```text
[Home]  [auteurs]  [Admin Auteur]

Bonjour bienvenu sur la liste des auteurs.

```

## Data 

```js

const authors = [
    { 
        name : "Alan", 
        notes : [], 
        passion : ["React", "JS", "MongoDB"]
    },
     { 
        name : "Alice", 
        notes : [], 
        passion : ["SQL", "JS"]
    }
]

```

Bon développement.