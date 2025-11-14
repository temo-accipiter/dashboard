import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Home Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Dashboard/i)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display organisation section', async ({ page }) => {
    await expect(page.getByText('📅 Organisation')).toBeVisible()
    await expect(page.getByText('Rendez-vous')).toBeVisible()
    await expect(page.getByText('Tâches à faire')).toBeVisible()
    await expect(page.getByText('Notes')).toBeVisible()
  })

  test('should display réglages section', async ({ page }) => {
    await expect(page.getByText('⚙️ Réglages')).toBeVisible()
    await expect(page.getByText('Langue')).toBeVisible()
    await expect(page.getByText('Thème')).toBeVisible()
  })

  test('should navigate to settings/langue when clicking Langue card', async ({
    page,
  }) => {
    await page.getByText('Langue').click()
    await expect(page).toHaveURL(/\/settings\/langue/)
  })

  test('should navigate to settings/theme when clicking Thème card', async ({
    page,
  }) => {
    await page.getByText('Thème').click()
    await expect(page).toHaveURL(/\/settings\/theme/)
  })

  test('should support keyboard navigation on clickable cards', async ({
    page,
  }) => {
    const langCard = page.getByText('Langue').locator('..')
    await langCard.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/settings\/langue/)
  })

  test('should pass accessibility checks', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
