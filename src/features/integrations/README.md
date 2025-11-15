# Integrations

This directory contains third-party service integrations for the dashboard. Each integration follows an isolated adapter pattern with mock data support.

## Architecture

Each integration is organized as follows:

```
src/features/integrations/<provider>/
├── adapter.ts          # Adapter implementation with API abstraction
├── types.ts            # TypeScript type definitions
├── mockData.ts         # Mock data for development/testing
├── index.ts            # Public API exports
└── __tests__/          # Unit tests
    ├── adapter.test.ts
    └── mockData.test.ts
```

## Feature Flags

All OAuth integrations are behind feature flags for security. By default, integrations use mock data.

To enable OAuth for an integration, set the corresponding environment variable:

```bash
# GitHub OAuth
NEXT_PUBLIC_ENABLE_GITHUB_OAUTH=true

# Google Calendar OAuth (coming soon)
NEXT_PUBLIC_ENABLE_GOOGLE_CALENDAR_OAUTH=true

# RSS Integration (coming soon)
NEXT_PUBLIC_ENABLE_RSS_INTEGRATION=true
```

## Available Integrations

### GitHub

**Status**: ✅ Available
**Location**: `src/features/integrations/github/`
**Widget**: GitHub Pull Requests (`GitHubPRsWidget`)

**Features**:
- View pull requests for authenticated user
- Filter by state (open/closed/merged)
- View repository-specific pull requests
- Mock data included for development
- OAuth support (behind feature flag)

**Usage**:

```typescript
import { getGitHubAdapter } from '@/features/integrations/github';

const adapter = getGitHubAdapter();
const pullRequests = await adapter.getPullRequests({ state: 'open' });
```

**Configuration**:

```typescript
import { createGitHubAdapter } from '@/features/integrations/github';

// Use mock data (default)
const adapter = createGitHubAdapter();

// Use real API with OAuth (requires feature flag)
const adapter = createGitHubAdapter({
  useMockData: false,
  oauthToken: 'your-oauth-token',
});
```

### Google Calendar

**Status**: 🚧 Coming soon
**Planned Features**:
- View upcoming events
- Create/edit events
- Calendar sync
- Mock data for development

### RSS

**Status**: 🚧 Coming soon
**Planned Features**:
- RSS feed reader
- Custom feed management
- Article caching

## Creating a New Integration

1. **Create directory structure**:
   ```bash
   mkdir -p src/features/integrations/<provider>/__tests__
   ```

2. **Define types** (`types.ts`):
   ```typescript
   export interface <Provider>Adapter {
     // Define adapter interface
   }

   export interface <Provider>AdapterConfig {
     token?: string;
     oauthToken?: string;
     useMockData?: boolean;
   }
   ```

3. **Create mock data** (`mockData.ts`):
   ```typescript
   export const mock<Entity>: <Entity>[] = [
     // Mock data for development
   ];
   ```

4. **Implement adapter** (`adapter.ts`):
   ```typescript
   import { isFeatureEnabled } from '@/utils/featureFlags';

   export class <Provider>AdapterImpl implements <Provider>Adapter {
     constructor(config: <Provider>AdapterConfig = {}) {
       this.config = { useMockData: true, ...config };
     }

     async getData() {
       if (this.config.useMockData || !isFeatureEnabled('enable<Provider>OAuth')) {
         return mockData;
       }
       return this.fetchFromAPI();
     }
   }
   ```

5. **Add feature flag** (`.env.example`):
   ```bash
   NEXT_PUBLIC_ENABLE_<PROVIDER>_OAUTH=false
   ```

6. **Create tests** (`__tests__/`):
   - Test adapter with mock data
   - Test filtering and pagination
   - Test feature flag integration

7. **Create widget component**:
   ```
   src/components/widgets/<Provider>Widget/
   ├── <Provider>Widget.tsx
   ├── types.ts
   ├── use<Provider>.ts (custom hook)
   └── <Provider>Widget.module.scss
   ```

8. **Register widget** (`src/widgets/index.ts`):
   ```typescript
   import { <Provider>Widget } from '@/components/widgets/<Provider>Widget';

   export const WIDGET_REGISTRY: WidgetManifest[] = [
     // ... existing widgets
     {
       id: '<provider>-widget',
       name: '<Provider> Widget',
       description: '...',
       icon: '🔧',
       category: 'information',
       component: <Provider>Widget,
       version: '1.0.0',
       author: 'Dashboard Team',
       tags: ['<provider>', 'integration'],
     },
   ];
   ```

## Best Practices

1. **Always provide mock data** - Enables development without API setup
2. **Use feature flags** - OAuth flows should be opt-in via environment variables
3. **Write comprehensive tests** - Test both mock and real API scenarios
4. **Document your adapter** - Include JSDoc comments for all public methods
5. **Handle errors gracefully** - Provide meaningful error messages
6. **Type everything** - Use TypeScript for all code
7. **Follow the adapter pattern** - Keep API details isolated in the adapter

## Testing

Run integration tests:

```bash
npm test src/features/integrations
```

Run specific integration tests:

```bash
npm test src/features/integrations/github
```

## Security

- **Never commit tokens** - Use environment variables
- **OAuth flows are disabled by default** - Prevent accidental exposure
- **Validate all inputs** - Sanitize data from external APIs
- **Use HTTPS** - All API calls must use secure connections
- **Rate limiting** - Respect API rate limits
