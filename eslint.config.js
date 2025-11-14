import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Configuration pour les fichiers JavaScript
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],

    // 🛑 Ignore les fichiers/folders qu'on ne veut pas analyser
    ignores: ['**/node_modules/**', '**/dist/**', '**/.yarn/**', '**/.pnp.*'],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
  },

  // Configuration pour les fichiers TypeScript
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/.yarn/**', '**/.pnp.*'],
  })),

  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/.yarn/**', '**/.pnp.*'],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },

    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
])
