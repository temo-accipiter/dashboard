# 📦 Vendors

Ce dossier `styles/vendors/` regroupe tous les **fichiers CSS ou SCSS provenant de bibliothèques externes**, comme :

- Normalize.css
- Bootstrap
- jQuery UI
- FancyCarouselSlider (ou autres plugins externes)

---

## 🔒 Bonne pratique

Ne jamais modifier directement les fichiers dans ce dossier.

Si tu dois **surcharger ou écraser les styles d’un vendor**, fais-le proprement dans un dossier à part :

```
styles/vendors-extensions/
└── _bootstrap.scss   // Surcharges ou corrections de Bootstrap
└── _normalize.scss   // Modifications locales sur Normalize
```

Ainsi tu évites de casser les fichiers d’origine, ce qui est essentiel pour :

- les mises à jour futures des librairies
- la clarté du code
- la séparation nette entre ton code et celui de bibliothèques tierces

---

## 📘 Résumé

| Fichier                   | Rôle                                  |
| ------------------------- | ------------------------------------- |
| `vendors/_normalize.scss` | Fournit un reset CSS moderne          |
| `vendors-extensions/`     | Surcharges personnalisées (si besoin) |

👉 Garde tes propres styles séparés des fichiers `vendors/` pour plus de sécurité et de maintenabilité.
