# 🗂️ Dossier `src/` – Structure principale de l’application React

Ce dossier contient tout le code source de ton application React, organisé selon des bonnes pratiques modernes : architecture modulaire, séparation claire des responsabilités, styles SCSS intégrés.

---

## ✅ Structure recommandée

```
src/
├── assets/              # Images, logos, icônes
├── components/
│   └── Header/
│       ├── Header.jsx
│       └── Header.scss
├── data/                # Fichiers JSON, données statiques
├── hooks/               # (optionnel) useFetch, useTodo, etc.
├── layouts/             # (optionnel) Layout général ou admin
├── pages/
│   └── Home/
│       ├── Home.jsx
│       └── Home.scss
├── router/              # (optionnel) gestion des routes séparée
│   └── routes.jsx
├── services/            # (optionnel) appels API ou gestion de Todoist
├── styles/              # SCSS global organisé (base, abstracts, main.scss)
├── App.jsx              # Composant racine, contient Routes
├── main.jsx             # Point d’entrée React (createRoot)

```

---

## 📁 Détail des dossiers

### `assets/`

> Contient toutes les ressources statiques : images, SVG, icônes, polices, etc.

### `components/`

> Composants réutilisables, organisés par dossier : 1 composant = 1 dossier = 1 `.jsx` + 1 `.scss`

### `pages/`

> Composants correspondant à une route (`/home`, `/about`, etc.)

### `data/`

> Données statiques, JSON, objets simulant des réponses API (mock)

### `hooks/` _(optionnel)_

> Tous les custom hooks que tu crées (`useForm`, `useDarkMode`, etc.)

### `services/` _(optionnel)_

> Fichiers pour gérer la logique des appels API (`todoistService.js`, `authService.js`, etc.)

### `layouts/` _(optionnel)_

> Layouts globaux qui englobent plusieurs pages (ex : admin vs public)

### `router/` _(optionnel)_

> Fichier `routes.jsx` ou `AppRoutes.jsx` pour extraire le `<Routes />` de `App.jsx`

### `styles/`

> Tous les styles SCSS globaux (structure moderne avec `@use` / `@forward`)

---

## 🧠 Conseils pratiques

- Garde les styles des composants proches du composant (`.jsx` + `.scss`)
- Centralise les variables/mixins dans `styles/abstracts/`
- Nomme chaque fichier de page ou composant avec une majuscule : `Home.jsx`, `Footer.jsx`
- Utilise `@/` pour éviter les chemins relatifs (`../../components/...`)

---

Cette structure permet un projet scalable, lisible, et facile à maintenir même en grandissant 📈
