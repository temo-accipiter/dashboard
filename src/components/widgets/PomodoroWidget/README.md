# 🍅 Pomodoro Timer Widget

Timer Pomodoro complet avec statistiques, sons et notifications pour votre Dashboard personnel.

## ✨ Fonctionnalités

### Timer

- **3 modes de timer**: Focus (25min), Pause courte (5min), Pause longue (15min)
- **Cycle automatique**: 4 sessions focus → 1 pause longue
- **Progress ring visuel**: Cercle SVG animé qui se vide avec le temps
- **Auto-start configurable**: Démarrer automatiquement les sessions suivantes
- **Contrôles intuitifs**: Start/Pause, Skip, Reset avec confirmations
- **Indicateurs visuels**: Pulse animation pendant le timer, shake dans la dernière minute

### Statistiques

- **Sessions du jour**: Nombre de sessions focus complétées aujourd'hui
- **Temps total focus**: Cumul du temps passé en sessions focus
- **Streak**: Nombre de sessions consécutives sans interruption
- **Historique détaillé**: Les 20 dernières sessions avec statut (terminé/interrompu)
- **Vue hebdomadaire**: Statistiques des 7 derniers jours
- **Persistance**: Toutes les données sauvegardées dans localStorage

### Personnalisation

- **Durées configurables**: Ajustez chaque mode de timer (1-60 minutes)
- **3 sons au choix**: Bell, Chime, Digital ou Silent
- **Volume ajustable**: Contrôle précis du volume (0-100%)
- **Preview des sons**: Testez avant de choisir
- **Notifications navigateur**: Alertes à la fin des sessions et à mi-parcours
- **Mode auto-start**: Configurez le comportement automatique

### Données

- **Sauvegarde automatique**: Toutes les sessions dans localStorage
- **Export JSON**: Téléchargez vos données pour backup
- **Import JSON**: Restaurez vos statistiques
- **Réinitialisation complète**: Effacez tout et recommencez à zéro

## 🎮 Utilisation

### Interface principale

Le widget affiche :

1. **Header**: Titre avec boutons Statistiques et Paramètres
2. **Timer circulaire**: Affichage du temps restant avec progress ring
3. **Mode actuel**: Indication du mode en cours (Focus/Pause courte/Pause longue)
4. **Progression du cycle**: "Session 2/4 avant pause longue"
5. **Contrôles**: Boutons Start/Pause, Skip, Reset
6. **Statistiques du jour**: 4 cartes avec les stats principales

### Raccourcis clavier

- `Espace`: Start/Pause le timer
- `R`: Reset le timer (avec confirmation si > 50% complété)
- `S`: Skip au mode suivant
- `Escape`: Fermer les panneaux ouverts (Stats/Settings)
- `1`: Passer en mode Focus (quand idle)
- `2`: Passer en mode Pause courte (quand idle)
- `3`: Passer en mode Pause longue (quand idle)

### Workflow recommandé

1. **Démarrer une session focus** de 25 minutes
2. **Travailler sans interruption** sur une tâche
3. **Prendre la pause suggérée** de 5 minutes
4. **Répéter 4 fois** le cycle focus/pause
5. **Prendre une pause longue** de 15 minutes
6. **Recommencer** un nouveau cycle

## 📂 Structure des fichiers

```
PomodoroWidget/
├── PomodoroWidget.tsx          # Composant principal avec layout
├── Timer.tsx                   # Affichage du timer avec SVG progress ring
├── Controls.tsx                # Boutons Start/Pause/Reset/Skip
├── StatsPanel.tsx              # Panel des statistiques avec 3 onglets
├── SessionHistory.tsx          # Liste des sessions complétées
├── SettingsPanel.tsx           # Configuration complète
├── StatCard.tsx                # Carte de statistique réutilisable
├── NotificationBanner.tsx      # Banner permission notifications
├── usePomodoroTimer.ts         # Hook logique du timer
├── usePomodoroStorage.ts       # Hook persistence localStorage
├── usePomodoroSound.ts         # Hook gestion des sons
├── useNotification.ts          # Hook notifications navigateur
├── types.ts                    # Interfaces TypeScript
├── constants.ts                # Constantes et valeurs par défaut
├── utils.ts                    # Fonctions utilitaires
├── PomodoroWidget.scss         # Styles avec variables CSS
└── README.md                   # Cette documentation
```

## 🎨 Personnalisation des couleurs

Les couleurs sont définies par mode dans `constants.ts` :

- **Focus**: Rouge/Orange (#ef4444) - Énergique et concentré
- **Pause courte**: Vert (#10b981) - Reposant et relaxant
- **Pause longue**: Bleu (#3b82f6) - Calme et zen

Variables CSS dans `PomodoroWidget.scss` :

```css
--pomodoro-focus: #ef4444 --pomodoro-short-break: #10b981
  --pomodoro-long-break: #3b82f6;
```

## 🔊 Système de sons

### Sons disponibles

- **Bell**: Cloche simple et claire
- **Chime**: Carillon doux
- **Digital**: Beep électronique
- **Silent**: Pas de son

### URLs CDN (Mixkit)

Les sons sont chargés depuis des CDN gratuits (voir `constants.ts`).
Chargement automatique au montage du composant avec fallback gracieux.

## 🔔 Notifications navigateur

### Gestion des permissions

1. **Banner au premier lancement**: "Activer les notifications ?"
2. **Demande de permission**: Via Notification API
3. **Mémorisation**: La réponse est sauvegardée dans localStorage
4. **États**: Accordée / Refusée / Non demandée / Non supportée

### Messages de notification

- **Fin Focus**: "🍅 Session Focus terminée ! Temps de faire une pause de 5 minutes"
- **Fin Pause**: "☕ Pause terminée ! Prêt pour une nouvelle session focus ?"
- **Mi-parcours**: "⏱️ Mi-session - Plus que 12:30 minutes !" (si activé)

## 📊 Calcul des statistiques

### Temps focus

- Somme des sessions `mode === 'focus'` ET `interrupted === false`
- Filtré par période (aujourd'hui, cette semaine, total)

### Streak (série)

- Compte les sessions focus **consécutives** non interrompues
- Commence du plus récent et remonte
- Se reset dès qu'une session est `interrupted === true`
- Le meilleur streak est le maximum historique

### Sessions aujourd'hui

- Filtre par date du jour (jour/mois/année)
- Compte toutes les sessions `mode === 'focus'`

## 💾 Persistence

### Clés localStorage

```typescript
'personal-dashboard-pomodoro-sessions' // PomodoroSession[]
'personal-dashboard-pomodoro-stats' // PomodoroStats
'personal-dashboard-pomodoro-settings' // PomodoroSettings
'personal-dashboard-pomodoro-notification-asked' // boolean
```

### Limite de sessions

Maximum **100 sessions** gardées en historique.
Les plus anciennes sont automatiquement supprimées.

### Export/Import

- **Export**: Génère un JSON avec settings + sessions + date d'export
- **Import**: Parse et valide le JSON, puis restaure les données
- **Format**: JSON standard, lisible et éditable manuellement

## ♿ Accessibilité

### Support clavier

- Navigation complète au clavier
- Focus visible sur tous les éléments interactifs
- Tooltips sur hover pour guider

### Screen readers

- `aria-labels` sur tous les boutons
- `role="timer"` sur le composant Timer
- `aria-live="polite"` pour annoncer les changements de temps
- Labels descriptifs pour tous les contrôles

### Contraste

- Minimum WCAG AA sur tous les textes
- États visuels clairs (hover, focus, disabled)
- Pas de transmission d'information uniquement par couleur

### Reduced motion

- Respect de `prefers-reduced-motion`
- Désactivation des animations pour les utilisateurs sensibles
- Fonctionnalité préservée sans animations

## 📱 Responsive Design

### Breakpoints

**Mobile (<640px)**

- Layout vertical
- Timer plus petit (2.5rem au lieu de 3.5rem)
- Stats en grille 2x2 au lieu de 4 colonnes
- Boutons pleine largeur, empilés verticalement

**Tablet (640-1024px)**

- Layout adaptatif
- Timer taille moyenne
- Stats en 4 colonnes

**Desktop (>1024px)**

- Layout optimal
- Tous les éléments visibles
- Timer pleine taille

### Touch-friendly

- Boutons minimum 44x44px pour le touch
- Zones de clic généreuses
- Pas de hover obligatoire pour l'interaction

## ✅ Checklist de test manuel

### Timer de base

- [ ] Timer démarre et affiche le décompte correct
- [ ] Pause fonctionne et garde le temps restant
- [ ] Reprendre continue depuis le temps pausé
- [ ] Reset ramène au temps initial du mode
- [ ] Skip passe au mode suivant du cycle
- [ ] Timer atteint 0:00 et déclenche les actions

### Cycle automatique

- [ ] Séquence Focus → Short Break → Focus fonctionne
- [ ] Après 4 Focus, passage en Long Break
- [ ] Compteur de sessions s'incrémente correctement
- [ ] Cycle recommence après Long Break
- [ ] Indicateur "Session X/4" est correct

### Sons

- [ ] Son joue à la fin du timer Focus
- [ ] Son joue à la fin des Breaks
- [ ] Sons différents selon config (Focus vs Break)
- [ ] Volume configurable fonctionne
- [ ] Preview des sons dans settings marche
- [ ] Désactivation des sons respectée
- [ ] Pas d'erreur si son ne charge pas

### Notifications

- [ ] Banner affiché au premier lancement
- [ ] Demande de permission fonctionne
- [ ] Notification envoyée à la fin du timer
- [ ] Notification mi-parcours si activée
- [ ] Désactivation respectée dans settings
- [ ] Messages corrects selon le mode (Focus/Break)
- [ ] Fermeture auto après 5 secondes

### Statistiques

- [ ] Sessions enregistrées dans historique
- [ ] Stats du jour mises à jour en temps réel
- [ ] Stats semaine affichent données correctes
- [ ] Streak calculé correctement
- [ ] Sessions interrompues marquées (Skip)
- [ ] Groupement par jour dans historique
- [ ] Format "il y a Xmin" fonctionne
- [ ] Empty state affiché si aucune session

### Persistence

- [ ] Settings persistent après refresh page
- [ ] Historique persist après refresh
- [ ] Stats persistent après refresh
- [ ] Export télécharge fichier JSON valide
- [ ] Import restaure les données correctement
- [ ] Erreur affichée si JSON invalide
- [ ] Reset supprime tout

### Settings

- [ ] Modification durées (1-60 min) fonctionne
- [ ] Validation empêche valeurs hors limites
- [ ] Sélection sons fonctionne
- [ ] Volume slider modifie le volume
- [ ] Toggle notifications fonctionne
- [ ] Auto-start Break/Focus fonctionne
- [ ] Restaurer défauts réinitialise config
- [ ] Settings se ferment sur Escape

### Raccourcis clavier

- [ ] Espace: Start/Pause fonctionne
- [ ] R: Reset fonctionne (avec confirm si > 50%)
- [ ] S: Skip fonctionne
- [ ] 1/2/3: Change mode quand idle
- [ ] Escape: Ferme les panels
- [ ] Pas d'interférence si input focus

### Responsive

- [ ] Fonctionne sur mobile (<640px)
- [ ] Fonctionne sur tablette (640-1024px)
- [ ] Fonctionne sur desktop (>1024px)
- [ ] Boutons touch-friendly (min 44px)
- [ ] Textes lisibles sur petit écran
- [ ] Pas de scroll horizontal

### Accessibilité

- [ ] Navigation clavier complète
- [ ] Focus visible sur tous éléments
- [ ] Labels aria présents
- [ ] Screen reader compatible
- [ ] Contraste suffisant (WCAG AA)
- [ ] Pas d'animation si prefers-reduced-motion

### Performance

- [ ] Pas de lag pendant le timer
- [ ] Décompte précis (pas de drift)
- [ ] Pas de re-render inutiles
- [ ] localStorage ne dépasse pas quota
- [ ] Sons préchargés sans bloquer UI

### Edge cases

- [ ] Timer continue si changement onglet
- [ ] Import JSON avec données manquantes
- [ ] localStorage plein géré
- [ ] Navigateur sans Notification API
- [ ] Navigateur sans localStorage
- [ ] Reset pendant timer en cours

## 🚀 Prochaines améliorations possibles

- [ ] **Intégration TodoWidget**: Lier une tâche à une session Pomodoro
- [ ] **Thèmes personnalisés**: Couleurs configurables par l'utilisateur
- [ ] **Objectifs**: Définir des objectifs quotidiens/hebdomadaires
- [ ] **Badges et achievements**: Gamification (100 sessions, 10h focus, etc.)
- [ ] **Mode focus absolu**: Bloquer certains sites pendant Focus
- [ ] **Sync cloud**: Sauvegarder sur un serveur pour multi-appareils
- [ ] **Rapports mensuels**: Graphiques et insights sur les tendances
- [ ] **Intégration calendrier**: Planifier des sessions à l'avance
- [ ] **Mode équipe**: Collaborer avec d'autres utilisateurs
- [ ] **Graphiques avancés**: Charts avec Recharts ou Chart.js
- [ ] **Tags de sessions**: Catégoriser les sessions (travail, études, etc.)
- [ ] **Notes de session**: Ajouter des notes à chaque session

## 🐛 Bugs connus

Aucun bug connu actuellement. Si vous en trouvez un :

1. Vérifiez la console pour les erreurs
2. Essayez de reproduire le bug
3. Documentez les étapes pour le reproduire
4. Créez une issue avec les détails

## 📝 Notes de développement

### Hooks personnalisés

- **usePomodoroTimer**: Logique centrale du timer, interval management
- **usePomodoroStorage**: Abstraction localStorage avec calculs automatiques
- **usePomodoroSound**: Préchargement et gestion Web Audio API
- **useNotification**: Wrapper Notification API avec gestion permissions

### Performance

- `useCallback` sur toutes les fonctions passées en props
- `useMemo` sur les calculs de stats lourds
- Timer utilise `setInterval` pour précision
- Nettoyage des intervals dans `useEffect` cleanup

### TypeScript

- Types stricts, pas de `any`
- Interfaces complètes dans `types.ts`
- Props typées pour tous les composants
- Enums pour les modes et états

## 📄 Licence

Ce widget fait partie du Dashboard personnel.
Code libre d'utilisation et de modification.

## 🙏 Crédits

- **Sons**: Mixkit (https://mixkit.co/) - Licence gratuite
- **Icons**: Lucide React (https://lucide.dev/)
- **Technique Pomodoro**: Francesco Cirillo

---

**Bon courage pour vos sessions de travail productif ! 🍅**
