import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Language Selector E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display language selector with both flags', async ({ page }) => {
    await expect(page.getByRole('button', { name: /français/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /english/i })).toBeVisible();
  });

  test('should highlight current language (FR by default)', async ({
    page,
  }) => {
    const frButton = page.getByRole('button', { name: /français/i });
    await expect(frButton).toHaveClass(/active/);
  });

  test('should switch to English when EN button is clicked', async ({
    page,
  }) => {
    const enButton = page.getByRole('button', { name: /english/i });
    await enButton.click();

    await expect(enButton).toHaveClass(/active/);
  });

  test('should switch back to French', async ({ page }) => {
    // First switch to English
    await page.getByRole('button', { name: /english/i }).click();

    // Then switch back to French
    const frButton = page.getByRole('button', { name: /français/i });
    await frButton.click();

    await expect(frButton).toHaveClass(/active/);
  });

  test('should persist language preference in localStorage', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /english/i }).click();

    const storedLang = await page.evaluate(() => localStorage.getItem('lang'));
    expect(storedLang).toBe('en');
  });

  test('should persist language across page reloads', async ({ page }) => {
    // Switch to English
    await page.getByRole('button', { name: /english/i }).click();

    // Reload page
    await page.reload();

    // Should still be English
    const enButton = page.getByRole('button', { name: /english/i });
    await expect(enButton).toHaveClass(/active/);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const langGroup = page.getByRole('group', { name: /sélecteur de langue/i });
    await expect(langGroup).toBeVisible();

    const frButton = page.getByRole('button', { name: /français/i });
    const enButton = page.getByRole('button', { name: /english/i });

    await expect(frButton).toHaveAttribute('aria-label');
    await expect(enButton).toHaveAttribute('aria-label');
  });

  test('should pass accessibility checks', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
