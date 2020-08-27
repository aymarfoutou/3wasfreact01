# Projet formulaire

Temps de réalisation : 1 jour.

Vous devez faire cet exercice en autonomie, il n'est pas noté. Il nous permettra de tester nos connaissances.

Attention, il y a deux versions possibles v1 ou v2. Lisez le brief avant de commencer. Et choisissez une version unique à développer.

Vous devez utiliser **CRA** pour initialiser le squelette du projet.

Vous contextualiserez le store à l'aide de la technique API contexte vue en cours. Pensez à organiser l'application, faites un dossier reducers et un dossier components. Si vous connaissez Redux vous pouvez l'utiliser dans le projet.

Vous êtes libre d'utiliser un framework HTML/CSS de votre choix pour le projet. Vous pouvez utiliser par exemple, **Bootstrap Twitter** en CDN dans le fichier index.html dans le dossier public, si vous le souhaitez.

Pensez à définir les constantes de votre application.

## Présentation de la v1

Vous allez réaliser un petit QCM d'évaluation de trois questions sur une seule page dans cette version. Une fois celui-ci effectué, vous afficherez son score. Pour le calcul, pour la variable score, vous comptez +1 si la réponse est juste et rien sinon. Au départ le score est égal à 0.

Vous devez pour le projet utiliser la structure de données proposées dans le document (voir partie **Data** plus bas).

Décomposez le projet en **composants** pour plus de modularité.

Une fois le QCM réalisé, vous afficherez dans un composant spécifique le score. Le QCM ne pourra pas être re-tenté (sauf rechargement de la page).

Wireframe (sur une seule page v1)

```txt

    Voici un QCM sur React répondez aux questions ci-dessous,
    pensez à laisser votre email, champ obligatoire (*) :

    h1 : QCM React

    votre email (*) : [ ]

    h2 : Q1 React est-il un framework ?

    Répondez en choisissant une seule et bonne réponse ci-dessous :

    Oui [] Non []

    -----------------

    h2 : Q2 JSX c'est quoi ?

    Répondez en choisissant une seule et bonne réponse ci-dessous :

    JSX est un langage compilé []

    JSX est un sur-ensemble développé par Facebook []

    ------

    h2 : Q3 Symfony design pattern.

    Sélectionnez ci-dessous dans la liste la bonne définition
    caractérisant ce framework PHP

    [choix du pattern]
        [choix1] : MMV
        [choix2] : MVC
        [choix3] : MMVV

    [Validez l'ensemble des questions]

```

Une fois le formulaire soumis afficher le score obtenu. On ne pourra pas re-tenter le QCM (sauf rechargement de la page).

```txt

    Voici votre score pour ce QCM 2/3

    Feeback

    Q1 : Bravo ! vous avez bien répondu React est bien une librairie.

    Q2 : Dommage ce n'est pas juste. JSX est un sur-ensemble développé par Facebook.

    Q3 : Bravo! Vous avez bien répondu, Symfony est basé sur le pattern MVC.

```

## Présentation de la v2

Dans cette partie vous utiliserez react-router-dom.

Dans ce deuxième projet réalisé le même QCM sur plusieurs pages. A chaque fois que l'on répond à une question on affiche la suivante. Vous implémenterez un menu, voir le wireframe ci-dessous.

### Page d'accueil

Par défaut vous afficherez la page d'accueil avec le message suivant, dans le test vous ici et QCM sont cliquables et même au QCM lui-même. 

Le menu est composé de deux item : Home (page ci-dessous) et QCM page pour commencer le QCM.

```txt
  [Home] [QCM]

  Vous avez un QCM à faire cliquez [ici] ou dans le menu [QCM] pour commencer.

```

### La page QCM

Une fois le QCM réalisé vous serez redirigé vers la page présentant son score.

```txt

    Voici un QCM sur React répondez aux questions ci-dessous,
    pensez à laisser votre email, champ obligatoire (*) :

    h1 : QCM React

    votre email (*) : [ ]

    Laissez votre avatar [ ]
```

### Page de score 

```txt

    Voici votre score pour ce QCM 2/3

    Feeback

    Q1 : Bravo ! vous avez bien répondu React est bien une librairie.

    Q2 : Dommage ce n'est pas juste. JSX est un sur-ensemble développé par Facebook.

    Q3 : Bravo! Vous avez bien répondu, Symfony est basé sur le pattern MVC.

```

## Facultatif Options possibles 

Ces options sont valables pour les deux versions si vous souhaitez les implémenter.

### Options facultatives

- Ajoutez des coefficients aux questions 

- Faites un système de connexion nom & email au QCM indivisualisé. Chaque sondé aura son propre score. Vous êtes dans ce cas libre de modifier le state. 

Bon développement.

### Data commun au deux versions v1 & v2

```js
 const questions = {
            'symfony' : {
                title : "Symfony design pattern", 
                choices : ['MMV', 'MVC', 'MMVV'], 
                response : 1, 
                type : "select",
                name : "symfony",
                feedback : 'Symfony est basé sur le pattern MVC'
            },
            'react' : {
                title : "React est-il un framework ?", 
                choices : ['yes', 'no'], 
                response : 1, 
                type : "radio",
                name : "react",
                feedback : "React est une librairie"
            },
            'jsx' : {
                title : "JSX c'est quoi ?", 
                choices : ['JSX est un langage compilé', 'JSX est un sur-ensemble développé par Facebook'], 
                response : 1, 
                type: "radio" ,
                name : "jsx",
                feedback : 'JSX est un sur ensemble à JS'
            }
        }

```