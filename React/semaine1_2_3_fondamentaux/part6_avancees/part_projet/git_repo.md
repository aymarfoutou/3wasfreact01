# Git création d'un dépot

Une fois que le dépôt est créé :

```bash
# Voir les modifications état du dépot
git status 

# tout ajouté d'une feature
git add .

# commit
git commit -m "nouvelle feature"

# push sur le remote
git push

```

Pour créer une branche

```bash
# Voir les modifications état du dépot
git status 

# créer une nouvelle branche
git branch refactoring

# se placer sur cette branche (branch actuelle clean)
git checkout refactoring

# vérifier sur quelle branche on se trouve
# liste les branches une petite * devant la branche active
git branch

# Faites vos commits sur la branche ...

# Revenir sur la branch master :
git branch master
```

Pour merger les features ... On verra plus tard 