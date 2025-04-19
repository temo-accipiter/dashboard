# 🌍 LangSelector

Composant de **sélecteur de langue** basé sur `react-i18next`.

## ✅ Fonctionnalités

- Deux boutons : 🇫🇷 et 🇬🇧
- Active automatiquement `i18n.changeLanguage('fr' | 'en')`
- Sauvegarde la langue dans `localStorage`
- Affiche un bouton actif selon la langue sélectionnée
- Accessibilité : `aria-label` + `role="group"`

## 📁 Fichiers

- `LangSelector.jsx` — bouton de changement de langue
- `LangSelector.scss` — style facultatif

## 🔁 Utilisation

```jsx
<LangSelector />
```

💡 Idéal pour tester les traductions dans `DemoPage` ou dans le `Header`.
