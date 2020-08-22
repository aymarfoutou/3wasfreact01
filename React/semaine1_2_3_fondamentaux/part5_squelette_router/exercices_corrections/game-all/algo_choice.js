
let a = [7, 9];

// trouvé 9 choix possibles dans le désordre
// on s'arrete lorsqu'on a 
// pour remplire le tableau de 9 nombres différents de manière aléatoire
while ( a.length < 10) {
    let numb1 = Math.floor(Math.random() * 10 + 1);
    while (true) {

        let flag = true;
        for (const n of a) {

            if (numb1 === n) {
                flag = false;
                break;
            }
        }

        if (flag) {
            a.push(numb1);
            break;
        }

        numb1 = Math.floor(Math.random() * 10 + 1);
    }
}
console.log(a)