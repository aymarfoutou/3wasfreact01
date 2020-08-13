
const interval = (time) => {
    let count = 0 
    setInterval(() => {
        count++ ;
        console.log(count)
    }, time)
}


interval(1000);
console.log("je m'execute je suis juste après le premier interval")
interval(100);
console.log("je m'execute je suis juste après le deuxième interval")

