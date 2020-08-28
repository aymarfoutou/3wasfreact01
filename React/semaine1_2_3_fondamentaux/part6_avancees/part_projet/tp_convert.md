# Convert

Créez une application avec CRA permettant de convertir une somme en euro dans une autre devise. Vous ferez un select permettant de sélectionner une devise particulière dans le formulaire permettant de mettre un montant à convertir.

```txt

amount : []

devise : [euro] <-- select

[ ] <--  conversion immédiate 

```

Utilisez l'API suivante : de ​http://fixer.io, obtention de la clé gratuite. Regardez la documentation afin de mettre en place cette API dans le code.

- 1. Dans un premier temps essayer de consommer l'API sans mettre en place un redux, (Petit test dans un useEffect).

- 2. Dans un deuxième temps vous pouvez soit utiliser un context API (préférable), soit Redux mais dans ce cas il faudra penser à utiliser le module thunk pour la gestion de l'asynchrone dans Redux.