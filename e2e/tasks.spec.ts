import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Tasks Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/taches');
  });

  test('should load tasks page', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /mes tâches/i })
    ).toBeVisible();
  });

  test('should display TodoList component', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /liste de tâches/i })
    ).toBeVisible();
  });

  test('should display initial tasks', async ({ page }) => {
    await expect(page.getByText("Configurer l'authentification")).toBeVisible();
    await expect(page.getByText('Connecter Todoist')).toBeVisible();
    await expect(
      page.getByText('Créer une sauvegarde automatique')
    ).toBeVisible();
  });

  test('should have checkboxes for all tasks', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox');
    await expect(checkboxes).toHaveCount(3);
  });

  test('should toggle task completion', async ({ page }) => {
    const firstCheckbox = page.getByRole('checkbox').first();

    // Initially unchecked
    await expect(firstCheckbox).not.toBeChecked();

    // Click to check
    await firstCheckbox.click();
    await expect(firstCheckbox).toBeChecked();

    // Click to uncheck
    await firstCheckbox.click();
    await expect(firstCheckbox).not.toBeChecked();
  });

  test('should show completed task with done styling', async ({ page }) => {
    // Third task is marked as done initially
    const completedTask = page
      .getByText('Créer une sauvegarde automatique')
      .locator('..');

    await expect(completedTask).toHaveClass(/done/);
  });

  test('should handle multiple task toggles', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox');

    // Toggle first task
    await checkboxes.nth(0).click();
    await expect(checkboxes.nth(0)).toBeChecked();

    // Toggle second task
    await checkboxes.nth(1).click();
    await expect(checkboxes.nth(1)).toBeChecked();

    // Both should be checked
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
  });

  test('should display KanbanBoard', async ({ page }) => {
    await expect(page.getByText(/kanban/i)).toBeVisible();
  });

  test('should pass accessibility checks', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should have proper focus management', async ({ page }) => {
    // Tab to first checkbox
    await page.keyboard.press('Tab');

    const firstCheckbox = page.getByRole('checkbox').first();
    await expect(firstCheckbox).toBeFocused();

    // Space to toggle
    await page.keyboard.press('Space');
    await expect(firstCheckbox).toBeChecked();
  });
});
