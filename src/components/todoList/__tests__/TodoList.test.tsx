import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import TodoList from '../TodoList'

describe('TodoList', () => {
  it('should render the component with title', () => {
    render(<TodoList />)
    expect(
      screen.getByRole('heading', { name: /liste de tâches/i })
    ).toBeInTheDocument()
  })

  it('should render all initial tasks', () => {
    render(<TodoList />)

    expect(
      screen.getByText("Configurer l'authentification")
    ).toBeInTheDocument()
    expect(screen.getByText('Connecter Todoist')).toBeInTheDocument()
    expect(
      screen.getByText('Créer une sauvegarde automatique')
    ).toBeInTheDocument()
  })

  it('should render checkboxes for all tasks', () => {
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })

  it('should mark completed task as checked', () => {
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')
    // Third task is marked as done in initial state
    expect(checkboxes[2]).toBeChecked()
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  })

  it('should apply "done" class to completed tasks', () => {
    render(<TodoList />)

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')

    expect(items[2]).toHaveClass('done')
    expect(items[0]).not.toHaveClass('done')
    expect(items[1]).not.toHaveClass('done')
  })

  it('should toggle task from unchecked to checked', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    expect(firstCheckbox).not.toBeChecked()

    await user.click(firstCheckbox!)

    expect(firstCheckbox).toBeChecked()
  })

  it('should toggle task from checked to unchecked', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')
    const completedCheckbox = checkboxes[2]

    expect(completedCheckbox).toBeChecked()

    await user.click(completedCheckbox!)

    expect(completedCheckbox).not.toBeChecked()
  })

  it('should update done class when toggling task', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')
    const firstItem = items[0]

    expect(firstItem).not.toHaveClass('done')

    const checkbox = within(firstItem!).getByRole('checkbox')
    await user.click(checkbox)

    expect(firstItem).toHaveClass('done')
  })

  it('should allow multiple tasks to be toggled independently', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')

    // Toggle first two tasks
    await user.click(checkboxes[0]!)
    await user.click(checkboxes[1]!)

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).toBeChecked() // Was already checked
  })

  it('should maintain task state after multiple toggles', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const checkbox = screen.getAllByRole('checkbox')[0]!

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should have proper list structure', () => {
    render(<TodoList />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()

    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(3)
  })

  it('should associate labels with checkboxes', () => {
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((checkbox) => {
      expect(checkbox.closest('label')).toBeInTheDocument()
    })
  })
})
