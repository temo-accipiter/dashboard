# TodoWidget

Widget de gestion de tâches simple avec fonctionnalités CRUD de base.

## Phase 1A - Structure de base + CRUD simple

### Fonctionnalités

- **Ajouter une tâche** : Formulaire avec input et bouton "Ajouter"
- **Marquer comme terminée** : Checkbox pour toggle l'état done/undone
- **Supprimer une tâche** : Bouton de suppression (✕)
- **Compteur de tâches** : Affiche le nombre de tâches actives / total

### Structure des fichiers

```
TodoWidget/
├── TodoWidget.tsx      # Composant principal avec gestion d'état
├── TodoItem.tsx        # Composant d'affichage d'une tâche
├── TodoForm.tsx        # Formulaire d'ajout de tâche
├── TagSelector.tsx     # Sélecteur de tags multi-select
├── useTodoStorage.ts   # Hook custom pour persistence localStorage
├── types.ts            # Définition de l'interface Task et AVAILABLE_TAGS
├── TodoWidget.scss     # Styles du widget
└── README.md           # Ce fichier
```

### Types

```typescript
interface Task {
  id: string          // UUID généré avec crypto.randomUUID()
  text: string        // Texte de la tâche
  done: boolean       // État de complétion
  createdAt: Date     // Date de création
  tags: string[]      // Tags associés à la tâche
}

const AVAILABLE_TAGS = [
  { name: 'work', color: '#3b82f6' },      // bleu
  { name: 'personal', color: '#10b981' },  // vert
  { name: 'urgent', color: '#ef4444' },    // rouge
  { name: 'learning', color: '#8b5cf6' },  // violet
]
```

### Utilisation

```tsx
import { TodoWidget } from './components/widgets/TodoWidget/TodoWidget'

function App() {
  return <TodoWidget />
}
```

### Caractéristiques

- Design simple et propre
- Responsive (mobile-friendly)
- Hover states sur les boutons
- ✅ Persistence localStorage (Phase 1B complétée)
- ✅ Système de tags colorés (Phase 1C complétée)
- Pas de filtres/priorités pour l'instant

## Phase 1B - Persistence localStorage

### Hook custom `useTodoStorage`

Le hook `useTodoStorage` gère automatiquement la sauvegarde et le chargement des tâches :

- **Chargement automatique** : Les tâches sont chargées depuis localStorage au montage du composant
- **Sauvegarde automatique** : Chaque modification des tâches est automatiquement sauvegardée
- **Clé de stockage** : `personal-dashboard-todos`
- **Gestion d'erreurs** : Les erreurs localStorage sont capturées et loggées dans la console
- **Conversion des dates** : Les dates sont correctement désérialisées après JSON.parse

### Utilisation

Le hook remplace directement `useState` dans `TodoWidget.tsx` :

```typescript
import { useTodoStorage } from './useTodoStorage'

const [tasks, setTasks] = useTodoStorage() // Au lieu de useState<Task[]>([])
```

### Test manuel

1. Ajouter des tâches dans le widget
2. Rafraîchir la page → les tâches doivent être présentes
3. Ouvrir les DevTools > Application > Local Storage
4. Vérifier la clé `personal-dashboard-todos`
5. Vider localStorage → les tâches disparaissent

## Phase 1C - Système de Tags

### Tags colorés

Le système de tags permet de catégoriser les tâches avec des badges colorés :

- **Sélection multi-tags** : Sélectionnez plusieurs tags lors de la création d'une tâche
- **Tags disponibles** : work (bleu), personal (vert), urgent (rouge), learning (violet)
- **Affichage visuel** : Badges colorés arrondis avec le nom du tag
- **Suppression individuelle** : Bouton ✕ sur chaque tag pour le retirer d'une tâche

### Composants ajoutés

#### `TagSelector.tsx`

Composant de sélection multi-tags intégré dans le formulaire :
- Boutons toggle pour chaque tag disponible
- État sélectionné visible avec couleur de fond
- État non-sélectionné avec bordure colorée

#### Modifications de `TodoItem.tsx`

- Affichage des tags sous le texte de la tâche
- Badge coloré pour chaque tag avec bouton de suppression
- Animation au hover (scale 1.05)

#### Modifications de `TodoForm.tsx`

- Ajout du TagSelector sous l'input
- Gestion de l'état selectedTags
- Réinitialisation des tags après soumission

### Styles

- **Badges compacts** : padding réduit, border-radius 12px
- **Animations** : transform au hover, transitions douces
- **Responsive** : flex-wrap pour adaptation mobile
- **Couleurs** : utilisation des couleurs définies dans AVAILABLE_TAGS

### Prochaines phases

- **Phase 2** : Filtres et tri
- **Phase 3** : Priorités
- **Phase 4** : Design avancé
