

const query = {status : "A"};
const update = { "$mul": { "qty": 10 } };
const options = { "upsert": false }

const updateInventory = (query, update, options) => db.inventory.updateMany(query, update, options) ;
  