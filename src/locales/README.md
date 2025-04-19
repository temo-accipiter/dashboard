# 🌐 Dossier `public/locales/`

Ce dossier contient tous les fichiers de traduction **JSON** utilisés par `i18next` pour gérer le multilingue.

---

## 📁 Structure recommandée

```
public/locales/
├── fr/
│   ├── common.json       # Traductions générales (boutons, titres, etc.)
│   ├── header.json       # Spécifique au header
│   └── footer.json       # Spécifique au footer
└── en/
    ├── common.json
    ├── header.json
    └── footer.json
```

---

## ✅ Bonnes pratiques

- Créer un **fichier par section** du site (`header`, `footer`, `home`, `about`, etc.)
- Utiliser un **namespace clair** : `t('header.title')`, `t('common.save')`
- Garder les mêmes clés dans chaque langue

---

## Exemple de fichier `common.json`

```json
{
  "welcome": "Bienvenue sur le site",
  "save": "Sauvegarder",
  "cancel": "Annuler"
}
```

Et sa version anglaise (`en/common.json`) :

```json
{
  "welcome": "Welcome to the site",
  "save": "Save",
  "cancel": "Cancel"
}
```

---

## 🌍 Ajouter une langue

1. Créer un nouveau dossier (ex: `es/`)
2. Copier les fichiers JSON à traduire
3. Ajouter la langue dans `i18n.js`

---

## 🚫 Important

Ces fichiers doivent rester dans `public/locales/`  
Ils sont chargés statiquement (non compilés par Vite).
