// Si on veut supprimer la base de données 
// db.dropDatabase()

// remove doc
// db.books.remove({})

// delete document
// db.books.drop()

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

const programmation = db.categories.findOne({ name: "Programmation" });
const SQL = db.categories.findOne({ name: "SQL" });
const NoSQL = db.categories.findOne({ name: "NoSQL" });

db.books.insertOne({ title: "Python", category_id: programmation._id });
db.books.insertOne({ title: "JS", category_id: programmation._id });
db.books.insertOne({ title: "PosgreSQL", category_id: SQL._id });
db.books.insertOne({ title: "MySQL", category_id: SQL._id });
db.books.insertOne({ title: "MongoDB", category_id: NoSQL._id });


// 2. Puis faites une requête pour récupérer les livres dans la catégorie programmation.

db.books.find({ category_id: programmation._id })

// 3. Combien de livre y a t il dans la catégorie NoSQL ? 

db.books.find( {category_id: NoSQL._id } ).count()

// 4.

const newBooks = [
    { title : "Python & SQL"}, // Programmation & SQL
    { title : "JS, SQL ou NoSQL" }, // Programmation NoSQL SQL
    {title : "Pandas & SQL & NoSQL"}, // SQL, NoSQL et Programmation
    { title : "Modélisation des données"} // aucune catégorie
]

db.books.insertOne({ title: "Python & SQL", category_id: [SQL._id, programmation._id] });
db.books.insertOne({ title: "JS, SQL ou NoSQL", category_id: [SQL._id, programmation._id, NoSQL._id] });
db.books.insertOne({ title: "Pandas & SQL & NoSQL", category_id: [SQL._id, programmation._id, NoSQL._id] });
db.books.insertOne({ title: "Modélisation des données"});

// ET si votre document est vraiment ...
db.books.insertOne({ title: "Normalisation", category_id: null });
db.books.insertOne({ title: "Conference CV", category_id: [] });
db.books.insertOne({ title: "Planning 2/2", category_id: 0});
db.books.insertOne({ title: "Planning 1/2", category_id: ""});

// On peut faire une requête qui vérifie tous les cas probable 
db.books.find(  { $or : [  
        { category_id : { $size : 0  } }, 
        { category_id : { $exists : false }},
        { category_id : { $in : [ null, "", 0 ]} }
    ] 
}, { _id : 0} )

// Algorithme de recherche des ancètres


db.categoriestree.insertMany(categoriestree);
db.categoriestree.createIndex({ parent: 1 }); // Optimisation pour la recherche

// 1.

const pushAncesstors = (_id, doc) => {
    if (doc.parent) {
        print(`parent  : ${doc.parent} id : ${_id} `)
        db.categoriestree.update({ _id: _id }, { $addToSet: { "ancesstors": { _id: doc.parent } } });
        pushAncesstors(_id, db.categoriestree.findOne({ _id: doc.parent }));
    }
}

db.categoriestree.find().forEach(doc => {

    pushAncesstors(doc._id, doc);
});

