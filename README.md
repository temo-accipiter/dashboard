# 🚀 Démarrer un nouveau projet React (template personnel)

[![Licence: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Ce projet est un **template React personnalisé** prêt à l'emploi avec :

- ⚡ Vite
- 🧶 Yarn (v3 Plug’n’Play)
- 🔀 React Router
- 🎨 Sass (SCSS) structuré
- 🧹 ESLint + Prettier configurés
- 🧱 Structure modulaire : `styles/`, `pages/`, `components/`, `data/`, `assets/`

---

## ✅ Étapes pour lancer un nouveau projet

### 1. Copier le template

```bash
cp -R ~/Desktop/projets/mon-template-react ~/Desktop/projets/nom-du-nouveau-projet
```

### 2. Entrer dans le dossier

```bash
cd ~/Desktop/projets/nom-du-nouveau-projet
```

### 3. Supprimer l’ancien Git (si présent)

```bash
rm -rf .git
```

### 4. (Optionnel) Modifier le `package.json`

- `"name"` du projet
- `"description"`
- `"author"`

### 5. Installer les dépendances

```bash
yarn install
```

### 6. (Optionnel) Vérifier ou formater ton code

```bash
yarn lint         # Vérifie le code avec ESLint
yarn lint --fix   # Corrige automatiquement les erreurs
yarn format       # Formate le code avec Prettier
```

### 7. (Optionnel) Créer un nouveau dépôt Git

```bash
git init
git add .
git commit -m "Initial commit"
```

### 8. Lancer le projet en local

```bash
yarn dev
```

👉 Le projet sera accessible ici : [http://localhost:5173](http://localhost:5173)

---

## ✨ Conventions utilisées

- ✅ 1 composant ou page = 1 dossier avec `.jsx` et `.scss`
- 🎯 Tous les styles globaux sont importés via `styles/main.scss`
- 🔧 Prettier + ESLint sont préconfigurés pour un code propre

---

🧠 Ce template est conçu pour te faire gagner du temps, avec une structure moderne, simple à maintenir et évolutive.

---

## 📋 Checklist complète du template

Ce template inclut plein de bonnes pratiques modernes (accessibilité, dark mode, i18n, conventions de code…).

👉 Consulte le fichier [CHECKLIST_TEMPLATE_REACT.md](./CHECKLIST_TEMPLATE_REACT.md) pour avoir la vue d’ensemble complète.
