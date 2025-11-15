# Guide de Tests - Dashboard React+TypeScript

Ce guide définit la stratégie de tests légère pour ce projet. L'objectif est de tester intelligemment sans surcharge.

## 🎯 Philosophie de Test

### ✅ Ce qu'on teste

- **Logique complexe** : Utils, fonctions de calcul, transformations de données
- **Hooks personnalisés** : Comportements state/effects non-triviaux
- **Composants avec logique** : Ceux qui contiennent de la logique métier complexe

### ❌ Ce qu'on ne teste PAS

- **Composants UI simples** : Composants purement présentationnels
- **Styles CSS** : Testés manuellement
- **E2E systématiques** : Réservés aux workflows critiques uniquement
- **Coverage à 100%** : Pas d'objectif de couverture obligatoire

---

## 🛠️ Stack de Test

- **Vitest** - Test runner moderne et rapide
- **React Testing Library** - Tests composants React (quand nécessaire)
- **Happy DOM** - Environnement DOM léger et rapide

---

## 📁 Structure des Tests

```
src/
├── utils/
│   ├── date.ts
│   └── __tests__/
│       └── date.test.ts
├── hooks/
│   ├── useLocalStorage.ts
│   └── __tests__/
│       └── useLocalStorage.test.tsx
└── components/
    ├── Card/
    │   ├── Card.tsx
    │   └── __tests__/          # Seulement si logique complexe
    │       └── Card.test.tsx
```

**Règle :** Placer les tests dans un dossier `__tests__/` à côté du code source.

---

## ✍️ Comment écrire un bon test

### Structure d'un test

```typescript
import { describe, it, expect } from 'vitest'

describe('nomDeLaFonction', () => {
  it('should [comportement attendu]', () => {
    // Arrange - Préparer les données
    const input = 'test'

    // Act - Exécuter la fonction
    const result = maFonction(input)

    // Assert - Vérifier le résultat
    expect(result).toBe('expected')
  })
})
```

### Bonnes pratiques

1. **Noms descriptifs** : `it('should return formatted date for valid input')`
2. **Un concept par test** : Ne testez qu'une chose à la fois
3. **Tests indépendants** : Chaque test doit pouvoir tourner seul
4. **Pas de logique complexe** : Les tests doivent être simples à lire

### Exemple complet - Fonction Utils

```typescript
// src/utils/string.ts
export function truncate(str: string, maxLength: number): string {
  if (maxLength <= 0) throw new Error('maxLength must be positive')
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

// src/utils/__tests__/string.test.ts
import { describe, it, expect } from 'vitest'
import { truncate } from '../string'

describe('truncate', () => {
  it('should return original string when shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('should truncate long strings with ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })

  it('should throw error for negative maxLength', () => {
    expect(() => truncate('test', -1)).toThrow('maxLength must be positive')
  })

  it('should handle empty strings', () => {
    expect(truncate('', 5)).toBe('')
  })
})
```

### Exemple complet - Hook

```typescript
// src/hooks/__tests__/useCounter.test.tsx
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter(0))
    expect(result.current.count).toBe(0)
  })

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('should reset counter to initial value', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.reset()
    })

    expect(result.current.count).toBe(5)
  })
})
```

### Exemple complet - Composant (si nécessaire)

```typescript
// src/components/__tests__/SearchBox.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchBox } from '../SearchBox';

describe('SearchBox', () => {
  it('should call onSearch with debounced value', async () => {
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBox onSearch={mockOnSearch} delay={300} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test query');

    // Fonction debouncée - attendre le délai
    await vi.waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    }, { timeout: 500 });
  });
});
```

---

## 🧪 Cas de tests courants

### Testing des erreurs

```typescript
it('should throw error for invalid input', () => {
  expect(() => divide(10, 0)).toThrow('Cannot divide by zero')
})
```

### Testing async/await

```typescript
it('should fetch data successfully', async () => {
  const data = await fetchUser(1)
  expect(data).toEqual({ id: 1, name: 'John' })
})
```

### Testing avec timers

```typescript
import { vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('should debounce function calls', () => {
  const callback = vi.fn()
  const debounced = debounce(callback, 500)

  debounced()
  debounced()
  debounced()

  expect(callback).not.toHaveBeenCalled()

  vi.advanceTimersByTime(500)

  expect(callback).toHaveBeenCalledTimes(1)
})
```

### Testing localStorage

```typescript
beforeEach(() => {
  localStorage.clear()
})

it('should save to localStorage', () => {
  saveUserPreference('theme', 'dark')
  expect(localStorage.getItem('theme')).toBe('dark')
})
```

### Mocking modules

```typescript
import { vi } from 'vitest'

// Mock d'un module entier
vi.mock('@/api/client', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mocked' })),
}))

// Mock d'une fonction spécifique
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})
```

---

## 🚀 Scripts NPM

```bash
# Lancer tous les tests
npm test

# Mode watch (relance auto sur changement)
npm run test:watch

# Coverage (informatif, non-obligatoire)
npm run test:coverage

# Type checking
npm run type-check

# Tout vérifier avant commit
npm run check
```

---

## 🎨 Tests Manuels

Pour les composants UI et les widgets, utilisez la checklist manuelle :

- Voir `.github/MANUAL_TEST_CHECKLIST.md`

**Quand utiliser la checklist ?**

- Nouveau widget ajouté
- Changement CSS/Style significatif
- Avant chaque release

---

## 📊 Coverage

Le coverage est **informatif uniquement**, pas obligatoire.

```bash
npm run test:coverage
```

Cela génère un rapport dans `coverage/index.html` que vous pouvez consulter.

**Règle :** Ne visez PAS 100% de coverage. Visez des tests **utiles** et **maintenables**.

---

## 🔄 CI/CD

Les tests tournent automatiquement sur chaque PR via GitHub Actions.

Si les tests échouent :

1. Vérifier l'erreur dans les logs CI
2. Reproduire localement avec `npm test`
3. Corriger le test ou le code
4. Commit et push

---

## ❓ FAQ

### Quand dois-je écrire un test ?

- ✅ Fonction avec logique complexe (calculs, transformations)
- ✅ Hook personnalisé avec state/effects
- ✅ Fonction qui gère des edge cases (erreurs, valeurs nulles)
- ❌ Composant simple qui affiche juste des props
- ❌ Style CSS

### Comment tester un composant qui utilise i18n ?

Utilisez le `test-utils.tsx` qui wrap déjà avec `I18nextProvider` :

```typescript
import { render, screen } from '@/tests/test-utils';

it('should display translated text', () => {
  render(<MyComponent />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
```

### Comment tester les API calls ?

Mockez la fonction d'API :

```typescript
import { vi } from 'vitest'
import * as api from '@/api/client'

vi.spyOn(api, 'fetchUsers').mockResolvedValue([{ id: 1, name: 'John' }])
```

### Mon test est flaky, que faire ?

Les tests flaky (qui passent/échouent aléatoirement) sont souvent dus à :

- Timers non-mockés → utilisez `vi.useFakeTimers()`
- Async non-attendu → utilisez `await waitFor()`
- État partagé entre tests → nettoyez dans `beforeEach()`

---

## 📚 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🎯 Checklist avant commit

- [ ] Tests existants passent : `npm test`
- [ ] Type check OK : `npm run type-check`
- [ ] Lint OK : `npm run lint`
- [ ] Nouveau code avec logique complexe = nouveau test
- [ ] Tests manuels faits pour nouveau widget

---

**Remember:** Tests de qualité > Coverage élevé. Écrivez des tests qui ajoutent de la valeur !
