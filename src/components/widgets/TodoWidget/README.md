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
- Pas de persistance (localStorage à venir en Phase 1B)
- Pas de filtres/tags/priorités pour l'instant

### Prochaines phases

- **Phase 1B** : Ajout de la persistance localStorage
- **Phase 2** : Filtres et tri
- **Phase 3** : Tags et priorités
- **Phase 4** : Design avancé
