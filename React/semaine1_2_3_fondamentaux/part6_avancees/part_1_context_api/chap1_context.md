# Contexte API

Nous nous placerons dans le cas où vous auriez installé un projet React avec CRA et que vous avez un arbre React comme suit :

```text
     Home
      .
      .
    Numbers
      .
      .
    Number
```

Le contexte permet de faire passer des props dans l'arbre React sans passer explicitement à travers tous les composants. Notez que vous pouvez donner une valeur par défaut à votre contexte.

Pensez à exporter votre contexte si ce dernier se trouve dans un fichier séparé.

```js
const MyContext = React.createContext({ data : [4, 5, 6]});

export default MyContext;
```

## Création du Provider

Une fois le contexte défini il faut créer un Provider, il vous permettra alors de contextualiser un arbre React. Dans l'exemple ci-dessous on a modifié la valeur par défaut du contexte data :

```js
import MyContext from './MyContext';

class MyProvider extends React.Component {
  render() {
    return (
      <MyContext.Provider value={ { data : [1, 2, 3] } }>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
```

## Contextualisation

Puis on passe à la contextualisation à proprement parlé :

```js
import MyProvider from './MyProvider';

class App extends Component{

    render(){

        return(
            <MyProvider>
                <Home />
            </MyProvider>
        )
    }
}
```

Vous pouvez consommer votre contexte dans le composant Post, React lira la première contextualisation, avec votre provider MyProvider qu'il trouvera dans l'arbre. Dans l'exemple ci-dessous, on lit la valeur data passée dans le Provider : 

```js
import MyContext from './MyContext';

class Number extends Component{

    render(){

        return(
            <MyContext.Consumer>
                {value => console.log(value) /*[1, 2, 3]*/ }
            </MyContext.Consumer>
        )
    }
}
```

## Gestion d'un state avec le contexte

Vous pouvez également définir dans votre Provider un state avec de la logique métier (méthodes de classes). Dans ce cas lorsque vous consommer votre contexte dans un composant donné, vous pourrez à la fois lire le state de votre Provider, mais également appeler des méthodes définies dans votre provider. Il faudra cependant passer les méthodes au context afin de pourvoir les appeler dans le composant qui consomme votre API.

```js
import MyContext from './MyContext';

class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           data : [1, 2, 3]
        }
        this.addNumber = this.addNumber.bind(this);
    }

    addNumber(number) {
        this.state.data.push(number);

        this.setState({
            data : this.state.data
        });
    }

  render() {

    const { data } = this.state;
    
    return (
      <MyContext.Provider value={ { data : data , addNumber : this.addNumber } }>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
```

Consommation de votre API dans le composant Number, la méthode addNumber peut être appelée directement dans le composant Number. Une fois cliqué sur le bouton Add Number le state du provider se mettra à jour. Le render du composant Number sera alors ré-exécuter car les props de l'API changent.

```js
import MyContext from './MyContext';

 class Number extends Component {
    render() {
        return (
            <MyContext.Consumer>
                {({ data, addNumber }) => {
                    return (
                        <>
                            {data.map((num, i) => <p key={i}>{num}</p>)}
                            <button onClick={() => addNumber(Math.floor(Math.random() * 10))} >Add Number</button>
                        </>
                    )
                }
                }
            </MyContext.Consumer>
        )
    }
}
```

## Exercice d'application

Dans un fichier index_class_api_context.html mettez en place l'exemple du cours. Gérez la possibilité d'ajouter maintenant un nombre de votre choix dans le composant Number.

