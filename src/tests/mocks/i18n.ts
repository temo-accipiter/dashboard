import { vi } from 'vitest';

export const mockUseTranslation = () => ({
  t: (key: string) => key,
  i18n: {
    changeLanguage: vi.fn(),
    language: 'fr',
  },
});

export const mockI18next = {
  use: () => mockI18next,
  init: vi.fn(),
  t: (key: string) => key,
  changeLanguage: vi.fn(),
};
