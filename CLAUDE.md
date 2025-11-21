# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Development Commands

### Core Commands

- **`pnpm dev`** - Start Next.js development server (port 3000)
- **`pnpm build`** - Build Next.js application for production
- **`pnpm start`** - Start production server
- **`pnpm check`** - **CRITICAL**: Run typecheck + lint:fix + format (use before commits)
- **`pnpm typecheck`** - Run TypeScript compiler without emitting files
- **`pnpm lint:fix`** - Run ESLint and auto-fix issues
- **`pnpm format`** - Format code with Prettier

### Testing Commands

- **`pnpm test`** - Run Vitest in watch mode
- **`pnpm test:run`** - Run all tests once
- **`pnpm test:coverage`** - Generate test coverage report
- **`pnpm test:ui`** - Launch Vitest UI

### Workflow Commands

- **BEFORE committing**: **ALWAYS** run `pnpm check` to ensure code quality
- **AFTER modifying TypeScript**: Run `pnpm typecheck` to verify types
- **AFTER modifying components**: Run `pnpm test:run` to verify tests pass

## Architecture Overview

**Tech Stack**:

- **Next.js 15** with App Router (src/app/)
- **React 19** with strict mode enabled
- **TypeScript 5.9** with **STRICT MODE** enabled
- **pnpm** as package manager (NOT npm or yarn)
- **Vitest** for unit tests, **Playwright** for E2E tests
- **SCSS Modules** for styling (`.module.scss`)
- **next-intl** for internationalization (French/English)
- **@ducanh2912/next-pwa** for PWA support

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components
│   └── widgets/          # Widget components (TodoWidget, PomodoroWidget, etc.)
├── features/             # Feature modules
│   └── integrations/     # Third-party integrations (GitHub, etc.)
├── hooks/                # Custom React hooks
├── i18n/                 # i18n configuration
├── styles/               # Global SCSS files
├── tests/                # Test setup and mocks
├── utils/                # Utility functions
├── views/                # Page views
└── widgets/              # Widget registry (index.ts)
```

### Widget Architecture

- **Registry**: All widgets registered in `@/widgets/index.ts`
- **Structure**: Each widget in `src/components/widgets/<WidgetName>/`
- **Pattern**: Widget component + types + hooks + tests + SCSS module
- **State**: localStorage for persistence via custom hooks

### Integration Architecture

- **Location**: `src/features/integrations/<service>/`
- **Pattern**: adapter.ts + types.ts + mockData.ts + index.ts + **tests**/
- **OAuth**: **DISABLED by default** via environment variables
- **Example**: GitHub integration in `@/features/integrations/github/`

## Code Style & Conventions

### TypeScript

- **Strict Mode**: **ALWAYS** enabled with all safety checks
- **No `any`**: Use proper types or `unknown` (warning enforced)
- **Unused Vars**: Prefix with `_` if intentionally unused
- **Import Paths**: **ALWAYS** use `@/` alias for src imports
- **Example**: `import { Widget } from '@/components/widgets/Widget'`

### React

- **No React Import**: React 19 auto-imports (no `import React` needed)
- **Functional Components**: Use function declarations, not arrow functions for components
- **Hooks**: Extract complex logic into custom hooks in `@/hooks/`
- **Props**: Define explicit TypeScript interfaces for all props

### Styling

- **SCSS Modules**: **ALWAYS** use `.module.scss` for component styles
- **Import Pattern**: `import styles from './Component.module.scss'`
- **Class Names**: Use `styles.className` in JSX
- **Global Styles**: Import via `src/styles/main.scss`
- **NEVER**: Use plain CSS or inline styles

### File Naming

- **Components**: PascalCase (e.g., `TodoWidget.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `types.ts` with PascalCase exports)
- **Tests**: `*.test.ts` or `*.test.tsx` in `__tests__/` directories

### Testing

- **Location**: `__tests__/` directory next to source files
- **Framework**: Vitest with @testing-library/react
- **Setup**: Test setup in `@/tests/setup.ts`
- **Coverage**: Run `pnpm test:coverage` (informational only, no thresholds)
- **ALWAYS**: Write tests for new components and features
- **Mock i18n**: Use `@/tests/mocks/i18n.ts` for i18n mocks

## Internationalization (i18n)

### Framework

- **Primary**: next-intl (for Next.js pages)
- **Secondary**: react-i18next (for legacy components)
- **Config**: `@/i18n/config.ts`
- **Languages**: French (fr) and English (en)

### Message Files

- **Location**: `messages/fr.json` and `messages/en.json`
- **CRITICAL**: **ALWAYS** add translations for **BOTH** languages
- **Pattern**: Nested JSON structure with dot notation keys
- **Example**: `"widgets.todo.title": "Liste de tâches"`

### Usage

```typescript
// In Next.js components
import { useTranslations } from 'next-intl'
const t = useTranslations('widgets.todo')

// In legacy components
import { useTranslation } from 'react-i18next'
const { t } = useTranslation()
```

## Environment Variables

### Feature Flags

All OAuth integrations are **DISABLED by default** for security:

```bash
# GitHub OAuth (default: false)
NEXT_PUBLIC_ENABLE_GITHUB_OAUTH=false

# Google Calendar OAuth (default: false)
NEXT_PUBLIC_ENABLE_GOOGLE_CALENDAR_OAUTH=false

# RSS Integration (default: false)
NEXT_PUBLIC_ENABLE_RSS_INTEGRATION=false

# PWA (disabled in dev by default)
DISABLE_PWA=true
```

### Usage

- **NEVER** hardcode API keys or secrets
- **ALWAYS** use `process.env.NEXT_PUBLIC_*` for client-side vars
- **Check**: `.env.example` for required variables

## Adding New Features

### Adding a New Widget

1. **Create** widget in `src/components/widgets/<WidgetName>/`
2. **Files**: `<WidgetName>.tsx`, `types.ts`, `<WidgetName>.module.scss`
3. **Register** in `@/widgets/index.ts`
4. **Add i18n** messages in `messages/fr.json` AND `messages/en.json`
5. **Create tests** in `__tests__/<WidgetName>.test.tsx`
6. **BEFORE commit**: Run `pnpm check`

### Adding a New Integration

1. **Create** folder in `src/features/integrations/<service>/`
2. **Files**: `adapter.ts`, `types.ts`, `mockData.ts`, `index.ts`
3. **Tests**: Create `__tests__/` directory with unit tests
4. **Feature Flag**: Add environment variable in `.env.example`
5. **Documentation**: Update `FEATURES.md`
6. **BEFORE commit**: Run `pnpm check`

## Common Patterns

### localStorage Hook

```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage'

const [value, setValue] = useLocalStorage<Type>('key', defaultValue)
```

### Debounce Hook

```typescript
import { useDebounce } from '@/hooks/useDebounce'

const debouncedValue = useDebounce(value, 500)
```

### Widget Registry Pattern

```typescript
// In src/widgets/index.ts
export const AVAILABLE_WIDGETS: WidgetDefinition[] = [
  {
    id: 'widget-id',
    name: 'Widget Name',
    component: WidgetComponent,
    category: 'productivity',
    defaultSize: { w: 2, h: 2 },
  },
]
```

## Important Files

### Core Configuration

- **@/widgets/index.ts** - Widget registry (add new widgets here)
- **@/i18n/config.ts** - i18n configuration
- **@/tests/setup.ts** - Test setup and global mocks
- **next.config.mjs** - Next.js configuration (PWA, i18n, SCSS)
- **tsconfig.json** - TypeScript strict mode configuration
- **vitest.config.ts** - Vitest testing configuration

### Integration Adapters

- **@/features/integrations/github/adapter.ts** - GitHub API adapter
- **@/features/integrations/github/mockData.ts** - Mock data for development

## Build & Deploy

### Build Process

1. **Typecheck**: `pnpm typecheck` (must pass)
2. **Lint**: `pnpm lint:fix` (must pass)
3. **Build**: `pnpm build` (generates .next/ folder)
4. **CRITICAL**: TypeScript and ESLint errors **WILL FAIL** the build

### Production

- **Optimizations**: React strict mode, code splitting, image optimization
- **PWA**: Service worker enabled in production
- **i18n**: Automatic locale detection via middleware

## Critical Rules

- **ALWAYS** use `pnpm` (not npm or yarn)
- **ALWAYS** use `@/` import alias for src imports
- **ALWAYS** use SCSS modules (`.module.scss`) for styling
- **ALWAYS** add i18n messages for BOTH French and English
- **ALWAYS** run `pnpm check` before committing
- **NEVER** disable TypeScript strict mode
- **NEVER** use `any` type (use proper types or `unknown`)
- **NEVER** commit with failing tests or typecheck errors
- **NEVER** hardcode API keys (use environment variables)
- **BEFORE committing**: Run `pnpm check` to verify code quality
- **AFTER adding features**: Update relevant documentation (FEATURES.md, README.md)
