# Aggrégation

find permet d'extraire une liste de documents. Des traitements plus complexes pour grouper les données seront réalisés à l'aide du framework d'agrégation de MongoDB.

Opérations de pipeline d'agrégation. La méthode aggregate prend une liste d'opérateurs.

```js

// pipeline d'opération
db.collection.aggregate([
        { $match : { filtrage }}, // premier  filtrer  les données 
        { $project : { projection }},  // projection hérite de la première instruction
        // on regroupe les données en fonction d'un champ $field puis on exécute une fonction d'agrégation sur les données regroupées.
        { $group : { _id :  <$field>,  <field> : <function aggregation> }}, 
        { $sort : { <field> : - 1}}, 
])


// filtre les contenus ~ find
{ $match : {}}

// le second paramètre du find projection
{ $project : {}}

// group opérateur d'aggrégation
{ $group : {}}

// sort
{ $sort : {}}

```

Attention, à l'ordre des opérations vous devez faire la projection après le filtrage match.

On peut à titre d'exemple montrer que la méthode aggregate est pour certains opérateurs identiques à la méthode find :

```js
db.restaurants.aggregate([
    { $match : {
        "grades.grade" : "A"
    }},
    { $project : {
            "name" : 1, "_id" : 0
        }
    }
])
```

Avec le framework d'agrégation de MongoDB vous pouvez faire autant de sous-requêtes que vous souhaitez, dans l'ordre que vous voulez modulo l'ordre match/project.

Nous allons donner un exemple de groupement simple, nous allons compter le nombre de restaurants qui font de la cuisine italienne par quartier. Notez bien que la clé désignant le quartier doit commencer par un dollar, en effet pour MongoDB c'est un paramètre variable :

```js
db.restaurants.aggregate([
    {   $match : {
            "cuisine" : "Italian"
        }
    },
    { $group : {"_id" : "$borough", "total" : {$sum : 1}}},
])

/*
{ "_id" : "Queens", "total" : 131 }
{ "_id" : "Bronx", "total" : 52 }
{ "_id" : "Brooklyn", "total" : 192 }
{ "_id" : "Manhattan", "total" : 621 }
{ "_id" : "Staten Island", "total" : 73 }
*/
```

Nous pouvons également organiser la requête en JS de manière plus lisible.

```js
const match = {$match : {
            "cuisine" : "Italian"
        }
};

const group = { 
    $group : {"_id" : "$borough", "total" : {$sum : 1}}
} ;

db.restaurants.aggregate([
    match,
    group
])
```

## Compter le nombre d'éléments d'une collection

En SQL lorsqu'on veut compter le nombre de ligne dans une table sales par exemple on écrira :

```sql
SELECT COUNT(*) AS count FROM sales
```

Dans MongoDB vous utiliserez le code suivant :

```js
db.sales.aggregate( [
  {
    $group: {
       _id: null,
       count: { $sum: 1 }
    }
  }
] )
```

## Aggrégation de somme et création d'un nouveau document

Créez une collection **sales** dans MongoDB dans la base de données restaurants.

Rappelons la syntaxe pour créer une collection :

```js
db.createCollection(name, options)
```

Créez le document sales suivant, nous créerons au préalable un schéma cette collection afin de préciser à MongoDB le type de chaque propriété :

```js

db.createCollection("sales", 
    { capped : true, size : 5242880, max : 5000 },
    {
        validator : {
            $jsonSchema : {
                bsonType : "object",
                required : ["price"],
                properties : {
                    agency : "string",
                    price : {
                        bsonType : "decimal",
                        description : "must be a number and is required"
                    },
                    date : {
                        bsonType : "date",
                    },
                    restaurant_id : {
                        bsontype : "string"
                    }
                }
            }
        }
    }
)

// Insertion
db.sales.insertMany([
  {  "restaurant_id" : "5e79995fee344ac7b3cde77d", "agency" : "abc" , "price" : NumberDecimal("100000"),  "date" : ISODate("2014-03-01T08:00:00Z") },
  {  "restaurant_id" : "5e79995fee344ac7b3cde784", "agency" : "xyz" , "price" : NumberDecimal("200000"),  "date" : ISODate("2014-03-01T09:00:00Z") },
  { "restaurant_id" : "5e79995fee344ac7b3cde77f", "agency" : "abc" , "price" : NumberDecimal("5000000"),  "date" : ISODate("2014-03-15T09:00:00Z") },
  {  "restaurant_id" : "5e79995fee344ac7b3cde785", "agency" : "uvw" , "price" : NumberDecimal("5000000"),  "date" : ISODate("2014-04-04T11:21:39.736Z") },
  {  "restaurant_id" : "5e79995fee344ac7b3cde788", "agency" : "uvw" , "price" : NumberDecimal("10000000"),  "date" : ISODate("2014-04-04T21:23:13.331Z") },
  {  "restaurant_id" : "5e79995fee344ac7b3cde790", "agency" : "abc" , "price" : NumberDecimal("700000.5"),  "date" : ISODate("2015-06-04T05:08:13Z") },
  {  "restaurant_id" : "5e79995fee344ac7b3cde78a", "agency" : "xyz" , "price" : NumberDecimal("700000.5"),  "date" : ISODate("2015-09-10T08:43:00Z") },
  {  "restaurant_id" : "5e79995fee344ac7b3cde781", "agency" : "abc" , "price" : NumberDecimal("1000000") , "date" : ISODate("2016-02-06T20:20:13Z") },
])
```

Voici comment on peut faire une requête SQL qui compterait le nombre d'items dans la collection ci-dessus :

En SQL :

```sql
SELECT COUNT(*) FROM sales;
```

En MongoDB

```js
db.sales.aggregate( [
  {
    $group: {
       _id: null,
       count: { $sum: 1 }
    }
  }
] )
// affichera
{ "_id" : null, "count" : 8 }
```

## Exercice calculer la somme par agence

- 1. A partir des données ci-dessus calculer le total des prix des restaurants par agence.

- 2. Quelles sont les totaux dans ce regroupement qui sont supérieurs ou égaux à 950000 ?

*Remarques : vous pouvez également appliquer une condition de recherche par regroupement (HAVING) en utilisant l'opérateur suivant après l'opérateur de regroupement. Dans l'absolu vous pouvez donc enchaînner plusieurs opérateur match/group/match/group ...*

```js

 { $match : {} }

```

- 3. On aimerait maintenant avoir tous les noms et id des restaurants par type de cuisine et quartier. Limitez l'affichage à deux résultats.

- 4. Affichez maintenant tous les noms de restaurant italien par de quartier.

- 5. Affichez également pour chaque restaurant la moyenne de ses scores. Et ordonnez vos résultats par ordre de moyenne décroissante.
Remarques : vous utiliserez l'opérateur suivant pour désimbriquer les éléments de la liste grades afin de pouvoir faire la moyenne sur le champ score, mettez cet opérateur avant les autres : unwind/match/group/ ...

```js
 { $unwind : "$grades" } ,
```

- 6. Faites une requête qui récupère les 5 derniers restaurants par quartier les mieux notés et placez cette recherche dans une collection top5.

Remarques : vous pouvez utiliser l'opérateur suivant pour enregistrer une nouvelle collection à partir d'une recherche données :

```js
{ $out : "top5" }
```

- 7 Récupérez le nombre de restaurants par quartier ainsi que leur type de cuisine dont le score est supérieur ou égale à 30. Ordonnez le résultat par ordre décroissant de nombre de restaurant.

- 8 Récupérez le nombre de restaurants et le nombre de type de cuisines différentes par quartier. Créez un champ totalCuisine

Par exemple pour Manhattan vous devriez avoir le résultat suivant :

```js
{ "_id" : "Manhattan", "totalRestaurant" : 884, "totalCuisine" : 59 }
```

## Lookup pour faire une jointure


Ajoutez la collection borough elle indique le nombre de personnes par quartier :

```js
db.borough.insertMany([
    { _id : "Manhattan", population : 1537195},
    { _id : "Brooklyn", population : 2465326},
    { _id : "Queens", population : 2229379},
    { _id : "Bronx", population : 1332650},
    { _id : "Staten Island", population : 443728}
])
```

### Exercice lookup

Faites une jointure avec la collection borough pour récupérer par quartier les informations sur sa population.


## Exercice tree structure Algorithmique 

Travaillez sur la collection **categoriestree** dans la base de données **bookstore**.

1. Framework d'aggregation ajoutez une propriété total qui calcul le nombre de livres par document

2. Affichez le nom de la catégorie ayant le plus de livres ainsi que les livres.
