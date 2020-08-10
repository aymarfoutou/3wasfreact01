


// ## 1. Exercice compter le nombre de restaurants

const resBrooklyn = db.restaurants.find({ borough: "Brooklyn" }, { "name": 1 });

let count = 0;
// on utilise le curseur 
resBrooklyn.forEach(doc => {
    count = count + 1;
});

print(count);

// Comparaison avec la méthode d'agrégation pour compter
print(resBrooklyn.count())


// ### 2. Exercices sur la notion de filtrage

// 1. Combien y a t il de restaurants qui font de la cuisine italienne et qui ont un score de 10 au moins .
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $in: [10] } // dès qu'il trouve une valeur qui correspond à ce critère => c'est vrai
}
    , { "name": 1, _id: 0, "grades.score": 1, "address.coord": 1 }).sort({
        "name": 1
    })

db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": 10 // dès qu'il trouve une valeur qui correspond à ce critère => c'est vrai
}
    , { "name": 1, _id: 0, "grades.score": 1, "address.coord": 1 }).sort({
        "name": 1
    })

// 1.bis Combien y a t il de restaurants qui font de la cuisine italienne et qui ont un score de 10 ou moins .
// on en trouve 128
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $lte: 10, $not: { $gt: 10 } }
}
    , { "name": 1, _id: 0, "grades.score": 1 }).sort({
        "name": 1
    })

// compter 
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $lte: 10, $not: { $gt: 10 } }
}
    , { "name": 1, _id: 0, "grades.score": 1 }).sort({
        "name": 1
    }).count()


// autre version là on en trouve 129 il compte la valeur score null
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $not: { $gt: 10 } } // 
}
    , { "name": 1, _id: 0, "grades.score": 1 }).sort({
        "name": 1
    })

db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $not: { $gt: 10 } }
}
    , { "name": 1, _id: 0, "grades.score": 1, "address.coord": 1 }).sort({ "name": 1 })


// 2.
db.restaurants.find(
    { "grades.grade": "A", "grades.score": { $gte: 20, $not: { $lt: 20 } } },
    { _id: 0, name: 1 }).sort(
    { name: -1 }
)

db.restaurants.find(
    { "grades.grade": "A", "grades.score": { $gte: 10, $not: { $lt: 10 } } },
    { name:1, _id:0, "grades.grade" : 1, "grades.score" : 1}).sort(
    { name: -1 }
)


let elemMatch =  {
    "grade" : "A",
    "score" : { $gte: 10, $not: { $lt: 10 } }
};

db.restaurants.find({
    "grades" : {
        $elemMatch : elemMatch
    }
}, {"name":1, _id:0, "grades.grade" : 1, "grades.score" : 1}).sort({
    "name" : 1
})

db.restaurants.find({
    "grades" : {
        $eq : elem
    }
}, {"name":1, _id:0, "grades.grade" : 1, "grades.score" : 1}).sort({
    "name" : 1
})


// 3. Différents quartiers de NY
db.restaurants.distinct("borough")

// 4. Trouvez tous les types de restaurants dans le quartiers du Bronx. 
db.restaurants.distinct("cuisine", {"borough" : "Bronx"})

// 5. Sélectionnez les restaurants dont le grade est A ou B dans le Bronx.
db.restaurants.find({
    $and : [
        {
            $or : [ { "grades.grade" : "A" }, { "grades.grade" : "B" } ]
        },
        {
            "borough" : "Bronx"
        }
    ]
    },
    { "_id" : 0, "name" : 1} 
)

// 6. Même question mais, on aimerait que les restaurants qui on eu à la dernière inspection un A ou B. 

db.restaurants.find({
    $and : [
        {
            $or : [ { "grades.0.grade" : "A" }, { "grades.0.grade" : "B" } ]
        },
        {
            "borough" : "Bronx"
        }
    ]
    },
    { "_id" : 0, "name" : 1,  "gardes.grade" : 1 } 
)


// 7. 

/*
    name : /^A/
    name : /bonjour/i
*/

db.restaurants.find({
    "name" : /coffee/i
}, { "_id" : 0, "name" : 1, "borough" : 1} )


db.restaurants.find({
    $and : [
        {  "name" : /coffee/i },
        {  "borough" : "Bronx" }
    ]
}, { "_id" : 0, "name" : 1, "borough" : 1} )

//8. Trouvez tous les restaurants avec les mots Coffee ou Restaurant et qui ne contiennent pas le mot Starbucks.

db.restaurants.find({
    $and : [
        {  "name" : { $in : [/coffee/i, /restaurant/i] } },
        {  "name" : { $nin : [/Starbucks/i] } }
    ]
}, { "_id" : 0, "name" : 1, "borough" : 1} )


// Enfin, trouvez tous les restaurants avec les mots Coffee ou Restaurant ne se trouvant pas dans le Bronx et ne contenant pas le mot Starbucks.
db.restaurants.find({
    $and : [
        {  "name" : { $in : [/coffee/i, /restaurant/i] } },
        {  "name" : { $nin : [/Starbucks/i] } },
        {  "borough" : { $nin : [/Bronx/i] } }
    ]
}, { "_id" : 0, "name" : 1, "borough" : 1} )


// 9. Nouvelle question

db.restaurants.find( {
    $and : 
    [
        { name : /coffee/i },
        { $or: [ { borough : "Bronx" }, { borough : "Brooklyn" }] },
        {  grades : { $size : 4 } },
        {  "grades.0.grade" : "A"},
        { "grades.date" : { $gte: ISODate("2012-10-24T00:00:00Z"), $not: { $lt: ISODate("2012-10-24T00:00:00Z") } }}
    ]
},
{ "_id" : 0, "name" : 1, "grades.date" : 1, borough : 1}
).sort({ borough : 1, name : 1 }).forEach(
    doc => {
        const { name, grades, borough} = doc; // destructuration pour assigner

        print("----------------------------------")
        print(`Borough : ${borough.toUpperCase()}`)
        print()
        print(`name : ${name.toUpperCase()} Numbers grades : ${grades.length}`)
        print(`
Last grade date : ${grades[0].date} \n
First grade date : ${grades[grades.length - 1].date}
`)
    }
)

// 10. Coord spatial

// On cherche les restos qui sont dans un périmètre de 5 miles par rapport au point coordinate

const METERS_PER_MILE = 1609.34; // en m
const coordinate = [ -73.93414657, 40.82302903 ]; // mon ami qui habite NY

db.restaurants.find({ 
    "address.coord":  // 2dsphere  pour Mongo
    { $nearSphere: 
        { $geometry: { type: "Point", coordinates: coordinate }, 
        $maxDistance: 5 * METERS_PER_MILE }
    } 
}, {borough :1, name : 1, "address.coord" : 1 , _id : 0}).forEach(
    doc => {
        const { name, address, borough} = doc;
        print("----------------------------------")
        print(`Borough : ${borough.toUpperCase()}`)
        print()
        print(`name : ${name.toUpperCase()} coordinate : ${address.coord.join(' ')}`)
    }
)