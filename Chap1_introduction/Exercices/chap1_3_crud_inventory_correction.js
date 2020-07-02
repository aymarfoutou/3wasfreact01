
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

cursorInventor({ qty : {$gt : 45 } }, { qty : {$lt : 90 } } ).sort({qty:1}).forEach( doc => { 
    const { society, qty } = doc ;

    print(society, qty) ;
});

//(p ∧ ¬q) ∨ (¬p ∧ q) ~ xor

// { $or : [ $and : { [ qty : {} , $not : { qty : {} } ] }, $and : { [ $not : { qty : {} } , qty : {} ] } ] }