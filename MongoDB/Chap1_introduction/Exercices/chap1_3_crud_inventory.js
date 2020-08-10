


// 1. Affichez tous les articles de type journal. Et donnez la quantité total de ces articles (propriété qty).
 
const cursorInventor = args => db.inventory.find( args );

let qty = 0 ;

cursorInventor({ type : "journal" }).forEach( invent => {
    qty += invent.qty;
});

print(`total quantity journal : ${qty}`);

// 2. Affichez les noms de sociétés depuis 2018 ainsi que leur quantité

cursorInventor({ year : {$gte : 2017 } }).forEach( invent => {     print(invent.society, invent.qty) });

// 3. Affichez les types des articles pour les sociétés dont le nom commence par A

cursorInventor({ society: /^A/ },).forEach( invent => {    
    const { type, society } = invent; 
    print(`Type : ${type}, Société : ${society}`) ;
});

//4. Affichez le nom des sociétés dont la quantité d'articles est supérieur à 45.

cursorInventor({ qty : {$gte : 45 } }).sort({qty:1}).forEach( invent => { print(invent.society, invent.qty) });

//5. Affichez le nom des sociétés dont la quantité d'article est strictement supérieur à 45 et inférieur supérieur à 90.

cursorInventor({ qty : { $gt : 45 } }, { qty : { $lt : 90 } } ).sort({qty:1}).forEach( invent => { print(invent.society, invent.qty) });

//6. Affichez le nom des sociétés dont le statut est A ou le type est journal.

cursorInventor( { $or: [ { status: "A" }, { type: "journal" } ] } ).sort({society:1}).forEach( invent => { print(invent.society, invent.qty) });

// 7. Affichez le nom des sociétés dont le statut est A ou le type est journal et la quantité inférieur strictement à 100.

cursorInventor( {
    qty: { $lt : 100 },
    $or: [ { status : "A" }, { type : "journal" } ]
} ).sort({society:1}).forEach( invent => { print(invent.society, invent.qty) });


// 8. Affichez le type des articles qui ont un prix de 0.99 ou 1.99 et qui sont true pour la propriété sale ou ont une quantité strictement inférieur à 100.

cursorInventor( {
    $and : [
        { $or : [ { price : 0.99 }, { price : 1.99 } ] },
        { $or : [ { sale : true }, { qty : { $lt : 100 } } ] }
    ]
}, { society : 1 } ).sort({ society : 1}).sort({society : 1}).forEach( invent => {
    const { society, price, qty } = invent;

    print(`Society : ${society} price :${price}, quantity : ${qty}`)
})

//9. Affichez le nom des scociétés qui ont des tags.

cursorInventor( { tags : { $exists : true }}).sort({ society : 1}).sort({society : 1}).forEach( invent => {
    const { tags, society } = invent;

    print(`Society : ${society} tags :${tags.join(" ")}`)
})

//10. Affichez le nom des sociétés qui ont au moins un tag blank.

cursorInventor( { tags : "blank"} ).sort({ society : 1}).sort({society : 1}).forEach( invent => {
    const { tags, society } = invent;

    print(`Society : ${society} tags :${tags.join(" ")}`)
})


/*
## Exercice avec forEach

Rappelons la structure du forEach de Mongo que vous pouvez appliquer à un find :

```js
db.collection.find().forEach(<function>)
```

1. En utilisant la fonction forEach et la fonction find augmentez de 50% la quantité de chaque document qui a un status C ou D.

2. Augmentez maintenant de 150% les documents ayant un status A ou B et au moins 3 blanks dans leurs tags.
*/

// 1.
db.inventory.find({ status: { $in: ["C", "D"] } }).forEach(
    doc => {
        db.inventory.updateOne({ _id: doc._id }, { $mul: { "qty": 1.5 } })

    }
)

// 2.
db.inventory.find({ $and: [{ status: { $in: ["A", "B"] }, tags: "blank" }] }).forEach(
    doc => {
        if (doc.tags.length > 2) {
            db.inventory.updateOne({ _id: doc._id }, { $mul: { "qty": 2.5 } })
        }
    }
)

/*

## Exercice suppression d'un champ

Dans la collection inventory 
il y a un champ level qu'il faut supprimer, 
aidez-vous de l'opérateur unset pour effectuer 
cette mise à jour.
*/

db.inventory.updateOne(
    { level: { $exists: true } },
    { $unset: { level: "" } }
)

// Vérification cette requête ne retourne rien 
db.inventory.find({ level: { $exists: true } }).pretty()


// Exercice switch

db.inventory.updateMany(
    { tags: { $exists: true } },
    [

        {
            $set: {
                label: {
                    $switch: {
                        branches: [
                            { case: { $gt: [{ $size: "$tags" }, 3] }, then: "AA" },
                            { case: { $gt: [{ $size: "$tags" }, 1] }, then: "A" },
                        ],
                        default: "B"
                    }
                }
            }
        },

        { $set : { totalTags : { $size : "$tags"} } }
    ]
)

db.inventory.find({ label: { $exists: true } }, { tags: 1, label: 1, totalTags : 1, _id : 0 })


/*

## Exercice synthèse

1 . Créez un champ **creationts** et **expiryts** pour chaque document de la collection inventory. Faites un script pour réaliser cela en utilisant des dates variables pour la création et la date d'expiration du document. Le script devra prendre en compte la date de création pour générer une date d'expiration.

Vous utiliserez la méthode ISODate de Mongo et Date de JS pour générer des dates aléatoires.

Notez que ISODate est basée sur l'UTC, si vous écrivez new Date() ou ISODate Mongo affichera dans tous les cas une ISODate. Le décallage de date peut s'effectuer à l'aide de la méthode getTime :

```js
// Pour un jour 
// 1 x 24 hours x 60 minutes x 60 seconds x 1000 milliseconds
let day = 1*24*60*60000 

// Ajoute un jour à la date actuel
new Date( ISODate().getTime() + day )
```
*/

db.inventory.find({}, { '_id': 1 }).forEach(doc => {
    const days = Math.floor(Math.random() * 100) * 24*60*60 * 1000 ;

    db.inventory.updateOne(
        { '_id': doc._id },
        [
            { $set: { created_at : new Date() } },
            { $set: { expired_at : new Date( ISODate().getTime() + days )   } }
        ]
    );

})

/* au cas où : supprimer des champs
db.inventory.updateMany(
    { _id : { $exists: true } },
    { $unset: { creationts: "", expiryts: "" } } 
)

*/

db.inventory.updateMany(
    { _id: { $exists: true } },
    [
        { $set: { life: { $divide : [  { $subtract: [ "$expired_at", "$created_at",  ] } , 1000 * 60 * 60 * 24 ] }  } },
    ]
);

// 1.
const cursorInventor = (rest, proj = null) => { 
    if(proj === null) 
        return db.inventory.find(rest);
    else
        return db.inventory.find(rest, proj);
};

let total = 0;

cursorInventor({ type: "journal" }).forEach(doc => {
    const { qty } = doc;

    total += qty;
});

print(`Total des produits : ${total}`);

print(cursorInventor) // vide

// 1. Deuxième solution

total = 0;
db.inventory.find({ type: "journal" }).forEach(doc => {
    const { qty } = doc; // destructuration

    total += qty;

});

// 2.
cursorInventor({ year: { $gte: 2018 } }, {society : 1, qty : 1 , _id : 0 }).forEach(doc => {
    const { society, qty } = doc;

    print(society, qty);
});
