# Dashboard Features

## Overview

This dashboard provides a customizable, widget-based interface with support for third-party integrations.

## Core Features

### Widget System

- **Modular Architecture**: Each widget is self-contained with its own state management
- **Drag & Drop**: Rearrange widgets on your dashboard
- **Widget Registry**: Central marketplace for discovering and activating widgets
- **Persistent State**: Widget configurations saved to localStorage

### Internationalization (i18n)

- **Languages**: French (FR) and English (EN)
- **Framework**: next-intl with automatic locale detection
- **Cookie Persistence**: User language preference saved across sessions

### Theming

- **Dark/Light Mode**: System-wide theme toggle
- **CSS Variables**: Consistent theming across all components
- **Persistent Preference**: Theme saved to localStorage

### PWA Support

- **Offline Capability**: Works without internet connection
- **Service Worker**: Asset caching and offline fallback
- **Installable**: Add to home screen on mobile devices

## Available Widgets

### 1. Todo List Widget

**Status**: ✅ Available
**Category**: Productivity

**Features**:

- Create, edit, and delete tasks
- Priority levels (high, medium, low, none)
- Tag-based organization with color coding
- Filtering by priority and tags
- localStorage persistence

### 2. Pomodoro Timer Widget

**Status**: ✅ Available
**Category**: Productivity

**Features**:

- Configurable work/break durations
- Multiple timer modes (focus, short break, long break)
- Sound notifications (customizable)
- Session history and statistics
- Daily/weekly tracking with streaks
- Export/import session data

### 3. News Feed Widget

**Status**: ✅ Available
**Category**: Information

**Features**:

- RSS feed reader
- Pre-configured feeds (TechCrunch, DEV Community, Hacker News, CSS-Tricks)
- Custom feed management
- Reading mode with full article view
- Sort by date or source
- Category filtering

### 4. GitHub Pull Requests Widget

**Status**: ✅ Available
**Category**: Productivity

**Features**:

- View pull requests for authenticated user
- Filter by state (open, closed, merged)
- Status indicators (pending, success, failure)
- Review request tracking
- Auto-refresh with configurable interval
- Mock data for development (OAuth behind feature flag)

**Configuration**:

- Filter PRs by state
- Limit number of displayed PRs
- Auto-refresh interval
- Show only PRs requesting your review

## Integrations

### GitHub Integration

**Status**: ✅ Available
**OAuth**: Behind feature flag (disabled by default)

The GitHub integration uses an adapter pattern to provide a clean interface for GitHub API interactions.

**Features**:

- Pull request listing
- Repository-specific PR views
- Mock data support for development
- OAuth support (when enabled)

**Setup**:

1. **Development Mode (Mock Data)**:
   No setup required. Mock data is used by default.

2. **Production Mode (OAuth)**:
   ```bash
   # Enable OAuth in .env
   NEXT_PUBLIC_ENABLE_GITHUB_OAUTH=true
   ```

**Architecture**:

```
src/features/integrations/github/
├── adapter.ts        # GitHub API adapter
├── types.ts          # Type definitions
├── mockData.ts       # Mock data for development
├── index.ts          # Public API
└── __tests__/        # Unit tests
```

### Google Calendar Integration

**Status**: 🚧 Planned

### RSS Integration

**Status**: 🚧 Planned

## Feature Flags

All OAuth integrations are controlled by environment variables for security:

```bash
# GitHub OAuth (default: false)
NEXT_PUBLIC_ENABLE_GITHUB_OAUTH=false

# Google Calendar OAuth (default: false)
NEXT_PUBLIC_ENABLE_GOOGLE_CALENDAR_OAUTH=false

# RSS Integration (default: false)
NEXT_PUBLIC_ENABLE_RSS_INTEGRATION=false

# PWA (default: false in dev, true in production)
DISABLE_PWA=false
```

## Development

### Adding a New Widget

1. Create widget component in `src/components/widgets/<WidgetName>/`
2. Register in `src/widgets/index.ts`
3. Add i18n messages in `messages/fr.json` and `messages/en.json`
4. Create tests in `__tests__/` directory

### Adding a New Integration

See [Integrations README](src/features/integrations/README.md) for detailed instructions.

## Testing

### Run All Tests

```bash
npm test
```

### Run Specific Tests

```bash
# Widget tests
npm test src/components/widgets

# Integration tests
npm test src/features/integrations

# GitHub adapter tests
npm test src/features/integrations/github
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Bundle Size**: Optimized with code splitting
- **Lazy Loading**: Widgets loaded on demand
- **PWA**: Service worker caching for offline performance
- **localStorage**: Efficient client-side persistence

## Security

- **OAuth Disabled by Default**: Prevent accidental token exposure
- **Environment Variables**: Secure configuration management
- **No Hardcoded Secrets**: All sensitive data via env vars
- **HTTPS Only**: All API calls use secure connections
- **Input Validation**: Sanitized data from external APIs

## Roadmap

### Short Term

- [ ] Google Calendar integration
- [ ] Enhanced RSS feed management
- [ ] Widget export/import functionality

### Medium Term

- [ ] Weather widget
- [ ] Calendar widget
- [ ] Notes widget with Markdown support
- [ ] Custom widget creation UI

### Long Term

- [ ] Backend API for data sync
- [ ] User authentication
- [ ] Cloud storage for widget data
- [ ] Mobile app
- [ ] Widget sharing/marketplace

## Contributing

When adding new features:

1. Follow the existing architecture patterns
2. Write comprehensive tests
3. Update documentation
4. Add i18n messages for both FR and EN
5. Ensure accessibility (ARIA labels, keyboard navigation)
6. Test in both light and dark modes

## License

MIT License - See [LICENSE](./LICENSE) file for details
