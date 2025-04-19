# ✅ Checklist finale — Template React Personnel

## 🧱 Structure technique

- [x] **Vite** pour le démarrage ultra rapide
- [x] **React 18** + React Router (avec layout `<Outlet />`)
- [x] **Sass (SCSS)** structuré avec :
  - abstracts/ (variables, mixins…)
  - base/ (reset, typo, helpers…)
  - vendors/ (normalize.css)
- [x] `main.scss` modernisé avec `@use` + `@forward`
- [x] Variables CSS pour support dark/light mode

## 🧑‍💻 Code quality

- [x] ESLint (avec plugin React)
- [x] Prettier (formatage automatique)
- [x] Commandes : `yarn lint`, `yarn format`
- [x] Code clair, modulaire et commenté

## 🌐 Fonctionnalités UX intégrées

- [x] 🌙 Dark / Light mode avec `localStorage` et `<ThemeToggle />`
- [x] 🌍 Multilingue (i18n) via `react-i18next`
- [x] Sélecteur de langue avec `localStorage`
- [x] Accessibilité :
  - Aria-labels
  - Démo `LangSelector` et `ThemeToggle`

## 🧪 Page de test

- [x] `DemoPage.jsx` pour visualiser rapidement les composants de base (dark mode, langue, etc.)

## 📝 Documentation & Propreté

- [x] `README.md` complet (installation, conventions, structure)
- [x] Badges (licence, etc.)
- [x] `.gitignore` bien configuré
- [x] `LICENSE` (MIT)
- [x] Dossiers `styles/` avec README explicatifs
- [x] Fichier `.zshrc` commenté (en bonus)

## 🧠 Bonnes pratiques de nommage

- 📁 Dossiers : `camelCase`
- 📄 Fichiers React : `PascalCase.jsx`
- 📄 SCSS : `camelCase.scss`
- `_underscore.scss` pour fichiers partiels
