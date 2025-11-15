# NewsWidget - Widget de Flux d'Actualités

Widget React pour afficher et gérer des flux RSS avec support de plusieurs sources, filtres par catégorie et mode lecture.

## 📋 Fonctionnalités

### ✨ Principales

- **Flux RSS multiples** : Supportez plusieurs sources RSS personnalisables
- **Filtres par catégorie** : Filtrez les articles par technologie, développement, design, business, science
- **Mode lecture** : Lisez les articles dans une interface épurée sans quitter le dashboard
- **Tri personnalisable** : Triez par date (récent/ancien) ou par source
- **Cache intelligent** : Les articles sont mis en cache pendant 30 minutes pour améliorer les performances
- **Responsive** : Interface adaptée mobile, tablette et desktop

### 🔧 Gestion des sources

- Activer/désactiver des sources individuelles
- Ajouter des sources RSS personnalisées
- Supprimer des sources
- Catégoriser les sources

## 🎨 Structure des fichiers

```
NewsWidget/
├── NewsWidget.tsx           # Composant principal ('use client')
├── NewsArticle.tsx         # Affichage d'un article individuel
├── NewsFilters.tsx         # Filtres par catégorie et tri
├── ReadingModeModal.tsx    # Mode lecture plein écran
├── FeedManager.tsx         # Gestion des sources RSS
├── useRSSFeed.ts          # Hook personnalisé pour RSS
├── types.ts               # Interfaces TypeScript
├── NewsWidget.scss        # Styles SCSS (BEM)
└── README.md             # Documentation
```

## 🚀 Utilisation

### Import basique

```tsx
import { NewsWidget } from '@/components/widgets/NewsWidget/NewsWidget'

export default function MyPage() {
  return (
    <div>
      <NewsWidget />
    </div>
  )
}
```

### Intégration dans une grille

```tsx
<div className="widgets-container">
  <div className="widget-section">
    <NewsWidget />
  </div>
</div>
```

## 📦 Types

### NewsArticle

```typescript
interface NewsArticle {
  id: string
  title: string
  description: string
  link: string
  pubDate: Date
  source: string
  category: string
  image?: string
  author?: string
  content?: string
}
```

### RSSFeed

```typescript
interface RSSFeed {
  id: string
  name: string
  url: string
  category: string
  enabled: boolean
}
```

## 🎯 Hook personnalisé : useRSSFeed

Le hook `useRSSFeed` gère toute la logique de récupération et de gestion des flux RSS.

```typescript
const {
  feeds, // Liste des sources RSS
  articles, // Articles récupérés
  loading, // État de chargement
  error, // Erreurs éventuelles
  fetchAllFeeds, // Récupérer tous les flux
  addFeed, // Ajouter une source
  removeFeed, // Supprimer une source
  toggleFeed, // Activer/désactiver une source
  updateFeed, // Mettre à jour une source
} = useRSSFeed()
```

## 🎨 Personnalisation

### Variables CSS

Vous pouvez personnaliser l'apparence via les variables CSS :

```css
:root {
  --news-widget-bg: #ffffff;
  --news-widget-text: #1f2937;
  --news-widget-text-light: #6b7280;
  --news-widget-border: #e5e7eb;
  --news-widget-hover: #f9fafb;
  --news-widget-primary: #3b82f6;
  --news-widget-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --news-widget-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Sources RSS par défaut

Les sources par défaut sont définies dans `types.ts` :

```typescript
export const DEFAULT_RSS_FEEDS: RSSFeed[] = [
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'technology',
    enabled: true,
  },
  // ...
]
```

## 🔌 API RSS

Le widget utilise le service [rss2json](https://rss2json.com/) comme proxy CORS pour récupérer les flux RSS. Ce service gratuit permet de :

- Contourner les restrictions CORS
- Convertir le XML en JSON
- Supporter la plupart des flux RSS/Atom

## 📱 Responsive Design

Le widget s'adapte automatiquement aux différentes tailles d'écran :

- **Mobile** (< 640px) : Articles en colonne, images pleine largeur
- **Tablette** (640px - 1024px) : Articles en grille
- **Desktop** (> 1024px) : Layout optimisé avec images latérales

## ♿ Accessibilité

- Labels ARIA sur tous les boutons interactifs
- Support du clavier (Escape pour fermer les modales)
- Attributs `aria-pressed` pour les états actifs
- Navigation au clavier complète

## 💾 Stockage local

Le widget utilise `localStorage` pour :

- **Sauvegarder les préférences de sources** (`news-widget-feeds`)
- **Mettre en cache les articles** (`news-widget-articles`) pendant 30 minutes

## 🎭 Animations

Toutes les animations utilisent des transitions CSS pour une performance optimale :

- `fadeIn` : Apparition du widget
- `slideUp` : Modal de lecture
- `spin` : Rotation du bouton refresh

## 🐛 Gestion d'erreurs

Le widget gère gracieusement :

- Les flux RSS inaccessibles
- Les erreurs de parsing
- Les images manquantes
- Les timeouts réseau

## 📄 Exemple de page complète

```tsx
'use client'

import PageContainer from '@/components/pageContainer/PageContainer'
import { NewsWidget } from '@/components/widgets/NewsWidget/NewsWidget'
import './News.scss'

export default function News() {
  return (
    <PageContainer>
      <h1>📰 Actualités</h1>
      <div className="news-page">
        <NewsWidget />
      </div>
    </PageContainer>
  )
}
```

## 🔄 Performance

- **Cache de 30 minutes** pour éviter les appels API répétés
- **Lazy loading** des images
- **Optimisation du re-render** avec `useMemo`
- **Debounce** implicite via le cache

## 🌐 Support navigateurs

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Tous les navigateurs modernes supportant ES6+

## 📚 Dépendances

- React 18+
- Next.js 13+ (App Router)
- SCSS/SASS
- API rss2json (gratuite)

## 🤝 Contribution

Pour ajouter de nouvelles catégories, modifiez `CATEGORY_CONFIG` dans `types.ts` :

```typescript
export const CATEGORY_CONFIG = {
  // Nouvelles catégories
  sports: { label: 'Sports', color: '#ef4444', icon: '⚽' },
  // ...
}
```
