import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Theme Toggle E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should start with light theme by default', async ({ page }) => {
    const theme = await page.locator('html').getAttribute('data-theme')
    expect(theme).toBe('light')

    const themeButton = page.getByRole('button', {
      name: /activer le thème sombre/i,
    })
    await expect(themeButton).toBeVisible()
  })

  test('should toggle to dark theme when clicked', async ({ page }) => {
    const themeButton = page.getByRole('button', {
      name: /activer le thème sombre/i,
    })
    await themeButton.click()

    const theme = await page.locator('html').getAttribute('data-theme')
    expect(theme).toBe('dark')

    const darkButton = page.getByRole('button', {
      name: /activer le thème clair/i,
    })
    await expect(darkButton).toBeVisible()
  })

  test('should toggle back to light theme', async ({ page }) => {
    // First toggle to dark
    await page.getByRole('button', { name: /activer le thème sombre/i }).click()

    // Then toggle back to light
    await page.getByRole('button', { name: /activer le thème clair/i }).click()

    const theme = await page.locator('html').getAttribute('data-theme')
    expect(theme).toBe('light')
  })

  test('should persist theme across page reloads', async ({ page }) => {
    // Toggle to dark theme
    await page.getByRole('button', { name: /activer le thème sombre/i }).click()

    // Reload page
    await page.reload()

    // Theme should still be dark
    const theme = await page.locator('html').getAttribute('data-theme')
    expect(theme).toBe('dark')
  })

  test('should persist theme in localStorage', async ({ page }) => {
    await page.getByRole('button', { name: /activer le thème sombre/i }).click()

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'))
    expect(storedTheme).toBe('dark')
  })

  test('should update button emoji when theme changes', async ({ page }) => {
    const button = page.getByRole('button', {
      name: /activer le thème sombre/i,
    })
    await expect(button).toContainText('🌞')

    await button.click()

    const darkButton = page.getByRole('button', {
      name: /activer le thème clair/i,
    })
    await expect(darkButton).toContainText('🌙')
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    const button = page.getByRole('button', {
      name: /activer le thème sombre/i,
    })

    await expect(button).toHaveAttribute('aria-label')
    await expect(button).toHaveAttribute('title')
  })

  test('should pass accessibility checks in both themes', async ({ page }) => {
    // Check light theme
    let results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])

    // Toggle to dark theme
    await page.getByRole('button', { name: /activer le thème sombre/i }).click()

    // Check dark theme
    results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})
