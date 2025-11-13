# Checklist de Tests Manuels - Widgets Dashboard

Ce document fournit un template pour tester manuellement les widgets et composants UI du Dashboard.

## Pourquoi des tests manuels ?

Les composants UI simples ne nécessitent pas de tests automatisés systématiques. Les tests manuels permettent de :
- Vérifier l'apparence visuelle et l'UX
- Tester les interactions utilisateur complexes
- Valider le comportement responsive
- S'assurer de l'accessibilité

---

## Template de Test Widget

Copiez cette section pour chaque nouveau widget à tester.

### Widget : [NOM_DU_WIDGET]

**Date du test :** ___________
**Testeur :** ___________
**Version :** ___________

#### 1. Rendu Visuel

- [ ] Le widget s'affiche correctement
- [ ] Les couleurs et styles respectent le design system
- [ ] Les icônes et images se chargent correctement
- [ ] Les textes sont lisibles et bien positionnés
- [ ] Pas de débordement de contenu (overflow)

#### 2. Responsive

- [ ] **Mobile (< 768px)** : Affichage correct
- [ ] **Tablet (768px - 1024px)** : Affichage correct
- [ ] **Desktop (> 1024px)** : Affichage correct
- [ ] Transitions fluides entre les breakpoints

#### 3. Interactions

- [ ] Click/Tap fonctionne correctement
- [ ] Hover states fonctionnent (desktop)
- [ ] Focus states visibles au clavier
- [ ] Navigation au clavier possible (Tab, Enter, Space)
- [ ] Animations/transitions fluides

#### 4. États du Widget

- [ ] État initial/vide correct
- [ ] État avec données correct
- [ ] État de chargement (loading) correct
- [ ] État d'erreur correct
- [ ] État désactivé correct (si applicable)

#### 5. Accessibilité

- [ ] Contraste des couleurs suffisant (WCAG AA minimum)
- [ ] Labels et attributs ARIA présents
- [ ] Navigation clavier complète
- [ ] Ordre de tabulation logique
- [ ] Lecteur d'écran compatible (test rapide)

#### 6. Intégration

- [ ] Fonctionne bien avec les autres widgets
- [ ] Pas de conflit CSS avec autres composants
- [ ] Performance acceptable (pas de lag)

#### 7. Thèmes

- [ ] **Mode clair** : Affichage correct
- [ ] **Mode sombre** : Affichage correct
- [ ] Transition entre thèmes fluide

#### 8. Localisation (i18n)

- [ ] Textes en français corrects
- [ ] Textes en anglais corrects
- [ ] Changement de langue fonctionne

#### Notes et Problèmes

```
[Décrivez ici tout problème découvert ou amélioration suggérée]
```

---

## Exemples de Tests par Type de Widget

### Card Widget

- [ ] Titre affiché correctement
- [ ] Icône présente (si applicable)
- [ ] Contenu du body correct
- [ ] Effet hover sur card clickable
- [ ] Navigation vers la bonne page (si clickable)

### Liste/Todo Widget

- [ ] Ajout d'item fonctionne
- [ ] Suppression d'item fonctionne
- [ ] Édition d'item fonctionne
- [ ] Marquage complet/incomplet fonctionne
- [ ] Scroll fonctionne si liste longue
- [ ] Validation des entrées utilisateur

### Chart/Graph Widget

- [ ] Données affichées correctement
- [ ] Légende visible et claire
- [ ] Tooltips fonctionnent au hover
- [ ] Responsive (adapte sa taille)
- [ ] Pas d'erreur si données vides

### Form Widget

- [ ] Tous les champs sont accessibles
- [ ] Validation fonctionne
- [ ] Messages d'erreur clairs
- [ ] Soumission fonctionne
- [ ] Reset fonctionne
- [ ] Gestion des états (pristine, dirty, valid, invalid)

---

## Checklist de Test Rapide (Quick Check)

Pour un test rapide avant commit :

- [ ] Affichage correct en desktop
- [ ] Affichage correct en mobile
- [ ] Pas d'erreur console
- [ ] Interactions principales fonctionnent
- [ ] Mode clair/sombre OK

---

## Rapport de Bugs

Si vous trouvez un bug durant les tests manuels :

1. **Créer une issue GitHub** avec le template suivant :

```markdown
## Bug trouvé lors des tests manuels

**Widget/Composant :** [Nom]
**Navigateur :** [Chrome/Firefox/Safari + version]
**Device :** [Desktop/Mobile/Tablet]

### Description
[Description claire du problème]

### Étapes pour reproduire
1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

### Comportement attendu
[Ce qui devrait se passer]

### Comportement actuel
[Ce qui se passe réellement]

### Screenshots
[Si applicable]
```

---

## Bonnes Pratiques

### Avant de tester

- Utiliser un navigateur à jour
- Vider le cache navigateur
- Tester sur plusieurs navigateurs si possible (Chrome, Firefox, Safari)
- Tester sur plusieurs devices si possible

### Pendant le test

- Suivre la checklist méthodiquement
- Noter immédiatement les problèmes découverts
- Prendre des screenshots des bugs visuels
- Tester des cas limites (data vide, très longue, caractères spéciaux)

### Après le test

- Documenter les résultats
- Créer des issues pour les bugs
- Suggérer des améliorations
- Mettre à jour cette checklist si nécessaire

---

## Automatisation Future

Si un test manuel devient répétitif et critique, considérer l'automatisation via :
- Tests E2E (Playwright) - pour les workflows complets
- Tests visuels de régression - pour les problèmes de layout

**Règle :** Si vous testez manuellement la même chose > 3 fois, automatisez-le !
