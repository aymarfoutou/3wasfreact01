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