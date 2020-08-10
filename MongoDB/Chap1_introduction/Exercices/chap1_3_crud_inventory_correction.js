
// 1.
const cursorInventor = (rest, proj = null) => {
    if (proj === null)
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
cursorInventor({ year: { $gte: 2018 } }, { society: 1, qty: 1, _id: 0 }).forEach(doc => {
    const { society, qty } = doc;

    print(society, qty);
});


// 3.
cursorInventor({ society: /^A/ }).forEach(doc => {
    const { type, society } = doc;

    print(`Type : ${type}, Société : ${society}`);
});

// 4.
cursorInventor({ qty: { $gte: 45 } }).sort({ qty: 1 }).forEach(doc => {
    const { qty, society } = doc;

    print(society, qty);
});

// 5. 

cursorInventor({ $and: [{ qty: { $gt: 45 } }, { qty: { $lt: 90 } }] }).sort({ qty: 1 }).forEach(invent => { print(invent.society, invent.qty) });

//(p ∧ ¬q) ∨ (¬p ∧ q) ~ xor

// { $or : [ $and : { [ qty : {} , $not : { qty : {} } ] }, $and : { [ $not : { qty : {} } , qty : {} ] } ] }


//6. Affichez le nom des sociétés dont le statut est A ou le type est journal.

cursorInventor({ $or: [{ status: "A" }, { type: "journal" }] }).sort({ society: 1 }).forEach(invent => { print(invent.society, invent.qty) });

// 7. Affichez le nom des sociétés dont le statut est A ou le type est journal et la quantité inférieur strictement à 100.

cursorInventor({
    qty: { $lt: 100 },
    $or: [{ status: "A" }, { type: "journal" }]
}).sort({ society: 1 }).forEach(doc => {
    print(doc.society, doc.qty)
});

// 8. Affichez le type des articles qui ont (un prix de 0.99 ou 1.99 ) et ( qui sont true pour la propriété sale ou ont une quantité strictement inférieur à 100).

cursorInventor({
    $and: [
        { $or: [{ price: 0.99 }, { price: 1.99 }] },
        { $or: [{ sale: true }, { qty: { $lt: 100 } }] }
    ]
}, { society: 1 }).sort({ society: 1 }).forEach(doc => {
    const { society, price, qty } = doc;

    // pour le priceTTC on a mis 20% pour la tva
    print(`Society : ${society} price :${price}, quantity : ${qty} priceTTC : ${price * qty * 1.2}`);
})

//9. Affichez le nom des scociétés qui ont des tags ou un tag
cursorInventor({ tags: { $exists: true } }).sort({ society: 1 }).forEach(doc => {
    const { tags, society } = doc;

    print(`Society : ${society} tags :${tags.join(" ")}`)
})

//10. Affichez le nom des sociétés qui ont au moins un tag blank.
const isBlank = { tags: { $in: ["blank"] } };

cursorInventor(isBlank).sort({ society: 1 }).sort({ society: 1 }).forEach(doc => {
    const { tags, society } = doc;

    print(`Society : ${society} tags :${tags.join(" ")}`)
})


// Foreach

// 1.
db.inventory.find({ status: { $in: ["C", "D"] } }).forEach(
    doc => {
        db.inventory.updateOne({
            _id: doc._id
        }, { $mul: { "qty": NumberDecimal("2.5") } })

    }
)

db.inventory.updateMany({ status: { $in: ["YYY"] } }, { $mul: { "qty": 4.5 } })


db.inventory.find({ $and: [{ status: { $in: ["A", "B"] }, tags: "blank" }] }).forEach(
    doc => {
        if (doc.tags.length > 2) {
            db.inventory.updateOne({ _id: doc._id }, { $mul: { "qty": 2.5 } })
        }
    }
)


// 2.

db.inventory.find({ $and: [{ status: { $in: ["A", "B"] }, tags: "blank" }] }, { tags: 1, _id: 1 }).forEach(
    doc => {
        const { tags, _id } = doc;
        let count = 0;

        if (tags)
            doc.tags.forEach(tag => { if (tag === "blank") count++ })

        if (count > 2) {
            db.inventory.updateOne({ _id: _id }, { $mul: { "qty": 2.5 } })
        }
    }
)

// 3.

db.inventory.updateOne(
    { level: { $exists: true } },
    { $unset: { level: "" } }
)

// Vérification cette requête ne retourne rien 
db.inventory.find({ level: { $exists: true } }).pretty()

// switch

// Mettez des crochets pour évaluer les pipelines (instruction de modification/création) deuxième paramètre :
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
        { $set: { totalTags: { $size: "$tags" } } }
    ]
)

db.inventory.find({ label: { $exists: true } }, { tags: 1, label: 1, totalTags: 1, _id: 0 })



// Hydratation
// Attention Mongo manipule les dates au format ISODate même si vous utilisez new Date de JS
db.inventory.find({}, { '_id': 1 }).forEach(doc => {

    // les jours sont au format milième de secondes
    const days = Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000;
    const { _id } = doc;

    db.inventory.updateOne(
        { '_id': _id },
        [
            {
                $set: {
                    created_at: new Date(ISODate().getTime() - days),
                    expired_at: new Date(ISODate().getTime() + days * Math.floor(Math.random() * 10))
                }
            }
        ]
    );
})


// Nombre de jour
// mieux optimis

const Day = 24 * 60 * 60 * 1000;
db.inventory.updateMany(
    { _id: { $exists: true } },
    [
        { $set: { duration: { $divide: [ { $subtract: ["$expired_at", "$created_at",] }, Day ] } } },
    ]
);

// Solution Lucas
db.inventory.find().forEach( doc => {
    const { _id, created_at, expired_at } = doc;
    const calcDays = 24 * 60 * 60 * 1000;
    const diffMilli = expired_at - created_at;
    const diffDay = diffMilli / calcDays;
    ​
    db.inventory.updateOne(
            {"_id" : _id},
            {$set : {duration : diffDay}}
    );
});