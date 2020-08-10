
const restriction = { $and: [{ "borough": "Brooklyn" }, { "cuisine": "Hamburgers" }] };

db.restaurants.find(restriction).forEach(  doc => {

    const json = tojson(doc);

    if( json.name  === "Italian restaurant"){
        print("yes")
    }

    print(json.name)

})