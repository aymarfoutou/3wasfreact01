

// ON utilise les fonctions fléchées parcequ'elles n'ont pas de this donc cela évite les effets de bord ...

const add_v1 = (a, b) => {

    return a + b;
}

// Une autre manière équivalente pour écrire cette fonction, 
// si vous avez un seul résultat à retourner vous avez la syntaxe raccourcie suivante (ça fait un return)
const add_v2 = (a, b) => a + b;


const augment_20per_v1 = (a) => { return a * 1.2 ; }

// si vous avez uniquement un paramètre à passer les parathèses sont facultatives
const augment_20per_v2 = a =>  a * 1.2 ;
