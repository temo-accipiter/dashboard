# 🧱 Base

Le dossier `base/` contient le **code standard de démarrage** du projet, souvent appelé _boilerplate CSS_.  
Il pose les fondations visuelles de l’interface, avant d’appliquer des styles spécifiques à des composants ou pages.

---

## 📁 Contenu typique

- `_reset.scss` : réinitialisation des styles par défaut du navigateur
- `_base.scss` : styles de base HTML (`a`, `ul`, `img`, etc.)
- `_typography.scss` : styles de texte globaux (`h1` à `h6`, `p`, etc.)
- `_helpers.scss` : classes utilitaires réutilisables (`.visually-hidden`, `.clearfix`, etc.)
- `_animations.scss` : keyframes globales, transitions
- `_index.scss` : point d’entrée unique avec `@forward`

---

## 🎯 Rôle du dossier `base/`

- Garantir **une cohérence visuelle de base**
- Fournir un **socle CSS commun** à tout le projet
- S’appliquer **de manière globale** (souvent via `main.scss`)

---

## ✅ Exemple d’import dans `main.scss`

```scss
@use './base' as *;
```

---

## 📌 Bonnes pratiques

| À faire ✅                                 | À éviter ❌                                         |
| ------------------------------------------ | --------------------------------------------------- |
| Organiser les fichiers par usage           | Mettre tous les styles de base dans un seul fichier |
| Importer via `@forward` dans `_index.scss` | Répéter les `@use` dans `main.scss`                 |
| Éviter les styles trop spécifiques         | Ajouter des composants ici                          |

---

En résumé :  
Le dossier `base/` contient les **fondations CSS** de ton application React.  
Il doit rester **léger, propre, et générique.**
