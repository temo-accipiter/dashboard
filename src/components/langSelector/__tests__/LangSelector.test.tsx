import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import LangSelector from '../LangSelector'

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

describe('LangSelector', () => {
  beforeEach(() => {
    mockUseLocale.mockReturnValue('fr')
    mockRefresh.mockClear()
    // Clear cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
  })

  it('should render language buttons', () => {
    render(<LangSelector />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent('🇫🇷')
    expect(buttons[1]).toHaveTextContent('🇬🇧')
  })

  it('should highlight current language (fr)', () => {
    mockUseLocale.mockReturnValue('fr')
    render(<LangSelector />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveClass('active')
    expect(buttons[1]).not.toHaveClass('active')
  })

  it('should highlight current language (en)', () => {
    mockUseLocale.mockReturnValue('en')
    render(<LangSelector />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).not.toHaveClass('active')
    expect(buttons[1]).toHaveClass('active')
  })

  it('should change language to French when FR button is clicked', async () => {
    const user = userEvent.setup()
    render(<LangSelector />)

    const frButton = screen.getAllByRole('button')[0]
    await user.click(frButton)

    // Check that cookie was set
    expect(document.cookie).toContain('NEXT_LOCALE=fr')
    // Check that router.refresh was called
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('should change language to English when EN button is clicked', async () => {
    const user = userEvent.setup()
    render(<LangSelector />)

    const enButton = screen.getAllByRole('button')[1]
    await user.click(enButton)

    // Check that cookie was set
    expect(document.cookie).toContain('NEXT_LOCALE=en')
    // Check that router.refresh was called
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('should persist language selection in cookies', async () => {
    const user = userEvent.setup()
    render(<LangSelector />)

    // Change to English
    await user.click(screen.getAllByRole('button')[1])
    expect(document.cookie).toContain('NEXT_LOCALE=en')

    // Change to French
    await user.click(screen.getAllByRole('button')[0])
    expect(document.cookie).toContain('NEXT_LOCALE=fr')
  })

  it('should have proper accessibility attributes', () => {
    render(<LangSelector />)

    const group = screen.getByRole('group', { name: /sélecteur de langue/i })
    expect(group).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-label')
    expect(buttons[1]).toHaveAttribute('aria-label')
  })

  it('should display flag emojis', () => {
    render(<LangSelector />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveTextContent('🇫🇷')
    expect(buttons[1]).toHaveTextContent('🇬🇧')
  })
})
