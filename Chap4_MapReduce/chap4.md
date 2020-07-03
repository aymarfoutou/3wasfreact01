# MapReduce

C'est un pattern permettant de mapper une collection en appliquant un calcul d'agrégation sur une partie d'un item dans une collection.

Considérons la collection orders et ajoutons dans cette collection les valeurs suivantes :

```js

use products

db.createCollection('orders')

db.orders.insertMany( [
   { cust_id : "A123", amount : 500, status : "A" },
   { cust_id : "A123", amount : 250, status : "A" },
   { cust_id : "A123", amount : 200, status : "A" },
   { cust_id : "A123", amount : 300, status : "B" },
   { cust_id : "B123", amount : 500, status : "A" },
   { cust_id : "B123", amount : 250, status : "A" },
   { cust_id : "B125", amount : 200, status : "A" },
   { cust_id : "B126", amount : 300, status : "B" },

]);

```

Une fois que vous avez exécuté cette commande la collection **map_reduce_total** sera créée.

```js

db.orders.mapReduce(
    function() { emit( this.cust_id, this.amount ) }, // map
    function(k, v) { return Array.sum(v)}, // reduce
    { 
        query : { status : "A" },
        out : "map_reduce_total"
    }
)

db.map_reduce_total.find()
/*
{ "_id" : "A123", "value" : 950 }
{ "_id" : "B123", "value" : 750 }
{ "_id" : "B125", "value" : 200 }
*/
```

## Récupération des données

Créez la base de données gym dans Mongo.

Puis dézipper le dossier suivant Gymase.zip sur votre poste. Ce dossier se trouve dans le dossier data sur le serveur Git.

Et enfin tapez les lignes de commande suivantes :

```bash
mongorestore -d gym -c gymnase Gymnases.bson
mongorestore -d gym -c sportif Sportifs.bson
```

Et contrôlez que les données sont bien importées dans votre base de données gym dans Mongo :

```js
db.gymnase.count()
// 28
db.sportif.count()
// 150

// De même vérifier la structure
db.gymnase.findOne()
db.sportif.findOne()
```

### Exercice 1 collection sportif

Calculez le nombre d'hommes et de femmes dans la collection sportif à l'aide du Pattern MapReduce.

### Exercice 2 collection sportif

Trouvez tous les noms des sportifs qui ne pratiquent pas de sport ... Vous pouvez pour cela utiliser l'opérateur suivant :

```js
{ a : { $exists : false } }
```

Calculez le nombre de sportifs jouant pour chaque sport. Explorez la collection pour voir comment elle est structurée avant d'écrire un script avec le Pattern MapReduce pour répondre à cette question.

## Exercices 3 

- Calculez le nombre de gymnases pour chaque ville.

- Calculez le nombre de séances pour chaque jour de la semaine. De même pour chaque sport.


Nous allons maintenant reprendre le dataset restaurants

## Exercices nombre de grade A

Comptez le nombre de A par type de cuisine