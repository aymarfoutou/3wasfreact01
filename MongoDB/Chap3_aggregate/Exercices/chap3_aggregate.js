let count = 0 ;
db.restaurants.aggregate([
    // { $match : { cuisine : "Italian"}},
    { $group : {"_id" : "$cuisine", "total" : {$sum : 1}}},
]).forEach(
    doc => {
        const { total } = doc;
        count += total;
    }
)

print(  db.restaurants.find( { cuisine : "Italian"} ).count() )

// cuisine différentes retourne un array
db.restaurants.distinct(  "cuisine" )

print( db.restaurants.distinct(  "cuisine" ).length )

// aggrégation
const unwindCuisine = { $unwind: "$grades" }

const groupCuisine = {
    $group: { "_id": "$cuisine", "avg": { $avg: "$grades.score" } }
};

db.restaurants.aggregate([
    unwindCuisine,
    groupCuisine
])

// ## Exercice calculer la somme par agence

// - 1. A partir des données ci-dessus calculer le total des prix des restaurants par agence.
db.sales.aggregate(
    [
        {
            $group:
            {
                _id: "$agency",
                totalPrice: { $sum: "$price" }
            }
        }
    ]
)
// - 2. Quelles sont les totaux dans ce regroupement qui sont supérieurs ou égaux à 950000 ?
db.sales.aggregate(
    [
        {
            $group:
            {
                _id: "$agency",
                totalPrice: { $sum: "$price" }
            }
        },
        {
            $match: { "totalPrice": { $gte: 950000 } }
        },
    ]
)

//  3. On aimerait maintenant avoir tous les noms et id des restaurants 
//  par type de cuisine et de quartier. Limitez l'affichage à deux résultats.

db.restaurants.aggregate([
    {
        $group: {
            _id: {
                "cuisine": "$cuisine",
                "borough": "$borough"
            },
            names: { $push: { name: "$name", restaurant_id: "$restaurant_id" } }
        },
    },
    { $limit: 2 }
])

//  4. Affichez maintenant tous les noms de restaurant italien par de quartier. 

db.restaurants.aggregate([
    { $match: { cuisine: "Italian" } },
    {
        $group: {
            _id: {
                "cuisine": "$cuisine",
                "borough": "$borough"
            }
        }
    }
])

// 5. Affichez également pour chaque restaurant la moyenne de ses scores. 
// Et ordonnez vos résultats par ordre de moyenne décroissante.

db.restaurants.aggregate([
    { $unwind: "$grades" },
    { $match: { cuisine: "Italian" } },
    {
        $group: {
            _id: {
                "cuisine": "$cuisine",
                "borough": "$borough"
            },
            avg: { $avg: "$grades.score" }
        }
    },
    {
        $sort: {
            avg: -1
        }
    }
])

/*
- 6. Faites une requête qui récupère les 5 derniers 
restaurants par quartier les mieux notés et placez 
cette recherche dans une collection top5.
*/

db.restaurants.aggregate([
    { $unwind: "$grades" },
    {
        $group: {
            _id: {
                "borough": "$borough"
            },
            avg: { $avg: "$grades.score" }
        }
    },
    {
        $sort: {
            avg: -1
        }
    },
    { $limit: 5 },
    { $out: "top5" }
])

// - 7 Récupérez le nombre de restaurant par quartier ainsi que leur type de cuisine 
// qui ont un score supérieur ou égale à 30
// Ordonnez le résultat par ordre décroissant de nombre de restaurant.

db.restaurants.aggregate([
    { $match: { "grades.score": { $gte: 30 } } },
    {
        $group: {
            _id: "$borough",
            totalRestaurant: { $sum: 1 },
            cuisines: { $addToSet: "$cuisine" }
        }
    },
    {
        $sort: {
            totalRestaurant: -1
        }
    }
])


db.restaurants.aggregate([
    { $match: { "grades.score": { $gte: 30 } } },
    {
        $group: {
            _id: "$borough",
            totalRestaurant: { $sum: 1 },
            cuisines: { $addToSet: "$cuisine" }
        }
    },
    {
        $sort: {
            totalRestaurant: -1
        }
    },
    { $project: { borough: 1, totalRestaurant: 1, cuisines: 1 } },
    {
        $set: { totalCuisine: { $size: { "$ifNull": ["$cuisines", []] } } }
    },
    { $project: { borough: 1, totalRestaurant: 1, totalCuisine: 1 } },
])


// Faites une jointure avec la collection borough pour récupérer par quartier les informations
// sur sa population
db.restaurants.aggregate([
    {
        $lookup: {
            from: "borough",
            localField: "borough",
            foreignField: "_id",
            as: "borough"
        }
    }
])


// Exercice supplémentaire avec categoriestree dans la base de données bookstore

// 1. Framework d'aggregation ajoutez une propriété total qui calcul le nombre de livres par document

db.categoriestree.aggregate({ $project: { total: { "$size": { "$ifNull": ["$books", []] } } } }).forEach(
    doc => {

        db.categoriestree.update({ $and: [{ _id: doc._id, }, { books: { $exists: true } }] }, { $set: { "total": doc.total } });
    }
)

// 2. Affichez le nom de la catégorie ayant le plus de livres ainsi que les livres.

db.categoriestree.aggregate({ $group: { _id: null, books: { $max: "$books" } } }).forEach(doc => print(doc.books))