import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '@/components/theme/ThemeToggle'
import LangSelector from '@/components/langSelector/LangSelector'
import { useTranslation } from 'react-i18next'

vi.mock('react-i18next', async () => {
  const actual =
    await vi.importActual<typeof import('react-i18next')>('react-i18next')
  return {
    ...actual,
    useTranslation: vi.fn(),
  }
})

describe('Integration: Theme and Language Switching', () => {
  const mockChangeLanguage = vi.fn()

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    mockChangeLanguage.mockClear()

    vi.mocked(useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'fr',
      } as any,
      t: Object.assign((key: string) => key, { $TFunctionBrand: Symbol() }),
      ready: true,
    } as any)
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
    await user.click(screen.getByRole('button', { name: /english/i }))
    expect(localStorage.getItem('lang')).toBe('en')

    // Verify both are persisted
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(localStorage.getItem('lang')).toBe('en')

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
    await user.click(screen.getByRole('button', { name: /english/i }))
    await user.click(screen.getByRole('button', { name: /français/i }))

    // Verify final state
    expect(localStorage.getItem('theme')).toBe('light')
    expect(localStorage.getItem('lang')).toBe('fr')
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
    expect(localStorage.getItem('lang')).toBeNull() // Language not set yet

    // Now change language
    await user.click(screen.getByRole('button', { name: /english/i }))

    expect(localStorage.getItem('theme')).toBe('dark') // Theme unchanged
    expect(localStorage.getItem('lang')).toBe('en')
  })
})
