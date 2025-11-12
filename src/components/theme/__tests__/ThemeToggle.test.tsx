import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should render with light theme by default', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /activer le thème sombre/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🌞');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /activer le thème clair/i });
    expect(button).toHaveTextContent('🌙');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme from light to dark', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /activer le thème sombre/i });
    await user.click(button);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /activer le thème clair/i })).toHaveTextContent('🌙');
  });

  it('should toggle theme from dark to light', async () => {
    localStorage.setItem('theme', 'dark');
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /activer le thème clair/i });
    await user.click(button);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(screen.getByRole('button', { name: /activer le thème sombre/i })).toHaveTextContent('🌞');
  });

  it('should persist theme in localStorage', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should have proper accessibility attributes', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('title');
  });

  it('should update aria-label when theme changes', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /activer le thème sombre/i });
    await user.click(button);

    expect(screen.getByRole('button', { name: /activer le thème clair/i })).toBeInTheDocument();
  });
});
