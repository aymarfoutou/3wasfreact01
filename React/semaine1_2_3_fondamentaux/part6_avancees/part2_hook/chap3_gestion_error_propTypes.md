# PropTypes

Le mécanisme de vérification des types des données avec propTypes dans React est à mettre en place lors du développement de l'application.

Pour sécuriser l'utilisation des props dans un projet React nous allons utiliser le module **prop-types**. Ce module permettra de définir **le type des props**. Nous pourrons avoir une chaîne de typage dans nos composants et vérifier que les valeurs passées d'un composant parent vers un composant enfant sont bien les types attendus.

Pour installer cette dépendance dans un projet React à la racine de celui-ci tapez la ligne de commande suivante :

```bash
npm install --save prop-types
```

## Exemples

Dans le code, pour vérifier le type string et la présence obligatoire d'un titre, vous écrirez :

```js
import PropTypes from 'prop-types';

Post.propTypes = {
    title : PropTypes.string.isRequired
}

const Post = (props) =>{

    return (
        <div className="post__content">
            <h1>{props.tile}</h1>
        </div>
    );
}

ReactDOM.render(
    <Post title="React" />
    container
);
```

## Valeur par défaut

Notez que vous pouvez également définir des valeurs par défaut pour vos props :

```js
import PropTypes from 'prop-types';

// Specifies the default values for props:
Post.defaultProps = {
  title: 'React'
};
```

Dans une classe, on peut également définir à partir d'une propriété statique une valeur par défaut de la manière suivante :

```js
import PropTypes from 'prop-types';

class Post extends React.Component {
  static defaultProps = {
    title: 'React !!'
  }

  render() {
    return (
      <div>Hello, {this.props.title}</div>
    )
  }
}
```

Par exemple on peut spécifier un "range" pour une props donnée :

```js
import PropTypes from 'prop-types';

User.propTypes = {
  gender: PropTypes.oneOf([
    'female', 'male'
  ])
}
```

Vous pouvez vérifier des types plus complexes, ici on vérifie le type d'un objet "comment" :

```js
import PropTypes from 'prop-types';

Post.propTypes = {
  comment: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      start: PropTypes.number,
      content: PropTypes.string,
      email: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
```
