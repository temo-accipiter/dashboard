import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import About from '../About'

describe('About Page', () => {
  it('should render page title', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { name: /à propos de ce projet/i })
    ).toBeInTheDocument()
  })

  it('should render as h1 heading', () => {
    render(<About />)
    const heading = screen.getByRole('heading', {
      name: /à propos de ce projet/i,
    })
    expect(heading.tagName).toBe('H1')
  })

  it('should have proper text content', () => {
    render(<About />)
    expect(screen.getByText('À propos de ce projet')).toBeInTheDocument()
  })
})
