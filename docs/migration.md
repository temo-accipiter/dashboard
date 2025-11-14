# Migration React → Next.js

## 🎯 Objectif

Migrer l'application dashboard de React (Vite) vers Next.js en 10 phases progressives, sans interruption de service et en préservant toutes les fonctionnalités existantes.

## 📋 État initial (Baseline)

### Configuration technique actuelle

- **Build tool**: Vite 6.4.1
- **Framework**: React 19.2.0
- **Routing**: React Router DOM 7.9.6
- **Package manager**: pnpm 10.22.0
- **TypeScript**: 5.9.3
- **Testing**: Vitest 4.0.9 + Playwright 1.56.1
- **Styling**: SASS 1.94.0

### État du build et des tests (Baseline)

**Build** ✅
```
vite v6.4.1 building for production...
✓ 1740 modules transformed.
dist/index.html                   0.79 kB │ gzip:   0.45 kB
dist/assets/tools-D-jBDW9a.svg    4.78 kB │ gzip:   1.18 kB
dist/assets/index-dpQrP1wv.css   36.61 kB │ gzip:   6.92 kB
dist/assets/index-CS1wgK7d.js   457.07 kB │ gzip: 145.09 kB
✓ built in 8.90s
```

**Tests** ✅
```
Test Files: 13 passed (13)
Tests: 135 passed (135)
Duration: 10.42s
```

### Dépendances principales

**Runtime:**
- @dnd-kit/core 6.3.1
- @dnd-kit/sortable 10.0.0
- i18next 25.6.2
- react-i18next 15.7.4
- lucide-react 0.501.0

**Dev:**
- @testing-library/react 16.3.0
- @playwright/test 1.56.1
- eslint 9.39.1
- prettier 3.6.2

### Corrections appliquées

1. **src/tests/test-utils.tsx**: Correction de l'import `react-router` → `react-router-dom`
   - Raison: Import incorrect causant une erreur TypeScript lors du build

## 🗺️ Plan de migration (Phases 0→10)

### Phase 0: Analyse et préparation
- ✅ Audit complet de l'architecture actuelle
- ✅ Validation baseline (build + tests)
- ✅ Documentation de l'état initial

### Phase 1: Installation Next.js (en cours)
- [ ] Installation des dépendances Next.js
- [ ] Configuration next.config.js
- [ ] Migration structure de dossiers (app/ ou pages/)
- [ ] Choix: App Router vs Pages Router

### Phase 2: Migration du routing
- [ ] Conversion React Router → Next.js routing
- [ ] Migration des routes dynamiques
- [ ] Gestion des redirections
- [ ] Tests de navigation

### Phase 3: Migration des pages
- [ ] Conversion des composants pages
- [ ] Adaptation des layouts
- [ ] Gestion du client/server components
- [ ] Tests unitaires des pages

### Phase 4: Gestion des assets et styles
- [ ] Migration des imports CSS/SASS
- [ ] Configuration CSS Modules ou CSS-in-JS
- [ ] Optimisation des images (next/image)
- [ ] Fonts et assets statiques

### Phase 5: Internationalisation (i18n)
- [ ] Migration react-i18next → next-i18next ou app directory i18n
- [ ] Configuration des locales
- [ ] Tests de traduction

### Phase 6: Optimisations et performances
- [ ] Server Components où applicable
- [ ] Code splitting et lazy loading
- [ ] Optimisation des bundles
- [ ] Performance audit

### Phase 7: Testing et qualité
- [ ] Migration des tests Vitest → Next.js compatible
- [ ] Tests E2E Playwright
- [ ] Coverage analysis
- [ ] Accessibility tests

### Phase 8: Build et déploiement
- [ ] Configuration de production
- [ ] Scripts de déploiement
- [ ] CI/CD adaptation
- [ ] Preview deployments

### Phase 9: Validation finale
- [ ] Tests de régression complets
- [ ] Performance comparison (avant/après)
- [ ] Documentation utilisateur
- [ ] Checklist de validation

### Phase 10: Finalisation
- [ ] Cleanup code legacy
- [ ] Documentation technique finale
- [ ] Formation équipe
- [ ] Go-live

## 📝 Décisions techniques

### Architecture choisie
- **À décider**: App Router (recommandé pour nouveau projet) vs Pages Router (plus proche de React Router)

### Stratégie de migration
- Migration progressive par phases
- Pas de merge dans main pendant la migration
- Branch finale `integration/migrate-next` pour review complète
- Chaque phase: 1 branche → 1 PR (sans merge)

## 🚨 Points d'attention

### Bloqueurs potentiels identifiés
1. **DnD Kit**: Vérifier compatibilité avec Server Components
2. **React Router DOM 7.x**: Migration du routing complexe
3. **i18next**: Adaptation à Next.js i18n patterns
4. **Tests**: Migration Vitest → Jest ou maintien Vitest

### Dette technique
- Aucun `any` TypeScript ajouté (objectif: 0 any)
- Tous les nouveaux `any` doivent référencer une issue GitHub

## 📚 Ressources

- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/from-vite)
- [App Router Documentation](https://nextjs.org/docs/app)
- [React Router to Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/from-react-router)

## 📊 Métriques

### Baseline (avant migration)
- Build time: 8.90s
- Bundle size: 457.07 kB (gzip: 145.09 kB)
- Tests: 135 tests, 10.42s
- TypeScript errors: 0

### Objectifs post-migration
- Build time: < 10s
- Bundle size: -20% (objectif)
- Tests: 100% passés
- TypeScript errors: 0
- Lighthouse score: > 90

---

**Dernière mise à jour**: Phase 1 - Baseline
**Responsable**: Claude Code
**Status**: ✅ Baseline validée, prêt pour Phase 1
