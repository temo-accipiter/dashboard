# 🎨 ThemeToggle

Ce composant permet de **basculer entre le thème clair et le thème sombre**.

## ✅ Fonctionnalités

- Utilise l’attribut `data-theme` sur `<html>` (ex: `data-theme="dark"`)
- Sauvegarde la préférence dans `localStorage`
- Utilise une icône 🌞 ou 🌙 selon le thème actif
- Compatible avec les préférences utilisateur (`prefers-color-scheme` si tu veux l'ajouter plus tard)

## 📁 Fichiers

- `ThemeToggle.jsx` — le bouton interactif
- `ThemeToggle.scss` — style du bouton (facultatif)

## 🔁 Utilisation

```jsx
<ThemeToggle />
```

💡 Tu peux le placer dans un header, une page de test (`DemoPage`) ou une barre latérale.
