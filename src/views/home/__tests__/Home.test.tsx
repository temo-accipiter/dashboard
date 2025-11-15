import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import Home from '../Home'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

describe('Home Page', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should render welcome message', () => {
    render(<Home />)
    expect(screen.getByText(/Bienvenue sur ton dashboard/i)).toBeInTheDocument()
  })

  it('should render Organisation section', () => {
    render(<Home />)
    expect(screen.getByText('📅 Organisation')).toBeInTheDocument()
  })

  it('should render Réglages section', () => {
    render(<Home />)
    expect(screen.getByText('⚙️ Réglages')).toBeInTheDocument()
  })

  it('should render all organisation cards', () => {
    render(<Home />)

    expect(screen.getByText('Rendez-vous')).toBeInTheDocument()
    expect(screen.getByText('Tâches à faire')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
  })

  it('should display appointment information', () => {
    render(<Home />)
    expect(
      screen.getByText("Aucun rendez-vous aujourd'hui.")
    ).toBeInTheDocument()
  })

  it('should display task list', () => {
    render(<Home />)
    expect(
      screen.getByText("Configurer l'authentification")
    ).toBeInTheDocument()
    expect(screen.getByText('Connecter Todoist')).toBeInTheDocument()
  })

  it('should display notes content', () => {
    render(<Home />)
    expect(
      screen.getByText('Pense à faire la sauvegarde du projet ce soir.')
    ).toBeInTheDocument()
  })

  it('should render settings cards', () => {
    render(<Home />)

    expect(screen.getByText('Langue')).toBeInTheDocument()
    expect(screen.getByText('Thème')).toBeInTheDocument()
  })

  it('should have navigation link for Langue settings', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const langCard = screen.getByText('Langue').closest('[role="button"]')
    expect(langCard).toBeInTheDocument()

    await user.click(langCard!)
    expect(mockPush).toHaveBeenCalledWith('/settings/langue')
  })

  it('should have navigation link for Thème settings', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const themeCard = screen.getByText('Thème').closest('[role="button"]')
    expect(themeCard).toBeInTheDocument()

    await user.click(themeCard!)
    expect(mockPush).toHaveBeenCalledWith('/settings/theme')
  })

  it('should display settings descriptions', () => {
    render(<Home />)

    expect(
      screen.getByText("Modifier la langue de l'interface")
    ).toBeInTheDocument()
    expect(
      screen.getByText('Basculer entre clair et sombre')
    ).toBeInTheDocument()
  })

  it('should have proper page structure', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
