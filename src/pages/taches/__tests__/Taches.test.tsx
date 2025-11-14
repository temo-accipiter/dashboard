import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import Taches from '../Taches'

describe('Taches Page', () => {
  it('should render page title', () => {
    render(<Taches />)
    expect(
      screen.getByRole('heading', { level: 1, name: /mes tâches/i })
    ).toBeInTheDocument()
  })

  it('should render TodoWidget component', () => {
    render(<Taches />)
    // TodoWidget has its own heading "Mes Tâches"
    expect(
      screen.getByRole('heading', { level: 2, name: /^mes tâches$/i })
    ).toBeInTheDocument()
  })

  it('should render KanbanBoard component', () => {
    render(<Taches />)
    // KanbanBoard should be present (checking for typical content)
    expect(screen.getByText('TODO')).toBeInTheDocument()
    expect(screen.getByText('DOING')).toBeInTheDocument()
    expect(screen.getByText('DONE')).toBeInTheDocument()
  })

  it('should have proper page structure', () => {
    render(<Taches />)

    const mainHeading = screen.getByRole('heading', {
      level: 1,
      name: /mes tâches/i,
    })
    expect(mainHeading).toBeInTheDocument()
  })

  it('should display TodoWidget with empty state', () => {
    render(<Taches />)
    // TodoWidget starts empty
    expect(screen.getByText(/aucune tâche pour le moment/i)).toBeInTheDocument()
  })

  it('should render task input form', () => {
    render(<Taches />)
    // TodoWidget has an input for adding new tasks
    const input = screen.getByLabelText(/texte de la nouvelle tâche/i)
    expect(input).toBeInTheDocument()
  })
})
