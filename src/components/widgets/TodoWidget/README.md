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
├── useTodoStorage.ts   # Hook custom pour persistence localStorage
├── types.ts            # Définition de l'interface Task
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
}
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
- Pas de filtres/tags/priorités pour l'instant

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

### Prochaines phases

- **Phase 2** : Filtres et tri
- **Phase 3** : Tags et priorités
- **Phase 4** : Design avancé
