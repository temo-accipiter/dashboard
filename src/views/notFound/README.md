# 🔍 NotFound Page

Composant affiché lorsqu'une route est inconnue (`path="*"`).

## ✅ Objectif

- Informer l’utilisateur que la page demandée n’existe pas
- Éviter une page blanche si l’URL est incorrecte

## 📁 Exemple de contenu

```jsx
<h1>404</h1>
<p>Page introuvable</p>
<a href="/">Retour à l'accueil</a>
```

## 💡 Bonnes pratiques

- Ajouter un lien retour vers la page d’accueil
- Styliser le message avec une `NotFound.scss`
