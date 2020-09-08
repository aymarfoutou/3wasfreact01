# Présentation

Pour développer des applications mobiles vous avez deux options : soit un développement natif donc spécifique à une plateforme iOS ou Android, soit un développement cross-plateforme. Dans le premier cas si on souhaite faire fonctionner l'application sur les deux OS il faudra développer deux applications distinctes. Dans le second cas on développera qu'une seule application, dans un unique langage.

React Native est cross-plateforme et est très fluide et performant. En effet, React Native transforme ses composants en composants mobiles natifs. Par exmple, le composant View de React Native sera converti en un composant mobile UIView sur iOS et android.view sur Android.

Pour le développement de l'application mobile nous resterons en JSX. Une fois l'application terminée vous pourrez la builder pour iOS et Android à l'aide de la commande suivante :

```bash
npm run eject
```

Deux dossiers seront alors créés, ils contiendront le code natif de l'application pour chaque cible :

- ios

- android

## Installation

Vous pouvez tester Expo en ligne : [expo](https://snack.expo.io/)

Cependant, pour une meilleur exécution du code nous allons installer Expo en local et l'exécuter sur nos téléphones.

Insallation d'Expo :

```bash
npm install expo-cli --global
```

Puis, sur le site d'Expo installez soit pour IOS ou Android l'application sur votre téléphone :

[expo preview](https://expo.io/learn)

## Tester l'installation

Créez un projet hello-world, choisissez blanc pour avoir une application minimale pour commencer.

```bash
expo init hello-world
cd hello-world
expo start
```

Scannez le QR code une fois le serveur Expo lancé avec votre téléphone. Si vous avez l'application Expo insallée vous devriez voir la page suivante s'afficher :

![expo](images/expo_hello.png)

\newpage

Vous pouvez changer le texte de la page principale en allant dans le fichier **App.js** et en modifiant le contenu de la balise Text de React Native.