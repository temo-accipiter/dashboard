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
  id: string // UUID généré avec crypto.randomUUID()
  text: string // Texte de la tâche
  done: boolean // État de complétion
  createdAt: Date // Date de création
  tags: string[] // Tags associés à la tâche
  priority: Priority // Niveau de priorité
}

const AVAILABLE_TAGS = [
  { name: 'work', color: '#3b82f6' }, // bleu
  { name: 'personal', color: '#10b981' }, // vert
  { name: 'urgent', color: '#ef4444' }, // rouge
  { name: 'learning', color: '#8b5cf6' }, // violet
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

## Phase FINALE - Polish et Documentation

### Animations CSS

Le widget intègre désormais des animations fluides pour améliorer l'expérience utilisateur :

#### Animations globales

- **fadeIn** : Animation d'apparition pour le widget, filtres et éléments
- **slideIn** : Animation de glissement pour l'ajout de tâches
- **Transitions** : Toutes les interactions utilisent `cubic-bezier(0.4, 0, 0.2, 1)` pour des animations naturelles

#### Animations spécifiques

- **Boutons** :
  - Élévation au hover avec `translateY(-2px)`
  - Box-shadow dynamique pour effet de profondeur
  - Scale au clic pour feedback tactile
- **Badges (tags/priorité)** :
  - Scale + translateY au hover
  - Animation fadeIn à la sélection
- **Bouton de suppression** :
  - Rotation 90° au hover avec scale
  - Effet de survol avec fond coloré
- **Checkbox** :
  - Scale au hover pour meilleure visibilité
- **Input de formulaire** :
  - Élévation légère au focus
  - Box-shadow avec couleur primaire

#### Performance

- Durée des animations : 0.2s à 0.3s pour fluidité sans latence
- Utilisation de `transform` et `opacity` pour performances GPU
- Animations désactivables via `prefers-reduced-motion` (à implémenter)

### Accessibilité (WCAG 2.1 AA)

Le widget respecte les standards d'accessibilité modernes :

#### ARIA Labels

- **Rôles sémantiques** : `section`, `header`, `list`, `listitem`, `region`, `group`
- **Labels descriptifs** : Tous les boutons et contrôles ont des `aria-label` clairs
- **États dynamiques** : `aria-pressed` pour les boutons toggle (tags, priorités, filtres)
- **Annonces** : `role="status"` pour les messages d'état vide

#### Navigation clavier

- **Tab** : Navigation séquentielle à travers tous les contrôles interactifs
- **Enter** : Activation des boutons et validation du formulaire
- **Escape** : Annulation de l'édition inline
- **Focus visible** : Outline 3px sur tous les éléments focusables
  - Couleur primaire pour éléments standards
  - Couleur dangereuse pour suppression
  - Couleur de l'élément actif pour badges

#### États visuels

- **:focus-visible** : Outline visible uniquement lors de navigation clavier
- **:hover** : Feedback visuel distinct du focus
- **:active** : Feedback tactile au clic/tap
- **:disabled** : État désactivé avec opacité 0.5 et cursor not-allowed

#### Formulaires accessibles

- Bouton "Ajouter" désactivé si input vide
- Labels associés aux contrôles via `id` et `aria-labelledby`
- Autocomplete désactivé pour éviter suggestions non pertinentes

### Responsive Design (Mobile-First)

Le widget s'adapte parfaitement aux petits écrans :

#### Breakpoints

- **768px** : Tablette (ajustements padding, tailles touch)
- **480px** : Mobile (layout colonnes, boutons full-width)

#### Tailles touch-friendly (Mobile)

Toutes les cibles tactiles respectent le minimum WCAG de 44x44px :

- **Checkbox** : 1.5rem (24px) → Facile à taper
- **Boutons principaux** : 2.75rem min-height (44px)
- **Badges tags/priorité** : 2.75rem min-height (44px)
- **Bouton suppression** : 2.75rem × 2.75rem (44px × 44px)
- **Filtres** : 2.75rem min-height (44px)

#### Adaptations layout

- **Formulaire** : Colonne unique sur mobile pour meilleure lisibilité
- **Filtres** : Wrap automatique des boutons
- **Tags/Priorités** : Wrap avec espacement adaptatif
- **Padding** : Réduit sur petits écrans pour maximiser l'espace

#### Typographie responsive

- **Font-size** : Augmentation légère sur mobile pour lisibilité
- **Line-height** : Espacement adapté au contexte tactile

### Qualité du code

#### Documentation

- **JSDoc** : Commentaires sur types, interfaces et fonctions clés
- **Commentaires inline** : Explications pour logique complexe (filtrage, tri)
- **Types TypeScript** : Interfaces strictes pour toutes les données

#### Architecture

- **Composants réutilisables** : Séparation claire des responsabilités
- **Custom hooks** : `useTodoStorage` pour logique de persistence
- **SCSS BEM** : Nomenclature cohérente et maintenable
- **Props typées** : Toutes les props avec interfaces TypeScript

#### Gestion d'erreurs

- **localStorage** : Try-catch avec console.error pour debugging
- **Migration données** : Ajout automatique des champs manquants (tags, priority)
- **Validation** : Input trimé, vérification avant sauvegarde

### Guide de test manuel

#### Tests de base

1. **Ajout de tâche** : Ajouter plusieurs tâches avec texte varié
2. **Complétion** : Cocher/décocher plusieurs tâches
3. **Suppression** : Supprimer une tâche active et une complétée
4. **Édition inline** : Double-clic, modification, Enter/Escape/Blur
5. **Tags** : Ajouter tâche avec tags, supprimer tags individuels
6. **Priorités** : Tester les 4 niveaux, vérifier le tri automatique
7. **Filtres** : Tester tous/actives/complétées et filtres par tags

#### Tests de persistence

1. Ajouter des tâches → Rafraîchir la page → Vérifier présence
2. DevTools → Application → Local Storage → Vérifier structure JSON
3. Supprimer localStorage → Rafraîchir → Vérifier état vide

#### Tests d'accessibilité

1. **Navigation clavier** : Tab à travers tous les éléments
2. **Focus visible** : Vérifier outline sur focus clavier
3. **Screen reader** : Tester avec NVDA/JAWS (labels descriptifs)
4. **Désactivation JS** : Widget doit afficher message gracieux

#### Tests responsive

1. **Desktop** : Vérifier layout horizontal, hover states
2. **Tablette (768px)** : Vérifier tailles touch, wrap
3. **Mobile (480px)** : Vérifier colonne unique, boutons full-width
4. **Touch** : Tester tous les taps sur appareil mobile réel

#### Tests de performance

1. **100+ tâches** : Ajouter beaucoup de tâches, vérifier fluidité
2. **Filtrage rapide** : Changer filtres rapidement
3. **Animations** : Vérifier 60fps sur interactions (DevTools Performance)

### Améliorations futures

#### Phase 2 : Fonctionnalités avancées

- **Recherche textuelle** : Barre de recherche avec highlight
- **Drag & drop** : Réorganisation manuelle des tâches
- **Sous-tâches** : Hiérarchie de tâches imbriquées
- **Dates d'échéance** : Date picker avec alertes
- **Récurrence** : Tâches répétitives (quotidien, hebdo, mensuel)

#### Phase 3 : Design et UX

- **Thèmes** : Mode sombre / clair avec switch
- **Couleurs custom** : Personnalisation des couleurs de tags
- **Icônes** : Remplacement des émojis par icons SVG
- **Animations avancées** : Framer Motion pour transitions complexes

#### Phase 4 : Analytics et statistiques

- **Graphiques** : Visualisation de la productivité
- **Streaks** : Compteur de jours consécutifs
- **Temps estimé** : Pomodoro timer intégré
- **Export** : CSV, JSON, iCal pour backup

#### Phase 5 : Intégration

- **Synchronisation cloud** : Firebase / Supabase
- **Collaboration** : Partage de listes avec d'autres utilisateurs
- **Notifications** : Push notifications pour rappels
- **API** : Intégration avec Todoist, Trello, etc.

### Technologies utilisées

- **React 18** : Functional components avec hooks
- **TypeScript** : Typage strict pour robustesse
- **SCSS** : Styles modulaires avec BEM
- **localStorage** : Persistence côté client
- **CSS Variables** : Thème adaptable
- **ARIA** : Accessibilité WCAG 2.1 AA

### Contribution

Pour ajouter des fonctionnalités :

1. Créer une nouvelle branche depuis `main`
2. Ajouter les types dans `types.ts` si nécessaire
3. Créer les composants dans le dossier TodoWidget
4. Ajouter les styles SCSS avec nomenclature BEM
5. Tester l'accessibilité et la responsivité
6. Documenter dans README.md

### License

Ce composant fait partie du projet Personal Dashboard.
