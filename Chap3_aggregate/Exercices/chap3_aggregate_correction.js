let count = 0;
db.restaurants.aggregate([
    // { $match : { cuisine : "Italian"}},
    { $group: { "_id": "$cuisine", "total": { $sum: 1 } } },
]).forEach(
    doc => {
        const { total } = doc;
        count += total;
    }
)

print(db.restaurants.find({ cuisine: "Italian" }).count())

// cuisine différentes retourne un array
db.restaurants.distinct("cuisine")

print(db.restaurants.distinct("cuisine").length)

// - 1. A partir des données ci-dessus calculer le total des prix des restaurants par agence.
db.sales.aggregate(
    [
        {
            $group:
            {
                _id: "$agency", // $ designe quelque chose de variable ici c'est le nom des agences qui est variable
                totalPrice: { $sum: "$price" } // dans la fonction d'aggrégation le prix est également un paramètre variable
            }
        }
    ]
)

// - 2. Quelles sont les totaux dans ce regroupement qui sont supérieurs ou égaux à 950000 ?

// Notion de Pipeline
db.sales.aggregate(
    [
        // 1. groupement sur les agences avec la somme des prix 
        {
            $group:
            {
                _id: "$agency",
                totalPrice: { $sum: "$price" }
            }
        },

        // 2. le match s'appliquera maintenant sur le groupement précédent
        {
            $match: { "totalPrice": { $gte: 950000 } }
        },
        {
            $project: {
                "totalPrice": 1, "_id": 0
            }
        }
    ]
)