/**
 * Feature Flags Configuration
 *
 * Controls optional features and integrations via environment variables.
 * All flags are disabled by default for safety.
 */

export interface FeatureFlags {
  /** Enable GitHub OAuth integration */
  enableGitHubOAuth: boolean;
  /** Enable Google Calendar OAuth integration */
  enableGoogleCalendarOAuth: boolean;
  /** Enable RSS feed integration */
  enableRSSIntegration: boolean;
}

/**
 * Get feature flags from environment variables
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    enableGitHubOAuth: process.env.NEXT_PUBLIC_ENABLE_GITHUB_OAUTH === 'true',
    enableGoogleCalendarOAuth: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_CALENDAR_OAUTH === 'true',
    enableRSSIntegration: process.env.NEXT_PUBLIC_ENABLE_RSS_INTEGRATION === 'true',
  };
}

/**
 * Check if a specific feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[feature];
}
