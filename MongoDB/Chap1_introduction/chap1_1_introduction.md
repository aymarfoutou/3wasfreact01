# Introduction & Présentation

MongoDB est une base de données NoSQL (Not Only SQL) crée en 2007, mature et orientée document (fichier BJSON).

MongoDB est un DSL domain-specific language, il n'utilise pas le paradigme SQL, mais un langage original dédié à l'interrogation des données.

Il est adapté au stockage de données **massives** qui peuvent varier dans le temps, son DSL est puissant et permet d'interroger les données facilement. Notez que lorsque la structure des données est connues au préalable et ne bouge pas dans le temps on utilisera de préférence du SQL.

Dans un projet d'application Web vous serez amené à travailler avec les **deux** paradigmes SQL et NoSQL, par exemple MySQL et MongoDB.

Enfin, MongoDB propose un ensemble important de drivers pour les langages comme PHP, JS, Python, ... Comme par exemple MySQL.

## Document et collection

Dans une base de données MongoDB vous manipulerez des **documents**, fichiers semi-structurés BJSON dont les propriétés sont typées. BJSON est un **binaire** qui permet d'interroger les données plus rapidement.

Les documents sont stockés dans une collection qui se trouve dans une base de données sur un serveur MongoDB.

## Modélisation des données

MongoDB ne gère **aucun schéma de données** il est orienté flexibilité, les collections n'ont donc pas de structure pré-déterminée ou fixe, elles peuvent donc **évoluer dans le temps**. Dans un document, des champs peuvent être ajoutés, supprimés, modifiés et renommés à tout moment ...

Le modèle des documents est basé sur un système de **clés/valeurs**. Chaque valeur peut être de type sclaraire, c'est-à-dire des numériques, chaîne de caractères, boléens ou la valeur particulière null. Ces valeurs peuvent également comporter des listes de valeurs ou même des documents imbriqués.

Ci-dessous un exemple de document :

\newpage

```json
{
  "students" : [
      {
          "_id" : 1,
          "name" : "Alan",
          "address" : {
            "street" : "London",
            "city" : "London",
            "zip" : " 31413"
        },
          "grade" :  "master 5",
          "notes" : [14,17,19,20],
          "relationship" : null
      },
       {
          "_id" : 2,
          "name" : "Alice",
          "address" : "Paris",
          "grade" : "master 4",
          "notes" : [19, 11, 20],
          "relationship" : [1]
      }
  ]
}
```

Remarque : chaque document possède obligatoirement une clé unique _id, le type de cette propriété est par défaut **ObjectId**, mais peut être de n'importe **quel type scalaire**. La valeur de ce champ doit cependant **être unique** dans le document et bien sûr non mutable. Vous ne pouvez pas définir par exemple cette clé avec un array ou un objet qui sont des valeurs mutables.

## Installation

Nous pouvons utiliser un interpréteur graphique comme Robo 3T (voir fin du document). Ou utilisez MongoDB directement en console avec son interpréteur JS. C'est cette 
configuration que nous utiliserons dans le cours.

### Windows

Installation : [Mongo install](https://docs.mongodb.com/manual/installation/)

Installeur : [installer](https://www.mongodb.com/try/download/community)

Suivez les étapes de l'installation et précisez le dossier **data** pour le stockage des bases de données sur votre machine.

Puis lancez le serveur dans votre console comme suit, notez également que vous pouvez modifier vos variables d'environnement afin d'y accèder plus rapidement sur votre machine.

```bash
# démarrer le serveur
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe"

# se connecter au serveur
"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
```

### Mac

Vous devez d'abord installer **brew**. Puis tapez les lignes de commandes suivantes dans un terminal :

```bash

brew tap mongodb/brew
brew install mongodb-community

# Créer le dossier pour les bases de données MongoDB
sudo mkdir -p /data/db

# Permissions pour travailler avec le dossier des bases de données
sudo chown -R `id -un` /data/db

# start mongo (serveur)
mongod

# version
mongo --version

# se connecter au serveur
mongo
```

Théoriquement le fichier de configuration se trouve à l'adresse suivante :

```txt
/usr/local/etc/mongod.conf
```

Contenu du fichier :

```txt
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  bindIp: 127.0.0.1
```

### Linux

Installez MongoDB avec apt-get puis lancez le serveur comme suit :

```bash
sudo systemctl start mongod
```

Dans un terminal connectez-vous au serveur en tapant mongo :

```bash
mongo
>
```

## Exemples de commandes MongoDB

Une fois connecté sur votre serveur MongoDB, vous avez accès aux commandes CLI (command line interface). Pour quitter le serveur vous taperez dans MongoDB :

```bash
quit()
```

Sur le serveur Mongo :

```js
//Affichez les bases de données
show dbs

// Connexion et/ou création d'une base de données restaurants
use restaurants

// Connaitre le nom de la base de données sur laquelle on est connecté
db

// Une fois dans une base de données voir les collections
show collections

// renommer une collection addresses en address
db.addresses.renameCollection("address")

// Supprimer l'ensemble des documents dans une collection
db.address.remove({})

// Supprimer physiquement une collection
db.address.drop()

// Supprimer la base de données actuelle (restaurants)
db.dropDatabase()
```

\newpage

## Outils graphique Robo 3T

Vous pouvez également installer un outils graphique Robo 3T (gratuit) : https://robomongo.org/download.