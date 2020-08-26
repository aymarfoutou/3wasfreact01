# Contexte API avec des Hooks

On partira d'un arbre très simple :

```txt
      App
       .
       .
     Posts
```

On crée d'abord le contexte, on prendra un exemple de posts que l'on souhaite shuffelisés.

```js
 const PostContext = React.createContext({});
```

On définit ensuite notre Provider (service) il permettra de centraliser notre algorithmique.

```js
 // Source de vérité propre au useReducer
const initialState = {
    posts: []
};

// la partie algorithmique que l'on souhaite centraliser
const reducer = (state, action) => {
    switch (action.type) {

        case 'INIT':

            return {
                ...state,
                posts: action.posts
            }

        case 'SHUFFLE':
            const posts = [...state.posts];
            posts.sort(() => Math.random() - .5);

            return {
                ...state,
                posts: posts
            }

        default:
            return state;
    }
}
```

Le provider est un composant qui permettra par composition de récupérer le context et de le passer à tout l'arbre React ou une partie. Dans le provider on peut également utiliser notre dispatch pour par exemple initialiser des valeurs. Ci-dessous on initialise quelques posts dans notre "store" ou state.

```js
const PostProvider = ({ children }) => {

    // on met le useReducer dans le provider
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({
            type: 'INIT', posts: [
                { id: 1, title: "hello1" },
                { id: 2, title: "hello2" },
                { id: 3, title: "hello3" },
                { id: 4, title: "hello4" },

            ]
        })
    }, []);

    return (
        <PostContext.Provider value={[state, dispatch]}>
            {children}
        </PostContext.Provider>
    )
}
```

Remarque vous passerez dans votre provider le state et le dispatch pour les récupérer dans un composant particulier.

On peut alors contextualiser l'arbre React comme suit (par composition):

```js
<PostProvider>
    < App />
</PostProvider>
```

Puis on peut alors dans l'arbre React utiliser notre Provider comme suit, notez qu'il faudra utiliser le hook useContext et le contexte que l'on créé PostContext pour se "connecter" à notre useReducer. Vous pourrez ainsi lire le state, attention en lecture seul, principe de base de React pour les données, et utiliser nos actions à l'aide de notre dispatch :

```js
const Posts = () => {
    // permet de récupérer le provider avec son useReducer
    const [state, dispatch] = React.useContext(PostContext);
    const { posts } = state;

    return (
        <React.Fragment>
            {posts && posts.map((post, i) => <p key={i}>{post.title}</p>)}
            <button onClick={() => dispatch({ type: 'SHUFFLE' })}>Shuffle</button>
        </React.Fragment>
    )
}
```

## Exercice d'application

Créez l'arbre suivant dans un fichier index.html

```txt
      App
       .
       .
    Container
       .
       .
     Numbers
```

Créez un context NumberContext, un provider NumberProvider. Dans le composant Numbers on créera un champ de formulaire pour ajouter un nombre. Affichez la liste des nombres dans ce composant, vous pouvez éventuellement créer un composant Number pour gérer l'affichage des nombres (de la présentation).

Numbers :

```txt
  nombre : [15] // controle saisi state
  [add]        // action => ajouter le nombre dans la liste

    15        // affiche
```

- Pensez maintenant à vérifier le type de valeur introduite dans numbers (que des nombres). Gérez les messages d'erreurs.

- Faites en sorte que l'on ne puisse pas ajouter un nombre qui se trouve déjà dans le tableau numbers.
