
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
cursorInventor({ qty: { $gte: 45 } }).sort({ qty: 1 }).forEach( doc => {
    const { qty, society } = doc;

    print(society, qty);
});

// 5. 

cursorInventor( { $and : [ { qty : {$gt : 45 }  }, { qty : {$lt : 90 } } ] }  ).sort({qty:1}).forEach( invent => { print(invent.society, invent.qty) });

//(p ∧ ¬q) ∨ (¬p ∧ q) ~ xor

// { $or : [ $and : { [ qty : {} , $not : { qty : {} } ] }, $and : { [ $not : { qty : {} } , qty : {} ] } ] }


//6. Affichez le nom des sociétés dont le statut est A ou le type est journal.

cursorInventor( { $or: [ { status: "A" }, { type: "journal" } ] } ).sort({society:1}).forEach( invent => { print(invent.society, invent.qty) });

// 7. Affichez le nom des sociétés dont le statut est A ou le type est journal et la quantité inférieur strictement à 100.

cursorInventor( {
    qty: { $lt : 100 },
    $or: [ { status : "A" }, { type : "journal" } ]
} ).sort({society:1}).forEach( doc => { 
    print(doc.society, doc.qty) 
});

// 8. Affichez le type des articles qui ont (un prix de 0.99 ou 1.99 ) et ( qui sont true pour la propriété sale ou ont une quantité strictement inférieur à 100).

cursorInventor( {
    $and : [
        { $or : [ { price : 0.99 }, { price : 1.99 } ] },
        { $or : [ { sale : true }, { qty : { $lt : 100 } } ] }
    ]
}, { society : 1 } ).sort({ society : 1}).sort({society : 1}).forEach( doc => {
    const { society, price, qty } = doc;

    print(`Society : ${society} price :${price}, quantity : ${qty} priceTTC : ${ price * qty * 1.2}`)
})

//9. Affichez le nom des scociétés qui ont des tags ou un tag

cursorInventor( { tags : { $exists : true }}).sort({ society : 1}).sort({society : 1}).forEach( doc => {
    const { tags, society } = doc;

    print(`Society : ${society} tags :${tags.join(" ")}`)
})

//10. Affichez le nom des sociétés qui ont au moins un tag blank.

cursorInventor( { tags : "blank"}  ).sort({ society : 1}).sort({society : 1}).forEach( doc => {
    const { tags, society } = doc;

    print(`Society : ${society} tags :${tags.join(" ")}`)
})