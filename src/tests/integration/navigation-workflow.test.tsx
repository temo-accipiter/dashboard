import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import Card from '@/components/card/Card'
import Home from '@/pages/home/Home'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Integration: Navigation Workflow', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should navigate through cards using click and keyboard', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <Card title="Settings" to="/settings">
          Settings content
        </Card>
        <Card title="Profile" to="/profile">
          Profile content
        </Card>
      </div>
    )

    // Click navigation
    const settingsCard = screen.getByRole('button', { name: /settings/i })
    await user.click(settingsCard)
    expect(mockNavigate).toHaveBeenCalledWith('/settings')

    // Keyboard navigation
    const profileCard = screen.getByRole('button', { name: /profile/i })
    profileCard.focus()
    await user.keyboard('{Enter}')
    expect(mockNavigate).toHaveBeenCalledWith('/profile')
  })

  it('should handle navigation from Home page cards', async () => {
    const user = userEvent.setup()

    render(<Home />)

    // Navigate to language settings
    const langCard = screen.getByText('Langue').closest('[role="button"]')
    await user.click(langCard!)
    expect(mockNavigate).toHaveBeenCalledWith('/settings/langue')

    // Navigate to theme settings
    const themeCard = screen.getByText('Thème').closest('[role="button"]')
    await user.click(themeCard!)
    expect(mockNavigate).toHaveBeenCalledWith('/settings/theme')
  })

  it('should support keyboard navigation with Tab and Enter', async () => {
    const user = userEvent.setup()

    render(<Home />)

    // Tab to navigate between clickable cards
    await user.tab()
    await user.tab()

    // Press Enter to activate
    await user.keyboard('{Enter}')

    // Should have navigated to one of the settings pages
    expect(mockNavigate).toHaveBeenCalled()
  })

  it('should support Space key for activation', async () => {
    const user = userEvent.setup()

    render(
      <Card title="Test Card" to="/test">
        Content
      </Card>
    )

    const card = screen.getByRole('button')
    card.focus()
    await user.keyboard(' ')

    expect(mockNavigate).toHaveBeenCalledWith('/test')
  })

  it('should not interfere with non-clickable cards', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <Card title="Static Card">Static content</Card>
        <Card title="Clickable Card" to="/click">
          Clickable content
        </Card>
      </div>
    )

    // Click static card (should not navigate)
    const staticCard = screen.getByText('Static Card').closest('div')
    await user.click(staticCard!)
    expect(mockNavigate).not.toHaveBeenCalled()

    // Click clickable card (should navigate)
    const clickableCard = screen.getByRole('button')
    await user.click(clickableCard)
    expect(mockNavigate).toHaveBeenCalledWith('/click')
  })
})
