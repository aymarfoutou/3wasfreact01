

let notes = [1, 2, 3, 4, 5]

// Exercice augmenter de 20% chaque valeurs du tableau notes. Utilisez map en JS.

notes.map((note, i) => {

    notes[i] = Math.floor(note * 1.2 * 10) / 10
})

console.log(notes)

// map renvoi un nouveau 

let notes2 = [9, 1, 6, 3, 7]


// le map crée un nouveau tableau
let newNotes2 = notes2.map( n => {

    // pensez à retourner une valeur dans le map sinon undefined
     return Math.floor(n * 1.2 * 10) / 10;
});

console.log(notes2);

console.log(newNotes2);