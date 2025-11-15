import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '@/components/theme/ThemeToggle'
import LangSelector from '@/components/langSelector/LangSelector'

// Mock Next.js router
const mockRefresh = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: mockRefresh,
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next-intl useLocale
const mockUseLocale = vi.fn()
vi.mock('next-intl', async () => {
  const actual = await vi.importActual<typeof import('next-intl')>('next-intl')
  return {
    ...actual,
    useLocale: () => mockUseLocale(),
  }
})

describe('Integration: Theme and Language Switching', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    mockRefresh.mockClear()
    mockUseLocale.mockReturnValue('fr')

    // Clear cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
  })

  it('should persist theme and language preferences together', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      <div>
        <ThemeToggle />
        <LangSelector />
      </div>
    )

    // Switch to dark theme
    await user.click(
      screen.getByRole('button', { name: /activer le thème sombre/i })
    )
    expect(localStorage.getItem('theme')).toBe('dark')

    // Switch to English
    const buttons = screen.getAllByRole('button')
    const enButton = buttons.find((btn) => btn.textContent?.includes('🇬🇧'))
    await user.click(enButton!)
    expect(document.cookie).toContain('NEXT_LOCALE=en')

    // Verify theme is still persisted
    expect(localStorage.getItem('theme')).toBe('dark')

    // Simulate page reload
    rerender(
      <div>
        <ThemeToggle />
        <LangSelector />
      </div>
    )

    // Verify theme persisted
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('should allow multiple theme and language changes', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <ThemeToggle />
        <LangSelector />
      </div>
    )

    // Multiple theme changes
    const themeButton = screen.getByRole('button', {
      name: /activer le thème sombre/i,
    })
    await user.click(themeButton)
    await user.click(
      screen.getByRole('button', { name: /activer le thème clair/i })
    )

    // Multiple language changes
    const buttons = screen.getAllByRole('button')
    const enButton = buttons.find((btn) => btn.textContent?.includes('🇬🇧'))
    const frButton = buttons.find((btn) => btn.textContent?.includes('🇫🇷'))
    await user.click(enButton!)
    await user.click(frButton!)

    // Verify final state
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.cookie).toContain('NEXT_LOCALE=fr')
  })

  it('should maintain independent state for theme and language', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <ThemeToggle />
        <LangSelector />
      </div>
    )

    // Change only theme
    await user.click(
      screen.getByRole('button', { name: /activer le thème sombre/i })
    )

    expect(localStorage.getItem('theme')).toBe('dark')
    // Cookie for language should not be set yet
    expect(document.cookie).not.toContain('NEXT_LOCALE=en')

    // Now change language
    const buttons = screen.getAllByRole('button')
    const enButton = buttons.find((btn) => btn.textContent?.includes('🇬🇧'))
    await user.click(enButton!)

    expect(localStorage.getItem('theme')).toBe('dark') // Theme unchanged
    expect(document.cookie).toContain('NEXT_LOCALE=en')
  })
})
