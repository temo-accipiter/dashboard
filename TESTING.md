# Guide de test du Dashboard

Ce document décrit la stratégie de test complète mise en place pour le projet Dashboard.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Tests unitaires](#tests-unitaires)
- [Tests d'intégration](#tests-dintégration)
- [Tests E2E](#tests-e2e)
- [Tests d'accessibilité](#tests-daccessibilité)
- [Coverage](#coverage)
- [Scripts disponibles](#scripts-disponibles)
- [CI/CD](#cicd)

## 🎯 Vue d'ensemble

Le projet utilise une approche de test pyramidale :

```
           /\
          /  \    E2E Tests (Playwright)
         /____\
        /      \  Integration Tests (Vitest + React Testing Library)
       /________\
      /          \ Unit Tests (Vitest + React Testing Library)
     /____________\
```

### Technologies utilisées

- **Vitest** - Framework de test rapide et moderne
- **React Testing Library** - Test de composants React
- **Playwright** - Tests E2E multi-navigateurs
- **axe-core** - Tests d'accessibilité automatisés
- **@vitest/coverage-v8** - Couverture de code

## 🧪 Tests unitaires

Les tests unitaires couvrent les composants et fonctions individuels.

### Structure

```
src/
├── components/
│   └── [component]/
│       ├── Component.tsx
│       └── __tests__/
│           └── Component.test.tsx
├── pages/
│   └── [page]/
│       ├── Page.tsx
│       └── __tests__/
│           └── Page.test.tsx
└── tests/
    ├── setup.ts
    └── test-utils.tsx
```

### Composants testés

#### Composants critiques
- **ThemeToggle** - Bascule thème clair/sombre avec localStorage
- **LangSelector** - Sélection de langue (FR/EN) avec i18n
- **TodoList** - Gestion de tâches avec état
- **Card** - Navigation et interactions clavier

#### Pages
- **Home** - Page d'accueil avec sections Organisation et Réglages
- **Taches** - Gestion des tâches (TodoList + KanbanBoard)
- **About** - Page à propos

### Exécution

```bash
# Mode watch (développement)
yarn test

# Exécution unique
yarn test:run

# Avec interface UI
yarn test:ui

# Mode watch
yarn test:watch
```

### Exemple de test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle', () => {
  it('should toggle theme from light to dark', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
```

## 🔗 Tests d'intégration

Les tests d'intégration vérifient les interactions entre composants.

### Tests implémentés

- **Theme & Language** - Persistance combinée thème + langue
- **Navigation Workflow** - Navigation entre pages et cartes

### Structure

```
src/tests/integration/
├── theme-language.test.tsx
└── navigation-workflow.test.tsx
```

### Exécution

Les tests d'intégration utilisent le même runner que les tests unitaires :

```bash
yarn test
```

## 🌐 Tests E2E

Tests de bout en bout avec Playwright simulant un utilisateur réel.

### Pages testées

- **Home** - Navigation, affichage des sections
- **Tasks** - Gestion des tâches, interactions
- **Theme Toggle** - Changement de thème, persistance
- **Language Selector** - Changement de langue

### Structure

```
e2e/
├── home.spec.ts
├── tasks.spec.ts
├── theme-toggle.spec.ts
├── language-selector.spec.ts
└── accessibility.spec.ts
```

### Exécution

```bash
# Tests headless
yarn test:e2e

# Avec interface UI
yarn test:e2e:ui

# Mode headed (visible)
yarn test:e2e:headed

# Mode debug
yarn test:e2e:debug
```

### Exemple de test E2E

```typescript
test('should toggle to dark theme', async ({ page }) => {
  await page.goto('/');

  const themeButton = page.getByRole('button', {
    name: /activer le thème sombre/i,
  });
  await themeButton.click();

  const theme = await page
    .locator('html')
    .getAttribute('data-theme');
  expect(theme).toBe('dark');
});
```

## ♿ Tests d'accessibilité

Tests automatisés d'accessibilité avec axe-core intégrés dans les tests E2E.

### Vérifications

- **WCAG 2.1 AA** - Conformité aux standards d'accessibilité
- **Contraste des couleurs** - Ratio de contraste suffisant
- **Labels ARIA** - Attributs d'accessibilité corrects
- **Navigation clavier** - Support complet du clavier
- **Structure de heading** - Hiérarchie correcte (h1, h2, etc.)
- **Landmarks** - Navigation sémantique (main, nav, etc.)

### Pages testées

- Home (`/`)
- Tâches (`/taches`)
- Rendez-vous (`/rdv`)
- Liens (`/liens`)
- À propos (`/about`)

### Exemple

```typescript
test('should pass accessibility checks', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## 📊 Coverage

Le coverage est généré avec @vitest/coverage-v8.

### Objectifs de couverture

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

### Génération

```bash
# Générer le rapport de couverture
yarn test:coverage
```

Le rapport est disponible dans `coverage/index.html`.

### Fichiers exclus

- `node_modules/`
- `src/tests/`
- `**/*.d.ts`
- `**/*.config.*`
- `dist/`
- `.yarn/`

## 🚀 Scripts disponibles

### Tests unitaires et d'intégration

```bash
yarn test              # Mode watch
yarn test:ui           # Interface UI interactive
yarn test:run          # Exécution unique
yarn test:coverage     # Avec rapport de couverture
yarn test:watch        # Mode watch explicite
```

### Tests E2E

```bash
yarn test:e2e          # Tests headless
yarn test:e2e:ui       # Interface UI Playwright
yarn test:e2e:headed   # Mode visible
yarn test:e2e:debug    # Mode debug
```

### Tous les tests

```bash
yarn test:all          # Unit + Integration + E2E
yarn test:ci           # CI/CD (avec coverage)
```

## 🔄 CI/CD

Pipeline GitHub Actions configuré dans `.github/workflows/ci.yml`.

### Jobs

1. **Lint & Type Check**
   - TypeScript type checking
   - ESLint
   - Prettier

2. **Unit Tests**
   - Tests unitaires et d'intégration
   - Génération du coverage
   - Upload vers Codecov

3. **E2E Tests**
   - Tests Playwright
   - Tests d'accessibilité
   - Upload des rapports

4. **Build**
   - Build de production
   - Vérification de la compilation

5. **Test Summary**
   - Résumé des résultats

### Déclenchement

- Push sur `main`, `develop`, ou branches `claude/**`
- Pull requests vers `main` ou `develop`

### Artifacts

- Coverage report (30 jours)
- Playwright report (30 jours)
- Test results (30 jours)
- Build artifacts (30 jours)

## 📝 Bonnes pratiques

### Écriture de tests

1. **AAA Pattern** - Arrange, Act, Assert
2. **Test unitaire** - Un concept par test
3. **Noms descriptifs** - `should [comportement attendu] when [condition]`
4. **Isolation** - Nettoyer après chaque test
5. **Mock minimal** - Mocker uniquement ce qui est nécessaire

### Organisation

- Grouper les tests avec `describe()`
- Utiliser `beforeEach()` pour la configuration
- Nettoyer avec `afterEach()` si nécessaire
- Utiliser les utilitaires dans `src/tests/test-utils.tsx`

### Performance

- Limiter le nombre de `render()` par test
- Utiliser `userEvent` au lieu de `fireEvent`
- Éviter les tests trop longs en E2E

## 🐛 Debugging

### Tests unitaires

```bash
# Mode UI pour debug interactif
yarn test:ui

# Debug d'un test spécifique
yarn test path/to/test.test.tsx
```

### Tests E2E

```bash
# Mode debug Playwright
yarn test:e2e:debug

# Mode headed pour voir le navigateur
yarn test:e2e:headed

# Trace viewer après échec
npx playwright show-trace trace.zip
```

## 📚 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎯 Prochaines étapes

- [ ] Augmenter le coverage à 90%+
- [ ] Ajouter tests de performance
- [ ] Tests de régression visuelle (Playwright + snapshots)
- [ ] Tests de charge (k6 ou Artillery)
- [ ] Tests de sécurité (OWASP ZAP)
