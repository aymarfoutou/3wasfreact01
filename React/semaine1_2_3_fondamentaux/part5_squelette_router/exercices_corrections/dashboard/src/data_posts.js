const POSTS = [
    { id: 16, title: "React JS", content: "Libraire ou Framework ?" },
    { id: 11, title: "React Native", content: "Mobile React" },
    { id: 100, title: "Angular", content: "Super ..." },
    { id: 7, title: "Symfony", content: "Framework expressif ..." },
    { id: 27, title: "MongoDB", content: "Base de données NoSQL" },
];

// cet export se fera dans des accolades ce n'est pas l'export principal qui est placé dans default
export const authors = [
    { id : 1, name : "Alan" },
    { id : 2, name : "Alice" },
];

// sans accolade export principal
export default POSTS;
