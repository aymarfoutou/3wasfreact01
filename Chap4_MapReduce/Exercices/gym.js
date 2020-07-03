
// pour chaque sportif on emit une valeur 1 pour le sexe
const mapSex = function() { emit(this.Sexe.toUpperCase(), 1) } ;
const reduceSex = function(k, v) { return Array.sum(v) };

db.sportif.mapReduce(
    mapSex,
    reduceSex,
    { out: { inline: 1 } } // voir le résultat sans le stocker
);

// Savoir si il y a des sportifs qui n'ont pas de sport
db.sportif.find(
    { Sports : { $exists : false } }, {"Nom" : 1, "_id" : 0}
)

/*
Calculez le nombre de sportifs jouant pour chaque sport. 
Explorez la collection pour voir comment elle est structurée 
avant d'écrire un script avec le Pattern MapReduce pour répondre à cette question 
*/
db.sportif.mapReduce(
    function() {
        if (this.Sports) { // le sportif joue
            if (typeof this.Sports.Jouer != "string") {
                for (s of this.Sports.Jouer) {
                    emit(s, 1)
                }
            } else {
                emit(this.Sports.Jouer, 1)
            }
        }
    },
    function(k, v) {
        return Array.sum(v);
    },
    { out: { inline: 1 } }
)

// Nombre de Gymnase
db.gymnase.mapReduce(
    function() {
      emit(this.Ville, 1)
    },
    function(k, v) {
        return Array.sum(v);
    },
    { out: { inline: 1 } }
)

// Nombre de séance de sport pour chaque jour de la semaine

db.gymnase.mapReduce(
    function() {
        if (this.Seances) { 
                for (let i = 0; i < this.Seances.length; i++) {
                    emit( this.Seances[i].Jour.toLowerCase(), 1 )
                }
        }
    },
    function(k, v) {
        return Array.sum(v);
    },
    { out: { inline: 1 } }
)