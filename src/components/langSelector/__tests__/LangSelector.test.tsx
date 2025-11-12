import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import LangSelector from '../LangSelector';
import { useTranslation } from 'react-i18next';

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: vi.fn(),
  };
});

describe('LangSelector', () => {
  const mockChangeLanguage = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockChangeLanguage.mockClear();

    vi.mocked(useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'fr',
      } as any,
      t: (key: string) => key,
      ready: true,
    });
  });

  it('should render language buttons', () => {
    render(<LangSelector />);

    expect(screen.getByRole('button', { name: /français/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
  });

  it('should highlight current language (fr)', () => {
    render(<LangSelector />);

    const frButton = screen.getByRole('button', { name: /français/i });
    expect(frButton).toHaveClass('active');
  });

  it('should highlight current language (en)', () => {
    vi.mocked(useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'en',
      } as any,
      t: (key: string) => key,
      ready: true,
    });

    render(<LangSelector />);

    const enButton = screen.getByRole('button', { name: /english/i });
    expect(enButton).toHaveClass('active');
  });

  it('should change language to French when FR button is clicked', async () => {
    const user = userEvent.setup();
    render(<LangSelector />);

    const frButton = screen.getByRole('button', { name: /français/i });
    await user.click(frButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
    expect(localStorage.getItem('lang')).toBe('fr');
  });

  it('should change language to English when EN button is clicked', async () => {
    const user = userEvent.setup();
    render(<LangSelector />);

    const enButton = screen.getByRole('button', { name: /english/i });
    await user.click(enButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should persist language selection in localStorage', async () => {
    const user = userEvent.setup();
    render(<LangSelector />);

    await user.click(screen.getByRole('button', { name: /english/i }));
    expect(localStorage.getItem('lang')).toBe('en');

    await user.click(screen.getByRole('button', { name: /français/i }));
    expect(localStorage.getItem('lang')).toBe('fr');
  });

  it('should have proper accessibility attributes', () => {
    render(<LangSelector />);

    const group = screen.getByRole('group', { name: /sélecteur de langue/i });
    expect(group).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /français/i })).toHaveAttribute('aria-label');
    expect(screen.getByRole('button', { name: /english/i })).toHaveAttribute('aria-label');
  });

  it('should display flag emojis', () => {
    render(<LangSelector />);

    const frButton = screen.getByRole('button', { name: /français/i });
    const enButton = screen.getByRole('button', { name: /english/i });

    expect(frButton).toHaveTextContent('🇫🇷');
    expect(enButton).toHaveTextContent('🇬🇧');
  });
});
