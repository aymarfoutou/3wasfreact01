// Exercice jointure

/*
const categories = 
[
    { name : "Programmation"},
    { name : "Database SQL"},
    { name : "Database NoSQL"}
];

- books
const books = [
    {title : "Python"},
    { title : "JS" },
    {title : "PosgreSQL"},
    {title : "MySQL"},
    {title : "MongoDB"}
]
*/
const categories = [
    { name: "Programmation" },
    { name: "SQL" },
    { name: "NoSQL" }
];

const books = [
    { title: "Python" },
    { title: "JS" },
    { title: "PosgreSQL" },
    { title: "MySQL" },
    { title: "MongoDB" }
];

db.categories.insertMany(categories);

/**
 * 1. Faites un script JS afin d'associer chaque livre à sa catégorie en utilisant l'id de sa catégorie.
 * Créez une propriété **categoryId** dans la collection books.
 */

const programmation = db.categories.findOne({ name: "Programmation" });
const SQL = db.categories.findOne({ name: "SQL" });
const NoSQL = db.categories.findOne({ name: "NoSQL" });

db.books.insertOne({ title: "Python", categoryId: programmation._id });
db.books.insertOne({ title: "JS", categoryId: programmation._id });
db.books.insertOne({ title: "PosgreSQL", categoryId: SQL._id });
db.books.insertOne({ title: "MySQL", categoryId: SQL._id });
db.books.insertOne({ title: "MongoDB", categoryId: NoSQL._id });

// 2. Puis faites une requête pour récupérer les livres dans la catégorie programmation.

db.books.find({ categoryId: programmation._id })

// 3. Combien de livre sur le NoSQL ?

db.books.find({ categoryId: NoSQL._id }).count()

// 4. Associez maintenant les livres ci-desous aux catégories :

const newBooks = [
    { title: "Python & SQL" }, // Python & SQL
    { title: "JS SQL ou NoSQL" }, // programmation
    { title: "Pandas & SQL & NoSQL" }, // SQL, NoSQL et Python
    { title: "Modélisation des données" } // aucune catégorie
];


db.books.insertOne({ title: "Python & SQL", categoryId: [programmation._id, SQL._id] });
db.books.insertOne({ title: "JS SQL ou NoSQL", categoryId: [programmation._id, SQL._id, NoSQL._id] });
db.books.insertOne({ title: "Pandas & SQL & NoSQL", categoryId: [programmation._id, SQL._id, NoSQL._id] });
db.books.insertOne({ title: "Modélisation des données" });

// 5. Récupérez tous les livres qui n'ont pas de catégorie

db.books.find({ categoryId: { $exists: false } })


/*
## Exercice tree structure

Dans la base de données **bookstore**.

Soit les données suivantes structurées sous forme d'un arbre imbriqué. 


1. Ecrire un algorithme qui ajoute une propriété ancesstors 
à la collection afin d'énumérer les catégories parentes. Vous utiliserez 
l'opérateur **addToSet** pour ajouter le/les parent(s) de chaque document.
*/


let categoriestree;

categoriestree =
    [
        {
            "_id": "Books",
            "parent": null,
            "name": "Informatique"
        },
        {
            "_id": "Programming",
            "parent": "Books",
            "books": [
                "Python apprendre",
                "Pandas & Python",
                "async/await JS & Python"
            ]
        },
        {
            "_id": "Database",
            "parent": "Programming",
            "books": [
                "NoSQL & devenir expert avec la console",
                "NoSQL drivers",
                "SQL"
            ]
        },
        {
            "_id": "MongoDB",
            "parent": "Database",
            "books": [
                "Introduction à MongoDB",
                "MongoDB aggrégation"
            ]
        }
    ];

db.categoriestree.insertMany(categoriestree);
db.categoriestree.createIndex({ parent: 1 });

// 1.

const pushAncesstors = (_id, doc) => {
    print("_id", _id)
    if (doc.parent) {
        print("parent", doc.parent)
        db.categoriestree.update({ _id: _id }, { $addToSet: { "ancesstors": { _id: doc.parent } } });
        pushAncesstors(_id, db.categoriestree.findOne({ _id: doc.parent }));
    }
}

db.categoriestree.find().forEach(doc => {
    pushAncesstors(doc._id, doc);
});

