

// Comptez le nombre de A par type de cuisine
db.restaurants.mapReduce(
    function() {
        const gradeA = this.grades.filter( grade => grade && grade.grade === "A").length;
        
        emit(this.cuisine, gradeA);
     },
     function(k, v) {

        return Array.sum(v);
     },
    { out: "map_reduce_example" }
 )


// Reduce & probleme des meilleurs restos
db.restaurants.mapReduce(
    function() { 
        let avg = 0;
        let count = 0 ;
        if( this.grades ){
            
            for(let i = 0 ; i < this.grades.length ; i++){
                if(this.grades[i].score){
                    avg += this.grades[i].score;
                    count += 1 ;
                }
            }
            count == 0 ? 1 : count ;
        }
        emit( this.borough , { name : this.name, avg : Math.floor( 10 * (avg/count ) ) / 10  } );
    },
    function(k, v) {
       
        let response = {};
        let count = {};

        response[k] = { names : [], avg : [] } ;
        count[k] = 5;

        v.sort( (a, b) => a.avg - b.avg < 0 ).forEach( restaurant => {
            if( restaurant.avg && count[k] > 0 ){
                count[k] -= 1;
                response[k].names.push(restaurant.name);
                response[k].avg.push(restaurant.avg);
            }
        });

        return  response;
    },
    { 
        query : {  
            cuisine : "Italian"
        } ,
        sort : { borough : 1},
        out: { inline: 1 } 
    }
).results
