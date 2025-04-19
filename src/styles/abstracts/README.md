# 🧠 Abstracts (`utilities/`, `helpers/`)

Le dossier `abstracts/` regroupe tous les **outils Sass réutilisables** dans l’ensemble du projet.  
Il contient uniquement du **code Sass technique** : pas de CSS directement généré.

---

## 📁 Contenu typique de `abstracts/`

- `_variables.scss` : toutes les variables globales (couleurs, tailles, etc.)
- `_mixins.scss` : fonctions réutilisables avec `@include`
- `_functions.scss` : fonctions Sass avec `@function`
- `_placeholders.scss` : sélecteurs `%placeholder` à étendre
- `_index.scss` : point d’entrée unique avec `@forward`

---

## ⚠️ Règle essentielle

> Ce dossier **ne doit générer aucun CSS s’il était compilé seul**.  
> Il ne contient que des helpers Sass internes.

---

## 🧭 Organisation possible

Pour les projets de grande taille, tu peux organiser ce dossier par **sujets fonctionnels** plutôt que par type :

| Exemple de fichier | Contenu regroupé                      |
| ------------------ | ------------------------------------- |
| `_typography.scss` | Variables typographiques, mixins liés |
| `_theming.scss`    | Gestion des couleurs, dark/light mode |

Cela rend le code plus lisible et mieux organisé pour les projets complexes.

---

## ✅ Exemple d’utilisation dans d’autres fichiers

```scss
@use '@/styles/abstracts' as *;

.element {
  color: $text-color;
  @include on-event {
    text-decoration: underline;
  }
}
```

---

🎯 En résumé :

- Pas de CSS généré
- Code Sass modulaire, clair, maintenable
- Accès centralisé aux outils Sass de ton projet
