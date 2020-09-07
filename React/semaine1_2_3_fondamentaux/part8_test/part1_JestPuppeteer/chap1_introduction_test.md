# Introduction aux tests unitaires

Dans React il existe différentes catégories de tests :

- Tests de rendu, dans un environnement de tests simplifiés.

- Exécution de l'application complète dans un navigateur, ce sont les tests dits de bout en bout ou end-to-end. Nous les définirons par la suite à l'aide de Puppeteer.

- Des tests unitaires qui vérifieront la logique ou l'algorithmique du code dans les composants ou modules.

**Remarque générale : avec React il faudra prendre garde à l'isolation des tests; en effet un algorithme ou une partie logique d'un script est testé de manière unitaire donc isolémenent du reste de l'application.**

## Le principe d'isolation

Chaque test unitaire est isolé des autres tests. Il est scopé dans une fonction anonyme afin d'éviter les effets de bord. Dans l'exemple, qui suit la variable price est locale (isolée) à l'aide de la fonction anonyme :

```js
test("price HT/TTC", () => {
    let price = 100;
    expect( price * 1.2).toBe( 120 );
});

test("price TTC reduction", () => {
    let price = 120;
    expect( price * 0.8).toBe( 96 );
});
```

Notez que vous pouvez utiliser **it** à la place de **test** dans Jest, it étant un alias de test. Dans un premier temps on utilisera plutôt test comme dans la documentation officielle de Jest.

## TDD test driven developpment

Dans l'idéal on écrit les tests avant d'écrire le code de l'application ou l'algorithmique. Puis une fois que les tests sont écrits, on développe le code qui fait passer les tests. Cette approche est très cohérente dans le sens où le code produit est plus sûr. Ce travail est double et prend clairement du temps, mais améliore la connaissance de son application. Ce travail TDD est parfois fait avec un autre développeur où les rôles s'inversent dans l'écriture des tests et le développement. Cela permet d'avoir la connaissance de l'application en équipe.

## Principes des tests

Les tests sont là pour rendre plus sûre l'application et améliorent la connaissance de l'expérience utilisateur. Ils évitent les bugs et permettent de les corriger plus rapidement. Notons également que lorsque le code évolue, l'application est alors re-testée avec les nouvelles "features". Il arrive alors que des bugs apparaîssent, c'est ce que l'on appelle des régressions. Si l'application est largement testée alors il sera plus facile de les corriger.

## Jest

C'est une librairie qui permet de faire des tests et d'accéder au DOM à l'aide de jsdom (simulation partielle d'un navigateur). Intégré dans React, il permet de simuler des API et d'isoler des modules ou des horloges.

Pour commencer nous allons découvrir Jest de manière indépendante de React.

## Installation de Jest

Tapez la ligne de commande suivante, nous allons installer Jest de manière globale.

```bash
npm install jest --global
```

## Application/Exercice price TTC

Lorsque vous allez lancer des tests Jest vous notifiera si ces tests passent ou non. Voyez, par exemple, ci-dessous un test qui échoue. Ici on attendait true mais le test a renvoyé false.

```text
Expected: true
Received: false
```

L'objectif de cet exercice est de tester une fonction calculant le prix TTC d'un prix HT.

Lorsque vous écrivez un test avec Jest vous aurez souvent besoin de vérifier qu'une certaine valeur en entrée vérifie une certaine condition ou retourne une valeur précise. Dans Jest vous utiliserez la fonction **expect** pour le vérifier. Elle possède de nombreuses méthodes qui couvrent la plupart des besoins de tests. Voyez la documentation ci-dessous :

- https://jestjs.io/docs/en/expect

Organisation des fichiers de l'application et des tests.

Créez un dossier **Exercices**, un sous dossier **priceTTC**, puis à la racine du dossier les fichiers suivants :

- priceTTC.js

- __tests__/priceTTC.test.js

*__tests__ est le dossier par défaut de test de Jest, vous pouvez écrire directement les tests si vous le souhaitez à la racine du projet.*

- package.json

Dans le fichier package.json écrivez la configuration suivante :

```json
{
    "name" : "price-ttc",
    "jest" : {
        "verbose" : true
    },
    "scripts": {
        "test" : "jest"
    }
}
```

1. Créez dans le fichier priceTTC.js une fonction qui retourne pour un prix HT donné son prix TTC, vous mettrez une tva à 20% paramètrable.

2. Puis dans le fichier priceTTC.test.js vous importerez le fichier priceTTC et testerez l'algorithmique de votre fonction comme suit :

```js
const priceTTC = require('./../priceTTC');

test("price HT to TTC", () => {
    expect(priceTTC(100)).toBe(120);
});
```

Lancez le test à l'aide de la commande suivante, vous devriez avoir un retour en console indiquant la réussite ou l'échec de vos tests :

```bash
npm run test
```

3. Généralisez le test à l'aide d'une liste de prix HT.

## Exercice utilisation de la méthode toEqual

La méthode toEqual permet de vérifier que deux objets ou deux valeurs sont égaux :

```js
const candidate1 = {
  name: 'Alan',
  age: 56,
};

const candidate2 = {
  name: 'Alan',
  age: 56,
};

describe('tests candidate', () => {
  test('have all the same properties', () => {
    expect(candidate1).toEqual(candidate2);
  });
  // On peut également tester que les objets ne sont pas égaux
  test('are not the exact same can', () => {
    expect(candidate1).not.toEqual(candidate2);
  });
});
```

Ecrivez une deuxième fonction **priceHT_TTC** qui permet de renvoyer un littéral dans lequel on aura le prix HT et le prix TTC, testez si cette fonction effectue correctement les calculs.

## Les exceptions

Nous allons voir comment tester les exceptions. La fonction **priceTTC** ou **priceHT_TTC** lèvera une exception si on lui passe un paramètre prix ou une tva qui n'est pas un nombre.

Par exemple la fonction suivante lève systématiquement une exception :

```js
const func = () => {
    throw new Error('My Error')
}
```

Dans Jest nous pourrons la tester à l'aide de la méthode toThrow, notez que le paramètre de cette fonction teste le message renvoyé par l'exception :

```js
it('should throw an error', () => {
    expect( () => fun() ).toThrow("My Error")
 })
```

## Exercice exception

Testez sur la fonction priceTTC et priceHT_TTC les exceptions, vous léverez une exception lorsqu'on passera un paramètre non numérique à ces fonctions.

## Les string

Vous pouvez tester si dans une chaîne de caractères il y a un certain pattern à l'aide de la méthode toMatch de la fonction except. De même vous pouvez tester si ce pattern n'existe pas :

```js
expect('Alan').toMatch(/lan/); // Le test passe
expect('team').not.toMatch(/I/); // Le test passe
```

Une autre méthode intéressante est la méthode toContain qui permet de tester la présence d'un pattern dans un itérable :

```js

const shoppingList = ['beer', 'paper towels']

expect(shoppingList).toContain('beer');
```

## Exercice liste de courses

Voici une liste de courses que l'on aimerait tester :

```js
const shoppingList = [
    {
        "image": "product1_640x426.jpg",
        "name": "Apple",
        "price": "1.99",
        "total": "3.98",
        "count": 2,
        "tags": ['love', 'cool', 'juce', 'love']
    }, {
        "image": "product2_640x426.jpg",
        "name": "Orange",
        "attribution": "visualhunt",
        "price": "0.99",
        "total" : "0.99",
        "tags": ['love', 'love', 'love', 'love'],
        "count": 1
    }, {
        "image": "product3_640x426.jpg",
        "name": "Pear",
        "price": "6.00",
        "total" : "24",
        "count": 4,
        "tags": ['cool', 'juce', 'love']
    },
    {
        "amount": "52.97"
    }
];
```

1. Testez si le total pour chaque produit correspond bien à ce que l'on attend.

2. Testez que le total des produits commandés n'est pas égal au total indiqué dans le JSON (amount).

3. Testez la présence du mot clé "love" au moins une fois dans la propriété "tags" du JSON.

4. Testez qu'il n'y a pas le mot clé "war" dans la propriété "tags".
