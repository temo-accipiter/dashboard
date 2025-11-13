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
├── TodoWidget.tsx       # Composant principal avec gestion d'état
├── TodoItem.tsx         # Composant d'affichage d'une tâche
├── TodoForm.tsx         # Formulaire d'ajout de tâche
├── TodoFilters.tsx      # Composant de filtrage des tâches
├── TagSelector.tsx      # Sélecteur de tags multi-select
├── PrioritySelector.tsx # Sélecteur de priorité
├── useTodoStorage.ts    # Hook custom pour persistence localStorage
├── types.ts             # Définition Task, AVAILABLE_TAGS, PRIORITY_CONFIG
├── TodoWidget.scss      # Styles du widget
└── README.md            # Ce fichier
```

### Types

```typescript
type Priority = 'high' | 'medium' | 'low' | 'none'

interface Task {
  id: string          // UUID généré avec crypto.randomUUID()
  text: string        // Texte de la tâche
  done: boolean       // État de complétion
  createdAt: Date     // Date de création
  tags: string[]      // Tags associés à la tâche
  priority: Priority  // Niveau de priorité
}

const AVAILABLE_TAGS = [
  { name: 'work', color: '#3b82f6' },      // bleu
  { name: 'personal', color: '#10b981' },  // vert
  { name: 'urgent', color: '#ef4444' },    // rouge
  { name: 'learning', color: '#8b5cf6' },  // violet
]

const PRIORITY_CONFIG = {
  high: { label: 'Haute', color: '#ef4444', icon: '🔴' },
  medium: { label: 'Moyenne', color: '#f59e0b', icon: '🟡' },
  low: { label: 'Basse', color: '#10b981', icon: '🟢' },
  none: { label: 'Aucune', color: '#6b7280', icon: '' },
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
- ✅ Système de tags colorés (Phase 1C complétée)
- ✅ Système de priorités avec tri automatique (Phase 1D complétée)
- ✅ Filtres avancés (tout/actives/complétées + par tags) (Phase 1E complétée)
- ✅ Édition inline double-clic (Phase 1F complétée)

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

## Phase 1D - Système de Priorités

### Niveaux de priorité

Le système de priorités permet d'assigner un niveau d'importance aux tâches :

- **Haute (high)** : 🔴 Rouge - Tâches urgentes et importantes
- **Moyenne (medium)** : 🟡 Orange - Tâches importantes
- **Basse (low)** : 🟢 Vert - Tâches de faible urgence
- **Aucune (none)** : Gris - Sans priorité définie (par défaut)

### Composants ajoutés

#### `PrioritySelector.tsx`

Composant de sélection de priorité intégré dans le formulaire :
- Boutons toggle pour chaque niveau de priorité
- Icône colorée pour identification visuelle rapide
- État sélectionné visible avec couleur de fond
- État non-sélectionné avec bordure colorée
- Valeur par défaut : "Aucune"

#### Modifications de `TodoItem.tsx`

- Indicateur de priorité avec icône colorée (🔴 🟡 🟢)
- Bordure gauche colorée selon la priorité (4px solid)
- Affichage conditionnel (masqué si priority = 'none')
- Tooltip au hover affichant le niveau de priorité

#### Modifications de `TodoForm.tsx`

- Ajout du PrioritySelector après le TagSelector
- Gestion de l'état selectedPriority avec valeur par défaut 'none'
- Réinitialisation à 'none' après soumission

#### Modifications de `TodoWidget.tsx`

- Tri automatique des tâches par priorité : high → medium → low → none
- Mise à jour de handleAddTask pour accepter le paramètre priority
- Les tâches haute priorité apparaissent toujours en premier

### Styles

- **Indicateur visuel** : Bordure gauche colorée (border-left: 4px)
- **Icônes émojis** : Identification rapide du niveau de priorité
- **Boutons de sélection** : Style cohérent avec TagSelector
- **Animations** : Transform au hover avec box-shadow
- **Responsive** : Flex-wrap pour adaptation mobile

### Migration

- Le champ `priority` est ajouté automatiquement aux anciennes tâches avec la valeur 'none'
- Aucune action manuelle requise, la migration est transparente

## Phase 1E - Système de Filtres

### Filtrage des tâches

Le système de filtres permet de visualiser différentes vues des tâches :

- **Toutes** : Affiche toutes les tâches (par défaut)
- **Actives** : Affiche uniquement les tâches non complétées
- **Complétées** : Affiche uniquement les tâches terminées
- **Par tags** : Filtre par un ou plusieurs tags (filtrage combiné)

### Composants ajoutés

#### `TodoFilters.tsx`

Composant de filtrage avec deux sections :

**Filtres de statut** :
- 3 boutons : Toutes / Actives / Complétées
- Bouton actif avec fond bleu
- Compteurs de tâches actives et complétées (badges)

**Filtres par tags** :
- Sélection multiple de tags
- Boutons colorés selon le tag (cohérent avec TagSelector)
- Bouton "Effacer" pour réinitialiser les filtres de tags

#### Modifications de `TodoWidget.tsx`

- États `currentFilter` et `selectedTagFilters`
- Fonction `getFilteredTasks()` qui :
  - Filtre par statut (all/active/completed)
  - Filtre par tags (affiche si la tâche a AU MOINS un tag sélectionné)
  - Trie par priorité
- Message différent si aucune tâche ne correspond aux filtres

### Styles

- **Container filtres** : Fond gris clair, padding, border-radius
- **Boutons de statut** : Border, hover bleu, actif avec fond bleu
- **Badges compteurs** : Fond bleu clair (actives), vert clair (complétées)
- **Filtres tags** : Style cohérent avec TagSelector
- **Responsive** : flex-wrap, adaptation mobile

### Comportement

- Les filtres se combinent (statut ET tags)
- Le tri par priorité est maintenu après filtrage
- Message "Aucune tâche ne correspond aux filtres" si résultat vide

## Phase 1F - Édition Inline

### Édition double-clic

Permet de modifier le texte d'une tâche directement dans la liste :

- **Double-clic** sur le texte d'une tâche → active le mode édition
- **Input inline** remplace temporairement le texte
- **Entrée** → sauvegarde les modifications
- **Escape** → annule les modifications
- **Blur** (clic ailleurs) → sauvegarde automatiquement

#### Modifications de `TodoItem.tsx`

- États `isEditing` et `editText` pour gérer l'édition
- `useRef` pour focus automatique sur l'input
- Handlers :
  - `handleDoubleClick` : Active le mode édition
  - `handleSave` : Sauvegarde si le texte a changé (trimmed)
  - `handleCancel` : Restaure le texte original
  - `handleKeyDown` : Gère Entrée et Escape
  - `handleBlur` : Sauvegarde au blur
- Affichage conditionnel : input si `isEditing`, span sinon
- Title "Double-clic pour éditer" sur le span
- Cursor pointer sur le texte

#### Modifications de `TodoWidget.tsx`

- Handler `handleEditTask(taskId, newText)` pour mettre à jour le texte
- Prop `onEdit` passée à TodoItem

### Styles

- **Texte normal** : `cursor: pointer` pour indiquer l'interactivité
- **Input édition** :
  - Border bleu 2px
  - Padding léger
  - Box-shadow au focus
  - Width 100%
  - Transition douce

### Accessibilité

- `aria-label="Éditer la tâche"` sur l'input
- Title "Double-clic pour éditer" sur le texte
- Focus et sélection automatique du texte lors de l'entrée en édition

### Prochaines phases

- **Phase 2** : Recherche textuelle
- **Phase 3** : Design avancé et thèmes
- **Phase 4** : Statistiques et analytics
