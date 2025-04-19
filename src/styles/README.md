# 🧾 Fichier `main.scss` – point d’entrée global des styles

Ce fichier `main.scss` est le **seul fichier SCSS à ne pas commencer par un `_underscore`**.  
Il sert uniquement à **importer les points d’entrée** (`_index.scss`) de chaque dossier structurant (`abstracts`, `base`, `vendors`, etc.).

---

## ✅ Utilisation moderne avec `@use` + `@forward`

Nous utilisons désormais la syntaxe Sass moderne recommandée :

```scss
@use './abstracts' as *;
@use './vendors' as *;
@use './base' as *;
```

📌 Tous les fichiers de `styles/abstracts/`, `styles/base/` et `styles/vendors/` sont regroupés via un fichier `_index.scss` dans chaque dossier, avec `@forward`.

---

## 📦 Structure du dossier `styles/`

```
styles/
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _functions.scss
│   ├── _placeholders.scss
│   └── _index.scss     ✅ ← point d’entrée unique avec @forward
├── base/
│   ├── _typography.scss
│   ├── _reset.scss
│   ├── _base.scss
│   ├── _helpers.scss
│   └── _index.scss     ✅ ← point d’entrée unique avec @forward
├── vendors/
│   └── _normalize.scss
│   └── _index.scss     ✅ ← point d’entrée unique avec @forward
└── main.scss           ✅ ← unique point d’entrée global (via @use)
```

---

## 🧠 Bonnes pratiques

- `main.scss` **n’inclut aucun style lui-même**, uniquement des `@use`
- Tous les autres fichiers SCSS (`.scss`) **importent ce dont ils ont besoin**, individuellement
  - Par exemple : `@use '@/styles/abstracts' as *;`
- Finis les chemins relatifs du type `../../..` grâce à l’**alias Vite `@/`**

---

## 🎯 Ordre des imports recommandé dans `main.scss`

Toujours dans cet ordre logique :

```scss
@use './abstracts' as *;
@use './vendors' as *;
@use './base' as *;
```

---

## ✅ Avantages

- Sass moderne et future-proof (`@use` + `@forward`)
- Pas de doublon de variables ou conflits
- Chargement propre, modulaire, clair
- Code SCSS maintenable et organisé pour tous les projets React
