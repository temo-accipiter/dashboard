# 🌍 i18n — Gestion multilingue avec i18next

Ce dossier contient toute la configuration pour **traduire automatiquement** l’interface en plusieurs langues (`fr`, `en`, etc.) grâce à [i18next](https://www.i18next.com/) et [`react-i18next`](https://react.i18next.com/).

---

## ✅ Fonctionnalités

- Prise en charge des langues via fichiers JSON (`fr`, `en`)
- Chargement automatique selon la langue choisie (ou 'fr' par défaut)
- Mémorisation de la langue dans `localStorage`
- Compatible avec React Router
- Découpage en `namespaces` (`header`, `footer`, `common`, etc.)

---

## 📁 Structure

```
i18n/
├── i18n.js                # Configuration globale de i18next
└── README.md              # Ce fichier (documentation)
```

`public/locales/` contient toutes les traductions, par langue :

```
public/locales/
├── fr/
│   ├── common.json
│   ├── header.json
│   └── footer.json
└── en/
    ├── common.json
    ├── header.json
    └── footer.json
```

---

## 📦 Utilisation dans les composants

```js
import { useTranslation } from 'react-i18next'

const { t } = useTranslation('common')

return <h1>{t('demoPageTitle')}</h1>
```

---

## 💡 Astuces

- Utiliser un `namespace` par zone (`header`, `footer`, etc.)
- Ajouter la langue choisie dans le `localStorage` avec `LangSelector`
- Utiliser un `fallbackLng` pour éviter les erreurs

---

## 📌 À retenir

Tu peux étendre les langues, ajouter des fichiers `.json` par section, ou charger dynamiquement des fichiers plus tard si nécessaire.
