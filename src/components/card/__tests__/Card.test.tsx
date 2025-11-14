import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import Card from '../Card'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Card', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render card with title and children', () => {
    render(
      <Card title="Test Card">
        <p>Test content</p>
      </Card>
    )

    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should not be clickable when no "to" prop is provided', () => {
    render(
      <Card title="Static Card">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByText('Static Card').closest('div')
    expect(card).not.toHaveClass('clickable')
    expect(card).not.toHaveAttribute('role', 'button')
    expect(card).not.toHaveAttribute('tabIndex')
  })

  it('should be clickable when "to" prop is provided', () => {
    render(
      <Card title="Clickable Card" to="/test-route">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByText('Clickable Card').closest('div')
    expect(card).toHaveClass('clickable')
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('should navigate when clicked with "to" prop', async () => {
    const user = userEvent.setup()
    render(
      <Card title="Nav Card" to="/dashboard">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByRole('button')
    await user.click(card)

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('should not navigate when clicked without "to" prop', async () => {
    const user = userEvent.setup()
    render(
      <Card title="Static Card">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByText('Static Card').closest('div')
    await user.click(card!)

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should navigate on Enter key press', async () => {
    const user = userEvent.setup()
    render(
      <Card title="Keyboard Card" to="/keyboard-test">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByRole('button')
    card.focus()
    await user.keyboard('{Enter}')

    expect(mockNavigate).toHaveBeenCalledWith('/keyboard-test')
  })

  it('should navigate on Space key press', async () => {
    const user = userEvent.setup()
    render(
      <Card title="Space Card" to="/space-test">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByRole('button')
    card.focus()
    await user.keyboard(' ')

    expect(mockNavigate).toHaveBeenCalledWith('/space-test')
  })

  it('should not navigate on other key press', async () => {
    const user = userEvent.setup()
    render(
      <Card title="Key Card" to="/key-test">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByRole('button')
    card.focus()
    await user.keyboard('a')

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should not handle keyboard events without "to" prop', async () => {
    const user = userEvent.setup()
    render(
      <Card title="No Nav Card">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByText('No Nav Card').closest('div')
    await user.click(card!)

    // Simulate Enter key
    card?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('should render complex children content', () => {
    render(
      <Card title="Complex Card">
        <div>
          <h3>Subtitle</h3>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <button>Action</button>
        </div>
      </Card>
    )

    expect(screen.getByText('Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('should have proper card structure', () => {
    render(
      <Card title="Structured Card">
        <p>Content</p>
      </Card>
    )

    const card = screen.getByText('Structured Card').closest('div')
    expect(card).toHaveClass('card')

    const title = screen.getByText('Structured Card')
    expect(title).toHaveClass('card-title')
    expect(title.tagName).toBe('H2')

    const content = screen.getByText('Content').closest('.card-content')
    expect(content).toBeInTheDocument()
  })
})
