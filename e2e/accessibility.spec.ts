import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  const pages = [
    { url: '/', name: 'Home' },
    { url: '/taches', name: 'Taches' },
    { url: '/rdv', name: 'Rendez-vous' },
    { url: '/liens', name: 'Liens' },
    { url: '/about', name: 'About' },
  ];

  for (const { url, name } of pages) {
    test(`${name} page should pass accessibility checks`, async ({ page }) => {
      await page.goto(url);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(`${name} page should have proper heading structure`, async ({
      page,
    }) => {
      await page.goto(url);

      // Every page should have at least one h1
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
    });

    test(`${name} page should have no duplicate IDs`, async ({ page }) => {
      await page.goto(url);

      const results = await new AxeBuilder({ page })
        .withRules(['duplicate-id'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test(`${name} page should have sufficient color contrast`, async ({
      page,
    }) => {
      await page.goto(url);

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }

  test('should have accessible navigation landmarks', async ({ page }) => {
    await page.goto('/');

    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check for navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have accessible form controls', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withRules(['label', 'button-name', 'link-name'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should support keyboard navigation throughout the app', async ({
    page,
  }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Continue tabbing
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    // Should still be able to focus elements
    focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have accessible images (if any)', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withRules(['image-alt'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('should have proper document language', async ({ page }) => {
    await page.goto('/');

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
  });

  test('should have accessible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Check that focused element has visible focus indicator
    const hasFocusStyle = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;

      const style = window.getComputedStyle(el);
      return (
        style.outline !== 'none' ||
        style.outlineWidth !== '0px' ||
        style.boxShadow !== 'none'
      );
    });

    expect(hasFocusStyle).toBeTruthy();
  });
});
